// // "use client";
// // import React, { useEffect, useState } from "react";
// // import {
// //   Card,
// //   CardBody,
// //   Table,
// //   Button,
// //   Badge,
// //   Modal,
// //   ModalHeader,
// //   ModalBody,
// //   ModalFooter,
// //   Form,
// //   FormGroup,
// //   Label,
// //   Input,
// // } from "reactstrap";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import * as authService from "../../services/authService";

// // const ContactUsPage = () => {
// //   const GOLD = "#eebb5d";
// //   const LIGHT_GOLD = "#fdf8ef";

// //   const [dataList, setDataList] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [editModal, setEditModal] = useState(false);

// //   // State for all fields
// //   const [selectedContact, setSelectedContact] = useState({
// //     id: "",
// //     firstName: "",
// //     lastName: "",
// //     email: "",
// //     countryCode: "",
// //     phoneNumber: "",
// //     inquiryType: "",
// //     message: "",
// //   });

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await authService.getAllContacts();
// //       if (res.success) {
// //         let inquiries = Array.isArray(res.data)
// //           ? res.data
// //           : res.data?.data || [];
// //         const sortedData = inquiries.sort(
// //           (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
// //         );
// //         setDataList(sortedData);
// //       }
// //     } catch (error) {
// //       toast.error("Failed to load data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this inquiry?")) {
// //       try {
// //         const res = await authService.deleteContact(id);
// //         if (res.success) {
// //           toast.success("Deleted successfully");
// //           fetchData();
// //         }
// //       } catch (error) {
// //         toast.error("Delete failed");
// //       }
// //     }
// //   };

// //   const openEditModal = (contact) => {
// //     setSelectedContact({
// //       id: contact.id || contact._id,
// //       firstName: contact.firstName || "",
// //       lastName: contact.lastName || "",
// //       email: contact.email || "",
// //       countryCode: contact.countryCode || "",
// //       phoneNumber: contact.phoneNumber || "",
// //       inquiryType: contact.inquiryType || "",
// //       message: contact.message || "",
// //     });
// //     setEditModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setSelectedContact({ ...selectedContact, [name]: value });
// //   };

// //   const handleUpdateSubmit = async () => {
// //     try {
// //       const res = await authService.updateContact(
// //         selectedContact.id,
// //         selectedContact,
// //       );
// //       if (res.success) {
// //         toast.success("Record updated successfully");
// //         setEditModal(false);
// //         fetchData();
// //       }
// //     } catch (error) {
// //       toast.error("Update failed");
// //     }
// //   };

// //   return (
// //     <div className="p-3 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
// //       <ToastContainer theme="colored" autoClose={2000} />

// //       <div className="mb-4">
// //         <h4 className="fw-bold mb-0" style={{ color: "#333" }}>
// //           Contact Inquiries
// //         </h4>
// //         <p className="text-muted small">
// //           Manage website leads and client messages.
// //         </p>
// //       </div>

