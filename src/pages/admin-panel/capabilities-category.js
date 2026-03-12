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
} from "reactstrap";

import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CapabilityCategory = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    bannerImage: null,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    return text.replace(/\s+/g, " ").trim(); 
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
    }),
    [],
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await authService.getAllCapabilityCategories();
      const finalData = res.data || (Array.isArray(res) ? res : []);
      setCategories(finalData);
    } catch (error) {
      console.error("Fetch Data Failed:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFormData({ categoryName: "", description: "", bannerImage: null });
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
      data.append("categoryName", formData.categoryName.trim());
      data.append("description", formData.description);

      if (formData.bannerImage instanceof File) {
        data.append("bannerImage", formData.bannerImage);
      }

      const res = isEditing
        ? await authService.updateCapabilityCategory(currentId, data)
        : await authService.createCapabilityCategory(data);

      if (res) {
        toggle();
        fetchData();
      }
    } catch (error) {
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await authService.deleteCapabilityCategory(id);
        fetchData();
      } catch (error) {
        console.error("Delete Failed");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      categoryName: item.categoryName || "",
      description: item.description || "",
      bannerImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const currentItems = categories.slice(
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
          <h4 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
            Capability Categories
          </h4>
          <p className="text-muted small">
            Manage practice areas for your firm.
          </p>
        </div>
        <Button
          className="px-4 shadow-sm"
          style={{ backgroundColor: GOLD, border: "none" }}
          onClick={toggle}>
          + Add Category
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
                  <th>CATEGORY NAME</th>
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
                            width: "60px",
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
                      <td className="fw-bold text-dark">{item.categoryName}</td>
                      <td>
                        <div
                          className="text-muted small"
                          style={{
                            maxWidth: "300px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
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
                    <td colSpan="5" className="text-center py-5">
                      {loading ? "Loading..." : "No data available"}
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
          totalItems={categories.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="lg">
        <ModalHeader
          toggle={toggle}
          className="fw-bold"
          style={{ color: GOLD }}>
          {isEditing ? "Update Capability Category" : "Add Capability Category"}
        </ModalHeader>
        <ModalBody className="px-4">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label className="small fw-bold">Category Name *</Label>
              <Input
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData({ ...formData, categoryName: e.target.value })
                }
                required
              />
            </FormGroup>
            <FormGroup>
              <Label className="small fw-bold">
                Banner Image {isEditing ? "(Optional)" : "*"}
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, bannerImage: e.target.files[0] })
                }
                required={!isEditing}
              />
            </FormGroup>
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
            <div className="d-flex gap-2">
              <Button
                type="submit"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}
                className="px-5">
                {loading ? "Processing..." : isEditing ? "Update" : "Save"}
              </Button>
              <Button outline onClick={toggle} className="px-4">
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default CapabilityCategory;
