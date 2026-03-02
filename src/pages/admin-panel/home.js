"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Container,
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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllLogoTypes,
  getAllHomeBanners,
  getAllHomeData,
  createLogoType,
  updateLogoType,
  deleteLogoType,
  createHomeBanner,
  updateHomeBanner,
  deleteHomeBanner,
  createHomeData,
  updateHomeData,
  deleteHomeData,
  getImgUrl,
} from "../../services/authService";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const AdminHomeManagement = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  // Data States
  const [logoTypes, setLogoTypes] = useState([]);
  const [homeBanners, setHomeBanners] = useState([]);
  const [homeDataList, setHomeDataList] = useState([]);

  // Modal States
  const [modal, setModal] = useState({
    open: false,
    type: "",
    edit: false,
    id: null,
  });

  // Form States
  const [logoForm, setLogoForm] = useState({ type: "logo" });
  const [bannerForm, setBannerForm] = useState({
    typeId: "",
    textEditor: "",
    image: null,
  });
  const [homeDataForm, setHomeDataForm] = useState({
    middleText: "",
    firstTextEditor: "",
    secondTextEditor: "",
    thirdTextEditor: "",
    fourthTextEditor: "",
    firstImage: null,
    secondImage: null,
    thirdImage: null,
    fourthImage: null,
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [logoRes, bannerRes, homeRes] = await Promise.all([
        getAllLogoTypes(),
        getAllHomeBanners(),
        getAllHomeData(),
      ]);
      setLogoTypes(logoRes.data?.data || logoRes.data || []);
      setHomeBanners(bannerRes.data?.data || bannerRes.data || []);
      setHomeDataList(homeRes.data?.data || homeRes.data || []);
    } catch (error) {
      console.error("Fetch Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleModal = (type = "", edit = false, data = null) => {
    setModal({ open: !modal.open, type, edit, id: data?.id || null });
    if (!modal.open && data) {
      if (type === "logo") setLogoForm({ type: data.type });
      if (type === "banner")
        setBannerForm({
          typeId: data.typeId,
          textEditor: data.textEditor,
          image: null,
        });
      if (type === "homeData")
        setHomeDataForm({
          ...data,
          firstImage: null,
          secondImage: null,
          thirdImage: null,
          fourthImage: null,
        });
    } else {
      setLogoForm({ type: "logo" });
      setBannerForm({ typeId: "", textEditor: "", image: null });
      setHomeDataForm({
        middleText: "",
        firstTextEditor: "",
        secondTextEditor: "",
        thirdTextEditor: "",
        fourthTextEditor: "",
        firstImage: null,
        secondImage: null,
        thirdImage: null,
        fourthImage: null,
      });
    }
  };

  const handleAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;
      if (modal.type === "logo") {
        res = modal.edit
          ? await updateLogoType(modal.id, logoForm)
          : await createLogoType(logoForm);
      } else if (modal.type === "banner") {
        const fd = new FormData();
        Object.keys(bannerForm).forEach((key) => {
          if (bannerForm[key]) fd.append(key, bannerForm[key]);
        });
        res = modal.edit
          ? await updateHomeBanner(modal.id, fd)
          : await createHomeBanner(fd);
      } else {
        const fd = new FormData();

        Object.keys(homeDataForm).forEach((key) => {
          fd.append(key, homeDataForm[key] || "");
        });

        res = modal.edit
          ? await updateHomeData(modal.id, fd)
          : await createHomeData(fd);
      }

      if (res) {
        toast.success("Success!");
        toggleModal();
        fetchData();
      }
    } catch (err) {
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Confirm Delete?")) return;
    try {
      if (type === "logo") await deleteLogoType(id);
      if (type === "banner") await deleteHomeBanner(id);
      if (type === "homeData") await deleteHomeData(id);
      toast.success("Deleted");
      fetchData();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <Container fluid className="p-4 bg-light-gray min-vh-100">
      <ToastContainer theme="colored" />
      <div className="mb-4">
        <h2 className="fw-bold text-blue font-serif">Home Page CMS</h2>
        <p className="text-muted">Manage Logos, Banners, and Section Data</p>
      </div>

      <Nav tabs className="border-0 mb-4">
        {["Logo Types", "Home Banners", "Home Data Sections"].map(
          (label, i) => (
            <NavItem key={i}>
              <NavLink
                className={`border-0 fw-bold px-4 py-3 cursor-pointer ${activeTab === `${i + 1}` ? " text-white" : "text-muted"}`}
                onClick={() => setActiveTab(`${i + 1}`)}
                style={{ cursor: "pointer" }}>
                {label}
              </NavLink>
            </NavItem>
          ),
        )}
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* LOGO TYPE TAB */}
        <TabPane tabId="1">
          <div className="text-end mb-3">
            <Button
              className="btn-primary-custom w-auto px-4"
              onClick={() => toggleModal("logo")}>
              + Add Logo Type
            </Button>
          </div>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {logoTypes.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.id}</td>
                    <td className="text-uppercase fw-bold text-gold">
                      {item.type}
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-2"
                        onClick={() => toggleModal("logo", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("logo", item.id)}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>

        {/* HOME BANNER TAB */}
        <TabPane tabId="2">
          <div className="text-end mb-3">
            <Button
              className="btn-primary-custom w-auto px-4"
              onClick={() => toggleModal("banner")}>
              + Add Banner
            </Button>
          </div>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>Image</th>
                  <th>Type ID</th>
                  <th>Text Preview</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {homeBanners.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <img
                        src={getImgUrl(item.image)}
                        width="80"
                        className="rounded"
                        alt=""
                      />
                    </td>
                    <td>{item.typeId}</td>
                    <td
                      className="small text-truncate"
                      style={{ maxWidth: "200px" }}>
                      {item.textEditor
                        ?.replace(/&nbsp;/g, " ")
                        .replace(/<[^>]*>/g, "")}
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-2"
                        onClick={() => toggleModal("banner", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("banner", item.id)}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>

        {/* HOME DATA TAB */}
        <TabPane tabId="3">
          <div className="text-end mb-3">
            <Button
              className="btn-primary-custom w-auto px-4"
              onClick={() => toggleModal("homeData")}>
              + Add Home Data
            </Button>
          </div>
          <Card className="card-shadow border-0">
            <Table hover responsive className="align-middle mb-0">
              <thead className="table-dark-custom">
                <tr>
                  <th>Middle Text</th>
                  <th>Section 1</th>
                  <th>Section 2</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {homeDataList.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.middleText}</td>
                    <td>
                      <img
                        src={getImgUrl(item.firstImage)}
                        width="50"
                        alt=""
                      />
                    </td>
                    <td>
                      <img
                        src={getImgUrl(item.secondImage)}
                        width="50"
                        alt=""
                      />
                    </td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        color="white"
                        className="border me-2"
                        onClick={() => toggleModal("homeData", true, item)}>
                        ✏️
                      </Button>
                      <Button
                        size="sm"
                        color="white"
                        className="border text-danger"
                        onClick={() => handleDelete("homeData", item.id)}>
                        🗑️
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </TabPane>
      </TabContent>

      {/* MODALS */}
      <Modal
        isOpen={modal.open}
        toggle={() => toggleModal()}
        size={modal.type === "homeData" ? "xl" : "lg"}
        centered>
        <ModalHeader className="border-0 text-blue fw-bold">
          {modal.edit ? "Edit" : "Add"} {modal.type.toUpperCase()}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAction}>
            {modal.type === "logo" && (
              <FormGroup>
                <Label>Type (ENUM)</Label>
                <Input
                  type="select"
                  value={logoForm.type}
                  onChange={(e) => setLogoForm({ type: e.target.value })}>
                  <option value="logo">logo</option>
                  <option value="banner">banner</option>
                </Input>
              </FormGroup>
            )}

            {modal.type === "banner" && (
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Type ID</Label>
                    <Input
                      type="select"
                      required
                      value={bannerForm.typeId}
                      onChange={(e) =>
                        setBannerForm({ ...bannerForm, typeId: e.target.value })
                      }>
                      <option value="">Select Logo Type</option>
                      {logoTypes.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.type} (ID: {l.id})
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Image</Label>
                    <Input
                      type="file"
                      onChange={(e) =>
                        setBannerForm({
                          ...bannerForm,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <Label>Text Editor</Label>
                  <ReactQuill
                    theme="snow"
                    value={bannerForm.textEditor}
                    onChange={(v) =>
                      setBannerForm({ ...bannerForm, textEditor: v })
                    }
                    style={{ height: "150px", marginBottom: "50px" }}
                  />
                </Col>
              </Row>
            )}

            {modal.type === "homeData" && (
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label>Middle Text</Label>
                    <Input
                      value={homeDataForm.middleText}
                      onChange={(e) =>
                        setHomeDataForm({
                          ...homeDataForm,
                          middleText: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                {[1, 2, 3, 4].map((num) => (
                  <React.Fragment key={num}>
                    <Col md={6} className="mt-3">
                      <Label className="fw-bold text-gold">
                        Section {num} Image
                      </Label>
                      <Input
                        type="file"
                        onChange={(e) =>
                          setHomeDataForm({
                            ...homeDataForm,
                            [`${num === 1 ? "first" : num === 2 ? "second" : num === 3 ? "third" : "fourth"}Image`]:
                              e.target.files[0],
                          })
                        }
                      />
                    </Col>
                    <Col md={12} className="mb-5 mt-2">
                      <Label>Section {num} Text Editor</Label>
                      <ReactQuill
                        theme="snow"
                        value={
                          homeDataForm[
                            `${num === 1 ? "first" : num === 2 ? "second" : num === 3 ? "third" : "fourth"}TextEditor`
                          ]
                        }
                        onChange={(v) =>
                          setHomeDataForm({
                            ...homeDataForm,
                            [`${num === 1 ? "first" : num === 2 ? "second" : num === 3 ? "third" : "fourth"}TextEditor`]:
                              v,
                          })
                        }
                        style={{ height: "120px" }}
                      />
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            )}
            <Button
              className="btn-primary-custom mt-4 py-3"
              type="submit"
              disabled={loading}>
              {loading ? "Processing..." : "Save Changes"}
            </Button>
          </Form>
        </ModalBody>
      </Modal>
      <style jsx global>{`
        .nav-link {
          color: black !important;
        }

        .nav-link.active {
          color: white !important;
          font-weight: 700;
          position: relative;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 3px;
          background-color: white;
          border-radius: 2px 2px 0 0;
        }
      `}</style>
    </Container>
  );
};

export default AdminHomeManagement;
