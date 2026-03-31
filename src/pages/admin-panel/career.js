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
  const [loading, setLoading] = useState(false);

  // Data States
  const [lawCategories, setLawCategories] = useState([]);
  const [careerFronts, setCareerFronts] = useState([]);
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
    firstText: "",
    secondText: "",
    thirdText: "",
    countryId: "",
    bannerImage: null,
    firstImage: null,
    secondImage: null,
    thirdImage: null,
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

  // Helper function to truncate text
  const truncateText = (text) => {
    if (!text) return "N/A";
    const plainText = text.replace(/<[^>]*>/g, "");
    const words = plainText.trim().split(/\s+/);
    return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : plainText;
  };

  // Helper to get ID (handles both id and _id)
  const getItemId = (item) => item.id || item._id;

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
      ] = await Promise.all([
        authService.getAllLawCareerCategories(),
        authService.getAllCareerFront(),
        authService.getAllCareerDetails(),
        authService.getAllJobCategories(),
        authService.getAllCareers(),
        authService.getAllCountries(),
        authService.getAllCities(),
      ]);

     const extractData = (response) => {
       // 1. If the response IS the array (Direct)
       if (Array.isArray(response)) return response;

       // 2. Look for common keys: 'jobs', 'data', or 'data.data'
       const result =
         response?.jobs || response?.data?.data || response?.data || [];

       return Array.isArray(result) ? result : [];
     };

      const sortByID = (arr) => {
        if (!Array.isArray(arr)) return [];
        return [...arr].sort(
          (a, b) => (getItemId(a) || 0) - (getItemId(b) || 0),
        );
      };

      setLawCategories(sortByID(extractData(lawRes)));
      setCareerFronts(sortByID(extractData(frontRes)));
      setCareerDetails(sortByID(extractData(detailRes)));
      setJobCategories(sortByID(extractData(jobCatRes)));
      setCareers(sortByID(extractData(careerRes)));
      setCountries(extractData(countryRes));
      setCities(extractData(cityRes));

      console.log("✅ All data fetched successfully");
      console.log("Careers data:", extractData(careerRes)); // Debug careers data
    } catch (error) {
      console.error("❌ Fetch Error:", error);
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
      firstText: "",
      secondText: "",
      thirdText: "",
      countryId: "",
      bannerImage: null,
      firstImage: null,
      secondImage: null,
      thirdImage: null,
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
      if (type === "lawCat") {
        setLawCatForm({ name: data.name || "" });
      } else if (type === "jobCat") {
        setJobCatForm({ jobCategory: data.jobCategory || data.name || "" });
      } else if (type === "detail") {
        setDetailForm({
          bannerText: data.bannerText || "",
          description: data.description || "",
          bannerImage: null,
        });
      } else if (type === "front") {
        setFrontForm({
          categoryId: data.categoryId || "",
          bannerText: data.bannerText || "",
          firstText: data.firstText || "",
          secondText: data.secondText || "",
          thirdText: data.thirdText || "",
          countryId: data.countryId || "",
          bannerImage: null,
          firstImage: null,
          secondImage: null,
          thirdImage: null,
        });
      } else if (type === "career") {
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
      }
    } else {
      resetForms();
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      const id = modal.id;
      if (modal.type === "lawCat") {
        
        const selectedName = lawCatForm.name;

        if (!selectedName) {
          toast.error("Please select a category!");
          setLoading(false);
          return;
        }

        
        const payload = { name: selectedName };

        console.log("🚀 [LawCareer] Sending Payload:", payload);

        res = modal.edit
          ? await authService.updateLawCareerCategory(modal.id, payload)
          : await authService.createLawCareerCategory(payload);
      } else if (modal.type === "jobCat") {
        const payload = {
          jobCategory: jobCatForm.jobCategory.trim(),
        };

        res = modal.edit
          ? await authService.updateJobCategory(id, payload)
          : await authService.createJobCategory(payload);
      } else if (modal.type === "detail") {
        const fd = new FormData();
        fd.append("bannerText", detailForm.bannerText || "");
        fd.append("description", detailForm.description || "");

        if (detailForm.bannerImage && detailForm.bannerImage instanceof File) {
          fd.append("bannerImage", detailForm.bannerImage);
        }

        res = modal.edit
          ? await authService.updateCareerDetail(id, fd)
          : await authService.createCareerDetail(fd);
      } else if (modal.type === "front") {
        const fd = new FormData();

        // Append text fields
        Object.keys(frontForm).forEach((key) => {
          if (typeof frontForm[key] === "string" && frontForm[key]) {
            fd.append(key, frontForm[key]);
          }
        });

        // Append files only if they are valid File objects
        const imageFields = [
          "bannerImage",
          "firstImage",
          "secondImage",
          "thirdImage",
        ];
        imageFields.forEach((field) => {
          if (frontForm[field] && frontForm[field] instanceof File) {
            fd.append(field, frontForm[field]);
          }
        });

        res = modal.edit
          ? await authService.updateCareerFront(id, fd)
          : await authService.createCareerFront(fd);
      } else if (modal.type === "career") {
        res = modal.edit
          ? await authService.updateCareer(id, careerForm)
          : await authService.createCareer(careerForm);
      }

      if (res) {
        toast.success(`${modal.edit ? "Updated" : "Created"} successfully!`);
        toggleModal();
        fetchData();
      }
    } catch (error) {
      console.error("❌ Action Error:", error);
      toast.error(
        `Failed to ${modal.edit ? "update" : "create"}: ${error.message || "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoading(true);

      if (type === "lawCat") await authService.deleteLawCareerCategory(id);
      else if (type === "jobCat") await authService.deleteJobCategory(id);
      else if (type === "detail") await authService.deleteCareerDetail(id);
      else if (type === "front") await authService.deleteCareerFront(id);
      else if (type === "career") await authService.deleteCareer(id);

      toast.success("Deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("❌ Delete Error:", error);
      toast.error(`Failed to delete: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-2 p-md-4 bg-light-gray min-vh-100">
      <ToastContainer theme="colored" />
      <div className="mb-4">
        <h2 className="fw-bold text-blue font-serif">Career Management CMS</h2>
      </div>

      <Nav tabs className="border-0 mb-4 flex-nowrap overflow-auto custom-nav">
        {[
          "Law Categories",
          "Career Front",
          "Career Details",

          "Job Categories",
          "Active Jobs",
        ].map((label, i) => (
          <NavItem key={i}>
            <NavLink
              className={`border-0 fw-bold px-3 py-2 cursor-pointer ${
                activeTab === `${i + 1}` ? "active" : "text-muted"
              }`}
              onClick={() => setActiveTab(`${i + 1}`)}>
              {label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* TAB 1: LAW CATEGORY */}
        <TabPane tabId="1">
          <Button
            className="btn-primary-custom mb-3 w-auto px-4"
            onClick={() => toggleModal("lawCat")}
            disabled={loading}>
            + Add Law Category
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Name</th>
                  <th className="text-end" style={{ width: "120px" }}>
                    Actions
                  </th>
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
                        onClick={() => toggleModal("lawCat", true, item)}
                        disabled={loading}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("lawCat", getItemId(item))}
                        disabled={loading}>
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
          <Button
            className="btn-primary-custom mb-3 w-auto px-4"
            onClick={() => toggleModal("front")}
            disabled={loading}>
            + Add Career Front
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>Image</th>
                  <th>Cat ID</th>
                  <th>Banner Text</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {careerFronts.map((item) => (
                  <tr key={getItemId(item)}>
                    <td>
                      <img
                        src={authService.getImgUrl(item.bannerImage)}
                        width="50"
                        height="40"
                        className="rounded object-fit-cover"
                        alt=""
                      />
                    </td>
                    <td>{item.categoryId}</td>
                    <td>{truncateText(item.bannerText)}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("front", true, item)}
                        disabled={loading}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("front", getItemId(item))}
                        disabled={loading}>
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
            className="btn-primary-custom mb-3 w-auto px-4"
            onClick={() => toggleModal("detail")}
            disabled={loading}>
            + Add Career Detail
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>Image</th>
                  <th>Banner Text</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* TAB 3: CAREER DETAILS Table Row */}
                {careerDetails.map((item) => (
                  <tr key={getItemId(item)}>
                    <td>
                      {item.bannerImage ? (
                        <img
                          src={authService.getImgUrl(item.bannerImage)}
                          width="50"
                          height="40"
                          className="rounded object-fit-cover border"
                          alt="Banner"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/50x40?text=Error";
                          }}
                        />
                      ) : (
                        <div
                          className="rounded bg-secondary d-flex align-items-center justify-content-center text-white"
                          style={{
                            width: "50px",
                            height: "40px",
                            fontSize: "10px",
                          }}>
                          No Img
                        </div>
                      )}
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
            className="btn-primary-custom mb-3 w-auto px-4"
            onClick={() => toggleModal("jobCat")}
            disabled={loading}>
            + Add Job Category
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>Job Category</th>
                  <th className="text-end" style={{ width: "120px" }}>
                    Actions
                  </th>
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
                        onClick={() => toggleModal("jobCat", true, item)}
                        disabled={loading}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("jobCat", getItemId(item))}
                        disabled={loading}>
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
            className="btn-primary-custom mb-3 w-auto px-4"
            onClick={() => toggleModal("career")}
            disabled={loading}>
            + Post New Job
          </Button>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>Job Title</th>
                  <th>Code</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {careers.map((item) => (
                  <tr key={getItemId(item)}>
                    <td className="fw-bold">{truncateText(item.jobTitle)}</td>
                    <td>{item.jobCode}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {item.location}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {item.jobType}
                      </span>
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-1"
                        onClick={() => toggleModal("career", true, item)}
                        disabled={loading}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("career", getItemId(item))}
                        disabled={loading}>
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
          {modal.type === "lawCat"
            ? "Law Category"
            : modal.type === "jobCat"
              ? "Job Category"
              : modal.type === "detail"
                ? "Career Detail"
                : modal.type === "front"
                  ? "Career Front"
                  : "Career"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAction}>
            {/* LAW CATEGORY FORM */}
           
{modal.type === "lawCat" && (
  <Row>
    <Col md={12}>
      <FormGroup>
        <Label>Select Law Category *</Label>
        <Input
          type="select"
          value={lawCatForm.name || ""} 
          onChange={(e) => setLawCatForm({ ...lawCatForm, name: e.target.value })}
          required
        >
          <option value="">-- Select Category --</option>
          <option value="Law Students">Law Students</option>
          <option value="Attorneys">Attorneys</option>
          <option value="Professional Staff">Professional Staff</option>
        </Input>
        <FormText color="muted">
          Note: Backend only accepts these 3 specific categories.
        </FormText>
      </FormGroup>
    </Col>
  </Row>
)}

            {/* JOB CATEGORY FORM */}
            {modal.type === "jobCat" && (
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Job Category Name *</Label>
                    <Input
                      value={jobCatForm.jobCategory}
                      onChange={(e) =>
                        setJobCatForm({
                          ...jobCatForm,
                          jobCategory: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter job category name"
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}

            {/* CAREER DETAIL FORM */}
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
                      placeholder="Enter banner text"
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
                      accept="image/*"
                      onChange={(e) =>
                        setDetailForm({
                          ...detailForm,
                          bannerImage: e.target.files[0],
                        })
                      }
                    />
                    <FormText>
                      Optional. Upload a new image to replace existing one.
                    </FormText>
                  </FormGroup>
                </Col>
              </Row>
            )}

            {/* CAREER FRONT FORM */}
            {modal.type === "front" && (
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Category ID *</Label>
                    <Input
                      type="select"
                      value={frontForm.categoryId}
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          categoryId: e.target.value,
                        })
                      }
                      required>
                      <option value="">Select Category</option>
                      {lawCategories.map((cat) => (
                        <option key={getItemId(cat)} value={getItemId(cat)}>
                          {cat.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Country ID *</Label>
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
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option
                          key={getItemId(country)}
                          value={getItemId(country)}>
                          {country.name || country.countryName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Banner Text *</Label>
                    <Input
                      value={frontForm.bannerText}
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          bannerText: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter banner text"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>First Text</Label>
                    <Input
                      value={frontForm.firstText}
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          firstText: e.target.value,
                        })
                      }
                      placeholder="Enter first text"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Second Text</Label>
                    <Input
                      value={frontForm.secondText}
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          secondText: e.target.value,
                        })
                      }
                      placeholder="Enter second text"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Third Text</Label>
                    <Input
                      value={frontForm.thirdText}
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          thirdText: e.target.value,
                        })
                      }
                      placeholder="Enter third text"
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
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
                    <FormText>Optional. Upload a new banner image.</FormText>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>First Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          firstImage: e.target.files[0],
                        })
                      }
                    />
                    <FormText>Optional. Upload a new first image.</FormText>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Second Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          secondImage: e.target.files[0],
                        })
                      }
                    />
                    <FormText>Optional. Upload a new second image.</FormText>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Third Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFrontForm({
                          ...frontForm,
                          thirdImage: e.target.files[0],
                        })
                      }
                    />
                    <FormText>Optional. Upload a new third image.</FormText>
                  </FormGroup>
                </Col>
              </Row>
            )}

            {/* CAREER FORM */}
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
                      placeholder="Enter job title"
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
                      placeholder="Enter job code"
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
                      <option value="">Select Job Category</option>
                      {jobCategories.map((cat) => (
                        <option key={getItemId(cat)} value={getItemId(cat)}>
                          {cat.jobCategory || cat.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Law Career Category *</Label>
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
                      {lawCategories.map((cat) => (
                        <option key={getItemId(cat)} value={getItemId(cat)}>
                          {cat.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Country *</Label>
                    <Input
                      type="select"
                      value={careerForm.countryId}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          countryId: e.target.value,
                        })
                      }
                      required>
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option
                          key={getItemId(country)}
                          value={getItemId(country)}>
                          {country.name || country.countryName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="select"
                      value={careerForm.cityId}
                      onChange={(e) =>
                        setCareerForm({
                          ...careerForm,
                          cityId: e.target.value,
                        })
                      }>
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={getItemId(city)} value={getItemId(city)}>
                          {city.name || city.cityName}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Location</Label>
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
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
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
                      <option value="FullTime">Full Time</option>
                      <option value="PartTime">Part Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
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
                      placeholder="Enter address"
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <Label>Full Description *</Label>
                  <ReactQuill
                    theme="snow"
                    value={careerForm.textEditor}
                    onChange={(v) =>
                      setCareerForm({ ...careerForm, textEditor: v })
                    }
                    style={{ height: "200px", marginBottom: "50px" }}
                  />
                </Col>
              </Row>
            )}

            <Button
              className="btn-primary-custom w-100 mt-4 py-2"
              type="submit"
              disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>

      <style jsx global>{`
        .custom-nav {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-nav::-webkit-scrollbar {
          display: none;
        }
        .nav-link {
          color: black !important;
          white-space: nowrap;
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
          font-size: 14px;
        }
        .text-blue {
          color: #003366;
        }
        .text-gold {
          color: #c5a059;
        }
        .table-dark-custom {
          background-color: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
        }
        .table-dark-custom th {
          font-weight: 700;
          color: #333;
          font-size: 13px;
          text-transform: uppercase;
        }
        .card-shadow {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .object-fit-cover {
          object-fit: cover;
        }
      `}</style>
    </Container>
  );
};

export default AdminCareerManagement;
