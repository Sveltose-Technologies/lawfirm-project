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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";

// Rich Text Editor Setup
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="p-2 text-center border rounded small">
      Loading Editor...
    </div>
  ),
});

const News = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [newsList, setNewsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dropdowns
  const [categories, setCategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    year: new Date().getFullYear(),
    textEditor: "",
    bannerImage: null,
    newsImage: null,
    capabilityCategoryId: [],
    countryId: [],
    cityId: [],
    linkedin: "",
    twitter: "",
    facebook: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [newsRes, catRes, countRes, cityRes] = await Promise.all([
        authService.getAllNews(),
        authService.getAllCapabilityCategories(),
        authService.getAllCountries(),
        authService.getAllCities(),
      ]);

      setNewsList(newsRes?.data || newsRes || []);
      setCategories(catRes?.data || catRes || []);
      setCountries(countRes?.data || countRes || []);
      setCities(cityRes?.data || cityRes || []);
    } catch (error) {
      console.error("❌ Load Error:", error);
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
      // Reset on close
      setFormData({
        title: "",
        date: "",
        year: new Date().getFullYear(),
        textEditor: "",
        bannerImage: null,
        newsImage: null,
        capabilityCategoryId: [],
        countryId: [],
        cityId: [],
        linkedin: "",
        twitter: "",
        facebook: "",
      });
      setIsEditing(false);
      setCurrentId(null);
    }
  };

  const handleCheckboxChange = (id, field) => {
    const stringId = id.toString();
    const updated = formData[field].includes(stringId)
      ? formData[field].filter((i) => i !== stringId)
      : [...formData[field], stringId];
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("adminId", "1"); // Static or from user session
      data.append("title", formData.title);
      data.append("date", formData.date);
      data.append("year", formData.year);
      data.append("textEditor", formData.textEditor);

      // JSON strings for arrays
      data.append(
        "capabilityCategoryId",
        JSON.stringify(formData.capabilityCategoryId),
      );
      data.append("countryId", JSON.stringify(formData.countryId));
      data.append("cityId", JSON.stringify(formData.cityId));
      data.append("attorneyId", JSON.stringify([]));

      const socials = {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        facebook: formData.facebook,
      };
      data.append("socialLinks", JSON.stringify(socials));

      if (formData.bannerImage instanceof File)
        data.append("bannerImage", formData.bannerImage);
      if (formData.newsImage instanceof File)
        data.append("newsImage", formData.newsImage);

      console.log(`📤 ${isEditing ? "Updating" : "Creating"} News...`);
      const res = isEditing
        ? await authService.updateNews(currentId, data)
        : await authService.createNews(data);

      if (res) {
        toggle();
        fetchData();
      }
    } catch (error) {
      console.error("❌ Submit Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    const parse = (val) => {
      try {
        return typeof val === "string" ? JSON.parse(val) : val;
      } catch {
        return [];
      }
    };

    const socials = parse(item.socialLinks) || {};

    setFormData({
      title: item.title || "",
      date: item.date || "",
      year: item.year || new Date().getFullYear(),
      textEditor: item.textEditor || "",
      capabilityCategoryId: parse(item.capabilityCategoryId || []).map(String),
      countryId: parse(item.countryId || []).map(String),
      cityId: parse(item.cityId || []).map(String),
      linkedin: socials.linkedin || "",
      twitter: socials.twitter || "",
      facebook: socials.facebook || "",
      bannerImage: null,
      newsImage: null,
    });
    setCurrentId(item.id);
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await authService.deleteNews(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // मल्टी-सेलेक्टर ड्रॉपडाउन हेल्पर
  const Selector = ({ label, items, field, type, nameKey }) => (
    <FormGroup>
      <Label className="fw-bold small">{label}</Label>
      <Dropdown
        isOpen={openDropdown === type}
        toggle={() => setOpenDropdown(openDropdown === type ? null : type)}>
        <DropdownToggle
          caret
          className="w-100 d-flex justify-content-between align-items-center bg-white border text-dark shadow-sm">
          {formData[field].length > 0
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
                className="me-2 cursor-pointer"
                checked={formData[field].includes(item.id.toString())}
                onChange={() => handleCheckboxChange(item.id, field)}
              />
              <span
                className="small cursor-pointer"
                onClick={() => handleCheckboxChange(item.id, field)}>
                {item[nameKey] ||
                  item.countryName ||
                  item.cityName ||
                  item.categoryName}
              </span>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </FormGroup>
  );

  const currentItems = newsList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container
      fluid
      className="p-3 p-md-4 min-vh-100"
      style={{ backgroundColor: "#f9f9f9" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">News Management</h4>
        <Button
          className="px-4 text-white fw-bold shadow-sm"
          style={{ backgroundColor: GOLD, border: "none" }}
          onClick={toggle}>
          + Add News
        </Button>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <Table hover className="align-middle mb-0">
            <thead style={{ backgroundColor: LIGHT_GOLD }}>
              <tr>
                <th className="px-4 py-3">SR.</th>
                <th>BANNER</th>
                <th>NEWS TITLE</th>
                <th>PUBLISHED</th>
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
                          width: "80px",
                          height: "45px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: "1px solid #eee",
                        }}>
                        <img
                          src={authService.getImgUrl(item.bannerImage)}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) =>
                            (e.target.src =
                              "https://placehold.co/80x45?text=No+Img")
                          }
                          alt="Banner"
                        />
                      </div>
                    </td>
                    <td className="fw-bold">{item.title}</td>
                    <td className="text-muted small">
                      {item.date} ({item.year})
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
                    No news found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <div className="mt-3">
        <PaginationComponent
          totalItems={newsList.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Modal isOpen={modal} toggle={toggle} centered size="xl" scrollable>
        <ModalHeader
          toggle={toggle}
          className="fw-bold"
          style={{ color: GOLD }}>
          {isEditing ? "Update News" : "Add New News"}
        </ModalHeader>
        <ModalBody className="px-4">
          <Form onSubmit={handleSubmit}>
            <Row className="gy-3">
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">News Title *</Label>
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
                  <Label className="small fw-bold">Date *</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label className="small fw-bold">Year *</Label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    required
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <Selector
                  label="Capability Categories"
                  items={categories}
                  field="capabilityCategoryId"
                  type="cat"
                  nameKey="categoryName"
                />
              </Col>
              <Col md={4}>
                <Selector
                  label="Countries"
                  items={countries}
                  field="countryId"
                  type="count"
                  nameKey="countryName"
                />
              </Col>
              <Col md={4}>
                <Selector
                  label="Cities"
                  items={cities}
                  field="cityId"
                  type="city"
                  nameKey="cityName"
                />
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Banner Image *</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bannerImage: e.target.files[0],
                      })
                    }
                    accept="image/*"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="small fw-bold">Thumbnail/News Image</Label>
                  <Input
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, newsImage: e.target.files[0] })
                    }
                    accept="image/*"
                  />
                </FormGroup>
              </Col>

              <Col md={4}>
                <Label className="small fw-bold">LinkedIn</Label>
                <Input
                  value={formData.linkedin}
                  placeholder="URL"
                  onChange={(e) =>
                    setFormData({ ...formData, linkedin: e.target.value })
                  }
                />
              </Col>
              <Col md={4}>
                <Label className="small fw-bold">Twitter</Label>
                <Input
                  value={formData.twitter}
                  placeholder="URL"
                  onChange={(e) =>
                    setFormData({ ...formData, twitter: e.target.value })
                  }
                />
              </Col>
              <Col md={4}>
                <Label className="small fw-bold">Facebook</Label>
                <Input
                  value={formData.facebook}
                  placeholder="URL"
                  onChange={(e) =>
                    setFormData({ ...formData, facebook: e.target.value })
                  }
                />
              </Col>

              <Col xs={12}>
                <Label className="small fw-bold">Content Details *</Label>
                <div style={{ height: "250px", marginBottom: "50px" }}>
                  <ReactQuill
                    theme="snow"
                    value={formData.textEditor}
                    onChange={(v) =>
                      setFormData({ ...formData, textEditor: v })
                    }
                    style={{ height: "200px" }}
                  />
                </div>
              </Col>
            </Row>
            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                className="px-5 text-white fw-bold shadow-sm"
                style={{ backgroundColor: GOLD, border: "none" }}
                disabled={loading}>
                {loading ? "Saving..." : "Save News"}
              </Button>
              <Button outline className="px-4" onClick={toggle}>
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default News;
