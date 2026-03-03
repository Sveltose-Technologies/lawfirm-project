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
import { toast } from "react-toastify";

const PromoterPage = () => {
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
    specialization: "",
    email: "",
    mobileNo: "",
  });

  const fetchData = useCallback(async () => {
    const res = await authService.getAllPromoters();
    if (res.success) setDataList(res.data || []);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Helper function to truncate text to exactly 3 words
  const truncateWords = (text, limit = 3) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      setFormData({
        bannerImage: null,
        personImage: null,
        personName: "",
        designation: "",
        specialization: "",
        email: "",
        mobileNo: "",
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentAdminId = authService.getAdminId();
    if (!currentAdminId) {
      alert("Session expired. Please login again.");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", currentAdminId);
      data.append("personName", formData.personName);
      data.append("designation", formData.designation);
      data.append("specialization", formData.specialization);
      data.append("email", formData.email);
      data.append("mobileNo", formData.mobileNo);

      if (formData.bannerImage instanceof File)
        data.append("bannerImage", formData.bannerImage);
      if (formData.personImage instanceof File)
        data.append("personImage", formData.personImage);

      const res = isEditing
        ? await authService.updatePromoter(currentId, data)
        : await authService.createPromoter(data);

      if (res.success) {
        toast.success(
          isEditing ? "Updated Successfully" : "Created Successfully",
        );
        fetchData();
        toggle();
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      personName: item.personName || "",
      designation: item.designation || "",
      specialization: item.specialization || "",
      email: item.email || "",
      mobileNo: item.mobileNo || "",
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
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h4 className="fw-bold mb-0">Promoters Management</h4>
        <Button color="dark" className="rounded-0 px-4" onClick={toggle}>
          + Add Promoter
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-0">
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table hover className="align-middle mb-0">
              <thead className="table-dark text-nowrap">
                <tr>
                  <th className="ps-4">Profile</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Contact Info</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((item) => (
                    <tr key={item.id}>
                      <td className="ps-4">
                        <img
                          src={`${authService.getImgUrl(item.personImage)}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            minWidth: "60px",
                          }}
                          className="rounded-0 border object-fit-cover"
                          alt="profile"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/60x60?text=No+Img";
                          }}
                        />
                      </td>
                      <td className="fw-bold text-nowrap">{item.personName}</td>
                      <td>
                        <Badge
                          color="secondary"
                          className="rounded-0 fw-normal"
                          title={item.designation} // Shows full text on hover
                        >
                          {truncateWords(item.designation, 3)}
                        </Badge>
                      </td>
                      <td className="text-nowrap">
                        <div className="small text-dark">
                          {item.email || "N/A"}
                        </div>
                        <div className="small text-muted">
                          {item.mobileNo || "N/A"}
                        </div>
                      </td>
                      <td className="text-end pe-4 text-nowrap">
                        <Button
                          size="sm"
                          color="light"
                          className="me-2 border rounded-0"
                          onClick={() => handleEdit(item)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="light"
                          className="text-danger border rounded-0"
                          onClick={() =>
                            authService.deletePromoter(item.id).then(fetchData)
                          }>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      <div className="mt-4 d-flex justify-content-center">
        <PaginationComponent
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal
        isOpen={modal}
        toggle={toggle}
        size="lg"
        centered
        className="rounded-0">
        <ModalHeader toggle={toggle} className="border-bottom-0">
          Promoter Details
        </ModalHeader>
        <ModalBody className="pb-4">
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Label className="small fw-bold">Name</Label>
                <Input
                  className="rounded-0"
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
                  className="rounded-0"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Email</Label>
                <Input
                  className="rounded-0"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Mobile Number</Label>
                <Input
                  className="rounded-0"
                  type="text"
                  value={formData.mobileNo}
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNo: e.target.value })
                  }
                />
              </Col>
              <Col xs={12}>
                <Label className="small fw-bold">
                  Biography (Specialization)
                </Label>
                <Input
                  className="rounded-0"
                  type="textarea"
                  rows="4"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Profile Photo (Square)</Label>
                <Input
                  className="rounded-0"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, personImage: e.target.files[0] })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Banner Photo (Square)</Label>
                <Input
                  className="rounded-0"
                  type="file"
                  onChange={(e) =>
                    setFormData({ ...formData, bannerImage: e.target.files[0] })
                  }
                />
              </Col>
            </Row>
            <div className="mt-4 text-end">
              <Button
                color="dark"
                type="submit"
                disabled={loading}
                className="rounded-0 px-5 w-100 w-md-auto">
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
