// import React, { useEffect, useState, useCallback } from "react";
// import {
//   Card,
//   CardBody,
//   Table,
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Row,
//   Col,
//   Badge,
// } from "reactstrap";

// import PaginationComponent from "../../context/Pagination";
// import * as authService from "../../services/authService";

// const PromoterPage = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   const [dataList, setDataList] = useState([]);
//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;

//   const [formData, setFormData] = useState({
//     bannerImage: null,
//     personImage: null,
//     personName: "",
//     designation: "",
//     specialization: "",
//   });

//   // ✨ HTML entities हटाने के लिए
//   const stripHtml = (html) => {
//     if (!html) return "";
//     const doc = new DOMParser().parseFromString(html, "text/html");
//     return doc.body.textContent || "";
//   };

//   const fetchData = useCallback(async () => {
//     console.log("🔄 Fetching Promoters...");
//     const res = await authService.getAllPromoters();
//     if (res.success) {
//       setDataList(res.data || []);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const toggle = () => {
//     setModal(!modal);
//     if (modal) {
//       setFormData({
//         bannerImage: null,
//         personImage: null,
//         personName: "",
//         designation: "",
//         specialization: "",
//       });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     if (!formData.personName || !formData.designation) {
//       alert("Name and Designation are required!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = new FormData();
//       data.append("adminId", "1");
//       data.append("personName", formData.personName);
//       data.append("designation", formData.designation);
//       data.append("specialization", formData.specialization);

//       if (formData.bannerImage instanceof File)
//         data.append("bannerImage", formData.bannerImage);
//       if (formData.personImage instanceof File)
//         data.append("personImage", formData.personImage);

//       console.log(`📤 ${isEditing ? "Updating" : "Creating"} Promoter...`);
//       const res = isEditing
//         ? await authService.updatePromoter(currentId, data)
//         : await authService.createPromoter(data);

//       if (res.success) {
//         fetchData();
//         toggle();
//       }
//     } catch (err) {
//       console.error("❌ Submission error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setFormData({
//       personName: item.personName || "",
//       designation: item.designation || "",
//       specialization: item.specialization || "",
//       bannerImage: null,
//       personImage: null,
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this promoter?")) {
//       try {
//         const res = await authService.deletePromoter(id);
//         if (res.success) fetchData();
//       } catch (err) {
//         console.error("❌ Delete error:", err);
//       }
//     }
//   };

//   const filteredData = dataList.filter((item) =>
//     `${item.personName} ${item.designation}`
//       .toLowerCase()
//       .includes(search.toLowerCase()),
//   );

//   const currentItems = filteredData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   return (
//     <div
//       className="p-3 p-md-4 min-vh-100"
//       style={{ backgroundColor: "#f9f9f9" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
//         <div>
//           <h4 className="fw-bold mb-0">Promoters Management</h4>
//           <p className="text-muted small mb-0">
//             Manage key leadership profiles.
//           </p>
//         </div>
//         <Button
//           className="px-4 text-white shadow-sm"
//           style={{ backgroundColor: GOLD, border: "none" }}
//           onClick={toggle}>
//           + Add Promoter
//         </Button>
//       </div>

//       <Row className="mb-3">
//         <Col md={3}>
//           <Input
//             placeholder="Search promoters..."
//             className="rounded-pill border-0 shadow-sm px-3"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </Col>
//       </Row>

