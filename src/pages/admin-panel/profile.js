// "use client";
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
// } from "reactstrap";
// import { toast } from "react-toastify";
// import * as authService from "../../services/authService";

// export default function UserProfile({ isAdmin = false }) {
//   const [loading, setLoading] = useState(false);
//   const [userId, setUserId] = useState(null);

//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phoneNo: "",
//     city: "",
//     password: "",
//     confirmPassword: "",
//     profileImage: null,
//     websiteLogo: null,
//   });
// const [isMounted, setIsMounted] = useState(false);

// useEffect(() => {
//   setIsMounted(true);
// }, []);
//   const [serverImages, setServerImages] = useState({
//     profileImage: "",
//     websiteLogo: "",
//   });

//   // UserProfile.js के अंदर useEffect को ऐसे अपडेट करें
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const admin = await authService.getAdminProfile();

//         if (admin) {
//           // आपके डेटाबेस में id 'id' नाम से है या '_id' नाम से, यह चेक कर लें
//           const currentId = admin.id || admin._id;
//           setUserId(currentId);

//           setFormData({
//             email: admin.email || "",
//             firstName: admin.firstName || "",
//             lastName: admin.lastName || "",
//             phoneNo: admin.phoneNo || "",
//             city: admin.city || "",
//             password: "",
//             confirmPassword: "",
//             profileImage: null,
//             websiteLogo: null,
//           });

//           setServerImages({
//             profileImage: admin.profileImage || "",
//             websiteLogo: admin.websiteLogo || "",
//           });
//         }
//       } catch (err) {
//         console.error("❌ Profile Load failed:", err);
//       }
//     };
//     loadProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0]) {
//       setFormData((prev) => ({ ...prev, [name]: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   // 1. Check if passwords match
//   if (formData.password !== formData.confirmPassword) {
//     return toast.error("Passwords do not match!");
//   }

//   // 2. Since your API requires passwords for update, prevent empty submission
//   if (!formData.password || !formData.confirmPassword) {
//     return toast.error(
//       "Password and Confirm Password are required by the server.",
//     );
//   }

//   setLoading(true);
//   try {
//     const fd = new FormData();
//     fd.append("firstName", formData.firstName);
//     fd.append("lastName", formData.lastName);
//     fd.append("email", formData.email);
//     fd.append("phoneNo", formData.phoneNo);
//     fd.append("city", formData.city);

//     // 3. Always append password and confirmPassword as per API requirement
//     fd.append("password", formData.password);
//     fd.append("confirmPassword", formData.confirmPassword);

//     if (formData.profileImage instanceof File) {
//       fd.append("profileImage", formData.profileImage);
//     }
//     if (formData.websiteLogo instanceof File) {
//       fd.append("websiteLogo", formData.websiteLogo);
//     }

//     const res = await authService.updateAdminProfile(userId, fd);

//     if (res) {
//       toast.success("Profile updated successfully!");
//       // Clear password fields after success
//       setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));

//       const updatedData = res.data || res;
//       setServerImages({
//         profileImage: updatedData.profileImage || serverImages.profileImage,
//         websiteLogo: updatedData.websiteLogo || serverImages.websiteLogo,
//       });
//     }
//   } catch (error) {
//     // Show the specific error message from the API
//     const errorMsg = error.response?.data?.message || "Update failed";
//     toast.error(errorMsg);
//     console.error("❌ Update failed:", error);
//   } finally {
//     setLoading(false);
//   }
// };
// const getPreview = (field) => {
//   // Prevent execution on server-side
//   if (typeof window === "undefined") return null;

//   const fileData = formData[field];

//   // Check if fileData exists and if File is defined (browser check)
//   if (fileData && typeof File !== "undefined" && fileData instanceof File) {
//     try {
//       return URL.createObjectURL(fileData);
//     } catch (err) {
//       console.error("Error creating preview URL", err);
//       return null;
//     }
//   }

//   if (serverImages[field]) {
//     return authService.getImgUrl(serverImages[field]);
//   }

//   return null;
// };

//   return (
//     <Container fluid className="py-4 px-3 px-md-4">
//       <Card className="border-0 shadow-sm rounded-4">
//         <CardBody className="p-4 p-md-5">
//           <h4 className="fw-bold mb-4" style={{ color: "#eebb5d" }}>
//             {isAdmin ? "Admin Profile Settings" : "Edit Profile"}
//           </h4>

//           <Form onSubmit={handleSubmit}>
//             <Row className="gy-3">
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">First Name</Label>
//                   <Input
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Last Name</Label>
//                   <Input
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Email</Label>
//                   <Input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Phone Number</Label>
//                   <Input
//                     name="phoneNo"
//                     value={formData.phoneNo}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col xs={12}>
//                 <FormGroup>
//                   <Label className="small fw-bold">City</Label>
//                   <Input
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>

