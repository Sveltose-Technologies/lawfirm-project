


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

  // --- DATA STATES ---
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [lawCategories, setLawCategories] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [careers, setCareers] = useState([]);
  const [careerBanners, setCareerBanners] = useState([]);
  const [careerLaws, setCareerLaws] = useState([]);
  const [careerAttorneys, setCareerAttorneys] = useState([]);
  const [careerProfessionals, setCareerProfessionals] = useState([]);
  const [careerDetails, setCareerDetails] = useState([]);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    edit: false,
    id: null,
  });

  // --- FORM STATES ---
  const [lawCatForm, setLawCatForm] = useState({ name: "" });
  const [jobCatForm, setJobCatForm] = useState({ jobCategory: "" });
  const [detailForm, setDetailForm] = useState({
    cityId: "",
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
    skills: "",
    education: "",
    technology: "",
  });

  const getItemId = (item) => item?.id || item?._id;

  const truncateWords = (text, limit) => {
    if (!text) return "N/N";
    const plainText = text.replace(/<[^>]*>/g, "");
    const words = plainText.split(/\s+/);
    return words.length <= limit
      ? plainText
      : words.slice(0, limit).join(" ") + "...";
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const extract = (res) => {
        const data =
          res?.data?.data || res?.data || res?.value?.data || res?.value || [];
        return Array.isArray(data) ? data : [];
      };

      const [law, cLaw, cAt, cPr, det, jCat, car, coun, ban, cty] =
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
          authService.getAllCities(),
        ]);

      if (law.status === "fulfilled") setLawCategories(extract(law.value));
      if (cLaw.status === "fulfilled") setCareerLaws(extract(cLaw.value));
      if (cAt.status === "fulfilled") setCareerAttorneys(extract(cAt.value));
      if (cPr.status === "fulfilled")
        setCareerProfessionals(extract(cPr.value));
      if (det.status === "fulfilled") setCareerDetails(extract(det.value));
      if (jCat.status === "fulfilled") setJobCategories(extract(jCat.value));
      if (car.status === "fulfilled") setCareers(extract(car.value));
      if (coun.status === "fulfilled") setCountries(extract(coun.value));
      if (ban.status === "fulfilled") setCareerBanners(extract(ban.value));
      if (cty.status === "fulfilled") setCities(extract(cty.value));
    } catch (error) {
      toast.error("Failed to load data");
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
          cityId: data.cityId || "",
          bannerText: data.bannerText || "",
          description: data.description || "",
          bannerImage: null,
        });
      else if (type === "front")
        setFrontForm({
          categoryId: data.categoryid || data.categoryId || "",
          bannerText: data.content || data.bannerText || "",
          countryId: data.countryId || "",
          bannerImage: null,
        });
      else if (type === "career") {
        setCareerForm({
          jobTitle: data.jobTitle || "",
          jobCode: data.jobCode || "",
          jobCategoryId: Array.isArray(data.jobCategoryId)
            ? data.jobCategoryId[0]
            : data.jobCategoryId || "",
          lawCareerCategoryId: data.lawCareerCategoryId || "",
          countryId: data.countryId || "",
          cityId: data.cityId || "",
          address: data.address || "",
          location: data.location || "Onsite",
          jobType: data.jobType || "FullTime",
          textEditor: data.textEditor || "",
          skills: data.skills || "",
          education: data.education || "",
          technology: data.technology || "",
        });
      }
    } else {
      setLawCatForm({ name: "" });
      setJobCatForm({ jobCategory: "" });
      setDetailForm({
        cityId: "",
        bannerText: "",
        description: "",
        bannerImage: null,
      });
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
        skills: "",
        education: "",
        technology: "",
      });
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const id = modal.id;
      const fd = new FormData();
      let res;

      if (modal.type === "career") {
        const payload = {
          ...careerForm,
          jobCategoryId: [Number(careerForm.jobCategoryId)],
        };
        res = modal.edit
          ? await authService.updateCareer(id, payload)
          : await authService.createCareer(payload);
      } else if (modal.type === "front") {
        fd.append("content", frontForm.bannerText || "");
        if (activeSubTab === "Banner") {
          if (frontForm.bannerImage)
            fd.append("bannerImage", frontForm.bannerImage);
          res = modal.edit
            ? await authService.updateCareerBanner(id, fd)
            : await authService.createCareerBanner(fd);
        } else {
          fd.append("countryId", frontForm.countryId);
          fd.append("categoryid", frontForm.categoryId);
          if (frontForm.bannerImage) fd.append("image", frontForm.bannerImage);
          if (activeSubTab === "Law Students")
            res = modal.edit
              ? await authService.updateCareerLaw(id, fd)
              : await authService.createCareerLaw(fd);
          else if (activeSubTab === "Attorneys")
            res = modal.edit
              ? await authService.updateCareerAttorney(id, fd)
              : await authService.createCareerAttorney(fd);
          else if (activeSubTab === "Professional Staff")
            res = modal.edit
              ? await authService.updateCareerProfessional(id, fd)
              : await authService.createCareerProfessional(fd);
        }
      } else if (modal.type === "detail") {
       
        fd.append("bannerText", detailForm.bannerText);
        fd.append("description", detailForm.description);
        if (detailForm.bannerImage)
          fd.append("bannerImage", detailForm.bannerImage);
        res = modal.edit
          ? await authService.updateCareerDetail(id, fd)
          : await authService.createCareerDetail(fd);
      } else if (modal.type === "lawCat") {
        res = modal.edit
          ? await authService.updateLawCareerCategory(id, lawCatForm)
          : await authService.createLawCareerCategory(lawCatForm);
      } else if (modal.type === "jobCat") {
        res = modal.edit
          ? await authService.updateJobCategory(id, jobCatForm)
          : await authService.createJobCategory(jobCatForm);
      }

      toast.success("Saved Successfully!");
      toggleModal();
      fetchData();
    } catch (error) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      if (type === "career") await authService.deleteCareer(id);
      else if (type === "lawCat") await authService.deleteLawCareerCategory(id);
      else if (type === "jobCat") await authService.deleteJobCategory(id);
      else if (type === "detail") await authService.deleteCareerDetail(id);
      else if (type === "front") {
        if (activeSubTab === "Banner") await authService.deleteCareerBanner(id);
        else if (activeSubTab === "Law Students")
          await authService.deleteCareerLaw(id);
        else if (activeSubTab === "Attorneys")
          await authService.deleteCareerAttorney(id);
        else await authService.deleteCareerProfessional(id);
      }
      toast.success("Deleted!");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Container fluid className="p-2 p-md-4 bg-light min-vh-100">
      <ToastContainer theme="colored" />
      <h2 className="fw-bold text-dark mb-4">Career Management CMS</h2>

      <Nav tabs className="mb-4 custom-nav border-0">
        {[
          "Law Categories",
          "Career Front",
          "Career Details",
          "Job Categories",
          "Career Page",
        ].map((l, i) => (
          <NavItem key={i}>
            <NavLink
              className={`cursor-pointer ${activeTab === `${i + 1}` ? "active fw-bold text-primary" : ""}`}
              onClick={() => setActiveTab(`${i + 1}`)}>
              {l}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* Tab 1: Law Categories */}
        <TabPane tabId="1">
          <Button
            className="btn-primary-custom mb-3"
            onClick={() => toggleModal("lawCat")}>
            + Add Law Category
          </Button>
          <Card className="border-0 shadow-sm">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
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
                    <td className="fw-bold">{item.name}</td>
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

        {/* Tab 2: Career Front */}
        <TabPane tabId="2">
          <Nav
            pills
            className="mb-3 bg-white p-1 rounded border shadow-sm w-fit">
            {["Banner", "Law Students", "Attorneys", "Professional Staff"].map(
              (sub) => (
                <NavItem key={sub}>
                  <NavLink
                    className={`cursor-pointer px-3 ${activeSubTab === sub ? "active-pill" : "text-muted"}`}
                    onClick={() => setActiveSubTab(sub)}>
                    {sub}
                  </NavLink>
                </NavItem>
              ),
            )}
          </Nav>
          <Button
            className="btn-primary-custom mb-3"
            onClick={() => toggleModal("front")}>
            + Add {activeSubTab}
          </Button>
          <Card className="border-0 shadow-sm">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>S.NO</th>
                  <th>IMAGE</th>
                  <th>SECTION</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {(activeSubTab === "Banner"
                  ? careerBanners
                  : activeSubTab === "Law Students"
                    ? careerLaws
                    : activeSubTab === "Attorneys"
                      ? careerAttorneys
                      : careerProfessionals
                ).map((item, index) => (
                  <tr key={getItemId(item)}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={authService.getImgUrl(
                          item.bannerImage || item.image || item.banner,
                        )}
                        width="50"
                        height="35"
                        className="rounded border"
                        alt=""
                      />
                    </td>
                    <td className="fw-bold">{activeSubTab}</td>
                    <td>{truncateWords(item.content || item.bannerText, 5)}</td>
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

        {/* Tab 3: Career Details */}
        <TabPane tabId="3">
          <Button
            className="btn-primary-custom mb-3"
            onClick={() => toggleModal("detail")}>
            + Add Career Detail
          </Button>
          <Card className="border-0 shadow-sm">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
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
                        width="50"
                        height="35"
                        className="rounded"
                        alt=""
                      />
                    </td>
                 
                    <td>{truncateWords(item.bannerText, 5)}</td>
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

        {/* Tab 4: Job Categories */}
        <TabPane tabId="4">
          <Button
            className="btn-primary-custom mb-3"
            onClick={() => toggleModal("jobCat")}>
            + Add Job Category
          </Button>
          <Card className="border-0 shadow-sm">
            <Table hover responsive className="mb-0">
              <thead className="table-light">
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
                    <td className="fw-bold text-warning">
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

        {/* Tab 5: Career Page */}
        <TabPane tabId="5">
          <Button
            className="btn-primary-custom mb-3 w-100"
            onClick={() => toggleModal("career")}>
            + Post Job
          </Button>
          <Card className="border-0 shadow-sm">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>TITLE</th>
                  <th>CODE</th>
                  <th>CATEGORY</th>
                  <th>COUNTRY</th>
                  <th>CITY</th>
                  <th>MODE</th>
                  <th>TYPE</th>
                  <th className="text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((item) => (
                  <tr key={getItemId(item)}>
                    <td className="fw-bold">{item.jobTitle}</td>
                    <td>{item.jobCode}</td>
                    <td>
                      {jobCategories.find(
                        (c) =>
                          getItemId(c) ==
                          (Array.isArray(item.jobCategoryId)
                            ? item.jobCategoryId[0]
                            : item.jobCategoryId),
                      )?.jobCategory || "N/A"}
                    </td>
                    <td>
                      {countries.find((c) => getItemId(c) == item.countryId)
                        ?.countryName || "N/A"}
                    </td>
                    <td>
                      {cities.find((c) => getItemId(c) == item.cityId)
                        ?.cityName || "N/A"}
                    </td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {item.location}
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold small">{item.jobType}</span>
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
        <ModalHeader className="border-0">
          {modal.edit ? "Edit" : "Add"} {modal.type}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAction}>
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
                   
                   
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Job Code *</Label>
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
                      <option value="">Select</option>
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
                      <option value="">Select</option>
                      {lawCategories.map((c) => (
                        <option key={getItemId(c)} value={getItemId(c)}>
                          {c.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                {/* Country Dropdown */}
                <Col md={6}>
                  <FormGroup>
                    <Label className="fw-bold">Country *</Label>
                    <Input
                      type="select"
                      value={careerForm.countryId}
                      onChange={(e) => {
                        // When country changes, update countryId and RESET cityId to empty
                        setCareerForm({
                          ...careerForm,
                          countryId: e.target.value,
                          cityId: "",
                        });
                      }}
                      >
                      <option value="">-- Select Country --</option>
                      {countries.map((c) => (
                        <option key={getItemId(c)} value={getItemId(c)}>
                          {c.countryName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>

                {/* Filtered City Dropdown */}
                <Col md={6}>
                  <FormGroup>
                    <Label className="fw-bold">City *</Label>
                    <Input
                      type="select"
                      value={careerForm.cityId}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, cityId: e.target.value })
                      }
                      
                      disabled={!careerForm.countryId} // Disable if no country is selected
                    >
                      <option value="">
                        {!careerForm.countryId
                          ? "Select Country First"
                          : "-- Select City --"}
                      </option>

                      {/* FILTER LOGIC: Only show cities where countryId matches selection */}
                      {cities
                        .filter(
                          (city) =>
                            String(city.countryId) ===
                            String(careerForm.countryId),
                        )
                        .map((city) => (
                          <option key={getItemId(city)} value={getItemId(city)}>
                            {city.cityName}
                          </option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Address</Label>
                    <Input
                      value={careerForm.address}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          address: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Location Mode</Label>
                    <Input
                      type="select"
                      value={careerForm.location}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          location: e.target.value,
                        })
                      }>
                      <option value="Onsite">Onsite</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Job Type</Label>
                    <Input
                      type="select"
                      value={careerForm.jobType}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          jobType: e.target.value,
                        })
                      }>
                      <option value="FullTime">FullTime</option>
                      <option value="PartTime">PartTime</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Skills</Label>
                    <Input
                      value={careerForm.skills}
                      onChange={(e) =>
                        setCareerForm({ ...careerForm, skills: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Education</Label>
                    <Input
                      value={careerForm.education}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          education: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Technology</Label>
                    <Input
                      value={careerForm.technology}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          technology: e.target.value,
                        })
                      }
                    />
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
            {modal.type === "front" && (
              <Row>
                {activeSubTab !== "Banner" && (
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold">Law Category *</Label>
                      <Input
                        type="select"
                        value={frontForm.categoryId}
                        onChange={(e) =>
                          setFrontForm({
                            ...frontForm,
                            categoryId: e.target.value,
                          })
                        }
                        >
                        <option value="">Select Category</option>
                        {lawCategories.map((c) => (
                          <option key={getItemId(c)} value={getItemId(c)}>
                            {c.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                )}
                {activeSubTab !== "Banner" && (
                  <Col md={6}>
                    <FormGroup>
                      <Label className="fw-bold">Country *</Label>
                      <Input
                        type="select"
                        value={frontForm.countryId}
                        onChange={(e) =>
                          setFrontForm({
                            ...frontForm,
                            countryId: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={getItemId(c)} value={getItemId(c)}>
                            {c.countryName}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                )}
                <Col md={12}>
                  <FormGroup>
                    <Label className="fw-bold">Content (Description) *</Label>
                    {/* WRAPPER DIV TO ENSURE VISIBILITY */}
                    <div style={{ background: "white" }}>
                      <ReactQuill
                        theme="snow"
                        value={frontForm.bannerText || ""}
                        onChange={(v) =>
                          setFrontForm({
                            ...frontForm,
                            bannerText: v,
                          })
                        }
                        placeholder="Write content here..."
                        style={{ height: "200px", marginBottom: "50px" }}
                      />
                    </div>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label className="fw-bold">Upload Image</Label>
                    <Input
                      type="file"
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
            {modal.type === "detail" && (
              <Row>
                
                <Col md={6}>
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
            {modal.type === "lawCat" && (
              <FormGroup>
                <Label>Category Name *</Label>
                <Input
                  value={lawCatForm.name}
                  onChange={(e) => setLawCatForm({ name: e.target.value })}
                  required
                />
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
               
                />
              </FormGroup>
            )}
            <Button
              className="btn-primary-custom w-100 py-2 mt-3 fw-bold"
              type="submit"
              disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <style jsx global>{`
        .cursor-pointer {
          cursor: pointer;
        }
        .nav-link.active {
          color: #0d6efd !important;
          border-bottom: 2px solid #0d6efd !important;
        }
        .btn-primary-custom {
          background-color: #7b4433;
          border: none;
          color: white;
          border-radius: 4px;
          padding: 8px 20px;
          font-weight: 600;
        }
        .active-pill {
          background-color: #7b4433 !important;
          color: white !important;
          border-radius: 4px;
        }
        .w-fit {
          width: fit-content;
        }
      `}</style>
    </Container>
  );
};

export default AdminCareerManagement;