// //       <Card className="border-0 shadow-sm" style={{ borderRadius: "12px" }}>
// //         <CardBody className="p-0">
// //           <div className="table-responsive">
// //             <Table
// //               hover
// //               className="align-middle mb-0"
// //               style={{ minWidth: "1100px", fontSize: "13.5px" }}>
// //               <thead style={{ backgroundColor: LIGHT_GOLD }}>
// //                 <tr className="text-dark">
// //                   <th className="py-3 px-3">Name</th>
// //                   <th className="py-3">Email</th>
// //                   <th className="py-3" style={{ width: "70px" }}>
// //                     Code
// //                   </th>
// //                   <th className="py-3">Phone</th>
// //                   <th className="py-3">Type</th>
// //                   <th className="py-3" style={{ width: "350px" }}>
// //                     Message
// //                   </th>
// //                   <th className="py-3 text-nowrap" style={{ width: "100px" }}>
// //                     Date
// //                   </th>
// //                   <th className="py-3 text-center" style={{ width: "100px" }}>
// //                     Actions
// //                   </th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan="8" className="text-center py-5">
// //                       Loading...
// //                     </td>
// //                   </tr>
// //                 ) : dataList.length === 0 ? (
// //                   <tr>
// //                     <td colSpan="8" className="text-center py-5">
// //                       No inquiries found.
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   dataList.map((item) => (
// //                     <tr key={item.id || item._id} className="border-bottom">
// //                       <td className="py-3 px-3 fw-bold">
// //                         {item.firstName} {item.lastName}
// //                       </td>
// //                       <td>{item.email}</td>
// //                       <td className="text-muted small">{item.countryCode}</td>
// //                       <td>{item.phoneNumber}</td>
// //                       <td>
// //                         <Badge
// //                           style={{
// //                             backgroundColor: LIGHT_GOLD,
// //                             color: GOLD,
// //                             border: `1px solid ${GOLD}`,
// //                             fontSize: "11px",
// //                           }}
// //                           pill>
// //                           {item.inquiryType || "inquiry"}
// //                         </Badge>
// //                       </td>
// //                       <td>
// //                         <div
// //                           style={{
// //                             wordBreak: "break-word",
// //                             color: "#555",
// //                             lineHeight: "1.4",
// //                           }}>
// //                           {item.message}
// //                         </div>
// //                       </td>
// //                       <td className="text-nowrap">
// //                         {new Date(item.createdAt).toLocaleDateString("en-IN")}
// //                       </td>
// //                       <td className="text-center">
// //                         <div className="d-flex justify-content-center gap-2">
// //                           <button
// //                             className="btn btn-sm btn-outline-secondary border-0 p-1"
// //                             onClick={() => openEditModal(item)}>
// //                             <img
// //                               src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
// //                               width="16"
// //                               alt="edit"
// //                             />
// //                           </button>
// //                           <button
// //                             className="btn btn-sm btn-outline-danger border-0 p-1"
// //                             onClick={() => handleDelete(item.id || item._id)}>
// //                             <img
// //                               src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
// //                               width="16"
// //                               alt="delete"
// //                             />
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   ))
// //                 )}
// //               </tbody>
// //             </Table>
// //           </div>
// //         </CardBody>
// //       </Card>

// //       {/* FULL UPDATE MODAL */}
// //       <Modal
// //         isOpen={editModal}
// //         toggle={() => setEditModal(false)}
// //         centered
// //         size="lg">
// //         <ModalHeader toggle={() => setEditModal(false)} className="fw-bold">
// //           Update Client Inquiry
// //         </ModalHeader>
// //         <ModalBody className="px-4 py-3">
// //           <Form>
// //             <div className="row">
// //               <div className="col-md-6 mb-3">
// //                 <Label className="small fw-bold">First Name</Label>
// //                 <Input
// //                   type="text"
// //                   name="firstName"
// //                   value={selectedContact.firstName}
// //                   onChange={handleUpdateChange}
// //                 />
// //               </div>
// //               <div className="col-md-6 mb-3">
// //                 <Label className="small fw-bold">Last Name</Label>
// //                 <Input
// //                   type="text"
// //                   name="lastName"
// //                   value={selectedContact.lastName}
// //                   onChange={handleUpdateChange}
// //                 />
// //               </div>
// //             </div>

// //             <div className="row">
// //               <div className="col-md-7 mb-3">
// //                 <Label className="small fw-bold">Email Address</Label>
// //                 <Input
// //                   type="email"
// //                   name="email"
// //                   value={selectedContact.email}
// //                   onChange={handleUpdateChange}
// //                 />
// //               </div>
// //               <div className="col-md-5 mb-3">
// //                 <Label className="small fw-bold">Inquiry Type</Label>
// //                 <Input
// //                   type="text"
// //                   name="inquiryType"
// //                   value={selectedContact.inquiryType}
// //                   onChange={handleUpdateChange}
// //                 />
// //               </div>
// //             </div>

// //             <div className="row">
// //               <div className="col-md-4 mb-3">
// //                 <Label className="small fw-bold">Country Code</Label>
// //                 <Input
// //                   type="text"
// //                   name="countryCode"
// //                   value={selectedContact.countryCode}
// //                   onChange={handleUpdateChange}
// //                 />
// //               </div>
// //               <div className="col-md-8 mb-3">
// //                 <Label className="small fw-bold">Phone Number</Label>
// //                 <Input
// //                   type="text"
// //                   name="phoneNumber"
// //                   value={selectedContact.phoneNumber}
// //                   onChange={handleUpdateChange}
// //                 />
// //               </div>
// //             </div>

