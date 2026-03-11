// import React, { useState, useEffect, useCallback } from "react";
// import dynamic from "next/dynamic";
// import {
//   Container,
//   Row,
//   Col,
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
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   Badge,
//   FormText,
//   ModalFooter,
// } from "reactstrap";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import * as authService from "../../services/authService";
// import PaginationComponent from "../../context/Pagination";

// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), {
//   ssr: false,
// });

// const Events = () => {
//   const GOLD = "#eebb5d";
//   const LIGHT_GOLD = "#fdf8ef";

//   const [eventsList, setEventsList] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [cities, setCities] = useState([]);

//   // ✨ Static Attorneys as requested
//   const [attorneys] = useState([
//     { id: 1, firstName: "John", lastName: "Doe" },
//     { id: 2, firstName: "Jane", lastName: "Smith" },
//     { id: 3, firstName: "Robert", lastName: "Brown" },
//   ]);

//   const [modal, setModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   // ✨ Banner Modal State
//   const [bannerModalOpen, setBannerModal] = useState(false);
//   const [bannerData, setBannerData] = useState({
//     image: null,
//     description: "",
//   });

//   const toggleBannerModal = () => {
//     setBannerModal(!bannerModalOpen);
//     if (!bannerModalOpen) setBannerData({ image: null, description: "" });
//   };

