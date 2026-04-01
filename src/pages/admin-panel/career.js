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
  FormText,
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
  const [careerFronts, setCareerFronts] = useState([]);
  const [careerBanners, setCareerBanners] = useState([]);
  const [careerDetails, setCareerDetails] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [careers, setCareers] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    edit: false,
    id: null,
  });

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

  const getCatName = (id) => {
    const cat = lawCategories.find((c) => getItemId(c) == id);
    return cat ? cat.name : "";
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        lawRes,
        frontRes,
        detailRes,
        jobCatRes,
        careerRes,
        countryRes,
        cityRes,
        bannerRes,
      ] = await Promise.all([
        authService.getAllLawCareerCategories(),
        authService.getAllCareerFront(),
        authService.getAllCareerDetails(),
        authService.getAllJobCategories(),
        authService.getAllCareers(),
        authService.getAllCountries(),
        authService.getAllCities(),
        authService.getAllCareerBanners(),
      ]);

      const extract = (res) => {
        if (Array.isArray(res)) return res;
        return res?.jobs || res?.data?.data || res?.data || [];
      };

      // SORTING: Ascending (1, 2, 3...)
      const sortAsc = (arr) =>
        [...extract(arr)].sort((a, b) => getItemId(a) - getItemId(b));

      setLawCategories(sortAsc(lawRes));
      setCareerFronts(sortAsc(frontRes));
      setCareerDetails(sortAsc(detailRes));
      setJobCategories(sortAsc(jobCatRes));
      setCareers(sortAsc(careerRes));
      setCountries(extract(countryRes));
      setCities(extract(cityRes));
      setCareerBanners(sortAsc(bannerRes));
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const resetForms = () => {
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
  };

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
        setJobCatForm({ jobCategory: data.jobCategory || "" });
      else if (type === "detail")
        setDetailForm({
          bannerText: data.bannerText || "",
          description: data.description || "",
          bannerImage: data.bannerImage,
        });
      else if (type === "front")
        setFrontForm({
          categoryId: data.categoryId || "",
          bannerText: data.content || data.bannerText || "",
          countryId: data.countryId || "",
          bannerImage: data.bannerImage,
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
      resetForms();
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

      if (modal.type === "front" && activeSubTab === "Banner") {
        fd.append("content", frontForm.bannerText);
        if (frontForm.bannerImage instanceof File)
          fd.append("bannerImage", frontForm.bannerImage);
        res = modal.edit
          ? await authService.updateCareerBanner(id, fd)
          : await authService.createCareerBanner(fd);
      } else if (modal.type === "front") {
        fd.append("categoryId", frontForm.categoryId);
        fd.append("countryId", frontForm.countryId);
        fd.append("bannerText", frontForm.bannerText);
        if (frontForm.bannerImage instanceof File)
          fd.append("bannerImage", frontForm.bannerImage);
        res = modal.edit
          ? await authService.updateCareerFront(id, fd)
          : await authService.createCareerFront(fd);
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
        toast.success("Success!");
        toggleModal();
        fetchData();
      }
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      if (type === "Banner") await authService.deleteCareerBanner(id);
      else if (type === "front") await authService.deleteCareerFront(id);
      else if (type === "lawCat") await authService.deleteLawCareerCategory(id);
      else if (type === "jobCat") await authService.deleteJobCategory(id);
      else if (type === "detail") await authService.deleteCareerDetail(id);
      else if (type === "career") await authService.deleteCareer(id);
      toast.success("Deleted!");
      fetchData();
    } catch (error) {
      toast.error("Delete failed");
    }
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
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {lawCategories.map((item) => (
                  <tr key={getItemId(item)}>
                    <td>{getItemId(item)}</td>
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
                  <th>IMAGE</th>
                  <th>SECTION</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {(activeSubTab === "Banner"
                  ? careerBanners
                  : careerFronts.filter(
                      (item) => getCatName(item.categoryId) === activeSubTab,
                    )
                ).map((item) => (
                  <tr key={getItemId(item)}>
                    <td>
                      <img
                        src={authService.getImgUrl(item.bannerImage)}
                        width="60"
                        className="rounded border"
                        alt=""
                      />
                    </td>
                    <td className="fw-bold text-blue">{activeSubTab}</td>
                    <td>{truncateText(item.content || item.bannerText)}</td>
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
                        onClick={() =>
                          handleDelete(
                            activeSubTab === "Banner" ? "Banner" : "front",
                            getItemId(item),
                          )
                        }>
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
                  <th>IMAGE</th>
                  <th>BANNER TEXT</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {careerDetails.map((item) => (
                  <tr key={getItemId(item)}>
                    <td>
                      <img
                        src={authService.getImgUrl(item.bannerImage)}
                        width="60"
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
                  <th>ID</th>
                  <th>JOB CATEGORY</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {jobCategories.map((item) => (
                  <tr key={getItemId(item)}>
                    <td>{getItemId(item)}</td>
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
                  <th>TITLE</th>
                  <th>CODE</th>
                  <th>LOCATION</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((item) => (
                  <tr key={getItemId(item)}>
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
          {modal.edit ? "Edit" : "Add"} {modal.type}
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
                    <Label>Banner Image</Label>
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
