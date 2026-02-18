import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Badge,
} from "reactstrap";

// Service Import (Make sure paths match your project)
import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";

const Clients = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Form state matching your API payload
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    aptBlock: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    countryCode: "",
    dob: "",
    isActive: true,
  });

  // 1. GET ALL CLIENTS
  const fetchUsers = useCallback(async () => {
    console.log("🔄 Fetching Clients...");
    try {
      const res = await authService.getAllClients();
      // Adjust according to your API structure
      const data = res?.data || res?.clients || res || [];

      // Filtering attorney out if needed
      const onlyClients = Array.isArray(data)
        ? data.filter(
            (u) => u.email && !u.email.toLowerCase().includes("attorney"),
          )
        : [];

      console.log("✅ Clients loaded:", onlyClients);
      setUsers(onlyClients);
    } catch (err) {
      console.error("❌ Error in fetchUsers:", err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggle = () => {
    setModal(!modal);
    if (modal) setCurrentId(null);
  };

  // 2. TOGGLE STATUS (Uses Update API)
  const handleStatusToggle = async (user) => {
    const newStatus = !user.isActive;
    const confirmMsg = `Do you want to ${newStatus ? "Activate" : "Deactivate"} ${user.firstName}?`;

    if (window.confirm(confirmMsg)) {
      try {
        console.log(`🔄 Toggling status for ${user.id}...`);
        await authService.updateClient(user.id || user._id, {
          isActive: newStatus,
        });
        fetchUsers();
      } catch (err) {
        console.error("❌ Toggle Status Error:", err);
      }
    }
  };

  // 3. EDIT HANDLER (Populate Modal)
  const handleEdit = (u) => {
    console.log("📝 Editing Client:", u);
    setFormData({
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      mobile: u.mobile || "",
      street: u.street || "",
      aptBlock: u.aptBlock || "",
      city: u.city || "",
      state: u.state || "",
      country: u.country || "",
      zipCode: u.zipCode || "",
      countryCode: u.countryCode || "",
      dob: u.dob ? u.dob.split("T")[0] : "",
      isActive: u.isActive ?? true,
    });
    setCurrentId(u.id || u._id);
    setModal(true);
  };

  // 4. DELETE CLIENT
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await authService.deleteClient(id);
        console.log(`✅ Deleted Client ID: ${id}`);
        fetchUsers();
      } catch (err) {
        console.error("❌ Delete Error:", err);
      }
    }
  };

  // 5. SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("📤 Submitting Update for ID:", currentId);
      await authService.updateClient(currentId, formData);
      console.log("✅ Client updated successfully");
      fetchUsers();
      toggle();
    } catch (err) {
      console.error("❌ Update Submission Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search logic
  const filteredData = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email} ${u.city}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Client Management</h4>
        <Badge style={{ backgroundColor: GOLD }} className="px-3 py-2">
          Total: {filteredData.length}
        </Badge>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <div className="p-3 bg-white border-bottom">
            <Input
              placeholder="Search clients..."
              className="rounded-pill bg-light border-0 px-4"
              style={{ maxWidth: "350px" }}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <Table
              hover
              className="align-middle mb-0"
              style={{ fontSize: "13px" }}>
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr>
                  <th className="px-4">SR.</th>
                  <th>CLIENT NAME</th>
                  <th>EMAIL</th>
                  <th>MOBILE</th>
                  <th>LOCATION</th>
                  <th className="text-center">STATUS</th>
                  <th className="text-end px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((u, index) => (
                    <tr key={u.id || u._id}>
                      <td className="px-4 text-muted">
                        {(currentPage - 1) * itemsPerPage + index + 1}.
                      </td>
                      <td className="fw-bold text-dark text-capitalize">
                        {u.firstName} {u.lastName}
                      </td>
                      <td>{u.email}</td>
                      <td>{u.mobile || "N/A"}</td>
                      <td className="small">
                        {u.city || "N/A"}, {u.state || ""}
                      </td>
                      <td className="text-center">
                        <Badge
                          color={(u.isActive ?? true) ? "success" : "danger"}
                          pill
                          style={{
                            cursor: "pointer",
                            minWidth: "80px",
                            padding: "6px 10px",
                          }}
                          onClick={() => handleStatusToggle(u)}>
                          {(u.isActive ?? true) ? "Active ●" : "Deactive ○"}
                        </Badge>
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          color="white"
                          className="border shadow-sm me-2"
                          onClick={() => handleEdit(u)}>
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          color="white"
                          className="text-danger border shadow-sm"
                          onClick={() => handleDelete(u.id || u._id)}>
                          🗑️
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      No clients found.
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
          totalItems={filteredData.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* UPDATE MODAL */}
      <Modal isOpen={modal} toggle={toggle} size="lg" centered scrollable>
        <ModalHeader
          toggle={toggle}
          className="fw-bold"
          style={{ color: GOLD }}>
          Update Client Profile
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}>
                <Label className="small fw-bold">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Mobile</Label>
                <Input
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">City</Label>
                <Input
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">State</Label>
                <Input
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </Col>
              <Col md={6}>
                <Label className="small fw-bold">Status</Label>
                <Input
                  type="select"
                  value={formData.isActive}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isActive: e.target.value === "true",
                    })
                  }>
                  <option value="true">Active</option>
                  <option value="false">Deactive</option>
                </Input>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}
                className="px-5 text-white fw-bold">
                {loading ? "Updating..." : "Save Changes"}
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

export default Clients;
