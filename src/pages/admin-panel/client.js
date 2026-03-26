// "use client";

// import React, { useEffect, useState, useCallback } from "react";
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

//   // File state matched to backend field names
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
//       toast.error("Failed to load clients data");
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const toggleStatus = async (user) => {
//     try {
//       const newActiveStatus = !user.isActive;
//       const formData = new FormData();
//       formData.append("isActive", newActiveStatus ? "1" : "0");
//       await authService.updateClient(user.id, formData);
//       toast.success(`Client is now ${newActiveStatus ? "Active" : "Inactive"}`);
//       fetchData();
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

// const handleUpdateSubmit = async () => {
//   try {
//     const formData = new FormData();
//     const textFields = [
//       "firstName",
//       "lastName",
//       "email",
//       "mobile",
//       "street",
//       "aptBlock",
//       "city",
//       "state",
//       "country",
//       "zipCode",
//       "countryCode",
//       "dob",
//       "password",
//       "status",
//     ];

//     textFields.forEach((key) => {
//       let value = editData[key];
//       // SIRF tabhi bhein jab value ho aur wo "null" string na ho
//       if (
//         value !== undefined &&
//         value !== null &&
//         value !== "" &&
//         value !== "null"
//       ) {
//         if (key === "dob") {
//           formData.append(key, value.toString().split("T")[0]);
//         } else {
//           formData.append(key, value.toString().trim());
//         }
//       }
//     });

//     formData.append("isVerified", editData.isVerified ? "1" : "0");
//     formData.append("termsAccepted", editData.termsAccepted ? "1" : "0");

//     // Files: Sirf tabhi append karein jab NEW file select ki ho
//     if (uploadFiles.profileImage instanceof File) {
//       formData.append("profileImage", uploadFiles.profileImage);
//     }
//     if (uploadFiles.kycIdentity instanceof File) {
//       formData.append("kycIdentity", uploadFiles.kycIdentity);
//     }
//     if (uploadFiles.kycAddress instanceof File) {
//       formData.append("kycAddress", uploadFiles.kycAddress);
//     }

//     const res = await authService.updateClientProfile(editData.id, formData);
//     toast.success("Updated successfully!");
//     toggleModal();
//     fetchData(); // List refresh karne ke liye
//   } catch (err) {
//     toast.error("Update failed.");
//   }
// };
//   const openUpdateModal = (user) => {
//     setEditData({ ...user });
//     toggleModal();
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setEditData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//  const handleFileChange = (e) => {
//    const { name, files } = e.target;
//    if (files && files.length > 0) {
//      const file = files[0];
//      console.log(`Selected file for ${name}:`, file.name);
//      setUploadFiles((prev) => ({ ...prev, [name]: file }));
//    }
//  };
//   const downloadFile = (path) => {
//     if (!path || path === "null") return toast.error("File not available");
//     window.open(authService.getImgUrl(path), "_blank");
//   };

//   const selectedCountryObj = countries.find(
//     (c) => c.countryName === editData.country,
//   );
//   const filteredCities = selectedCountryObj
//     ? cities.filter(
//         (city) => Number(city.countryId) === Number(selectedCountryObj.id),
//       )
//     : [];

//   const filteredData = users.filter((u) =>
//     `${u.firstName} ${u.lastName} ${u.email} ${u.mobile}`
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
//           Client Management Dashboard
//         </h5>
//         <Input
//           placeholder="Search name, email..."
//           style={{ maxWidth: "300px" }}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <Table hover responsive className="align-middle border-top">
//         <thead>
//           <tr className="text-secondary small bg-light">
//             <th>#</th>
//             <th>IMAGE</th>
//             <th>NAME</th>
//             <th>EMAIL</th>
//             <th>PHONE</th>
//             <th className="text-center">SUCCESS</th>
//             <th className="text-center">PENDING</th>
//             <th className="text-center">ACTIVE</th> {/* NEW COLUMN */}
//             <th>ADDRESS</th>
//             <th className="text-center">STATUS</th>
//             <th className="text-end">ACTION</th>
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
//                   style={{ objectFit: "cover" }}
//                   alt="p"
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
//               <td style={{ maxWidth: "150px" }} className="text-truncate">
//                 {u.street}, {u.city}
//               </td>
//               <td className="text-center">
//                 <Badge
//                   color={u.isActive ? "success" : "danger"}
//                   pill
//                   onClick={() => toggleStatus(u)}
//                   style={{ cursor: "pointer" }}>
//                   {u.isActive ? "Active" : "Inactive"}
//                 </Badge>
//               </td>
//               {/* ACTION BUTTONS */}
//               <td className="text-end" style={{ minWidth: "100px" }}>
//                 <Button
//                   outline
//                   color="warning"
//                   size="sm"
//                   className="rounded-circle me-2"
//                   onClick={() => openUpdateModal(u)}>
//                   <i className="bi bi-pencil-fill"></i>
//                 </Button>
//                 <Button
//                   outline
//                   color="danger"
//                   size="sm"
//                   className="rounded-circle"
//                   onClick={() => {
//                     if (window.confirm("Delete this client permanently?")) {
//                       authService.deleteClient(u.id).then(() => {
//                         toast.success("Client removed");
//                         fetchData();
//                       });
//                     }
//                   }}>
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

//       <Modal isOpen={modal} toggle={toggleModal} size="xl">
//         <ModalHeader toggle={toggleModal} className="bg-light fw-bold">
//           Edit Client Professional Profile
//         </ModalHeader>
//         <ModalBody className="p-4">
//           <Row className="g-3">
//             {/* SECTION 1: PERSONAL */}
//             <Col md={12}>
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 1. Personal & Account Details
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
//             <Col md={2}>
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
//                   <option value="inactive">Inactive</option>
//                 </Input>
//               </FormGroup>
//             </Col>
//             <Col md={4}>
//               <FormGroup>
//                 <Label className="small fw-bold">New Password</Label>
//                 <Input
//                   type="password"
//                   name="password"
//                   placeholder="Leave blank to keep same"
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>

//             {/* SECTION 2: STATS */}
//             <Col md={12} className="mt-4">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 2. Case Statistics (System Records)
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

//             {/* SECTION 3: ADDRESS */}
//             <Col md={12} className="mt-4">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 3. Address Information
//               </h6>
//             </Col>
//             <Col md={6}>
//               <FormGroup>
//                 <Label className="small fw-bold">Street</Label>
//                 <Input
//                   name="street"
//                   value={editData.street || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Apt/Block</Label>
//                 <Input
//                   name="aptBlock"
//                   value={editData.aptBlock || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
//             </Col>
//             <Col md={3}>
//               <FormGroup>
//                 <Label className="small fw-bold">Zip Code</Label>
//                 <Input
//                   name="zipCode"
//                   value={editData.zipCode || ""}
//                   onChange={handleInputChange}
//                 />
//               </FormGroup>
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

//             {/* SECTION 4: VERIFICATION FLAGS */}
//             <Col md={12} className="mt-4">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 4. Verification Status
//               </h6>
//             </Col>
//             <Col md={3} className="d-flex align-items-center">
//               <FormGroup check>
//                 <Label check className="small fw-bold">
//                   <Input
//                     type="checkbox"
//                     name="isVerified"
//                     checked={editData.isVerified || false}
//                     onChange={handleInputChange}
//                   />{" "}
//                   Email Verified
//                 </Label>
//               </FormGroup>
//             </Col>
//             <Col md={3} className="d-flex align-items-center">
//               <FormGroup check>
//                 <Label check className="small fw-bold">
//                   <Input
//                     type="checkbox"
//                     name="termsAccepted"
//                     checked={editData.termsAccepted || false}
//                     onChange={handleInputChange}
//                   />{" "}
//                   Terms Accepted
//                 </Label>
//               </FormGroup>
//             </Col>

//             {/* SECTION 5: DOCUMENTS */}
//             <Col md={12} className="mt-4">
//               <h6 className="text-primary fw-bold border-bottom pb-2">
//                 5. Documents & Media
//               </h6>
//             </Col>
//             <Col md={4}>
//               <div className="p-3 border rounded text-center bg-light">
//                 <Label className="fw-bold d-block mb-2">Profile Image</Label>
//                 <img
//                   src={
//                     editData.profileImage
//                       ? authService.getImgUrl(editData.profileImage)
//                       : "/assets/images/profilepic.png"
//                   }
//                   className="rounded-circle border mb-2"
//                   width="100"
//                   height="100"
//                   style={{ objectFit: "cover" }}
//                   alt="p"
//                 />
//                 <Input
//                   type="file"
//                   name="profileImage"
//                   onChange={handleFileChange}
//                   className="form-control-sm"
//                 />
//               </div>
//             </Col>
//             <Col md={4}>
//               <div className="p-3 border rounded text-center bg-light">
//                 <Label className="fw-bold d-block mb-2">KYC Identity</Label>
//                 <Button
//                   size="sm"
//                   color="link"
//                   onClick={() => downloadFile(editData.kycIdentity)}
//                   className="p-0 d-block w-100 text-truncate">
//                   {editData.kycIdentity ? "View Current Doc" : "No File"}
//                 </Button>
//                 <Input
//                   type="file"
//                   name="kycIdentity"
//                   onChange={handleFileChange}
//                   className="form-control-sm"
//                 />
//               </div>
//             </Col>
//             <Col md={4}>
//               <div className="p-3 border rounded text-center bg-light">
//                 <Label className="fw-bold d-block mb-2">KYC Address</Label>
//                 <Button
//                   size="sm"
//                   color="link"
//                   onClick={() => downloadFile(editData.kycAddress)}
//                   className="p-0 d-block w-100 text-truncate">
//                   {editData.kycAddress ? "View Current Doc" : "No File"}
//                 </Button>
//                 <Input
//                   type="file"
//                   name="kycAddress"
//                   onChange={handleFileChange}
//                   className="form-control-sm"
//                 />
//               </div>
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
//             UPDATE PROFILE
//           </Button>
//         </ModalFooter>
//       </Modal>
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

  // File state matched to backend field names
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
    const textFields = [
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
    ];

    textFields.forEach((key) => {
      let value = editData[key];
      // Check for valid data to prevent overwriting with empty/null
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        value !== "null"
      ) {
        if (key === "dob") {
          formData.append(key, value.toString().split("T")[0]);
        } else {
          formData.append(key, value.toString().trim());
        }
      }
    });

    // Files only if NEWLY selected
    if (uploadFiles.profileImage instanceof File)
      formData.append("profileImage", uploadFiles.profileImage);
    if (uploadFiles.kycIdentity instanceof File)
      formData.append("kycIdentity", uploadFiles.kycIdentity);
    if (uploadFiles.kycAddress instanceof File)
      formData.append("kycAddress", uploadFiles.kycAddress);

    await authService.updateClientProfile(editData.id, formData);
    toast.success("Client Updated!");
    toggleModal();
    fetchData(); // Dashboard refresh
  } catch (err) {
    toast.error("Update failed.");
  }
};
  const openUpdateModal = (user) => {
    setEditData({ ...user });
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(`Selected file for ${name}:`, file.name);
      setUploadFiles((prev) => ({ ...prev, [name]: file }));
    }
  };
  const downloadFile = (path) => {
    if (!path || path === "null") return toast.error("File not available");
    window.open(authService.getImgUrl(path), "_blank");
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
        <h5 className="fw-bold text-secondary text-uppercase">
          Client Management Dashboard
        </h5>
        <Input
          placeholder="Search name, email..."
          style={{ maxWidth: "300px" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table hover responsive className="align-middle border-top">
        <thead>
          <tr className="text-secondary small bg-light">
            <th>#</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>PHONE</th>
            <th className="text-center">SUCCESS</th>
            <th className="text-center">PENDING</th>
            <th className="text-center">ACTIVE</th> {/* NEW COLUMN */}
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
                  width="45"
                  height="45"
                  className="rounded-circle border"
                  style={{ objectFit: "cover" }}
                  alt="p"
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
              <td style={{ maxWidth: "150px" }} className="text-truncate">
                {u.street}, {u.city}
              </td>
              <td className="text-center">
                <Badge
                  color={u.isActive ? "success" : "danger"}
                  pill
                  onClick={() => toggleStatus(u)}
                  style={{ cursor: "pointer" }}>
                  {u.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
              {/* ACTION BUTTONS */}
              <td className="text-end" style={{ minWidth: "100px" }}>
                <Button
                  outline
                  color="warning"
                  size="sm"
                  className="rounded-circle me-2"
                  onClick={() => openUpdateModal(u)}>
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button
                  outline
                  color="danger"
                  size="sm"
                  className="rounded-circle"
                  onClick={() => {
                    if (window.confirm("Delete this client permanently?")) {
                      authService.deleteClient(u.id).then(() => {
                        toast.success("Client removed");
                        fetchData();
                      });
                    }
                  }}>
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

      <Modal isOpen={modal} toggle={toggleModal} size="xl">
        <ModalHeader toggle={toggleModal} className="bg-light fw-bold">
          Edit Client Professional Profile
        </ModalHeader>
        <ModalBody className="p-4">
          <Row className="g-3">
            {/* SECTION 1: PERSONAL */}
            <Col md={12}>
              <h6 className="text-primary fw-bold border-bottom pb-2">
                1. Personal & Account Details
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
            <Col md={2}>
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
            <Col md={3}>
              <FormGroup>
                <Label className="small fw-bold">Status</Label>
                <Input
                  type="select"
                  name="status"
                  value={editData.status || "active"}
                  onChange={handleInputChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label className="small fw-bold">New Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Leave blank to keep same"
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>

            {/* SECTION 2: STATS */}
            <Col md={12} className="mt-4">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                2. Case Statistics (System Records)
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

            {/* SECTION 3: ADDRESS */}
            <Col md={12} className="mt-4">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                3. Address Information
              </h6>
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

            {/* SECTION 4: VERIFICATION FLAGS */}
            <Col md={12} className="mt-4">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                4. Verification Status
              </h6>
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <FormGroup check>
                <Label check className="small fw-bold">
                  <Input
                    type="checkbox"
                    name="isVerified"
                    checked={editData.isVerified || false}
                    onChange={handleInputChange}
                  />{" "}
                  Email Verified
                </Label>
              </FormGroup>
            </Col>
            <Col md={3} className="d-flex align-items-center">
              <FormGroup check>
                <Label check className="small fw-bold">
                  <Input
                    type="checkbox"
                    name="termsAccepted"
                    checked={editData.termsAccepted || false}
                    onChange={handleInputChange}
                  />{" "}
                  Terms Accepted
                </Label>
              </FormGroup>
            </Col>

            {/* SECTION 5: DOCUMENTS */}
            <Col md={12} className="mt-4">
              <h6 className="text-primary fw-bold border-bottom pb-2">
                5. Documents & Media
              </h6>
            </Col>
            <Col md={4}>
              <div className="p-3 border rounded text-center bg-light">
                <Label className="fw-bold d-block mb-2">Profile Image</Label>
                <img
                  src={
                    editData.profileImage
                      ? authService.getImgUrl(editData.profileImage)
                      : "/assets/images/profilepic.png"
                  }
                  className="rounded-circle border mb-2"
                  width="100"
                  height="100"
                  style={{ objectFit: "cover" }}
                  alt="p"
                />
                <Input
                  type="file"
                  name="profileImage"
                  onChange={handleFileChange}
                  className="form-control-sm"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 border rounded text-center bg-light">
                <Label className="fw-bold d-block mb-2">KYC Identity</Label>
                <Button
                  size="sm"
                  color="link"
                  onClick={() => downloadFile(editData.kycIdentity)}
                  className="p-0 d-block w-100 text-truncate">
                  {editData.kycIdentity ? "View Current Doc" : "No File"}
                </Button>
                <Input
                  type="file"
                  name="kycIdentity"
                  onChange={handleFileChange}
                  className="form-control-sm"
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 border rounded text-center bg-light">
                <Label className="fw-bold d-block mb-2">KYC Address</Label>
                <Button
                  size="sm"
                  color="link"
                  onClick={() => downloadFile(editData.kycAddress)}
                  className="p-0 d-block w-100 text-truncate">
                  {editData.kycAddress ? "View Current Doc" : "No File"}
                </Button>
                <Input
                  type="file"
                  name="kycAddress"
                  onChange={handleFileChange}
                  className="form-control-sm"
                />
              </div>
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
            UPDATE PROFILE
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Clients;