//       <Card className="border-0 shadow-sm rounded-4">
//         <CardBody className="p-0">
//           <Table hover responsive className="align-middle mb-0">
//             <thead style={{ backgroundColor: LIGHT_GOLD }}>
//               <tr>
//                 <th className="px-4 py-3">SR.</th>
//                 <th>PROFILE</th>
//                 <th>FULL NAME</th>
//                 <th>DESIGNATION</th>
//                 <th>SPECIALIZATION</th>
//                 <th className="text-end px-4">ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="py-5 text-center text-muted">
//                     No records found.
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((item, index) => (
//                   <tr key={item.id}>
//                     <td className="px-4 text-muted">
//                       {(currentPage - 1) * itemsPerPage + index + 1}.
//                     </td>
//                     <td>
//                       <img
//                         src={
//                           item.personImage
//                             ? `${authService.IMG_URL}/${item.personImage}`
//                             : "https://placehold.co/60x45?text=No+Img"
//                         }
//                         style={{
//                           width: "60px",
//                           height: "45px",
//                           objectFit: "cover",
//                           borderRadius: "6px",
//                         }}
//                         alt="P"
//                         onError={(e) =>
//                           (e.target.src =
//                             "https://placehold.co/60x45?text=No+Img")
//                         }
//                       />
//                     </td>
//                     <td className="fw-bold">{item.personName}</td>
//                     <td>
//                       <Badge pill className="" style={{}}>
//                         {item.designation}
//                       </Badge>
//                     </td>
//                     <td>
//                       <div
//                         className="small text-muted text-truncate"
//                         style={{ maxWidth: "200px" }}>
//                         {stripHtml(item.specialization)}
//                       </div>
//                     </td>
//                     <td className="text-end px-4">
//                       <Button
//                         size="sm"
//                         color="white"
//                         className="me-2 border shadow-sm"
//                         onClick={() => handleEdit(item)}>
//                         ✏️
//                       </Button>
//                       <Button
//                         size="sm"
//                         color="white"
//                         className="text-danger border shadow-sm"
//                         onClick={() => handleDelete(item.id)}>
//                         🗑️
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>

//       <PaginationComponent
//         totalItems={filteredData.length}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//       />

//       <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
//         <ModalHeader
//           toggle={toggle}
//           className="fw-bold"
//           style={{ color: GOLD }}>
//           {isEditing ? "Edit Promoter" : "Add New Promoter"}
//         </ModalHeader>
//         <ModalBody className="px-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col md={6}>
//                 <Label className="small fw-bold">Full Name *</Label>
//                 <Input
//                   value={formData.personName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, personName: e.target.value })
//                   }
//                   required
//                 />
//               </Col>
//               <Col md={6}>
//                 <Label className="small fw-bold">Designation *</Label>
//                 <Input
//                   value={formData.designation}
//                   onChange={(e) =>
//                     setFormData({ ...formData, designation: e.target.value })
//                   }
//                   required
//                 />
//               </Col>
//               <Col xs={12}>
//                 <Label className="small fw-bold">Specialization</Label>
//                 <Input
//                   type="textarea"
//                   rows="3"
//                   value={formData.specialization}
//                   onChange={(e) =>
//                     setFormData({ ...formData, specialization: e.target.value })
//                   }
//                 />
//               </Col>
//               <Col md={6}>
//                 <Label className="small fw-bold">Profile Image</Label>
//                 <Input
//                   type="file"
//                   onChange={(e) =>
//                     setFormData({ ...formData, personImage: e.target.files[0] })
//                   }
//                 />
//               </Col>
//               <Col md={6}>
//                 <Label className="small fw-bold">Banner Image</Label>
//                 <Input
//                   type="file"
//                   onChange={(e) =>
//                     setFormData({ ...formData, bannerImage: e.target.files[0] })
//                   }
//                 />
//               </Col>
//             </Row>

//             <div className="mt-4 d-flex gap-2">
//               <Button
//                 type="submit"
//                 style={{
//                   backgroundColor: GOLD,
//                   border: "none",
//                   width: "130px",
//                 }}
//                 className="text-white fw-bold"
//                 disabled={loading}>
//                 {loading ? "Saving..." : isEditing ? "Update" : "Save"}
//               </Button>
//               <Button outline style={{ width: "120px" }} onClick={toggle}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// };

// export default PromoterPage;

import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Row,
  Col,
  Badge,
} from "reactstrap";
import PaginationComponent from "../../context/Pagination";
import * as authService from "../../services/authService";

const PromoterPage = () => {
  const GOLD = "#A35233";
  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    bannerImage: null,
    personImage: null,
    personName: "",
    designation: "",
    specialization: "", // Backed field name
  });

  const fetchData = useCallback(async () => {
    const res = await authService.getAllPromoters();
    if (res.success) setDataList(res.data || []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFormData({
        bannerImage: null,
        personImage: null,
        personName: "",
        designation: "",
        specialization: "",
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", "1");
      data.append("personName", formData.personName);
      data.append("designation", formData.designation);
      data.append("specialization", formData.specialization);

      if (formData.bannerImage instanceof File)
        data.append("bannerImage", formData.bannerImage);
      if (formData.personImage instanceof File)
        data.append("personImage", formData.personImage);

      const res = isEditing
        ? await authService.updatePromoter(currentId, data)
        : await authService.createPromoter(data);

      if (res.success) {
        fetchData();
        toggle();
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      personName: item.personName || "",
      designation: item.designation || "",
      specialization: item.specialization || "",
      bannerImage: null,
      personImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const filteredData = dataList.filter((item) =>
    item.personName.toLowerCase().includes(search.toLowerCase()),
  );

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Promoters Management</h4>
        <Button color="dark" className="rounded-0 px-4" onClick={toggle}>
          + Add Promoter
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-0">
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th className="ps-4">Profile</th>
                <th>Name</th>
                <th>Designation</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="ps-4">
                    <img
                      src={`${authService.IMG_URL}/${item.personImage}`}
                      width="50"
                      height="50"
                      className="rounded-circle object-fit-cover"
                      alt="img"
                    />
                  </td>
                  <td className="fw-bold">{item.personName}</td>
                  <td>
                    <Badge color="secondary">{item.designation}</Badge>
                  </td>
                  <td className="text-end pe-4">
                    <Button
                      size="sm"
                      color="light"
                      className="me-2 border"
                      onClick={() => handleEdit(item)}>
                      ✏️
                    </Button>
                    <Button
                      size="sm"
                      color="light"
                      className="text-danger border"
                      onClick={() =>
                        authService.deletePromoter(item.id).then(fetchData)
                      }>
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
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader toggle={toggle}>Promoter Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Label className="small fw-bold">Name</Label>
                <Input
                  value={formData.personName}
                  onChange={(e) =>
                    setFormData({ ...formData, personName: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Designation</Label>
                <Input
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  required
                />
              </Col>
              <Col xs={12}>
                <Label className="small fw-bold">
                  Biography (Specialization)
                </Label>
                <Input
                  type="textarea"
                  rows="4"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Profile Photo</Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, personImage: e.target.files[0] })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Banner Photo</Label>
                <Input
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, bannerImage: e.target.files[0] })
                  }
                />
              </Col>
            </Row>
            <div className="mt-4">
              <Button color="dark" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default PromoterPage;