//   const [formData, setFormData] = useState({
//     title: "",
//     startDate: "",
//     endDate: "",
//     startTime: "", // Added parameter
//     endTime: "", // Added parameter
//     description: "",
//     registrationLink: "",
//     linkedin: "",
//     facebook: "",
//     twitter: "",
//     bannerImage: null,
//     capabilityCategoryId: "",
//     subcategoryIds: [],
//     countryId: "",
//     cityIds: [],
//     attorneyIds: [],
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const safeArray = (res) => {
//     if (Array.isArray(res)) return res;
//     if (res?.data && Array.isArray(res.data)) return res.data;
//     if (res?.data?.data && Array.isArray(res.data.data)) return res.data.data;
//     return [];
//   };

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const eventRes = await authService.getAllEvents().catch(() => []);
//       const catRes = await authService
//         .getAllCapabilityCategories()
//         .catch(() => []);
//       const subRes = await authService
//         .getAllCapabilitySubCategories()
//         .catch(() => []);
//       const countRes = await authService.getAllCountries().catch(() => []);
//       const cityRes = await authService.getAllCities().catch(() => []);

//       setEventsList(safeArray(eventRes));
//       setCategories(safeArray(catRes));
//       setSubcategories(safeArray(subRes));
//       setCountries(safeArray(countRes));
//       setCities(safeArray(cityRes));
//     } catch (error) {
//       console.error("Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleCheckboxChange = (id, field) => {
//     const numId = Number(id);
//     setFormData((prev) => {
//       const list = Array.isArray(prev[field]) ? [...prev[field]] : [];
//       return {
//         ...prev,
//         [field]: list.includes(numId)
//           ? list.filter((i) => i !== numId)
//           : [...list, numId],
//       };
//     });
//   };

//   const toggle = () => {
//     setModal(!modal);
//     if (modal) {
//       setFormData({
//         title: "",
//         startDate: "",
//         endDate: "",
//         startTime: "", // Reset
//         endTime: "", // Reset
//         description: "",
//         registrationLink: "",
//         linkedin: "",
//         facebook: "",
//         twitter: "",
//         bannerImage: null,
//         capabilityCategoryId: "",
//         subcategoryIds: [],
//         countryId: "",
//         cityIds: [],
//         attorneyIds: [],
//       });
//       setIsEditing(false);
//       setCurrentId(null);
//     }
//   };

//   // banner image
//   // ✨ Added missing helper functions
//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setBannerData({ ...bannerData, image: e.target.files[0] });
//     }
//   };

//   const saveBanner = async () => {
//     if (!bannerData.image) return toast.error("Please select an image");
//     setLoading(true);
//     try {
//       // Logic for uploading banner would go here
//       // const res = await authService.uploadBanner(bannerData);
//       toast.success("Banner uploaded successfully!");
//       toggleBannerModal();
//     } catch (error) {
//       toast.error("Failed to upload banner");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const currentAdminId = authService.getAdminId();

//     if (!currentAdminId) {
//       toast.error("Session expired. Please login again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = new FormData();
//       data.append("adminId", currentAdminId);
//       data.append("title", formData.title);
//       data.append("startDate", formData.startDate);
//       data.append("endDate", formData.endDate);
//       data.append("startTime", formData.startTime); // Added to API payload
//       data.append("endTime", formData.endTime); // Added to API payload
//       data.append("description", formData.description);
//       data.append("registrationLink", formData.registrationLink || "");
//       data.append("linkedin", formData.linkedin || "");
//       data.append("facebook", formData.facebook || "");
//       data.append("twitter", formData.twitter || "");
//       data.append("capabilityCategoryId", formData.capabilityCategoryId);
//       data.append("countryId", formData.countryId);
//       data.append("subcategoryIds", JSON.stringify(formData.subcategoryIds));
//       data.append("cityIds", JSON.stringify(formData.cityIds));
//       data.append("attorneyIds", JSON.stringify(formData.attorneyIds));

//       if (formData.bannerImage instanceof File) {
//         data.append("bannerImage", formData.bannerImage);
//       }
//       console.log("State:", formData);
//       console.log("FormData:", Object.fromEntries(data));

//       let res;
//       if (isEditing) {
//         res = await authService.updateEvent(currentId, data);
//       } else {
//         res = await authService.createEvent(formData);
//       }

//       if (res) {
//         toast.success(
//           isEditing ? "Updated Successfully!" : "Created Successfully!",
//         );
//         toggle();
//         fetchData();
//       }
//     } catch (err) {
//       console.error("Submit Error:", err);
//       toast.error("Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     const parseIds = (v) => {
//       try {
//         if (Array.isArray(v)) return v.map(Number);
//         const parsed = typeof v === "string" ? JSON.parse(v) : v;
//         return Array.isArray(parsed) ? parsed.map(Number) : [];
//       } catch {
//         return [];
//       }
//     };

//     setFormData({
//       ...item,
//       bannerImage: null,
//       startDate: item.startDate ? item.startDate.split("T")[0] : "",
//       endDate: item.endDate ? item.endDate.split("T")[0] : "",
//       startTime: item.startTime || "", // Load from API
//       endTime: item.endTime || "", // Load from API
//       capabilityCategoryId: String(item.capabilityCategoryId),
//       countryId: String(item.countryId),
//       subcategoryIds: parseIds(item.subcategoryIds),
//       cityIds: parseIds(item.cityIds),
//       attorneyIds: parseIds(item.attorneyIds),
//     });
//     setCurrentId(item.id);
//     setIsEditing(true);
//     setModal(true);
//   };

//   const Selector = ({ label, items, field, type, nameKey }) => (
//     <FormGroup>
//       <Label className="fw-bold small">{label}</Label>
//       <Dropdown
//         isOpen={openDropdown === type}
//         toggle={() => setOpenDropdown(openDropdown === type ? null : type)}>
//         <DropdownToggle
//           caret
//           className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark">
//           {(formData[field] || []).length > 0
//             ? `${formData[field].length} Selected`
//             : `Select ${label}`}
//         </DropdownToggle>
//         <DropdownMenu
//           className="w-100 shadow-lg border-0 p-2"
//           style={{ maxHeight: "250px", overflowY: "auto" }}>
//           {items && items.length > 0 ? (
//             items.map((item) => (
//               <div
//                 key={item.id}
//                 className="d-flex align-items-center p-2 dropdown-item"
//                 onClick={(e) => e.stopPropagation()}>
//                 <Input
//                   type="checkbox"
//                   className="me-2 cursor-pointer"
//                   checked={(formData[field] || []).includes(Number(item.id))}
//                   onChange={() => handleCheckboxChange(item.id, field)}
//                 />
//                 <span
//                   className="small cursor-pointer"
//                   onClick={() => handleCheckboxChange(item.id, field)}>
//                   {item[nameKey] ||
//                     (item.firstName
//                       ? `${item.firstName} ${item.lastName || ""}`
//                       : `ID: ${item.id}`)}
//                 </span>
//               </div>
//             ))
//           ) : (
//             <div className="p-2 text-muted small text-center">
//               No {label} found
//             </div>
//           )}
//         </DropdownMenu>
//       </Dropdown>
//     </FormGroup>
//   );

//   const currentItems = eventsList.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   return (
//     <Container
//       fluid
//       className="p-3 p-md-4 min-vh-100"
//       style={{ backgroundColor: "#f9f9f9" }}>
//       <ToastContainer />
//       {/* HEADER SECTION */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <div>
//           <h4 className="fw-bold mb-0">Events Management</h4>
//           <p className="text-muted small">
//             Manage global conferences and webinars.
//           </p>
//         </div>
//         <div className="d-flex gap-2">
//           <Button
//             className="px-4 text-white fw-bold shadow-sm"
//             style={{ backgroundColor: GOLD, border: "none" }}
//             onClick={toggle}>
//             + Add New Event
//           </Button>
//           <Button
//             className="px-4 text-white fw-bold shadow-sm"
//             style={{ backgroundColor: GOLD, border: "none" }}
//             onClick={toggleBannerModal}>
//             + Add Event Banner
//           </Button>
//         </div>
//       </div>

//       <Card className="border-0 shadow-sm rounded-4">
//         <CardBody className="p-0">
//           <div className="table-responsive">
//             <Table hover className="align-middle mb-0">
//               <thead style={{ backgroundColor: LIGHT_GOLD }}>
//                 <tr>
//                   <th className="px-4">SR.</th>
//                   <th>BANNER</th>
//                   <th>EVENT TITLE</th>
//                   <th className="text-end px-4">ACTION</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.length > 0 ? (
//                   currentItems.map((item, index) => (
//                     <tr key={item.id}>
//                       <td className="px-4 text-muted">
//                         {(currentPage - 1) * itemsPerPage + index + 1}.
//                       </td>
//                       <td>
//                         <img
//                           src={authService.getImgUrl(item.bannerImage)}
//                           style={{
//                             width: "80px",
//                             height: "45px",
//                             borderRadius: "6px",
//                             objectFit: "cover",
//                           }}
//                           onError={(e) =>
//                             (e.target.src =
//                               "https://placehold.co/80x45?text=No+Img")
//                           }
//                           alt="Banner"
//                         />
//                       </td>
//                       <td className="fw-bold">{item.title}</td>
//                       <td className="text-end px-4">
//                         <Button
//                           size="sm"
//                           color="white"
//                           className="border shadow-sm me-2"
//                           onClick={() => handleEdit(item)}>
//                           ✏️
//                         </Button>
//                         <Button
//                           size="sm"
//                           color="white"
//                           className="text-danger border shadow-sm"
//                           onClick={() => {
//                             if (window.confirm("Delete?"))
//                               authService
//                                 .deleteEvent(item.id)
//                                 .then(() => fetchData());
//                           }}>
//                           🗑️
//                         </Button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5" className="text-center py-5 text-muted">
//                       No events found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </CardBody>
//       </Card>

//       <div className="mt-3">
//         <PaginationComponent
//           totalItems={eventsList.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       {/* NEW BANNER MODAL */}
//       <Modal
//         isOpen={bannerModalOpen}
//         toggle={toggleBannerModal}
//         size="lg"
//         centered>
//         <ModalHeader toggle={toggleBannerModal}>
//           Add New Event Banner
//         </ModalHeader>
//         <ModalBody>
//           <Form>
//             <FormGroup>
//               <Label className="fw-bold">Banner Image</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//               />
//               <FormText color="muted">Recommended size: 1920x1080px.</FormText>
//             </FormGroup>
//             <FormGroup className="mt-3">
//               <Label className="fw-bold">Banner Description</Label>
//               <ReactQuill
//                 theme="snow"
//                 value={bannerData.description}
//                 onChange={(content) =>
//                   setBannerData({ ...bannerData, description: content })
//                 }
//                 style={{ height: "200px", marginBottom: "50px" }}
//               />
//             </FormGroup>
//           </Form>
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggleBannerModal}>
//             Cancel
//           </Button>
//           <Button
//             style={{ backgroundColor: GOLD, color: "#fff" }}
//             onClick={saveBanner}
//             disabled={loading}>
//             {loading ? "Uploading..." : "Upload Banner"}
//           </Button>
//         </ModalFooter>
//       </Modal>