// //             <div className="mb-2">
// //               <Label className="small fw-bold">Message Content</Label>
// //               <Input
// //                 type="textarea"
// //                 name="message"
// //                 rows="5"
// //                 value={selectedContact.message}
// //                 onChange={handleUpdateChange}
// //               />
// //             </div>
// //           </Form>
// //         </ModalBody>
// //         <ModalFooter className="bg-light">
// //           <Button
// //             color="secondary"
// //             outline
// //             size="sm"
// //             onClick={() => setEditModal(false)}>
// //             Cancel
// //           </Button>
// //           <Button
// //             style={{ backgroundColor: GOLD, borderColor: GOLD, color: "#fff" }}
// //             size="sm"
// //             onClick={handleUpdateSubmit}>
// //             Update Changes
// //           </Button>
// //         </ModalFooter>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default ContactUsPage;

// "use client";
// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import dynamic from "next/dynamic";
// import {
//   Container,
//   Card,
//   CardBody,
//   Table,
//   Button,
//   FormGroup,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   Spinner,
//   Row,
//   Col,
// } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import classnames from "classnames";
// import * as authService from "../../services/authService";

// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const ContactUsPage = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   const [activeTab, setActiveTab] = useState("inquiry");
//   const [inquiries, setInquiries] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [btnLoading, setBtnLoading] = useState(false);

//   // Description State
//   const [descriptionData, setDescriptionData] = useState({
//     _id: null,
//     text: "",
//   });

