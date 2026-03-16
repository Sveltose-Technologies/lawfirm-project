"use client";
import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Card,
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

// Toastify CSS rakhein, par Container yaha nahi hona chahiye
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
  getAllRanking,
  createRanking,
  updateRanking,
  getAllCounters,
  createCounters,
  updateCounters,
  getImgUrl,
  deleteRankData,
  deleteCountData,
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
  const [rankings, setRankings] = useState([]);
  const [counters, setCounters] = useState([]);

  // Modal States
  const [modal, setModal] = useState({
    open: false,
    type: "",
    edit: false,
    id: null,
  });

  // Form States (Same as before...)
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

  const [rankingForm, setRankingForm] = useState({
    rankingText: "",
    rankingNo: "",
    languageText: "",
    languageNo: "",
    countrieText: "",
    countrieNo: "",
    locationText: "",
    locationNo: "",
    textEditor: "",
  });

  const [counterForm, setCounterForm] = useState({
    consultationsText: "",
    consultationsNo: "",
    successRateText: "",
    successRateCount: "",
    yearsExperienceText: "",
    yearsExperienceCount: "",
    attorneysText: "",
    attorneysCount: "",
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [logoRes, bannerRes, homeRes, rankRes, countRes] =
        await Promise.all([
          getAllLogoTypes(),
          getAllHomeBanners(),
          getAllHomeData(),
          getAllRanking ? getAllRanking() : Promise.resolve({ data: [] }),
          getAllCounters ? getAllCounters() : Promise.resolve({ data: [] }),
        ]);
      setLogoTypes(logoRes.data?.data || logoRes.data || []);
      setHomeBanners(bannerRes.data?.data || bannerRes.data || []);
      setHomeDataList(homeRes.data?.data || homeRes.data || []);
      setRankings(rankRes.data?.data || rankRes.data || []);
      setCounters(countRes.data?.data || countRes.data || []);
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
    // ... logic for setting form data based on type (Remains same)
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
      if (type === "ranking") setRankingForm({ ...data });
      if (type === "counter") setCounterForm({ ...data });
    } else {
      // Reset forms logic...
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
      setRankingForm({
        rankingText: "",
        rankingNo: "",
        languageText: "",
        languageNo: "",
        countrieText: "",
        countrieNo: "",
        locationText: "",
        locationNo: "",
        textEditor: "",
      });
      setCounterForm({
        consultationsText: "",
        consultationsNo: "",
        successRateText: "",
        successRateCount: "",
        yearsExperienceText: "",
        yearsExperienceCount: "",
        attorneysText: "",
        attorneysCount: "",
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
      } else if (modal.type === "homeData") {
        const fd = new FormData();
        Object.keys(homeDataForm).forEach((key) => {
          fd.append(key, homeDataForm[key] || "");
        });
        res = modal.edit
          ? await updateHomeData(modal.id, fd)
          : await createHomeData(fd);
      } else if (modal.type === "ranking") {
        res = modal.edit
          ? await updateRanking(modal.id, rankingForm)
          : await createRanking(rankingForm);
      } else if (modal.type === "counter") {
        res = modal.edit
          ? await updateCounters(modal.id, counterForm)
          : await createCounters(counterForm);
      }

      // TOAST REMOVED FROM HERE
      if (res) {
        toggleModal();
        fetchData();
      }
    } catch (err) {
      console.error("Operation failed", err);
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
      if (type === "homeRankData") await deleteRankData(id);
      if (type === "homeCountData") await deleteCountData(id);

      // TOAST REMOVED FROM HERE
      fetchData();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <Container fluid className="p-4 bg-light-gray min-vh-100">
      {/* UI Code (Tabs, Tables, Modals) exactly as you had it... */}
      {/* ... keeping the UI part same for consistency ... */}
      <div className="mb-4">
        <h2 className="fw-bold text-blue font-serif">Home Page CMS</h2>
        <p className="text-muted">Manage Logos, Banners, and Section Data</p>
      </div>

      <Nav tabs className="border-0 mb-4">
        {[
          "Logo Types",
          "Home Banners",
          "Home Data Sections",
          "Home Ranking",
          "Home Counters",
        ].map((label, i) => (
          <NavItem key={i}>
            <NavLink
              className={`border-0 fw-bold px-4 py-3 cursor-pointer ${activeTab === `${i + 1}` ? " active" : "text-muted"}`}
              onClick={() => setActiveTab(`${i + 1}`)}
              style={{ cursor: "pointer" }}>
              {label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* All Tab Panes (Logo, Banner, Data, Ranking, Counter) remain same */}
        {/* Just make sure the Action buttons call the updated handleAction/handleDelete */}
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

        {/* ... Rest of TabPanes follow the same pattern ... */}
        {/* Tab 2, 3, 4, 5 logic is same as your original code */}
      </TabContent>

      {/* MODAL logic remains same, just ensure it uses the cleaned-up handleAction */}
      <Modal
        isOpen={modal.open}
        toggle={() => toggleModal()}
        size={
          modal.type === "homeData" ||
          modal.type === "ranking" ||
          modal.type === "counter"
            ? "xl"
            : "lg"
        }
        centered>
        <ModalHeader className="border-0 text-blue fw-bold">
          {modal.edit ? "Edit" : "Add"} {modal.type.toUpperCase()}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleAction}>
            {/* All Form Fields (logo, ranking, counter, banner, homeData) exactly as you had them */}
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
          transition: 0.3s;
        }
        .nav-link.active {
          color: #c5a059 !important;
          background-color: transparent !important;
          border-bottom: 2px solid #c5a059 !important;
          font-weight: 700;
        }
        .btn-primary-custom {
          background-color: #7b4433;
          border: none;
          color: white;
        }
        .text-blue {
          color: #003366;
        }
        .text-gold {
          color: #c5a059;
        }
        .table-dark-custom {
          background-color: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
        }
        .card-shadow {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </Container>
  );
};

export default AdminHomeManagement;