//       <Modal isOpen={modal} toggle={toggle} centered size="xl" scrollable>
//         <ModalHeader
//           toggle={toggle}
//           className="fw-bold"
//           style={{ color: GOLD }}>
//           {isEditing ? "Update Event" : "Create New Event"}
//         </ModalHeader>
//         <ModalBody className="px-4 pb-4">
//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col md={12}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Event Title *</Label>
//                   <Input
//                     value={formData.title}
//                     onChange={(e) =>
//                       setFormData({ ...formData, title: e.target.value })
//                     }
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Start Date *</Label>
//                   <Input
//                     type="date"
//                     value={formData.startDate}
//                     onChange={(e) =>
//                       setFormData({ ...formData, startDate: e.target.value })
//                     }
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="fw-bold small">End Date *</Label>
//                   <Input
//                     type="date"
//                     value={formData.endDate}
//                     onChange={(e) =>
//                       setFormData({ ...formData, endDate: e.target.value })
//                     }
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               {/* --- New Start Time Field --- */}
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Start Time</Label>
//                   <Input
//                     type="time"
//                     value={formData.startTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, startTime: e.target.value })
//                     }
//                   />
//                 </FormGroup>
//               </Col>
//               {/* --- New End Time Field --- */}
//               <Col md={3}>
//                 <FormGroup>
//                   <Label className="fw-bold small">End Time</Label>
//                   <Input
//                     type="time"
//                     value={formData.endTime}
//                     onChange={(e) =>
//                       setFormData({ ...formData, endTime: e.target.value })
//                     }
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Main Category *</Label>
//                   <Input
//                     type="select"
//                     value={formData.capabilityCategoryId}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         capabilityCategoryId: e.target.value,
//                       })
//                     }
//                     required>
//                     <option value="">-- Select Category --</option>
//                     {categories.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.categoryName}
//                       </option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Country *</Label>
//                   <Input
//                     type="select"
//                     value={formData.countryId}
//                     onChange={(e) =>
//                       setFormData({ ...formData, countryId: e.target.value })
//                     }
//                     required>
//                     <option value="">-- Select Country --</option>
//                     {countries.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.countryName}
//                       </option>
//                     ))}
//                   </Input>
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <Selector
//                   label="Subcategories"
//                   items={subcategories}
//                   field="subcategoryIds"
//                   type="sub"
//                   nameKey="subcategoryName"
//                 />
//               </Col>
//               <Col md={4}>
//                 <Selector
//                   label="Cities"
//                   items={cities}
//                   field="cityIds"
//                   type="city"
//                   nameKey="cityName"
//                 />
//               </Col>
//               <Col md={4}>
//                 <Selector
//                   label="Attorneys (Static)"
//                   items={attorneys}
//                   field="attorneyIds"
//                   type="attor"
//                   nameKey="firstName"
//                 />
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Banner Image</Label>
//                   <Input
//                     type="file"
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         bannerImage: e.target.files[0],
//                       })
//                     }
//                     accept="image/*"
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={6}>
//                 <FormGroup>
//                   <Label className="fw-bold small">Registration Link</Label>
//                   <Input
//                     value={formData.registrationLink}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         registrationLink: e.target.value,
//                       })
//                     }
//                   />
//                 </FormGroup>
//               </Col>
//               <Col md={4}>
//                 <Label className="small fw-bold">LinkedIn</Label>
//                 <Input
//                   value={formData.linkedin}
//                   onChange={(e) =>
//                     setFormData({ ...formData, linkedin: e.target.value })
//                   }
//                 />
//               </Col>
//               <Col md={4}>
//                 <Label className="small fw-bold">Facebook</Label>
//                 <Input
//                   value={formData.facebook}
//                   onChange={(e) =>
//                     setFormData({ ...formData, facebook: e.target.value })
//                   }
//                 />
//               </Col>
//               <Col md={4}>
//                 <Label className="small fw-bold">Twitter</Label>
//                 <Input
//                   value={formData.twitter}
//                   onChange={(e) =>
//                     setFormData({ ...formData, twitter: e.target.value })
//                   }
//                 />
//               </Col>
//               <Col xs={12}>
//                 <Label className="fw-bold small">Description *</Label>
//                 <div style={{ height: "250px", marginBottom: "50px" }}>
//                   <ReactQuill
//                     theme="snow"
//                     value={formData.description}
//                     onChange={(v) =>
//                       setFormData({ ...formData, description: v })
//                     }
//                     style={{ height: "200px" }}
//                   />
//                 </div>
//               </Col>
//             </Row>
//             <div className="mt-4 d-flex gap-2">
//               <Button
//                 type="submit"
//                 className="px-5 text-white fw-bold shadow-sm"
//                 style={{ backgroundColor: GOLD, border: "none" }}
//                 disabled={loading}>
//                 {loading ? "Saving..." : "Save Event"}
//               </Button>
//               <Button outline className="px-5 fw-bold" onClick={toggle}>
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         </ModalBody>
//       </Modal>
//     </Container>
//   );
// };;;