//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Profile Picture</Label>
//                   <Input
//                     type="file"
//                     name="profileImage"
//                     onChange={handleChange}
//                     accept="image/*"
//                   />
//                   {isMounted && getPreview("profileImage") && (
//                     <img
//                       src={getPreview("profileImage")}
//                       className="mt-2 rounded border"
//                       style={{ width: 70, height: 70, objectFit: "cover" }}
//                       alt="Profile"
//                     />
//                   )}
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Website Logo</Label>
//                   <Input
//                     type="file"
//                     name="websiteLogo"
//                     onChange={handleChange}
//                     accept="image/*"
//                   />
//                   {getPreview("websiteLogo") && (
//                     <img
//                       src={getPreview("websiteLogo")}
//                       className="mt-2 rounded border"
//                       style={{
//                         width: 70,
//                         height: 70,
//                         objectFit: "contain",
//                         padding: "5px",
//                       }}
//                       alt="Logo"
//                     />
//                   )}
//                 </FormGroup>
//               </Col>

//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">New Password</Label>
//                   <Input
//                     type="password"
//                     name="password"
//                     placeholder="Leave blank to keep current"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//               <Col xs={12} md={6}>
//                 <FormGroup>
//                   <Label className="small fw-bold">Confirm Password</Label>
//                   <Input
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                   />
//                 </FormGroup>
//               </Col>
//             </Row>

//             <div className="mt-4">
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 style={{ backgroundColor: "#eebb5d", border: "none" }}
//                 className="fw-bold px-4">
//                 {loading ? "Saving..." : "Save Changes"}
//               </Button>
//             </div>
//           </Form>
//         </CardBody>
//       </Card>
//     </Container>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { toast } from "react-toastify";
import * as authService from "../../services/authService";

export default function UserProfile({ isAdmin = false }) {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNo: "",
    city: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    websiteLogo: null,
  });

  const [serverImages, setServerImages] = useState({
    profileImage: "",
    websiteLogo: "",
  });

  useEffect(() => {
    setIsMounted(true);
    const loadProfile = async () => {
      try {
        const admin = await authService.getAdminProfile();
        if (admin) {
          setUserId(admin.id || admin._id);
          setFormData({
            email: admin.email || "",
            firstName: admin.firstName || "",
            lastName: admin.lastName || "",
            phoneNo: admin.phoneNo || "",
            city: admin.city || "",
            password: "", // Shuruat mein khali rakhein
            confirmPassword: "",
            profileImage: null,
            websiteLogo: null,
          });
          setServerImages({
            profileImage: admin.profileImage || "",
            websiteLogo: admin.websiteLogo || "",
          });
        }
      } catch (err) {
        console.error("❌ Profile Load failed:", err);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic... (Match passwords etc)
    if (formData.password && formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("firstName", formData.firstName);
      fd.append("lastName", formData.lastName);
      fd.append("email", formData.email);
      fd.append("phoneNo", formData.phoneNo);
      fd.append("city", formData.city);

      if (formData.password) {
        fd.append("password", formData.password);
        fd.append("confirmPassword", formData.confirmPassword);
      }

      if (formData.profileImage instanceof File)
        fd.append("profileImage", formData.profileImage);
      if (formData.websiteLogo instanceof File)
        fd.append("websiteLogo", formData.websiteLogo);

      const res = await authService.updateAdminProfile(userId, fd);

      // --- YAHAN FIX HAI ---
      if (res) {
        toast.success("Profile updated successfully!");

        // 1. Backend se aaya naya data lein
        const updatedAdmin = res.data || res.admin || res;

        // 2. LocalStorage ko update karein taaki CMS ko ID mil sake
        // Hum poora object save karenge jisme 'id: 1' ho
        localStorage.setItem("user", JSON.stringify(updatedAdmin));

        // 3. Password fields khali karein
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));

        // 4. UI images update karein
        setServerImages({
          profileImage: updatedAdmin.profileImage || serverImages.profileImage,
          websiteLogo: updatedAdmin.websiteLogo || serverImages.websiteLogo,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const getPreview = (field) => {
    if (!isMounted) return null;
    const fileData = formData[field];
    if (fileData instanceof File) return URL.createObjectURL(fileData);
    if (serverImages[field]) return authService.getImgUrl(serverImages[field]);
    return null;
  };

  return (
    <Container fluid className="py-4">
      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-4 p-md-5">
          <h4 className="fw-bold mb-4" style={{ color: "#eebb5d" }}>
            Admin Profile Settings
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">First Name</Label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Last Name</Label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Phone Number</Label>
                  <Input
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label className="small fw-bold">City</Label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Profile Picture</Label>
                  <Input
                    type="file"
                    name="profileImage"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  {getPreview("profileImage") && (
                    <img
                      src={getPreview("profileImage")}
                      className="mt-2 rounded border"
                      style={{ width: 70, height: 70, objectFit: "cover" }}
                      alt="Profile"
                    />
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Website Logo</Label>
                  <Input
                    type="file"
                    name="websiteLogo"
                    onChange={handleChange}
                    accept="image/*"
                  />
                  {getPreview("websiteLogo") && (
                    <img
                      src={getPreview("websiteLogo")}
                      className="mt-2 rounded border"
                      style={{ width: 70, height: 70, objectFit: "contain" }}
                      alt="Logo"
                    />
                  )}
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">
                    New Password (Leave blank to keep current)
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Confirm New Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "#eebb5d", border: "none" }}
              className="fw-bold px-4 mt-3">
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}