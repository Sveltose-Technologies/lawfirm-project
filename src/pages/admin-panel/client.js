
// //admin-panel/client.js
// "use client";

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import {
//   Container,
//   Table,
//   Input,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Row,
//   Col,
//   FormGroup,
//   Label,
//   Badge,
// } from "reactstrap";
// import { toast } from "react-toastify";
// import * as authService from "../../services/authService";
// import PaginationComponent from "../../context/Pagination";

// const Clients = () => {
//   const [users, setUsers] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const [modal, setModal] = useState(false);
//   const [editData, setEditData] = useState({});
//   const [uploadFiles, setUploadFiles] = useState({
//     profileImage: null,
//     kycIdentity: null,
//     kycAddress: null,
//   });

//   const toggleModal = () => {
//     setModal(!modal);
//     setUploadFiles({ profileImage: null, kycIdentity: null, kycAddress: null });
//   };

//   const fetchData = useCallback(async () => {
//     try {
//       const [clientRes, cityRes, countryRes] = await Promise.all([
//         authService.getAllClients(),
//         authService.getAllLocationCities(),
//         authService.getAllCountries(),
//       ]);
//       setUsers(clientRes?.clients || clientRes?.data || clientRes || []);
//       setCities(cityRes?.data || cityRes || []);
//       setCountries(countryRes?.data || countryRes || []);
//     } catch (err) {
//       toast.error("Failed to load data from server");
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- DEPENDENT CITY LOGIC ---
//   const filteredCities = useMemo(() => {
//     if (!editData.country) return [];
//     // Country Name se Country ID nikalna
//     const selectedCountry = countries.find(
//       (c) => c.countryName === editData.country,
//     );
//     if (!selectedCountry) return [];
//     // Us Country ID ki saari cities filter karna
//     return cities.filter(
//       (city) => Number(city.countryId) === Number(selectedCountry.id),
//     );
//   }, [editData.country, countries, cities]);

//   // --- DELETE CLIENT ---
//   const handleDelete = async (id) => {
//     if (window.confirm("Do you really want to delete this client?")) {
//       try {
//         await authService.deleteClient(id);
//         toast.success("Client deleted");
//         fetchData();
//       } catch (err) {
//         toast.error("Delete failed");
//       }
//     }
//   };

//   // --- TOGGLE STATUS (ACTIVE/DACTIVE) ---
//   const toggleStatus = async (user) => {
//     try {
//       const newStatus = user.status === "active" ? "dactive" : "active";
//       const formData = new FormData();
//       formData.append("status", newStatus);
//       await authService.updateClientProfile(user.id, formData);
//       toast.success(`Status: ${newStatus}`);
//       fetchData();
//     } catch (err) {
//       toast.error("Status update failed");
//     }
//   };

//   // --- UPDATE SUBMIT (ALL 18 PARAMETERS) ---
//   const handleUpdateSubmit = async () => {
//     try {
//       const formData = new FormData();
//       const allFields = [
//         "firstName",
//         "lastName",
//         "email",
//         "mobile",
//         "street",
//         "aptBlock",
//         "city",
//         "state",
//         "country",
//         "zipCode",
//         "countryCode",
//         "dob",
//         "password",
//         "status",
//         "termsAccepted",
//       ];

//       allFields.forEach((key) => {
//         let value = editData[key];
//         if (
//           value !== undefined &&
//           value !== null &&
//           value !== "" &&
//           value !== "null"
//         ) {
//           if (key === "dob") {
//             formData.append(key, value.toString().split("T")[0]);
//           } else if (key === "termsAccepted") {
//             formData.append(key, value ? "1" : "0");
//           } else {
//             formData.append(key, value.toString().trim());
//           }
//         }
//       });

//       if (uploadFiles.profileImage instanceof File)
//         formData.append("profileImage", uploadFiles.profileImage);
//       if (uploadFiles.kycIdentity instanceof File)
//         formData.append("kycIdentity", uploadFiles.kycIdentity);
//       if (uploadFiles.kycAddress instanceof File)
//         formData.append("kycAddress", uploadFiles.kycAddress);

//       await authService.updateClientProfile(editData.id, formData);
//       toast.success("Profile Updated!");
//       toggleModal();
//       fetchData();
//     } catch (err) {
//       toast.error("Update failed (Internal Server Error)");
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
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
//     <Container fluid className="p-4 bg-white min-vh-100">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h5 className="fw-bold text-secondary text-uppercase">
//           Client Management
//         </h5>
//         <Input
//           placeholder="Search..."
//           style={{ maxWidth: "300px" }}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <Table hover responsive className="align-middle border-top">
//         <thead>
//           <tr className="text-secondary small bg-light text-uppercase">
//             <th>#</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th className="text-center">Success</th>
//             <th className="text-center">Pending</th>
//             <th className="text-center">Active</th>
//             <th>Address</th>
//             <th className="text-center">Status</th>
//             <th className="text-end">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentItems.map((u, i) => (
//             <tr key={u.id} style={{ fontSize: "13px" }}>
//               <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
//               <td>
//                 <img
//                   src={
//                     u.profileImage
//                       ? authService.getImgUrl(u.profileImage)
//                       : "/assets/images/profilepic.png"
//                   }
//                   width="45"
//                   height="45"
//                   className="rounded-circle border"
//                   alt="img"
//                 />
//               </td>
//               <td className="fw-bold">
//                 {u.firstName} {u.lastName}
//               </td>
//               <td>{u.email}</td>
//               <td>
//                 {u.countryCode} {u.mobile}
//               </td>
//               <td className="text-center">
//                 <Badge color="success" pill>
//                   {u.successCases || 0}
//                 </Badge>
//               </td>
//               <td className="text-center">
//                 <Badge color="warning" pill>
//                   {u.pendingCases || 0}
//                 </Badge>
//               </td>
//               <td className="text-center">
//                 <Badge color="primary" pill>
//                   {u.activeCases || 0}
//                 </Badge>
//               </td>
//               <td className="text-truncate" style={{ maxWidth: "150px" }}>
//                 {u.street}, {u.city}
//               </td>
//               <td className="text-center">
//                 <Badge
//                   color={u.status === "active" ? "success" : "danger"}
//                   pill
//                   onClick={() => toggleStatus(u)}
//                   style={{ cursor: "pointer", minWidth: "85px" }}>
//                   {u.status === "active" ? "Active" : "Inactive"}
//                 </Badge>
//               </td>
//               <td className="text-end" style={{ minWidth: "110px" }}>
//                 <Button
//                   outline
//                   color="warning"
//                   size="sm"
//                   className="rounded-circle me-2"
//                   onClick={() => {
//                     setEditData(u);
//                     setModal(true);
//                   }}>
//                   <i className="bi bi-pencil-fill"></i>
//                 </Button>
//                 <Button
//                   outline
//                   color="danger"
//                   size="sm"
//                   className="rounded-circle"
//                   onClick={() => handleDelete(u.id)}>
//                   <i className="bi bi-trash-fill"></i>
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       <PaginationComponent
//         totalItems={filteredData.length}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//       />

//       {/* FULL EDIT MODAL */}
//       <Modal isOpen={modal} toggle={toggleModal} size="xl">
//         <ModalHeader toggle={toggleModal} className="bg-light fw-bold">
//           Edit Client Professional Profile
//         </ModalHeader>
//         <ModalBody className="p-4">
//           <Row className="g-3">
//             <Col md={12}>
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 1. Personal Details
//               </h6>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">First Name</Label>
//                 <Input
//                   name="firstName"
//                   value={editData.firstName || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Last Name</Label>
//                 <Input
//                   name="lastName"
//                   value={editData.lastName || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Email</Label>
//                 <Input
//                   name="email"
//                   value={editData.email || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Mobile</Label>
//                 <Input
//                   name="mobile"
//                   value={editData.mobile || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Country Code</Label>
//                 <Input
//                   name="countryCode"
//                   value={editData.countryCode || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">DOB</Label>
//                 <Input
//                   type="date"
//                   name="dob"
//                   value={editData.dob ? editData.dob.split("T")[0] : ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Status</Label>
//                 <Input
//                   type="select"
//                   name="status"
//                   value={editData.status || "active"}
//                   onChange={handleInputChange}>
//                   <option value="active">Active</option>
//                   <option value="dactive">Inactive</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">New Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   placeholder="Password"
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={12} className="mt-3">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 2. Case Statistics
//               </h6>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small">Success Cases</Label>
//                 <Input
//                   disabled
//                   value={editData.successCases || 0}
//                   className="bg-light"
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small">Pending Cases</Label>
//                 <Input
//                   disabled
//                   value={editData.pendingCases || 0}
//                   className="bg-light"
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small">Active Cases</Label>
//                 <Input
//                   disabled
//                   value={editData.activeCases || 0}
//                   className="bg-light"
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={12} className="mt-3">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 3. Address Information
//               </h6>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">Country</Label>
//                 <Input
//                   type="select"
//                   name="country"
//                   value={editData.country || ""}
//                   onChange={handleInputChange}>
//                   <option value="">Select Country</option>
//                   {countries.map((c) => (
//                     <option key={c.id} value={c.countryName}>
//                       {c.countryName}
//                     </option>
//                   ))}
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">City</Label>
//                 <Input
//                   type="select"
//                   name="city"
//                   value={editData.city || ""}
//                   onChange={handleInputChange}
//                   disabled={!editData.country}>
//                   <option value="">Select City</option>
//                   {filteredCities.map((ct) => (
//                     <option key={ct.id} value={ct.id}>
//                       {ct.cityName}
//                     </option>
//                   ))}
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">State</Label>
//                 <Input
//                   name="state"
//                   value={editData.state || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">Street</Label>
//                 <Input
//                   name="street"
//                   value={editData.street || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">Apt Block</Label>
//                 <Input
//                   name="aptBlock"
//                   value={editData.aptBlock || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">Zip Code</Label>
//                 <Input
//                   name="zipCode"
//                   value={editData.zipCode || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>

//             <Col md={12} className="mt-3">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 4. Documents
//               </h6>
//             </Col>
//             <Col md={4} className="text-center border p-2 bg-light rounded">
//               <Label className="fw-bold d-block small">Profile Image</Label>
//               <img
//                 src={
//                   editData.profileImage
//                     ? authService.getImgUrl(editData.profileImage)
//                     : "/assets/images/profilepic.png"
//                 }
//                 width="70"
//                 height="70"
//                 className="rounded-circle mb-2"
//                 alt="img"
//               />
//               <Input
//                 type="file"
//                 name="profileImage"
//                 onChange={(e) =>
//                   setUploadFiles({
//                     ...uploadFiles,
//                     profileImage: e.target.files[0],
//                   })
//                 }
//                 className="form-control-sm"
//               />
//             </Col>
//             <Col md={4} className="text-center border p-2 bg-light rounded">
//               <Label className="fw-bold d-block small">KYC Identity</Label>
//               <div className="mb-2 small text-truncate">
//                 {editData.kycIdentity || "No File"}
//               </div>
//               <Input
//                 type="file"
//                 name="kycIdentity"
//                 onChange={(e) =>
//                   setUploadFiles({
//                     ...uploadFiles,
//                     kycIdentity: e.target.files[0],
//                   })
//                 }
//                 className="form-control-sm"
//               />
//             </Col>
//             <Col md={4} className="text-center border p-2 bg-light rounded">
//               <Label className="fw-bold d-block small">KYC Address</Label>
//               <div className="mb-2 small text-truncate">
//                 {editData.kycAddress || "No File"}
//               </div>
//               <Input
//                 type="file"
//                 name="kycAddress"
//                 onChange={(e) =>
//                   setUploadFiles({
//                     ...uploadFiles,
//                     kycAddress: e.target.files[0],
//                   })
//                 }
//                 className="form-control-sm"
//               />
//             </Col>

//             <Col md={12} className="mt-3">
//               <FormGroup check>
//                 <Label check className="small fw-bold">
//                   <Input
//                     type="checkbox"
//                     name="termsAccepted"
//                     checked={editData.termsAccepted || false}
//                     onChange={handleInputChange}
//                   />
//                   All details are verified and Terms Accepted
//                 </Label>
//               </FormGroup>
//             </Col>
//           </Row>
//         </ModalBody>
//         <ModalFooter className="bg-light">
//           <Button color="secondary" outline onClick={toggleModal}>
//             Cancel
//           </Button>
//           <Button
//             color="warning"
//             className="px-5 fw-bold"
//             onClick={handleUpdateSubmit}>
//             UPDATE CLIENT
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </Container>
//   );
// };

// export default Clients;



//admin-panel/client.js
"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
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
    kycIdentity: null,
    kycAddress: null,
  });

  const toggleModal = () => {
    setModal(!modal);
    setUploadFiles({ profileImage: null, kycIdentity: null, kycAddress: null });
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
      toast.error("Failed to load data from server");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- DEPENDENT CITY LOGIC ---
  const filteredCities = useMemo(() => {
    if (!editData.country) return [];
    // Country Name se Country ID nikalna
    const selectedCountry = countries.find(
      (c) => c.countryName === editData.country,
    );
    if (!selectedCountry) return [];
    // Us Country ID ki saari cities filter karna
    return cities.filter(
      (city) => Number(city.countryId) === Number(selectedCountry.id),
    );
  }, [editData.country, countries, cities]);

  // --- DELETE CLIENT ---
  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this client?")) {
      try {
        await authService.deleteClient(id);
        toast.success("Client deleted");
        fetchData();
      } catch (err) {
        toast.error("Delete failed");
      }
    }
  };

  // --- TOGGLE STATUS (ACTIVE/DACTIVE) ---
  // --- TOGGLE STATUS (ACTIVE/INACTIVE) ---
  const toggleStatus = async (user) => {
    try {
      // Logic changed from dactive to inactive
      const newStatus = user.status === "active" ? "inactive" : "active";
      const formData = new FormData();
      formData.append("status", newStatus);

      await authService.updateClientProfile(user.id, formData);
      toast.success(
        `Status updated to: ${newStatus === "active" ? "Active" : "Inactive"}`,
      );
      fetchData();
    } catch (err) {
      toast.error("Status update failed");
    }
  };
  // --- UPDATE SUBMIT (ALL 18 PARAMETERS) ---
  const handleUpdateSubmit = async () => {
    try {
      const formData = new FormData();
      const allFields = [
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
        "status",
        "termsAccepted",
      ];

      allFields.forEach((key) => {
        let value = editData[key];
        if (
          value !== undefined &&
          value !== null &&
          value !== "" &&
          value !== "null"
        ) {
          if (key === "dob") {
            formData.append(key, value.toString().split("T")[0]);
          } else if (key === "termsAccepted") {
            formData.append(key, value ? "1" : "0");
          } else {
            formData.append(key, value.toString().trim());
          }
        }
      });

      if (uploadFiles.profileImage instanceof File)
        formData.append("profileImage", uploadFiles.profileImage);
      if (uploadFiles.kycIdentity instanceof File)
        formData.append("kycIdentity", uploadFiles.kycIdentity);
      if (uploadFiles.kycAddress instanceof File)
        formData.append("kycAddress", uploadFiles.kycAddress);

      await authService.updateClientProfile(editData.id, formData);
      toast.success("Profile Updated!");
      toggleModal();
      fetchData();
    } catch (err) {
      toast.error("Update failed (Internal Server Error)");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredData = users.filter((u) =>
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
        <h5 className="fw-bold text-secondary text-uppercase">
          Client Management
        </h5>
        <Input
          placeholder="Search..."
          style={{ maxWidth: "300px" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table hover responsive className="align-middle border-top">
        <thead>
          <tr className="text-secondary small bg-light text-uppercase">
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th className="text-center">Success</th>
            <th className="text-center">Pending</th>
            <th className="text-center">Active</th>
            <th>Address</th>
            <th className="text-center">Status</th>
            <th className="text-end">Action</th>
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
                  width="45"
                  height="45"
                  className="rounded-circle border"
                  alt="img"
                />
              </td>
              <td className="fw-bold">
                {u.firstName} {u.lastName}
              </td>
              <td>{u.email}</td>
              <td>
                {u.countryCode} {u.mobile}
              </td>
              <td className="text-center">
                <Badge color="success" pill>
                  {u.successCases || 0}
                </Badge>
              </td>
              <td className="text-center">
                <Badge color="warning" pill>
                  {u.pendingCases || 0}
                </Badge>
              </td>
              <td className="text-center">
                <Badge color="primary" pill>
                  {u.activeCases || 0}
                </Badge>
              </td>
              <td className="text-truncate" style={{ maxWidth: "150px" }}>
                {u.street}, {u.city}
              </td>
              {/* Inside currentItems.map logic */}
              <td className="text-center">
                <Badge
                  color={u.status === "active" ? "success" : "danger"}
                  pill
                  onClick={() => toggleStatus(u)}
                  style={{ cursor: "pointer", minWidth: "85px" }}>
                  {u.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </td>
              <td className="text-end" style={{ minWidth: "110px" }}>
                <Button
                  outline
                  color="warning"
                  size="sm"
                  className="rounded-circle me-2"
                  onClick={() => {
                    setEditData(u);
                    setModal(true);
                  }}>
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button
                  outline
                  color="danger"
                  size="sm"
                  className="rounded-circle"
                  onClick={() => handleDelete(u.id)}>
                  <i className="bi bi-trash-fill"></i>
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

      {/* FULL EDIT MODAL */}
      <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal} className="bg-light fw-bold">
          Edit Client Professional Profile
        </ModalHeader>
        <ModalBody className="p-4">
          <Row className="g-3">
            <Col md={12}>
              <h6 className="text-primary fw-bold border-bottom pb-2">
                1. Personal Details
              </h6>
            </Col>
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
            {/* Inside the Modal Row for Personal Details */}
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Status</Label>
                <Input
                  type="select"
                  name="status"
                  value={editData.status || "inactive"} // Changed default to inactive
                  onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">New Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            <Col md={12} className="mt-3">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                2. Case Statistics
              </h6>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small">Success Cases</Label>
                <Input
                  disabled
                  value={editData.successCases || 0}
                  className="bg-light"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small">Pending Cases</Label>
                <Input
                  disabled
                  value={editData.pendingCases || 0}
                  className="bg-light"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small">Active Cases</Label>
                <Input
                  disabled
                  value={editData.activeCases || 0}
                  className="bg-light"
                />
              </FormGroup>
            </Col>

            <Col md={12} className="mt-3">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                3. Address Information
              </h6>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
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
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">State</Label>
                <Input
                  name="state"
                  value={editData.state || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Street</Label>
                <Input
                  name="street"
                  value={editData.street || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Apt Block</Label>
                <Input
                  name="aptBlock"
                  value={editData.aptBlock || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">Zip Code</Label>
                <Input
                  name="zipCode"
                  value={editData.zipCode || ""}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            <Col md={12} className="mt-3">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                4. Documents
              </h6>
            </Col>
            <Col md={4} className="text-center border p-2 bg-light rounded">
              <Label className="fw-bold d-block small">Profile Image</Label>
              <img
                src={
                  editData.profileImage
                    ? authService.getImgUrl(editData.profileImage)
                    : "/assets/images/profilepic.png"
                }
                width="70"
                height="70"
                className="rounded-circle mb-2"
                alt="img"
              />
              <Input
                type="file"
                name="profileImage"
                onChange={(e) =>
                  setUploadFiles({
                    ...uploadFiles,
                    profileImage: e.target.files[0],
                  })
                }
                className="form-control-sm"
              />
            </Col>
            <Col md={4} className="text-center border p-2 bg-light rounded">
              <Label className="fw-bold d-block small">KYC Identity</Label>
              <div className="mb-2 small text-truncate">
                {editData.kycIdentity || "No File"}
              </div>
              <Input
                type="file"
                name="kycIdentity"
                onChange={(e) =>
                  setUploadFiles({
                    ...uploadFiles,
                    kycIdentity: e.target.files[0],
                  })
                }
                className="form-control-sm"
              />
            </Col>
            <Col md={4} className="text-center border p-2 bg-light rounded">
              <Label className="fw-bold d-block small">KYC Address</Label>
              <div className="mb-2 small text-truncate">
                {editData.kycAddress || "No File"}
              </div>
              <Input
                type="file"
                name="kycAddress"
                onChange={(e) =>
                  setUploadFiles({
                    ...uploadFiles,
                    kycAddress: e.target.files[0],
                  })
                }
                className="form-control-sm"
              />
            </Col>

            <Col md={12} className="mt-3">
              <FormGroup check>
                <Label check className="small fw-bold">
                  <Input
                    type="checkbox"
                    name="termsAccepted"
                    checked={editData.termsAccepted || false}
                    onChange={handleInputChange}
                  />
                  All details are verified and Terms Accepted
                </Label>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button color="secondary" outline onClick={toggleModal}>
            Cancel
          </Button>
          <Button
            color="warning"
            className="px-5 fw-bold"
            onClick={handleUpdateSubmit}>
            UPDATE CLIENT
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};;

export default Clients;