// export default Events;

import React, { useState, useEffect, useCallback } from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  FormText,
  ModalFooter,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const Events = () => {
  const GOLD = "#b36b39";
  const LIGHT_GOLD = "#fdf8ef";

  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState("Event Banners");

  // --- DATA STATE ---
  const [eventsList, setEventsList] = useState([]);
  const [bannersList, setBannersList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [attorneys] = useState([
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jane", lastName: "Smith" },
    { id: 3, firstName: "Robert", lastName: "Brown" },
  ]);

  // --- MODALS ---
  const [modal, setModal] = useState(false);
  const [bannerModalOpen, setBannerModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    registrationLink: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    bannerImage: null,
    capabilityCategoryId: "",
    subcategoryIds: [],
    countryId: "",
    cityIds: [],
    attorneyIds: [],
  });

  const [bannerData, setBannerData] = useState({
    image: null,
    description: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const safeArray = (res) => {
    if (Array.isArray(res)) return res;
    if (res?.data && Array.isArray(res.data)) return res.data;
    if (res?.data?.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const eventBannerRes = await authService.getBanner().catch(() => []);
      const eventRes = await authService.getAllEvents().catch(() => []);
      const catRes = await authService
        .getAllCapabilityCategories()
        .catch(() => []);
      const subRes = await authService
        .getAllCapabilitySubCategories()
        .catch(() => []);
      const countRes = await authService.getAllCountries().catch(() => []);
      const cityRes = await authService.getAllCities().catch(() => []);

      setEventsList(safeArray(eventRes));
      setCategories(safeArray(catRes));
      setSubcategories(safeArray(subRes));
      setCountries(safeArray(countRes));
      setCities(safeArray(cityRes));

      setBannersList(safeArray(eventBannerRes));
      setEventsList(safeArray(eventRes));
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (!modal) {
      setFormData({
        title: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        registrationLink: "",
        linkedin: "",
        facebook: "",
        twitter: "",
        bannerImage: null,
        capabilityCategoryId: "",
        subcategoryIds: [],
        countryId: "",
        cityIds: [],
        attorneyIds: [],
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const toggleBannerModal = () => {
    setBannerModal(!bannerModalOpen);
    if (!bannerModalOpen) {
      setBannerData({ image: null, description: "" });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleCheckboxChange = (id, field) => {
    const numId = Number(id);
    setFormData((prev) => {
      const list = Array.isArray(prev[field]) ? [...prev[field]] : [];
      return {
        ...prev,
        [field]: list.includes(numId)
          ? list.filter((i) => i !== numId)
          : [...list, numId],
      };
    });
  };

  // --- NEW: EDIT BANNER HANDLER ---
  const handleEditBanner = (item) => {
    setBannerData({
      image: null,
      description: item.textEditor || "",
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setBannerModal(true);
  };

  // --- NEW: DELETE BANNER HANDLER ---
  const handleDeleteBanner = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await authService.deleteBannerEvent(id);
        toast.success("Banner deleted successfully");
        fetchData();
      } catch (err) {
        toast.error("Failed to delete banner");
      }
    }
  };

  const saveBanner = async (e) => {
    if (e) e.preventDefault();
    const currentAdminId = authService.getAdminId();
    if (!currentAdminId) return toast.error("Session expired.");

    if (!isEditing && !bannerData.image) {
      return toast.error("Please select a banner image.");
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("textEditor", bannerData.description);

      if (bannerData.image instanceof File) {
        data.append("bannerImage", bannerData.image);
      }

      const res = isEditing
        ? await authService.updateBannerEvent(currentId, data)
        : await authService.createBannerEvent(data);

      if (res) {
        toast.success(isEditing ? "Banner Updated!" : "Banner Created!");
        toggleBannerModal();
        fetchData();
      }
    } catch (err) {
      console.error(err);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentAdminId = authService.getAdminId();
    if (!currentAdminId) return toast.error("Session expired.");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", currentAdminId);
      data.append("title", formData.title);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("startTime", formData.startTime);
      data.append("endTime", formData.endTime);
      data.append("description", formData.description);
      data.append("capabilityCategoryId", formData.capabilityCategoryId);
      data.append("countryId", formData.countryId);
      data.append("subcategoryIds", JSON.stringify(formData.subcategoryIds));
      data.append("cityIds", JSON.stringify(formData.cityIds));
      data.append("attorneyIds", JSON.stringify(formData.attorneyIds));

      if (formData.bannerImage instanceof File) {
        data.append("bannerImage", formData.bannerImage);
      }

      let res = isEditing
        ? await authService.updateEvent(currentId, data)
        : await authService.createEvent(data);

      if (res) {
        toast.success(isEditing ? "Updated!" : "Created!");
        toggle();
        fetchData();
      }
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      bannerImage: null,
      startDate: item.startDate ? item.startDate.split("T")[0] : "",
      endDate: item.endDate ? item.endDate.split("T")[0] : "",
      capabilityCategoryId: String(item.capabilityCategoryId),
      countryId: String(item.countryId),
      subcategoryIds: Array.isArray(item.subcategoryIds)
        ? item.subcategoryIds.map(Number)
        : [],
      cityIds: Array.isArray(item.cityIds) ? item.cityIds.map(Number) : [],
      attorneyIds: Array.isArray(item.attorneyIds)
        ? item.attorneyIds.map(Number)
        : [],
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const Selector = ({ label, items, field, type, nameKey }) => (
    <FormGroup>
      <Label className="fw-bold small">{label}</Label>
      <Dropdown
        isOpen={openDropdown === type}
        toggle={() => setOpenDropdown(openDropdown === type ? null : type)}>
        <DropdownToggle
          caret
          className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark">
          {(formData[field] || []).length > 0
            ? `${formData[field].length} Selected`
            : `Select ${label}`}
        </DropdownToggle>
        <DropdownMenu
          className="w-100 shadow-lg border-0 p-2"
          style={{ maxHeight: "250px", overflowY: "auto" }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center p-2 dropdown-item"
              onClick={(e) => e.stopPropagation()}>
              <Input
                type="checkbox"
                className="me-2"
                checked={(formData[field] || []).includes(Number(item.id))}
                onChange={() => handleCheckboxChange(item.id, field)}
              />
              <span className="small">
                {item[nameKey] || `${item.firstName} ${item.lastName || ""}`}
              </span>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );

  const currentItems = eventsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer />

      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: "#1a365d" }}>
          Events Management
        </h2>
        <p className="text-muted small">
          Manage global conferences and webinars.
        </p>

        <div className="d-flex border-bottom mb-4 overflow-auto">
          {["Event Banners", "Events"].map((tab) => (
            <Button
              key={tab}
              color="link"
              className={`text-decoration-none px-3 py-2 fw-bold text-nowrap ${activeTab === tab ? "border-bottom border-3 border-warning text-dark" : "text-muted"}`}
              onClick={() => setActiveTab(tab)}
              style={{ fontSize: "14px" }}>
              {tab}
            </Button>
          ))}
        </div>

        <div className="d-flex justify-content-start mb-3">
          <Button
            className="text-white fw-bold shadow-sm"
            style={{
              backgroundColor: GOLD,
              border: "none",
              borderRadius: "4px",
            }}
            onClick={
              activeTab === "Event Banners" ? toggleBannerModal : toggle
            }>
            {activeTab === "Event Banners" ? "+ Add Banner" : "+ Add New Event"}
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm rounded-0">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0 border">
              <thead style={{ backgroundColor: "#fdfdfd" }}>
                <tr>
                  <th className="px-4" width="10%">
                    ID
                  </th>
                  <th width="15%">
                    {activeTab === "Event Banners" ? "BANNER" : "BANNER"}
                  </th>
                  <th width="55%">
                    {activeTab === "Event Banners"
                      ? "DESCRIPTION"
                      : "EVENT TITLE"}
                  </th>
                  <th className="text-end px-4" width="20%">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeTab === "Event Banners" ? (
                  bannersList.length > 0 ? (
                    bannersList.map((b, i) => (
                      <tr key={b.id || i}>
                        <td className="px-4">{i + 1}</td>
                        <td>
                          <img
                            src={authService.getImgUrl(b.bannerImage)}
                            alt="banner"
                            style={{
                              height: "40px",
                              width: "70px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                            onError={(e) =>
                              (e.target.src =
                                "https://placehold.co/70x40?text=No+Img")
                            }
                          />
                        </td>
                        <td className="small">
                          <div
                            dangerouslySetInnerHTML={{ __html: b.textEditor }}
                          />
                        </td>
                        <td className="text-end px-4">
                          <Button
                            size="sm"
                            color="link"
                            onClick={() => handleEditBanner(b)}>
                            ✏️
                          </Button>
                          <Button
                            size="sm"
                            color="link"
                            className="text-danger"
                            onClick={() => handleDeleteBanner(b.id)}>
                            🗑️
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-5 text-muted small">
                        No Banners Added Yet
                      </td>
                    </tr>
                  )
                ) : currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td>
                        <img
                          src={authService.getImgUrl(item.bannerImage)}
                          alt="Event Banner"
                          style={{
                            height: "40px",
                            width: "70px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                          onError={(e) =>
                            (e.target.src =
                              "https://placehold.co/70x40?text=No+Img")
                          }
                        />
                      </td>
                      <td className="fw-bold">{item.title}</td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="link"
                          onClick={() => handleEdit(item)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="link"
                          className="text-danger"
                          onClick={() => {
                            if (window.confirm("Delete?"))
                              authService.deleteEvent(item.id).then(fetchData);
                          }}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-5 text-muted small">
                      No Events Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent
          totalItems={
            activeTab === "Event Banners"
              ? bannersList.length
              : eventsList.length
          }
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* --- EVENT MODAL --- */}
      <Modal isOpen={modal} toggle={toggle} centered size="xl" scrollable>
        <ModalHeader toggle={toggle} style={{ color: GOLD }}>
          {isEditing ? "Update Event" : "Create New Event"}
        </ModalHeader>
        <ModalBody className="px-4 pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={12}>
                <FormGroup>
                  <Label className="fw-bold small">Event Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="fw-bold small">Start Date *</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="fw-bold small">End Date *</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="fw-bold small">Start Time</Label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="fw-bold small">End Time</Label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Main Category *</Label>
                  <Input
                    type="select"
                    value={formData.capabilityCategoryId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capabilityCategoryId: e.target.value,
                      })
                    }
                    required>
                    <option value="">-- Select Category --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.categoryName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Country *</Label>
                  <Input
                    type="select"
                    value={formData.countryId}
                    onChange={(e) =>
                      setFormData({ ...formData, countryId: e.target.value })
                    }
                    required>
                    <option value="">-- Select Country --</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.countryName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <Selector
                  label="Subcategories"
                  items={subcategories}
                  field="subcategoryIds"
                  type="sub"
                  nameKey="subcategoryName"
                />
              </Col>
              <Col md={4}>
                <Selector
                  label="Cities"
                  items={cities}
                  field="cityIds"
                  type="city"
                  nameKey="cityName"
                />
              </Col>
              <Col md={4}>
                <Selector
                  label="Attorneys"
                  items={attorneys}
                  field="attorneyIds"
                  type="attor"
                  nameKey="firstName"
                />
              </Col>
              <Col md={12}>
                <Label className="fw-bold small">Description *</Label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(v) => setFormData({ ...formData, description: v })}
                  style={{ height: "200px", marginBottom: "50px" }}
                />
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="fw-bold small">Banner Image</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bannerImage: e.target.files[0],
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                className="px-5 text-white fw-bold shadow-sm"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}>
                {loading ? "Saving..." : "Save Event"}
              </Button>
              <Button outline className="px-5 fw-bold" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* --- BANNER MODAL --- */}
      <Modal
        isOpen={bannerModalOpen}
        toggle={toggleBannerModal}
        size="lg"
        centered>
        <ModalHeader toggle={toggleBannerModal}>
          {isEditing ? "Edit Banner" : "Add Home Banner"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label className="fw-bold">Image</Label>
            <Input
              type="file"
              onChange={(e) =>
                setBannerData({ ...bannerData, image: e.target.files[0] })
              }
            />
            {isEditing && (
              <FormText color="muted">
                Leave blank to keep current image
              </FormText>
            )}
          </FormGroup>
          <FormGroup>
            <Label className="fw-bold">Description Text</Label>
            <ReactQuill
              theme="snow"
              value={bannerData.description}
              onChange={(v) => setBannerData({ ...bannerData, description: v })}
              style={{ height: "150px", marginBottom: "40px" }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleBannerModal}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: GOLD, color: "#fff" }}
            onClick={saveBanner}
            disabled={loading}>
            {loading
              ? "Saving..."
              : isEditing
                ? "Update Banner"
                : "Save Banner"}
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Events;