//   const modules = useMemo(
//     () => ({
//       toolbar: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         [{ color: [] }, { background: [] }],
//         ["blockquote", "code-block"],
//         ["clean"],
//       ],
//     }),
//     [],
//   );

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       if (activeTab === "inquiry") {
//         const res = await authService.getAllContacts();
//         if (res.success) {
//           const data = Array.isArray(res.data)
//             ? res.data
//             : res.data?.data || [];
//           setInquiries(
//             data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
//           );
//         }
//       } else {
//         const res = await authService.getContactText();
//         // Backend handling: Agar array hai toh pehla element uthao
//         const serverData = Array.isArray(res?.data) ? res.data[0] : res.data;

//         if (serverData) {
//           setDescriptionData({
//             _id: serverData.id || serverData._id,
//             text: serverData.contactText || "",
//           });
//         } else {
//           setDescriptionData({ _id: null, text: "" });
//         }
//       }
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       toast.error("Failed to load data");
//     } finally {
//       setLoading(false);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- CRUD Actions ---

//   const handleUpdateDescription = async () => {
//     if (!descriptionData.text) return toast.warning("Editor cannot be empty!");

//     setBtnLoading(true);
//     try {
//       const payload = { contactText: descriptionData.text };

//       if (descriptionData._id) {
//         // Update existing
//         await authService.updateContactText(descriptionData._id, payload);
//         toast.success("Content updated successfully!");
//       } else {
//         // Create new if no record exists (Logic as per your service)
//         // Agar aapki service handle karti hai toh yahan POST call de sakte hain
//         toast.info("No existing record found to update.");
//       }
//       fetchData();
//     } catch (error) {
//       console.error("Update Error:", error);
//       toast.error("Update failed!");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDeleteDescription = async () => {
//     if (!descriptionData._id) return toast.info("Nothing to delete");
//     if (!window.confirm("Are you sure you want to clear the content?")) return;

//     setBtnLoading(true);
//     try {
//       await authService.deleteContactText(descriptionData._id);
//       toast.success("Content deleted successfully");
//       setDescriptionData({ _id: null, text: "" });
//       fetchData();
//     } catch (error) {
//       console.error("Delete Error:", error);
//       toast.error("Delete failed!");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   const handleDeleteInquiry = async (id) => {
//     if (!window.confirm("Delete this inquiry?")) return;
//     try {
//       await authService.deleteContact(id);
//       toast.success("Inquiry deleted");
//       fetchData();
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <Container fluid className="p-4 bg-light min-vh-100">
//       <ToastContainer theme="colored" position="top-right" />

//       {/* Header Area */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h3 className="fw-bold mb-0 text-dark">Contact Management</h3>
//           <p className="text-muted small">
//             Update website content and manage user leads
//           </p>
//         </div>
//       </div>

//       {/* Tabs Design */}
//       <Nav
//         tabs
//         className="border-0 mb-4 bg-white shadow-sm p-2 rounded-3"
//         style={{ width: "fit-content" }}>
//         <NavItem>
//           <NavLink
//             className={classnames("fw-bold border-0 px-4 py-2 rounded-2", {
//               active: activeTab === "inquiry",
//             })}
//             onClick={() => setActiveTab("inquiry")}
//             style={{ cursor: "pointer", transition: "0.3s" }}>
//             User Inquiries
//           </NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink
//             className={classnames("fw-bold border-0 px-4 py-2 rounded-2", {
//               active: activeTab === "description",
//             })}
//             onClick={() => setActiveTab("description")}
//             style={{ cursor: "pointer", transition: "0.3s" }}>
//             Page Description
//           </NavLink>
//         </NavItem>
//       </Nav>

//       <TabContent activeTab={activeTab}>
//         {/* TAB 1: USER INQUIRIES */}
//         <TabPane tabId="inquiry">
//           <Card className="border-0 shadow-sm rounded-4">
//             <CardBody className="p-0">
//               <Table hover responsive className="align-middle mb-0">
//                 <thead style={{ backgroundColor: LIGHT_GOLD }}>
//                   <tr>
//                     <th className="px-4 py-3 text-uppercase small">Sr. No.</th>
//                     <th className="text-uppercase small">Name</th>
//                     <th className="text-uppercase small">Contact Details</th>
//                     <th className="text-uppercase small">Inquiry Type</th>
//                     <th className="text-end px-4 text-uppercase small">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan="5" className="text-center py-5">
//                         <Spinner color="warning" />
//                         <p className="mt-2 text-muted">Loading inquiries...</p>
//                       </td>
//                     </tr>
//                   ) : inquiries.length > 0 ? (
//                     inquiries.map((item, index) => (
//                       <tr key={item.id || item._id}>
//                         <td className="px-4 text-muted">{index + 1}</td>
//                         <td className="fw-bold">
//                           {item.firstName} {item.lastName}
//                         </td>
//                         <td>
//                           <div className="small fw-bold">{item.email}</div>
//                           <div className="small text-muted">
//                             {item.phoneNumber}
//                           </div>
//                         </td>
//                         <td>
//                           <span className="badge bg-soft-warning text-dark border px-2 py-1">
//                             {item.inquiryType || "General"}
//                           </span>
//                         </td>
//                         <td className="text-end px-4">
//                           <Button
//                             size="sm"
//                             color="link"
//                             className="text-danger p-0 text-decoration-none"
//                             onClick={() =>
//                               handleDeleteInquiry(item.id || item._id)
//                             }>
//                             <i className="fa fa-trash-alt me-1"></i> Delete
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="5" className="text-center py-5 text-muted">
//                         No inquiries found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </CardBody>
//           </Card>
//         </TabPane>

//         {/* TAB 2: TEXT EDITOR ONLY */}
//         <TabPane tabId="description">
//           <Card className="border-0 shadow-sm rounded-4">
//             <CardBody className="p-4 p-lg-5">
//               <div className="mb-4">
//                 <h5 className="fw-bold">Contact Page Header Description</h5>
//                 <p className="text-muted small">
//                   This text will appear on the main contact page of your
//                   website.
//                 </p>
//               </div>

//               {loading ? (
//                 <div className="text-center py-5">
//                   <Spinner color="warning" />
//                 </div>
//               ) : (
//                 <Row>
//                   <Col lg={12}>
//                     <FormGroup className="mb-5">
//                       <ReactQuill
//                         theme="snow"
//                         value={descriptionData.text}
//                         onChange={(val) =>
//                           setDescriptionData({ ...descriptionData, text: val })
//                         }
//                         modules={modules}
//                         placeholder="Write your contact page description here..."
//                         style={{ height: "350px", marginBottom: "60px" }}
//                       />
//                     </FormGroup>

//                     <div className="d-flex align-items-center gap-3">
//                       <Button
//                         className="btn-gold px-5 py-2 fw-bold shadow-sm"
//                         onClick={handleUpdateDescription}
//                         disabled={btnLoading}>
//                         {btnLoading ? (
//                           <>
//                             <Spinner size="sm" /> Saving...
//                           </>
//                         ) : (
//                           "Save Changes"
//                         )}
//                       </Button>

//                       {descriptionData._id && (
//                         <Button
//                           color="light"
//                           className="border text-danger px-4 py-2 fw-bold"
//                           onClick={handleDeleteDescription}
//                           disabled={btnLoading}>
//                           Clear Content
//                         </Button>
//                       )}
//                     </div>
//                   </Col>
//                 </Row>
//               )}
//             </CardBody>
//           </Card>
//         </TabPane>
//       </TabContent>

//       <style jsx global>{`
//         .btn-gold {
//           background-color: #eebb5d !important;
//           color: white !important;
//           border: none !important;
//           transition: 0.3s;
//         }
//         .btn-gold:hover {
//           background-color: #d4a54d !important;
//           transform: translateY(-2px);
//         }
//         .nav-link {
//           color: #666 !important;
//           font-size: 14px;
//         }
//         .nav-link.active {
//           background-color: #eebb5d !important;
//           color: white !important;
//           box-shadow: 0 4px 10px rgba(238, 187, 93, 0.3);
//         }
//         .bg-soft-warning {
//           background-color: #fff9ed !important;
//         }
//         .ql-container {
//           border-bottom-left-radius: 8px;
//           border-bottom-right-radius: 8px;
//           font-size: 16px;
//         }
//         .ql-toolbar {
//           border-top-left-radius: 8px;
//           border-top-right-radius: 8px;
//           background: #f8f9fa;
//         }
//       `}</style>
//     </Container>
//   );
// };

// export default ContactUsPage;

"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Card,
  CardBody,
  Table,
  Button,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Spinner,
  Badge,
  Row,
  Col,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";
import * as authService from "../../services/authService";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ContactUsPage = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [activeTab, setActiveTab] = useState("inquiry");
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Description State - text field matches your API's "contactText"
  const [descriptionData, setDescriptionData] = useState({
    _id: null,
    text: "",
  });

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    }),
    [],
  );

  // --- GET DATA LOGIC ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "inquiry") {
        const res = await authService.getAllContacts();
        if (res.success) {
          const data = Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];
          setInquiries(
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          );
        }
      } else {
        // GET API logic
        const res = await authService.getContactText();
        // Array me se data nikalna (Kyuki get-all array deta hai)
        const serverData = Array.isArray(res?.data) ? res.data[0] : res.data;

        if (serverData) {
          setDescriptionData({
            _id: serverData.id || serverData._id, // Setting ID for Update/Delete
            text: serverData.contactText || "", // By default editor me data dikhane ke liye
          });
        } else {
          setDescriptionData({ _id: null, text: "" });
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- UPDATE LOGIC ---
  const handleUpdate = async () => {
    if (!descriptionData._id) {
      return toast.error(
        "No record found to update. Please create content first.",
      );
    }
    if (!descriptionData.text) {
      return toast.warning("Content cannot be empty.");
    }

    setBtnLoading(true);
    try {
      const payload = { contactText: descriptionData.text };
      const res = await authService.updateContactText(
        descriptionData._id,
        payload,
      );

      if (res) {
        toast.success("Content updated successfully!");
        fetchData(); // Refresh data
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update content.");
    } finally {
      setBtnLoading(false);
    }
  };

  // --- DELETE LOGIC ---
  const handleDelete = async () => {
    if (!descriptionData._id) return;
    if (!window.confirm("Are you sure you want to delete this description?"))
      return;

    setBtnLoading(true);
    try {
      await authService.deleteContactText(descriptionData._id);
      toast.success("Content deleted successfully!");
      setDescriptionData({ _id: null, text: "" }); // Reset editor
      fetchData(); // Refresh
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete content.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await authService.deleteContact(id);
      toast.success("Deleted");
      fetchData();
    } catch (e) {
      toast.error("Error deleting inquiry");
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <ToastContainer theme="colored" position="top-right" />

      <div className="mb-4">
        <h3 className="fw-bold text-dark">Contact Management</h3>
        <p className="text-muted small">
          Manage your website's contact inquiries and page content.
        </p>
      </div>

      <Nav
        tabs
        className="border-0 mb-4 bg-white shadow-sm p-2 rounded-3 w-fit">
        <NavItem>
          <NavLink
            className={classnames("fw-bold border-0 px-4 py-2 rounded-2", {
              active: activeTab === "inquiry",
            })}
            onClick={() => setActiveTab("inquiry")}
            style={{ cursor: "pointer" }}>
            User Inquiries
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames("fw-bold border-0 px-4 py-2 rounded-2", {
              active: activeTab === "description",
            })}
            onClick={() => setActiveTab("description")}
            style={{ cursor: "pointer" }}>
            Page Content (Editor)
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* INQUIRIES LIST */}
        <TabPane tabId="inquiry">
          <Card className="border-0 shadow-sm rounded-4">
            <CardBody className="p-0">
              <Table hover responsive className="align-middle mb-0">
                <thead style={{ backgroundColor: LIGHT_GOLD }}>
                  <tr>
                    <th className="px-4 py-3">Sr. No.</th>
                    <th>Name</th>
                    <th>Email / Phone</th>
                    <th>Inquiry Type</th>
                    <th className="text-end px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <Spinner color="warning" />
                      </td>
                    </tr>
                  ) : inquiries.length > 0 ? (
                    inquiries.map((item, index) => (
                      <tr key={item.id || item._id}>
                        <td className="px-4 text-muted">{index + 1}</td>
                        <td className="fw-bold">
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          {item.email} <br />
                          <small className="text-muted">
                            {item.phoneNumber}
                          </small>
                        </td>
                        <td>
                          <Badge color="light" className="text-dark border">
                            {item.inquiryType}
                          </Badge>
                        </td>
                        <td className="text-end px-4">
                          <Button
                            size="sm"
                            color="white"
                            className="text-danger border shadow-sm"
                            onClick={() => handleDeleteInquiry(item.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>

        {/* PAGE CONTENT EDITOR */}
        <TabPane tabId="description">
          <Card className="border-0 shadow-sm rounded-4">
            <CardBody className="p-4 p-lg-5">
              <div className="mb-4">
                <h5 className="fw-bold">Edit Contact Page Description</h5>
                <p className="text-muted small">
                  Update the text that appears on your website's contact
                  section.
                </p>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner color="warning" />
                </div>
              ) : (
                <>
                  <FormGroup className="mb-5">
                    <ReactQuill
                      theme="snow"
                      value={descriptionData.text}
                      onChange={(val) =>
                        setDescriptionData({ ...descriptionData, text: val })
                      }
                      modules={modules}
                      style={{ height: "350px", marginBottom: "50px" }}
                      placeholder="Start typing website content..."
                    />
                  </FormGroup>

                  <div className="d-flex gap-3">
                    <Button
                      className="btn-gold px-5 py-2 fw-bold"
                      onClick={handleUpdate}
                      disabled={btnLoading || !descriptionData._id}>
                      {btnLoading ? "Updating..." : "Update Content"}
                    </Button>

                    <Button
                      color="white"
                      className="border text-danger px-4 py-2 fw-bold"
                      onClick={handleDelete}
                      disabled={btnLoading || !descriptionData._id}>
                      Delete Record
                    </Button>
                  </div>

                  {!descriptionData._id && !loading && (
                    <p className="mt-3 text-danger small">
                      * No record found in database. Please ensure a record
                      exists to use Update/Delete.
                    </p>
                  )}
                </>
              )}
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>

      <style jsx global>{`
        .btn-gold {
          background-color: #eebb5d !important;
          color: white !important;
          border: none !important;
          box-shadow: 0 4px 10px rgba(238, 187, 93, 0.2);
        }
        .nav-link {
          color: #555 !important;
          transition: 0.3s;
        }
        .nav-link.active {
          background-color: #eebb5d !important;
          color: white !important;
          border-radius: 8px !important;
        }
        .w-fit {
          width: fit-content;
        }
      `}</style>
    </Container>
  );
};

export default ContactUsPage;