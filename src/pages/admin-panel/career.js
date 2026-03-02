

import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Badge,
} from "reactstrap";
import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";
import "react-quill-new/dist/quill.snow.css";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Careers = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [careerList, setCareerList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCode: "",
    address: "",
    location: "", // Must be ENUM: Onsite, Hybrid, Remote, All
    jobType: "", // Must be ENUM: FullTime, PartTime
    textEditor: "",
    bannerImage: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await authService.getAllCareers();
    if (res.success) {
      setCareerList(res.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFormData({
        jobTitle: "",
        jobCode: "",
        address: "",
        location: "",
        jobType: "",
        textEditor: "",
        bannerImage: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   // Retrieve the dynamic Admin ID from localStorage
   const currentAdminId = authService.getAdminId();

   if (!currentAdminId) {
     alert("Session expired. Please login again.");
     return;
   }

   setLoading(true);
   try {
     const dataToSend = new FormData();

     // Use the dynamic ID instead of hardcoded "1"
     dataToSend.append("adminId", currentAdminId);
     dataToSend.append("jobTitle", formData.jobTitle.trim());
     dataToSend.append("jobCode", formData.jobCode.trim());
     dataToSend.append("address", formData.address.trim());
     dataToSend.append("location", formData.location);
     dataToSend.append("jobType", formData.jobType);
     dataToSend.append("textEditor", formData.textEditor);

     if (formData.bannerImage instanceof File) {
       dataToSend.append("bannerImage", formData.bannerImage);
     }

     const res = isEditing
       ? await authService.updateCareer(currentId, dataToSend)
       : await authService.createCareer(dataToSend);

     if (res.success) {
       toggle();
       fetchData();
     } else {
       alert("Error: " + (res.message || "Failed to process request"));
     }
   } catch (err) {
     console.error("❌ Submit error:", err);
   } finally {
     setLoading(false);
   }
 };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job post?")) return;
    const res = await authService.deleteCareer(id);
    if (res.success) fetchData();
  };

  const handleEdit = (item) => {
    setFormData({
      jobTitle: item.jobTitle || "",
      jobCode: item.jobCode || "",
      address: item.address || "",
      location: item.location || "",
      jobType: item.jobType || "",
      textEditor: item.textEditor || "",
      bannerImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const currentItems = careerList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Career Management</h4>
        <Button
          style={{ backgroundColor: GOLD, border: "none" }}
          onClick={toggle}>
          + Add Job Post
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <Table hover className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4">SR.</th>
                <th>BANNER</th>
                <th>JOB TITLE</th>
                <th>LOCATION</th>
                <th>TYPE</th>
                <th className="text-end px-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td>
                    <img
                      src={
                        item.bannerImage
                          ? authService.getImgUrl(item.bannerImage)
                          : "https://placehold.co/70x45"
                      }
                      alt="job"
                      width="70"
                      className="rounded border"
                    />
                  </td>
                  <td>
                    <div className="fw-bold">{item.jobTitle}</div>
                    <small className="text-muted">{item.jobCode}</small>
                  </td>
                  <td>
                    <Badge color="secondary" outline>
                      {item.location}
                    </Badge>
                  </td>
                  <td>
                    <Badge color="warning" outline>
                      {item.jobType}
                    </Badge>
                  </td>
                  <td className="text-end px-4">
                    <Button
                      size="sm"
                      color="light"
                      className="border me-2"
                      onClick={() => handleEdit(item)}>
                      ✏️
                    </Button>
                    <Button
                      size="sm"
                      color="light"
                      className="text-danger border"
                      onClick={() => handleDelete(item.id)}>
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent
          totalItems={careerList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle} style={{ color: GOLD }}>
          {isEditing ? "Edit Career" : "New Career"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Job Title *</Label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Job Code *</Label>
                  <Input
                    value={formData.jobCode}
                    onChange={(e) =>
                      setFormData({ ...formData, jobCode: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Location Type *</Label>
                  <Input
                    type="select"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required>
                    <option value="">-- Select --</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="All">All</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Job Type *</Label>
                  <Input
                    type="select"
                    value={formData.jobType}
                    onChange={(e) =>
                      setFormData({ ...formData, jobType: e.target.value })
                    }
                    required>
                    <option value="">-- Select --</option>
                    <option value="FullTime">Full Time</option>
                    <option value="PartTime">Part Time</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label className="small fw-bold">Office Address *</Label>
                  <Input
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label className="small fw-bold">
                    Banner Image {isEditing ? "(Optional)" : "*"}
                  </Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bannerImage: e.target.files[0],
                      })
                    }
                    accept="image/*"
                    required={!isEditing}
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label className="small fw-bold">Description *</Label>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={formData.textEditor}
                    onChange={(val) =>
                      setFormData({ ...formData, textEditor: val })
                    }
                    style={{ height: "200px", marginBottom: "50px" }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="mt-4">
              <Button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: GOLD, border: "none", color: "#fff" }}
                className="px-5">
                {loading
                  ? "Processing..."
                  : isEditing
                    ? "Update Job"
                    : "Publish Job"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Careers;