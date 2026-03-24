// "use client";

// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Container,
//   Card,
//   CardBody,
//   Table,
//   Input,
//   Button,
//   Badge,
// } from "reactstrap";
// import { toast } from "react-toastify";
// import * as authService from "../../services/authService";
// import PaginationComponent from "../../context/Pagination";

// const Clients = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

// const fetchUsers = useCallback(async () => {
//   try {
//     const res = await authService.getAllClients();
//     setUsers(res?.clients || []);
//   } catch (err) {
//     // 'err' will now contain the string "Admin access only"
//     toast.error(err);
//   }
// }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this client?")) {
//       try {
//         const res = await authService.deleteClient(id);
//         toast.success(res?.message || "Client deleted successfully");
//         fetchUsers();
//       } catch (err) {
//         toast.error(err || "Failed to delete client");
//       }
//     }
//   };

//   const filteredData = users.filter((u) =>
//     `${u.firstName} ${u.lastName} ${u.email}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase()),
//   );

//   const currentItems = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   return (
//     <Container
//       fluid
//       className="p-3 p-md-4 min-vh-100"
//       style={{ backgroundColor: "#f9f9f9" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h4 className="fw-bold">Client Management</h4>
//         <Badge color="warning" className="px-3 py-2 text-dark">
//           Total: {filteredData.length}
//         </Badge>
//       </div>

//       <Card className="border-0 shadow-sm rounded-4">
//         <CardBody className="p-0">
//           <div className="p-3 border-bottom">
//             <Input
//               placeholder="Search by name or email..."
//               className="rounded-pill bg-light border-0 px-4"
//               style={{ maxWidth: "350px" }}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//           </div>

//           <div className="table-responsive">
//             <Table
//               hover
//               className="align-middle mb-0"
//               style={{ fontSize: "13px" }}>
//               <thead style={{ backgroundColor: "#fdf8ef" }}>
//                 <tr>
//                   <th className="px-4 py-3">SR.</th>
//                   <th className="py-3">NAME</th>
//                   <th className="py-3">EMAIL</th>
//                   <th className="py-3 text-center">STATUS</th>
//                   <th className="py-3 text-end px-4">ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length > 0 ? (
//                   currentItems.map((u, index) => (
//                     <tr key={u.id || index}>
//                       <td className="px-4">
//                         {(currentPage - 1) * itemsPerPage + index + 1}
//                       </td>
//                       <td className="fw-bold text-dark">
//                         {u.firstName} {u.lastName}
//                       </td>
//                       <td className="text-muted">{u.email}</td>
//                       <td className="text-center">
//                         <Badge
//                           pill
//                           color={u.isActive ? "success" : "secondary"}
//                           className="px-2">
//                           {u.isActive ? "Active" : "Inactive"}
//                         </Badge>
//                       </td>
//                       <td className="text-end px-4">
//                         <Button
//                           size="sm"
//                           outline
//                           color="danger"
//                           className="rounded-pill px-3"
//                           onClick={() => handleDelete(u.id)}>
//                           Delete
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-5 text-muted">
//                       No clients found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </CardBody>
//       </Card>

//       <div className="mt-4 d-flex justify-content-center">
//         <PaginationComponent
//           totalItems={filteredData.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </Container>
//   );
// };

