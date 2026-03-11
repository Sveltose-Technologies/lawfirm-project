"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Card,
  CardBody,
  Table,
  Button,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Spinner,
  Badge,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classnames from "classnames";
import * as authService from "../../services/authService";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ContactUsPage = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [activeTab, setActiveTab] = useState("inquiry");
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Data state
  const [descriptionData, setDescriptionData] = useState({
    id: null,
    text: "",
  });

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    }),
    [],
  );

  // --- GET DATA (Previous text fetch karega) ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === "inquiry") {
        const res = await authService.getAllContacts();
        if (res.success) {
          const data = Array.isArray(res.data)
            ? res.data
            : res.data?.data || [];
          setInquiries(
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
          );
        }
      } else {
        // GET Contact Text
        const res = await authService.getContactText();
        // API response: { success: true, data: [ {id: 1, contactText: "..."} ] }
        const serverData = Array.isArray(res?.data) ? res.data[0] : res.data;
        console.log("serverData ADMIKN", serverData);

        if (serverData) {
          setDescriptionData({
            id: serverData.id,
            text: serverData.contactText || "",
          });
        } else {
          setDescriptionData({ id: null, text: "" });
        }
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- CREATE / UPDATE LOGIC ---
  const handleSave = async () => {
    if (!descriptionData.text || descriptionData.text === "<p><br></p>") {
      return toast.warning("Content cannot be empty.");
    }

    setBtnLoading(true);
    try {
      const payload = { contactText: descriptionData.text };

      let res;
      if (descriptionData.id) {
        // Agar record exist karta hai toh UPDATE
        res = await authService.updateContactText(descriptionData.id, payload);
        toast.success("Content updated successfully!");
      } else {
        // Agar record nahi hai toh CREATE (POST)
        res = await authService.createContactText(payload);
        toast.success("Content created successfully!");
      }

      fetchData(); // Data refresh karein taaki updated text aur ID aa jaye
    } catch (error) {
      console.error("Save Error:", error);
      toast.error("Failed to save content.");
    } finally {
      setBtnLoading(false);
    }
  };

  // --- DELETE LOGIC ---
  const handleDelete = async () => {
    if (!descriptionData.id) return toast.error("Nothing to delete.");
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;

    setBtnLoading(true);
    try {
      await authService.deleteContactText(descriptionData.id);
      toast.success("Content deleted successfully!");
      setDescriptionData({ id: null, text: "" }); // Reset editor
      fetchData();
    } catch (error) {
      toast.error("Delete failed.");
    } finally {
      setBtnLoading(false);
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await authService.deleteContact(id);
      toast.success("Deleted");
      fetchData();
    } catch (e) {
      toast.error("Error");
    }
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <ToastContainer theme="colored" position="top-right" />

      <div className="mb-4">
        <h3 className="fw-bold text-dark">Contact Management</h3>
        <p className="text-muted small">
          Manage your website's contact inquiries and page content.
        </p>
      </div>

      <Nav
        tabs
        className="border-0 mb-4 bg-white shadow-sm p-2 rounded-3 w-fit">
        <NavItem>
          <NavLink
            className={classnames("fw-bold border-0 px-4 py-2 rounded-2", {
              active: activeTab === "inquiry",
            })}
            onClick={() => setActiveTab("inquiry")}
            style={{ cursor: "pointer", backgroundColor: "#ccc" }}>
            User Inquiries
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames("fw-bold border-0 px-4 py-2 rounded-2", {
              active: activeTab === "description",
            })}
            onClick={() => setActiveTab("description")}
            style={{
              cursor: "pointer",
              marginLeft: 10,
              color: "#ff6600",
              backgroundColor: "#ccc",
            }}>
            Page Content (Editor)
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={activeTab}>
        {/* INQUIRIES TAB */}
        <TabPane tabId="inquiry">
          <Card className="border-0 shadow-sm rounded-4">
            <CardBody className="p-0">
              <Table hover responsive className="align-middle mb-0">
                <thead style={{ backgroundColor: LIGHT_GOLD }}>
                  <tr>
                    <th className="px-4 py-3">Sr. No.</th>
                    <th>Name</th>
                    <th>Email / Phone</th>
                    <th>Inquiry Type</th>
                    <th className="text-end px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-5">
                        <Spinner color="warning" />
                      </td>
                    </tr>
                  ) : inquiries.length > 0 ? (
                    inquiries.map((item, index) => (
                      <tr key={item.id}>
                        <td className="px-4 text-muted">{index + 1}</td>
                        <td className="fw-bold">
                          {item.firstName} {item.lastName}
                        </td>
                        <td>
                          {item.email} <br />
                          <small>{item.phoneNumber}</small>
                        </td>
                        <td>
                          <Badge color="light" className="text-dark border">
                            {item.inquiryType}
                          </Badge>
                        </td>
                        <td className="text-end px-4">
                          <Button
                            size="sm"
                            color="white"
                            className="text-danger border shadow-sm"
                            onClick={() => handleDeleteInquiry(item.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </TabPane>

        {/* EDITOR TAB */}
        <TabPane tabId="description">
          <Card className="border-0 shadow-sm rounded-4">
            <CardBody className="p-4 p-lg-5">
              <div className="mb-4">
                <h5 className="fw-bold">Edit Contact Page Description</h5>
                <p className="text-muted small">
                  Update the text that appears on your website's contact
                  section.
                </p>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <Spinner color="warning" />
                </div>
              ) : (
                <>
                  <FormGroup className="mb-5">
                    <ReactQuill
                      theme="snow"
                      value={descriptionData.text}
                      onChange={(val) =>
                        setDescriptionData({ ...descriptionData, text: val })
                      }
                      modules={modules}
                      style={{ height: "350px", marginBottom: "50px" }}
                    />
                  </FormGroup>

                  <div className="d-flex gap-3">
                    <Button
                      className="btn-gold px-5 py-2 fw-bold"
                      onClick={handleSave}
                      disabled={btnLoading}>
                      {btnLoading
                        ? "Saving..."
                        : descriptionData.id
                          ? "UPDATE CONTENT"
                          : "SAVE CONTENT"}
                    </Button>

                    <Button
                      color="white"
                      className="border text-danger px-4 py-2 fw-bold"
                      onClick={handleDelete}
                      disabled={btnLoading || !descriptionData.id}>
                      Delete Record
                    </Button>
                  </div>

                  {!descriptionData.id && (
                    <p className="mt-3 text-muted small">
                      * No existing record found. Press "Save" to create your
                      first content.
                    </p>
                  )}
                </>
              )}
            </CardBody>
          </Card>
        </TabPane>
      </TabContent>

      <style jsx global>{`
        .btn-gold {
          background-color: #eebb5d !important;
          color: white !important;
          border: none !important;
        }
        .nav-link.active {
          background-color: #eebb5d !important;
          color: white !important;
        }
        .w-fit {
          width: fit-content;
        }
      `}</style>
    </Container>
  );
};

export default ContactUsPage;
