

"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Table,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Label,
  Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";

const Attorney = () => {
  const [attorneys, setAttorneys] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [uploadFiles, setUploadFiles] = useState({
    profileImage: null,
    kycIdentity: null,
    kycAddress: null,
    resume: null,
    barCouncilIndiaId: null,
    barCouncilStateId: null,
  });

  const toggleModal = () => {
    setModal(!modal);
    setUploadFiles({
      profileImage: null,
      kycIdentity: null,
      kycAddress: null,
      resume: null,
      barCouncilIndiaId: null,
      barCouncilStateId: null,
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const [attorneyRes, cityRes, countryRes, catRes] = await Promise.all([
        authService.getAllAttorneys(),
        authService.getAllLocationCities(),
        authService.getAllCountries(),
        authService.getAllCapabilityCategories(),
      ]);

      setAttorneys(
        attorneyRes?.attorneys || attorneyRes?.data || attorneyRes || [],
      );
      setCities(cityRes?.data || cityRes || []);
      setCountries(countryRes?.data || countryRes || []);
      setCategories(catRes?.data || catRes || []);
    } catch (err) {
      toast.error("Failed to load data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleStatus = async (attorney) => {
    try {
      const newStatus = attorney.status === "active" ? "dactive" : "active";

      const formData = new FormData();
      formData.append("status", newStatus);

      formData.append("isActive", newStatus === "active" ? "1" : "0");

      await authService.updateAttorney(attorney.id, formData);
      toast.success(`Attorney is now ${newStatus}`);
      fetchData();
    } catch (err) {
      console.error("Status Toggle Error:", err);
      toast.error("Failed to update status");
    }
  };
const handleUpdateSubmit = async () => {
  try {
    const formData = new FormData();

    // 1. TEXT FIELDS - Include ALL fields from the modal
    const textFields = [
      "firstName",
      "lastName",
      "email",
      "status",
      "dob",
      "language",
      "categoryId",
      "experience",
      "phoneCell",
      "phoneHome",
      "phoneOffice",
      "country",
      "state",
      "city",
      "zipCode",
      "street",
      "aptBlock",
      "education",
      "admission",
      "servicesOffered",
      "barCouncilIndiaNo",
      "barCouncilStateNo",
      "familyLawPractice",
      "familyDetails",
      "linkedin",
      "twitter",
      "facebook",
      "gmail",
      "aboutus",
    ];

    textFields.forEach((key) => {
      if (editData[key] !== undefined && editData[key] !== null) {
        // Convert to string and trim
        formData.append(key, editData[key].toString().trim());
      }
    });

    // 2. FILES - Check for new file uploads
    // profileImage, kycIdentity, kycAddress, resume, barCouncilIndiaId, barCouncilStateId
    Object.keys(uploadFiles).forEach((key) => {
      if (uploadFiles[key] instanceof File) {
        formData.append(key, uploadFiles[key]);
      }
    });

    // 3. SERVICE CALL - Use updateAttorney instead of updateClientProfile
    const res = await authService.updateAttorney(editData.id, formData);

    if (res) {
      toast.success("Attorney updated successfully!");

      toggleModal();
      fetchData(); // Refresh the list
    }
  } catch (err) {
    console.error("Update Error:", err);
    const errorMessage = err.message || "Update failed. Please try again.";
    toast.error(errorMessage);
  }
};

  const openUpdateModal = (attorney) => {
    const langValue = Array.isArray(attorney.language)
      ? attorney.language[0]?.name
      : attorney.language;

    setEditData({ ...attorney, language: langValue });
    toggleModal();
  };
  const selectedCountryObj = countries.find(
    (c) => c.countryName === editData.country,
  );

  const filteredCities = selectedCountryObj
    ? cities.filter(
        (city) => Number(city.countryId) === Number(selectedCountryObj.id),
      )
    : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      // When country changes, reset city to avoid invalid data
      setEditData((prev) => ({
        ...prev,
        country: value,
        city: "",
      }));
    } else {
      setEditData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUploadFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const downloadFile = async (path) => {
    if (!path || path === "null") return toast.error("File not available");

    try {
      const fileUrl = authService.getImgUrl(path);
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;

      const fileName = path.split("/").pop();
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      window.open(authService.getImgUrl(path), "_blank");
    }
  };

  const filteredData = attorneys.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container fluid className="p-4 bg-white min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold text-secondary">ATTORNEY LIST</h5>
        <Input
          placeholder="Search..."
          className="bg-light border-0"
          style={{ maxWidth: "300px" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table hover responsive className="align-middle border-top">
        <thead>
          <tr className="text-secondary small">
            <th>#</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE_NO</th>
            <th>SERVICES</th>
            <th>EXPERIENCE</th>
            <th className="text-center">STATUS</th> {/* Added Header */}
            <th className="text-end">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((u, i) => (
            <tr key={u.id}>
              <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
              <td>
                <img
                  src={
                    u.profileImage
                      ? authService.getImgUrl(u.profileImage)
                      : "/assets/images/placeholder.png"
                  }
                  className="rounded"
                  width="45"
                  height="40"
                  style={{ objectFit: "cover" }}
                  alt="img"
                />
              </td>
              <td className="text-secondary">
                {u.firstName} {u.lastName}
              </td>
              <td className="text-primary small">{u.email}</td>
              <td className="text-muted small">{u.phoneCell || "test"}</td>
              <td className="text-secondary small">
                {u.servicesOffered || "General Law"}
              </td>
              <td className="text-secondary">
                {u.experience
                  ? u.experience.split(" ").slice(0, 3).join(" ") +
                    (u.experience.split(" ").length > 3 ? "..." : "")
                  : "N/A"}
              </td>
              {/* Added Status Column with Click Event */}
              <td className="text-center">
                <Badge
                  color={u.status === "active" ? "success" : "danger"}
                  pill
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleStatus(u)}>
                  {u.status === "active" ? "Active" : "dactive"}
                </Badge>
              </td>
              <td className="text-end">
                <Button
                  outline
                  color="warning"
                  className="rounded-circle me-2 p-1"
                  style={{ width: "32px", height: "32px" }}
                  onClick={() => openUpdateModal(u)}>
                  <i className="bi bi-pencil-fill small"></i>
                </Button>
                <Button
                  outline
                  color="danger"
                  className="rounded-circle p-1"
                  style={{ width: "32px", height: "32px" }}
                  onClick={() =>
                    authService.deleteAttorney(u.id).then(() => fetchData())
                  }>
                  <i className="bi bi-x-lg small"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <PaginationComponent
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal} className="fw-bold">
          Update Attorney Profile
        </ModalHeader>
        <ModalBody className="p-4">
          <Row className="g-3">
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">First Name</Label>
                <Input
                  name="firstName"
                  value={editData.firstName || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Last Name</Label>
                <Input
                  name="lastName"
                  value={editData.lastName || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Email</Label>
                <Input
                  name="email"
                  value={editData.email || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Status</Label>
                <Input
                  type="select"
                  name="status"
                  value={editData.status || ""}
                  onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="dactive">Dactive</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">DOB</Label>
                <Input
                  type="date"
                  name="dob"
                  value={editData.dob ? editData.dob.split("T")[0] : ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Language</Label>
                <Input
                  name="language"
                  value={editData.language || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Category</Label>
                <Input
                  type="select"
                  name="categoryId"
                  value={editData.categoryId || ""}
                  onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Experience (Yrs)</Label>
                <Input
                  name="experience"
                  value={editData.experience || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Phone (Cell)</Label>
                <Input
                  name="phoneCell"
                  value={editData.phoneCell || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Phone (Home)</Label>
                <Input
                  name="phoneHome"
                  value={editData.phoneHome || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Phone (Office)</Label>
                <Input
                  name="phoneOffice"
                  value={editData.phoneOffice || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Country</Label>
                <Input
                  type="select"
                  name="country"
                  value={editData.country || ""}
                  onChange={handleInputChange}>
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.id} value={c.countryName}>
                      {c.countryName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">State</Label>
                <Input
                  name="state"
                  value={editData.state || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">City</Label>
                <Input
                  type="select"
                  name="city"
                  value={editData.city || ""}
                  onChange={handleInputChange}
                  disabled={!editData.country} // Disable if no country is selected
                >
                  <option value="">Select City</option>
                  {filteredCities.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {ct.cityName}
                    </option>
                  ))}
                </Input>
                {!editData.country && (
                  <small className="text-muted">
                    Please select a country first
                  </small>
                )}
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Zip Code</Label>
                <Input
                  name="zipCode"
                  value={editData.zipCode || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="small fw-bold">Street</Label>
                <Input
                  name="street"
                  value={editData.street || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Apt/Block</Label>
                <Input
                  name="aptBlock"
                  value={editData.aptBlock || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}></Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Education</Label>
                <Input
                  name="education"
                  value={editData.education || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Admission</Label>
                <Input
                  name="admission"
                  value={editData.admission || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Services Offered</Label>
                <Input
                  name="servicesOffered"
                  value={editData.servicesOffered || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="small fw-bold">Bar Council India No</Label>
                <Input
                  name="barCouncilIndiaNo"
                  value={editData.barCouncilIndiaNo || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="small fw-bold">Bar Council State No</Label>
                <Input
                  name="barCouncilStateNo"
                  value={editData.barCouncilStateNo || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Family Law Practice?</Label>
                <Input
                  type="select"
                  name="familyLawPractice"
                  value={editData.familyLawPractice?.toString() || "false"}
                  onChange={handleInputChange}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Label className="small fw-bold">Family Details</Label>
                <Input
                  name="familyDetails"
                  value={editData.familyDetails || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">LinkedIn</Label>
                <Input
                  name="linkedin"
                  value={editData.linkedin || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Twitter</Label>
                <Input
                  name="twitter"
                  value={editData.twitter || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Facebook</Label>
                <Input
                  name="facebook"
                  value={editData.facebook || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Gmail (Social)</Label>
                <Input
                  name="gmail"
                  value={editData.gmail || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label className="small fw-bold">About Us (Bio)</Label>
                <Input
                  type="textarea"
                  name="aboutus"
                  rows="3"
                  value={editData.aboutus || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={12} className="mt-4 pt-3 border-top">
              <h6 className="fw-bold">Media & Documents</h6>
            </Col>
            <Col md={4}>
              <FormGroup className="p-2 border rounded">
                <Label className="small fw-bold">Profile Image</Label>
                <Input
                  type="file"
                  name="profileImage"
                  className="form-control-sm"
                  onChange={handleFileChange}
                />
              </FormGroup>
            </Col>
            {[
              "kycIdentity",
              "kycAddress",
              "resume",
              "barCouncilIndiaId",
              "barCouncilStateId",
            ].map((doc) => (
              <Col md={4} key={doc}>
                <div className="p-3 border rounded bg-light">
                  <Label className="small fw-bold text-uppercase">
                    {doc.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Button
                    size="sm"
                    color="dark"
                    className="d-block w-100 mb-2"
                    onClick={() => downloadFile(editData[doc])}>
                    Download
                  </Button>
                  <Input
                    type="file"
                    name={doc}
                    className="form-control-sm"
                    onChange={handleFileChange}
                  />
                </div>
              </Col>
            ))}
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" outline onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            color="warning"
            className="px-5 fw-bold"
            onClick={handleUpdateSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Attorney;