
"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Card,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as authService from "../../services/authService";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AdminCareerManagement = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeSubTab, setActiveSubTab] = useState("Banner");
  const [loading, setLoading] = useState(false);

  // Data States
  const [lawCategories, setLawCategories] = useState([]);
  const [careerLaws, setCareerLaws] = useState([]);
  const [careerAttorneys, setCareerAttorneys] = useState([]);
  const [careerProfessionals, setCareerProfessionals] = useState([]);
  const [careerBanners, setCareerBanners] = useState([]);
  const [careerDetails, setCareerDetails] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [careers, setCareers] = useState([]);
  const [countries, setCountries] = useState([]);

  // Get current admin ID
  const currentAdminId = authService.getAdminId();

  const [modal, setModal] = useState({
    open: false,
    type: "",
    edit: false,
    id: null,
  });

  // Suppress React Quill deprecation warnings
  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalWarn = console.warn;
      console.warn = (...args) => {
        if (
          args[0] &&
          typeof args[0] === "string" &&
          args[0].includes("DOMNodeInserted")
        ) {
          return; // Suppress this specific warning
        }
        originalWarn.apply(console, args);
      };
      return () => {
        console.warn = originalWarn; // Restore on cleanup
      };
    }
  }, []);

  // Form States
  const [lawCatForm, setLawCatForm] = useState({ name: "" });
  const [jobCatForm, setJobCatForm] = useState({ jobCategory: "" });
  const [detailForm, setDetailForm] = useState({
    bannerText: "",
    description: "",
    bannerImage: null,
  });
  const [frontForm, setFrontForm] = useState({
    categoryId: "",
    bannerText: "",
    countryId: "",
    bannerImage: null,
  });
  const [careerForm, setCareerForm] = useState({
    jobTitle: "",
    jobCode: "",
    jobCategoryId: "",
    lawCareerCategoryId: "",
    countryId: "",
    cityId: "",
    address: "",
    location: "Onsite",
    jobType: "FullTime",
    textEditor: "",
  });

  const getItemId = (item) => item?.id || item?._id;

  const truncateText = (text) => {
    if (!text) return "N/A";
    const plainText = text.replace(/<[^>]*>/g, "");
    return plainText.length > 50
      ? plainText.substring(0, 50) + "..."
      : plainText;
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const extract = (res) => {
        if (Array.isArray(res)) return res;
        if (res?.data && Array.isArray(res.data)) return res.data;
        if (res?.data?.data && Array.isArray(res.data.data))
          return res.data.data;
        // Handle functions that return { success, data } format
        if (res?.success && Array.isArray(res.data)) return res.data;
        return res?.jobs || res?.data || [];
      };

      const [law, cLaw, cAt, cPr, det, jCat, car, coun, ban] =
        await Promise.allSettled([
          authService.getAllLawCareerCategories(),
          authService.getAllCareerLaw(),
          authService.getAllCareerAttorneys(),
          authService.getAllCareerProfessionals(),
          authService.getAllCareerDetails(),
          authService.getAllJobCategories(),
          authService.getAllCareers(),
          authService.getAllCountries(),
          authService.getAllCareerBanners(),
        ]);

      if (law.status === "fulfilled") {
        console.log("Law categories:", extract(law.value));
        setLawCategories(extract(law.value));
      }
      if (cLaw.status === "fulfilled") {
        console.log("Career laws:", extract(cLaw.value));
        setCareerLaws(extract(cLaw.value));
      }
      if (cAt.status === "fulfilled") {
        console.log("Career attorneys:", extract(cAt.value));
        setCareerAttorneys(extract(cAt.value));
      }
      if (cPr.status === "fulfilled") {
        console.log("Career professionals raw response:", cPr.value);
        console.log("Career professionals extracted:", extract(cPr.value));
        setCareerProfessionals(extract(cPr.value));
      }
      if (det.status === "fulfilled") {
        console.log("Career details:", extract(det.value));
        setCareerDetails(extract(det.value));
      }
      if (jCat.status === "fulfilled") {
        console.log("Job categories:", extract(jCat.value));
        setJobCategories(extract(jCat.value));
      }
      if (car.status === "fulfilled") {
        console.log("Careers:", extract(car.value));
        setCareers(extract(car.value));
      }
      if (coun.status === "fulfilled") {
        console.log("Countries:", extract(coun.value));
        setCountries(extract(coun.value));
      }
      if (ban.status === "fulfilled") {
        console.log("Career banners:", extract(ban.value));
        setCareerBanners(extract(ban.value));
      }
    } catch (error) {
      toast.error("Failed to refresh data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleModal = (type = "", edit = false, data = null) => {
    setModal({
      open: !modal.open,
      type,
      edit,
      id: data ? getItemId(data) : null,
    });
    if (!modal.open && data) {
      if (type === "lawCat") setLawCatForm({ name: data.name || "" });
      else if (type === "jobCat")
        setJobCatForm({ jobCategory: data.jobCategory || data.name || "" });
      else if (type === "detail")
        setDetailForm({
          bannerText: data.bannerText || "",
          description: data.description || "",
          bannerImage: null,
        });
      else if (type === "front")
        setFrontForm({
          categoryId: data.categoryId || data.categoryid || "",
          bannerText: data.content || "",
          countryId: data.countryId || "",
          bannerImage: null,
        });
      else if (type === "career")
        setCareerForm({
          jobTitle: data.jobTitle || "",
          jobCode: data.jobCode || "",
          jobCategoryId: data.jobCategoryId || "",
          lawCareerCategoryId: data.lawCareerCategoryId || "",
          countryId: data.countryId || "",
          cityId: data.cityId || "",
          address: data.address || "",
          location: data.location || "Onsite",
          jobType: data.jobType || "FullTime",
          textEditor: data.textEditor || data.description || "",
        });
    } else {
      setLawCatForm({ name: "" });
      setJobCatForm({ jobCategory: "" });
      setDetailForm({ bannerText: "", description: "", bannerImage: null });
      setFrontForm({
        categoryId: "",
        bannerText: "",
        countryId: "",
        bannerImage: null,
      });
      setCareerForm({
        jobTitle: "",
        jobCode: "",
        jobCategoryId: "",
        lawCareerCategoryId: "",
        countryId: "",
        cityId: "",
        address: "",
        location: "Onsite",
        jobType: "FullTime",
        textEditor: "",
      });

      if (type === "front" && activeSubTab !== "Banner") {
        const match = lawCategories.find((c) => c.name === activeSubTab);
        if (match)
          setFrontForm((prev) => ({ ...prev, categoryId: getItemId(match) }));
      }
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      const id = modal.id;
      const fd = new FormData();

      if (modal.type === "front") {
        const content = frontForm.bannerText?.trim() || "Default content";
        fd.append("content", content);
        if (activeSubTab === "Banner") {
          // Banner requires both content and bannerImage
          if (!frontForm.bannerImage || !(frontForm.bannerImage instanceof File)) {
            toast.error("Please select a banner image");
            setLoading(false);
            return;
          }
          fd.append("bannerImage", frontForm.bannerImage);
          console.log("Banner FormData:", {
            content: content,
            hasImage: frontForm.bannerImage instanceof File,
            imageName: frontForm.bannerImage?.name,
            id: id,
          });

          // Log FormData contents for Banner
          for (let [key, value] of fd.entries()) {
            console.log(
              `Banner FormData entry:`,
              key,
              value instanceof File ? `File: ${value.name}` : value,
            );
          }

          res = modal.edit
            ? await authService.updateCareerBanner(id, fd)
            : await authService.createCareerBanner(fd);
        } else {
          fd.append("countryId", frontForm.countryId || "");
          if (frontForm.bannerImage instanceof File) {
            fd.append("image", frontForm.bannerImage); // All career sections use "image" field
          }

          console.log(`${activeSubTab} FormData:`, {
            content: content,
            countryId: frontForm.countryId,
            categoryId: frontForm.categoryId,
            hasImage: frontForm.bannerImage instanceof File,
            imageName: frontForm.bannerImage?.name,
            imageSize: frontForm.bannerImage?.size,
            imageType: frontForm.bannerImage?.type,
            id: id,
          });

          // Log FormData contents
          for (let [key, value] of fd.entries()) {
            console.log(
              `${activeSubTab} FormData entry:`,
              key,
              value instanceof File ? `File: ${value.name}` : value,
            );
          }

          if (activeSubTab === "Law Students") {
            fd.append("categoryid", frontForm.categoryId || ""); // Note: lowercase 'i'
            res = modal.edit
              ? await authService.updateCareerLaw(id, fd)
              : await authService.createCareerLaw(fd);
          } else if (activeSubTab === "Attorneys") {
            fd.append("categoryid", frontForm.categoryId || ""); // Use lowercase 'categoryid' to match API
            res = modal.edit
              ? await authService.updateCareerAttorney(id, fd)
              : await authService.createCareerAttorney(fd);
          } else if (activeSubTab === "Professional Staff") {
            fd.append("categoryid", frontForm.categoryId || ""); // Use lowercase 'categoryid' to match API
            res = modal.edit
              ? await authService.updateCareerProfessional(id, fd)
              : await authService.createCareerProfessional(fd);

            // Log the API response to check if image URL is returned
            console.log("Professional Staff API Response:", res.data);
          }
        }
      } else if (modal.type === "lawCat") {
        res = modal.edit
          ? await authService.updateLawCareerCategory(id, lawCatForm)
          : await authService.createLawCareerCategory(lawCatForm);
      } else if (modal.type === "jobCat") {
        res = modal.edit
          ? await authService.updateJobCategory(id, jobCatForm)
          : await authService.createJobCategory(jobCatForm);
      } else if (modal.type === "detail") {
        fd.append("bannerText", detailForm.bannerText);
        fd.append("description", detailForm.description);
        if (detailForm.bannerImage instanceof File)
          fd.append("bannerImage", detailForm.bannerImage);
        res = modal.edit
          ? await authService.updateCareerDetail(id, fd)
          : await authService.createCareerDetail(fd);
      } else if (modal.type === "career") {
        res = modal.edit
          ? await authService.updateCareer(id, careerForm)
          : await authService.createCareer(careerForm);
      }

      if (res) {
        toast.success("Action Successful!");
        toggleModal();
        fetchData();
      }
    } catch (error) {
      console.error("Action Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Operation failed. Please check console.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      if (type === "front") {
        if (activeSubTab === "Banner") await authService.deleteCareerBanner(id);
        else if (activeSubTab === "Law Students")
          await authService.deleteCareerLaw(id);
        else if (activeSubTab === "Attorneys")
          await authService.deleteCareerAttorney(id);
        else if (activeSubTab === "Professional Staff")
          await authService.deleteCareerProfessional(id);
      } else if (type === "lawCat")
        await authService.deleteLawCareerCategory(id);
      else if (type === "jobCat") await authService.deleteJobCategory(id);
      else if (type === "detail") await authService.deleteCareerDetail(id);
      else if (type === "career") await authService.deleteCareer(id);
      toast.success("Deleted!");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const getSubTabData = () => {
    if (activeSubTab === "Banner") return careerBanners;
    if (activeSubTab === "Law Students") return careerLaws;
    if (activeSubTab === "Attorneys") return careerAttorneys;
    if (activeSubTab === "Professional Staff") return careerProfessionals;
    return [];
  };

  return (
    <Container fluid className="p-2 p-md-4 bg-light-gray min-vh-100">
      <ToastContainer theme="colored" />
      <h2 className="fw-bold text-blue mb-4">Career Management CMS</h2>

      <Nav tabs className="border-0 mb-4 overflow-auto flex-nowrap custom-nav">
        {[
          "Law Categories",
          "Career Front",
          "Career Details",
          "Job Categories",
          "Active Jobs",
        ].map((label, i) => (
          <NavItem key={i}>
            <NavLink
              className={`border-0 fw-bold px-3 py-2 cursor-pointer ${activeTab === `${i + 1}` ? "active" : "text-muted"}`}
              onClick={() => setActiveTab(`${i + 1}`)}>
              {label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* TAB 1: LAW CATEGORIES */}
        <TabPane tabId="1">
          <Button
            className="btn-primary-custom mb-3 px-4 py-2"
            onClick={() => toggleModal("lawCat")}>
            + Add Law Category
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0 text-center">
              <thead className="table-dark-custom">
                <tr>
                  <th>S.NO</th>
                  <th>NAME</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {lawCategories.map((item, index) => (
                  <tr key={getItemId(item)}>
                    <td>{index + 1}</td>
                    <td className="fw-bold text-gold">{item.name}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("lawCat", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("lawCat", getItemId(item))}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>

        {/* TAB 2: CAREER FRONT */}
        <TabPane tabId="2">
          <Nav pills className="mb-3 bg-white p-2 rounded border shadow-sm">
            {["Banner", "Law Students", "Attorneys", "Professional Staff"].map(
              (sub) => (
                <NavItem key={sub}>
                  <NavLink
                    className={`cursor-pointer px-4 py-2 border-0 fw-bold ${activeSubTab === sub ? "active text-white" : "text-muted"}`}
                    style={{
                      backgroundColor:
                        activeSubTab === sub ? "#7b4433" : "transparent",
                    }}
                    onClick={() => setActiveSubTab(sub)}>
                    {sub}
                  </NavLink>
                </NavItem>
              ),
            )}
          </Nav>
          <Button
            className="btn-primary-custom mb-3 px-4 py-2"
            onClick={() => toggleModal("front")}>
            + Add {activeSubTab}
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>S.NO</th>
                  <th>IMAGE</th>
                  <th>SECTION</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {getSubTabData().map((item, index) => (
                  <tr key={getItemId(item)}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={authService.getImgUrl(
                          item.bannerImage || item.image || item.banner,
                        )}
                        width="60"
                        height="40"
                        style={{ objectFit: "cover" }}
                        className="rounded border"
                        alt="career"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA2MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjMwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OSI+SW1nPC90ZXh0Pgo8L3N2Zz4=";
                        }}
                      />
                    </td>
                    <td className="fw-bold text-blue">{activeSubTab}</td>
                    <td>{truncateText(item.content)}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("front", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("front", getItemId(item))}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>

        {/* TAB 3: CAREER DETAILS */}
        <TabPane tabId="3">
          <Button
            className="btn-primary-custom mb-3 px-4 py-2"
            onClick={() => toggleModal("detail")}>
            + Add Detail
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>S.NO</th>
                  <th>IMAGE</th>
                  <th>BANNER TEXT</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {careerDetails.map((item, index) => (
                  <tr key={getItemId(item)}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={authService.getImgUrl(item.bannerImage)}
                        width="60"
                        height="40"
                        style={{ objectFit: "cover" }}
                        className="rounded border"
                        alt=""
                      />
                    </td>
                    <td>{truncateText(item.bannerText)}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("detail", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("detail", getItemId(item))}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>

        {/* TAB 4: JOB CATEGORIES */}
        <TabPane tabId="4">
          <Button
            className="btn-primary-custom mb-3 px-4 py-2"
            onClick={() => toggleModal("jobCat")}>
            + Add Job Category
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>S.NO</th>
                  <th>JOB CATEGORY</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {jobCategories.map((item, index) => (
                  <tr key={getItemId(item)}>
                    <td>{index + 1}</td>
                    <td className="fw-bold text-gold">
                      {item.jobCategory || item.name}
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("jobCat", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("jobCat", getItemId(item))}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>

        {/* TAB 5: ACTIVE JOBS */}
        <TabPane tabId="5">
          <Button
            className="btn-primary-custom mb-3 px-4 py-2"
            onClick={() => toggleModal("career")}>
            + Post Job
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>S.NO</th>
                  <th>TITLE</th>
                  <th>CODE</th>
                  <th>LOCATION</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((item, index) => (
                  <tr key={getItemId(item)}>
                    <td>{index + 1}</td>
                    <td className="fw-bold">{item.jobTitle}</td>
                    <td>{item.jobCode}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {item.location}
                      </span>
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("career", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("career", getItemId(item))}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>
      </TabContent>

      <Modal
        isOpen={modal.open}
        toggle={() => toggleModal()}
        size="lg"
        centered>
        <ModalHeader className="border-0 text-blue fw-bold">
          {modal.edit ? "Edit" : "Add"}{" "}
          {modal.type === "front" ? activeSubTab : modal.type}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAction}>
            {modal.type === "lawCat" && (
              <FormGroup>
                <Label>Category Name *</Label>
                <Input
                  type="select"
                  value={lawCatForm.name}
                  onChange={(e) => setLawCatForm({ name: e.target.value })}
                  required>
                  <option value="">-- Select --</option>
                  <option value="Law Students">Law Students</option>
                  <option value="Attorneys">Attorneys</option>
                  <option value="Professional Staff">Professional Staff</option>
                </Input>
              </FormGroup>
            )}
            {modal.type === "jobCat" && (
              <FormGroup>
                <Label>Job Category Name *</Label>
                <Input
                  value={jobCatForm.jobCategory}
                  onChange={(e) =>
                    setJobCatForm({ jobCategory: e.target.value })
                  }
                  required
                />
              </FormGroup>
            )}
            {modal.type === "detail" && (
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Banner Text *</Label>
                    <Input
                      value={detailForm.bannerText}
                      onChange={(e) =>
                        setDetailForm({
                          ...detailForm,
                          bannerText: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Description *</Label>
                    <ReactQuill
                      theme="snow"
                      value={detailForm.description}
                      onChange={(v) =>
                        setDetailForm({ ...detailForm, description: v })
                      }
                      style={{ height: "150px", marginBottom: "50px" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Banner Image</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setDetailForm({
                          ...detailForm,
                          bannerImage: e.target.files[0],
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            {modal.type === "front" && (
              <Row>
                {activeSubTab !== "Banner" && (
                  <Col md={12}>
                    <FormGroup>
                      <Label>Select Country *</Label>
                      <Input
                        type="select"
                        value={frontForm.countryId}
                        onChange={(e) =>
                          setFrontForm({
                            ...frontForm,
                            countryId: e.target.value,
                          })
                        }
                        required>
                        <option value="">-- Select Country --</option>
                        {countries.map((c) => (
                          <option key={getItemId(c)} value={getItemId(c)}>
                            {c.name || c.countryName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                )}
                <Col md={12}>
                  <FormGroup>
                    <Label>Content *</Label>
                    <ReactQuill
                      theme="snow"
                      value={frontForm.bannerText}
                      onChange={(v) =>
                        setFrontForm({ ...frontForm, bannerText: v })
                      }
                      style={{ height: "150px", marginBottom: "50px" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          bannerImage: e.target.files[0],
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            {modal.type === "career" && (
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Job Title *</Label>
                    <Input
                      value={careerForm.jobTitle}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          jobTitle: e.target.value,
                        })
                      }
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Job Code</Label>
                    <Input
                      value={careerForm.jobCode}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          jobCode: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Job Category *</Label>
                    <Input
                      type="select"
                      value={careerForm.jobCategoryId}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          jobCategoryId: e.target.value,
                        })
                      }
                      required>
                      <option value="">Select Category</option>
                      {jobCategories.map((c) => (
                        <option key={getItemId(c)} value={getItemId(c)}>
                          {c.jobCategory || c.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Law Category *</Label>
                    <Input
                      type="select"
                      value={careerForm.lawCareerCategoryId}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          lawCareerCategoryId: e.target.value,
                        })
                      }
                      required>
                      <option value="">Select Law Category</option>
                      {lawCategories.map((c) => (
                        <option key={getItemId(c)} value={getItemId(c)}>
                          {c.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Description *</Label>
                    <ReactQuill
                      theme="snow"
                      value={careerForm.textEditor}
                      onChange={(v) =>
                        setCareerForm({ ...careerForm, textEditor: v })
                      }
                      style={{ height: "150px", marginBottom: "50px" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            <Button
              className="btn-primary-custom w-100 mt-4 py-2 fw-bold"
              type="submit"
              disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <style jsx global>{`
        .custom-nav::-webkit-scrollbar {
          display: none;
        }
        .nav-link {
          color: black !important;
          white-space: nowrap;
          cursor: pointer;
        }
        .nav-link.active {
          color: #c5a059 !important;
          border-bottom: 2px solid #c5a059 !important;
          font-weight: 700;
        }
        .btn-primary-custom {
          background-color: #7b4433;
          border: none;
          color: white;
          border-radius: 4px;
          font-weight: 600;
        }
        .text-blue {
          color: #003366;
        }
        .text-gold {
          color: #c5a059;
        }
        .table-dark-custom th {
          font-weight: 700;
          color: #333;
          font-size: 13px;
          text-transform: uppercase;
          background: #f8f9fa;
        }
        .card-shadow {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </Container>
  );
};

export default AdminCareerManagement;