// export default Clients;
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

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [uploadFiles, setUploadFiles] = useState({
    profileImage: null,
    kycDocument: null, // KYC download ke liye parameter
  });

  const toggleModal = () => {
    setModal(!modal);
    setUploadFiles({
      profileImage: null,
      kycDocument: null,
    });
  };

  const fetchData = useCallback(async () => {
    try {
      const [clientRes, cityRes, countryRes] = await Promise.all([
        authService.getAllClients(),
        authService.getAllLocationCities(),
        authService.getAllCountries(),
      ]);

      setUsers(clientRes?.clients || clientRes?.data || clientRes || []);
      setCities(cityRes?.data || cityRes || []);
      setCountries(countryRes?.data || countryRes || []);
    } catch (err) {
      toast.error("Failed to load clients data");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleStatus = async (user) => {
    try {
      const newActiveStatus = !user.isActive;
      const formData = new FormData();
      formData.append("isActive", newActiveStatus ? "1" : "0");

      await authService.updateClient(user.id, formData);
      toast.success(`Client is now ${newActiveStatus ? "Active" : "Inactive"}`);
      fetchData();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();

      const updatableFields = [
        "firstName",
        "lastName",
        "email",
        "mobile",
        "street",
        "aptBlock",
        "city",
        "state",
        "country",
        "zipCode",
        "countryCode",
        "dob",
        "password",
      ];

      updatableFields.forEach((key) => {
        const value = editData[key];
        if (value === null || value === undefined) return;

        if (key === "dob" && value) {
          formData.append(key, value.split("T")[0]);
          return;
        }

        formData.append(key, value);
      });

      // Files addition
      Object.keys(uploadFiles).forEach((key) => {
        if (uploadFiles[key] instanceof File) {
          formData.append(key, uploadFiles[key]);
        }
      });

      await authService.updateClient(editData.id, formData);
      toast.success("Client updated successfully");
      toggleModal();
      fetchData();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const openUpdateModal = (user) => {
    setEditData({ ...user });
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setEditData((prev) => ({ ...prev, country: value, city: "" }));
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
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", path.split("/").pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open(authService.getImgUrl(path), "_blank");
    }
  };

  const selectedCountryObj = countries.find(
    (c) => c.countryName === editData.country,
  );
  const filteredCities = selectedCountryObj
    ? cities.filter(
        (city) => Number(city.countryId) === Number(selectedCountryObj.id),
      )
    : [];

  const filteredData = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.mobile}`
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
        <h5 className="fw-bold text-secondary">CLIENT LIST</h5>
        <div className="d-flex gap-2">
          <Input
            placeholder="Search clients..."
            className="bg-light border-0"
            style={{ maxWidth: "300px" }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table hover responsive className="align-middle border-top">
        <thead>
          <tr className="text-secondary small">
            <th>#</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE_NO</th>
            <th>SUCCESS</th>
            <th>PENDING</th>
            <th>ACTIVE</th>
            <th>ADDRESS</th>
            <th className="text-center">STATUS</th>
            <th className="text-end">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((u, i) => (
            <tr key={u.id} style={{ fontSize: "13px" }}>
              <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
              <td>
                <img
                  src={
                    u.profileImage
                      ? authService.getImgUrl(u.profileImage)
                      : "/assets/images/profilepic.png"
                  }
                  className="rounded"
                  width="40"
                  height="40"
                  style={{ objectFit: "cover" }}
                  alt="client"
                />
              </td>
              <td className="fw-bold">
                {u.firstName} {u.lastName}
              </td>
              <td className="text-primary">{u.email}</td>
              <td className="text-muted">
                {u.countryCode} {u.mobile}
              </td>
              <td className="text-center">{u.successCases || 0}</td>
              <td className="text-center">{u.pendingCases || 0}</td>
              <td className="text-center">{u.activeCases || 0}</td>
              <td style={{ maxWidth: "180px" }} className="text-truncate">
                {u.street}, {u.city}
              </td>
              <td className="text-center">
                <Badge
                  color={u.isActive ? "success" : "danger"}
                  pill
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleStatus(u)}>
                  {u.isActive ? "Active" : "Inactive"}
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
                    authService.deleteClient(u.id).then(() => fetchData())
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

      {/* Update Client Modal */}
      <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal} className="fw-bold">
          Update Client Profile
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
                <Label className="small fw-bold">Mobile</Label>
                <Input
                  name="mobile"
                  value={editData.mobile || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Country Code</Label>
                <Input
                  name="countryCode"
                  value={editData.countryCode || ""}
                  onChange={handleInputChange}
                  placeholder="+91"
                />
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
            <Col md={6}>
              <FormGroup>
                <Label className="small fw-bold">Street Address</Label>
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
                <Label className="small fw-bold">City</Label>
                <Input
                  type="select"
                  name="city"
                  value={editData.city || ""}
                  onChange={handleInputChange}
                  disabled={!editData.country}>
                  <option value="">Select City</option>
                  {filteredCities.map((ct) => (
                    <option key={ct.id} value={ct.id}>
                      {ct.cityName}
                    </option>
                  ))}
                </Input>
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
                <Label className="small fw-bold">State</Label>
                <Input
                  name="state"
                  value={editData.state || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label className="small fw-bold">New Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            <Col md={12} className="mt-4 pt-3 border-top">
              <h6 className="fw-bold">Documents</h6>
            </Col>

            <Col md={4}>
              <FormGroup className="p-2 border rounded bg-light">
                <Label className="small fw-bold">Profile Image</Label>
                <Input
                  type="file"
                  name="profileImage"
                  onChange={handleFileChange}
                  className="form-control-sm"
                />
              </FormGroup>
            </Col>

            <Col md={4}>
              <div className="p-2 border rounded bg-light text-center">
                <Label className="small fw-bold text-uppercase d-block">
                  KYC Document
                </Label>
                <Button
                  size="sm"
                  color="dark"
                  className="w-100 mb-2"
                  onClick={() => downloadFile(editData.kycDocument)}>
                  Download KYC
                </Button>
                <Input
                  type="file"
                  name="kycDocument"
                  onChange={handleFileChange}
                  className="form-control-sm"
                />
              </div>
            </Col>
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

export default Clients;