import React, { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import {
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
  Row,
  Col,
  Badge,
} from "reactstrap";

// Custom Components
import PaginationComponent from "../../context/Pagination";
import * as authService from "../../services/authService";

// Rich Text Editor
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-center border rounded small">
      Loading Editor...
    </div>
  ),
});

const AwardPage = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [dataList, setDataList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Search & Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [formData, setFormData] = useState({
    bannerImage: null,
    personName: "",
    organization: "",
    year: "",
    awardTitle: "",
    details: "",
  });

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

  // ✨ HTML entities को साफ़ इंग्लिश में बदलने के लिए
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const fetchData = useCallback(async () => {
    console.log("🔄 Fetching Awards...");
    const res = await authService.getAllAwards();
    if (res.success) {
      setDataList(res.data || []);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFormData({
        bannerImage: null,
        personName: "",
        organization: "",
        year: "",
        awardTitle: "",
        details: "",
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.awardTitle || !formData.year) {
      alert("Title and Year are required!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", "1"); // Static or from user session
      data.append("personName", formData.personName || "");
      data.append("organization", formData.organization || "");
      data.append("year", formData.year);
      data.append("awardTitle", formData.awardTitle);
      data.append("details", formData.details || "");

      if (formData.bannerImage instanceof File) {
        data.append("bannerImage", formData.bannerImage);
      }

      console.log(`📤 ${isEditing ? "Updating" : "Creating"} Award...`);
      const res = isEditing
        ? await authService.updateAward(currentId, data)
        : await authService.createAward(data);

      if (res.success) {
        fetchData();
        toggle();
      }
    } catch (err) {
      console.error("❌ Submission Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    console.log("📝 Editing Award:", item.awardTitle);
    setFormData({
      personName: item.personName || "",
      organization: item.organization || "",
      year: item.year || "",
      awardTitle: item.awardTitle || "",
      details: item.details || "",
      bannerImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      try {
        const res = await authService.deleteAward(id);
        if (res.success) fetchData();
      } catch (err) {
        console.error("❌ Delete Failed:", err);
      }
    }
  };

  const filteredData = dataList.filter(
    (item) =>
      item.awardTitle?.toLowerCase().includes(search.toLowerCase()) ||
      item.personName?.toLowerCase().includes(search.toLowerCase()) ||
      item.organization?.toLowerCase().includes(search.toLowerCase()) ||
      item.year?.toString().includes(search),
  );

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-0" style={{ color: "#2c3e50" }}>
            Awards & Recognition
          </h4>
          <p className="text-muted small mb-0">Manage firm achievements.</p>
        </div>
        <Button
          className="px-4 shadow-sm text-white"
          style={{ backgroundColor: GOLD, border: "none" }}
          onClick={toggle}>
          + Add Award
        </Button>
      </div>

      {/* Search */}
      <Row className="mb-3">
        <Col xs="12" md="4" lg="3">
          <Input
            placeholder="Search awards..."
            className="rounded-pill border-0 shadow-sm px-3"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
      </Row>

      {/* Table */}
      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4">SR.</th>
                <th className="text-center">BANNER</th>
                <th>AWARD TITLE</th>
                <th>RECIPIENT / ORG</th>
                <th>YEAR</th>
                <th className="text-end px-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-5 text-center text-muted">
                    No records found.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="px-4 text-muted">
                      {(currentPage - 1) * itemsPerPage + index + 1}.
                    </td>
                    <td className="text-center">
                      <div
                        style={{
                          width: "80px",
                          height: "45px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid #eee",
                          margin: "auto",
                        }}>
                        <img
                          src={
                            item.bannerImage
                              ? `${authService.IMG_URL}/${item.bannerImage}`
                              : "https://placehold.co/80x45?text=No+Img"
                          }
                          alt="Award"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/80x45?text=No+Img";
                          }}
                        />
                      </div>
                    </td>
                    <td className="fw-bold">{item.awardTitle}</td>
                    <td>
                      <div className="small fw-bold text-dark">
                        {item.personName || "N/A"}
                      </div>
                      <div className="small text-muted">
                        {item.organization}
                      </div>
                    </td>
                    <td>
                      <Badge
                        pill
                        style={{
                          backgroundColor: LIGHT_GOLD,
                          color: GOLD,
                          border: `1px solid ${GOLD}`,
                        }}>
                        {item.year}
                      </Badge>
                    </td>
                    <td className="text-end px-4">
                      <Button
                        size="sm"
                        color="white"
                        className="me-2 border shadow-sm"
                        onClick={() => handleEdit(item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border shadow-sm text-danger"
                        onClick={() => handleDelete(item.id)}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))
              )}
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

      {/* MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader
          toggle={toggle}
          className="fw-bold"
          style={{ color: GOLD }}>
          {isEditing ? "Update Award Details" : "Register New Award"}
        </ModalHeader>
        <ModalBody className="px-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={8}>
                <FormGroup>
                  <Label className="small fw-bold">Award Title *</Label>
                  <Input
                    type="text"
                    placeholder="e.g. Best Law Firm 2025"
                    value={formData.awardTitle}
                    onChange={(e) =>
                      setFormData({ ...formData, awardTitle: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label className="small fw-bold">Year *</Label>
                  <Input
                    type="number"
                    placeholder="2025"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">
                    Person Name (Optional)
                  </Label>
                  <Input
                    type="text"
                    value={formData.personName}
                    onChange={(e) =>
                      setFormData({ ...formData, personName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Organization</Label>
                  <Input
                    type="text"
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
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
                  <Label className="small fw-bold">Description Details</Label>
                  <div className="bg-white border rounded">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      value={formData.details}
                      onChange={(v) => setFormData({ ...formData, details: v })}
                      style={{ height: "200px", marginBottom: "50px" }}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: GOLD,
                  border: "none",
                  width: "130px",
                }}
                className="text-white fw-bold">
                {loading ? "Saving..." : isEditing ? "Update" : "Save"}
              </Button>
              <Button
                outline
                type="button"
                style={{ width: "130px" }}
                onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AwardPage;
