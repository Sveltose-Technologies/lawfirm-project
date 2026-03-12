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

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CapabilitySubCategory = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [subcategories, setSubcategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryId: "",
    subcategoryName: "",
    description: "",
    bannerImage: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✨ HTML को साफ़ इंग्लिश टेक्स्ट में बदलने का फंक्शन
  const stripHtml = (html) => {
    if (!html) return "";
    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const text = doc.body.textContent || "";
      return text.replace(/\s+/g, " ").trim(); // फालतू स्पेस और entities हटाना
    }
    return html;
  };

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
    console.log("🔄 Fetching Subcategories and Parent Categories...");
    try {
      const [subRes, catRes] = await Promise.all([
        authService.getAllCapabilitySubCategories(),
        authService.getAllCapabilityCategories(),
      ]);

      // Subcategories logic
      const subData = subRes.data || subRes || [];
      setSubcategories(Array.isArray(subData) ? subData : []);

      // Parent categories logic
      const catData = catRes.data || catRes || [];
      setParentCategories(Array.isArray(catData) ? catData : []);

      console.log("✅ Data loaded successfully");
    } catch (error) {
      console.error("❌ Fetch Data Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFormData({
        categoryId: "",
        subcategoryName: "",
        description: "",
        bannerImage: null,
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const getCategoryName = (id) => {
    const found = parentCategories.find((cat) => String(cat.id) === String(id));
    return found ? found.categoryName : `ID: ${id}`;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (
    !formData.categoryId ||
    !formData.subcategoryName ||
    !formData.description
  ) {
    alert("Please fill all required fields!");
    return;
  }

  setLoading(true);
  try {
    const dataToSend = new FormData();
    dataToSend.append("adminId", "1");
    dataToSend.append("categoryId", formData.categoryId);
    dataToSend.append("subcategoryName", formData.subcategoryName.trim());
    dataToSend.append("description", formData.description);

    // Only append image if a new file is selected
    if (formData.bannerImage instanceof File) {
      dataToSend.append("bannerImage", formData.bannerImage);
    }

    let res;
    if (isEditing && currentId) {
      console.log(`📤 Updating ID: ${currentId}`);
      res = await authService.updateCapabilitySubCategory(
        currentId,
        dataToSend,
      );
    } else {
      console.log("📤 Creating new subcategory...");
      res = await authService.createCapabilitySubCategory(dataToSend);
    }

    // Check res.success specifically
    if (res && res.success) {
      alert(isEditing ? "Updated Successfully!" : "Created Successfully!");
      toggle(); // Reset form and close modal
      fetchData(); // Refresh table
    } else {
      alert("Error: " + (res?.message || "Something went wrong"));
    }
  } catch (err) {
    console.error("❌ Submit Error:", err);
    alert("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

// In handleEdit, ensure ID is set
const handleEdit = (item) => {
  console.log("✏️ Editing Item:", item);
  setFormData({
    categoryId: item.categoryId || "",
    subcategoryName: item.subcategoryName || "",
    description: item.description || "",
    bannerImage: null, // Reset file input
  });
  setCurrentId(item.id); // VERY IMPORTANT
  setIsEditing(true);
  setModal(true);
};
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        console.log("🗑️ Deleting ID:", id);
        await authService.deleteCapabilitySubCategory(id);
        fetchData();
      } catch (error) {
        console.error("❌ Delete Error:", error);
      }
    }
  };

  const currentItems = subcategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-0">Capability Subcategories</h4>
          <p className="text-muted small">
            Manage services and sub-practice areas.
          </p>
        </div>
        <Button
          className="px-4 shadow-sm text-white"
          style={{ backgroundColor: GOLD, border: "none" }}
          onClick={toggle}>
          + Add Subcategory
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="px-4">SR.</th>
                  <th>IMAGE</th>
                  <th>SUBCATEGORY NAME</th>
                  <th>PARENT CATEGORY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td>
                        <div
                          style={{
                            width: "65px",
                            height: "40px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            border: "1px solid #eee",
                          }}>
                          <img
                            src={authService.getImgUrl(item.bannerImage)}
                            alt="category"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/60x40?text=No+Img";
                            }}
                          />
                        </div>
                      </td>
                      <td className="fw-bold">{item.subcategoryName}</td>
                      <td>
                        <Badge
                          pill
                          style={{
                            backgroundColor: LIGHT_GOLD,
                            color: GOLD,
                            border: `1px solid ${GOLD}`,
                          }}>
                          {getCategoryName(item.categoryId)}
                        </Badge>
                      </td>
                      <td>
                        <div
                          className="text-muted small text-truncate"
                          style={{ maxWidth: "200px" }}>
                          {stripHtml(item.description)}
                        </div>
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="white"
                          className="border shadow-sm me-2"
                          onClick={() => handleEdit(item)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="white"
                          className="text-danger border shadow-sm"
                          onClick={() => handleDelete(item.id)}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-5">
                      {loading ? "Loading..." : "No records found."}
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
          totalItems={subcategories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} size="lg" centered>
        <ModalHeader
          toggle={toggle}
          className="fw-bold"
          style={{ color: GOLD }}>
          {isEditing ? "Update Subcategory" : "Add New Subcategory"}
        </ModalHeader>
        <ModalBody className="px-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Parent Category *</Label>
                  <Input
                    type="select"
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    required>
                    <option value="">-- Select Category --</option>
                    {parentCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Subcategory Name *</Label>
                  <Input
                    value={formData.subcategoryName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        subcategoryName: e.target.value,
                      })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">
                    Banner Image {isEditing ? "(Optional)" : "*"}
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bannerImage: e.target.files[0],
                      })
                    }
                    required={!isEditing}
                  />
                </FormGroup>
              </Col>
              <Col xs={12}>
                <FormGroup>
                  <Label className="small fw-bold">Description *</Label>
                  <div style={{ height: "250px", marginBottom: "50px" }}>
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={formData.description}
                      onChange={(val) =>
                        setFormData({ ...formData, description: val })
                      }
                      style={{ height: "200px" }}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}
                className="px-5 text-white">
                {loading ? "Saving..." : isEditing ? "Update" : "Save"}
              </Button>
              <Button outline onClick={toggle} className="px-4">
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <style jsx>{`
        :global(.btn-gold) {
          background-color: #eebb5d !important;
          color: white !important;
          border: none !important;
        }
      `}</style>
    </Container>
  );
};

export default CapabilitySubCategory;

