"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Table,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as authService from "../../services/authService";

const ContactUsPage = () => {
  const GOLD = "#eebb5d";
  const LIGHT_GOLD = "#fdf8ef";

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);

  // State for all fields
  const [selectedContact, setSelectedContact] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNumber: "",
    inquiryType: "",
    message: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await authService.getAllContacts();
      if (res.success) {
        let inquiries = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        const sortedData = inquiries.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setDataList(sortedData);
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        const res = await authService.deleteContact(id);
        if (res.success) {
          toast.success("Deleted successfully");
          fetchData();
        }
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const openEditModal = (contact) => {
    setSelectedContact({
      id: contact.id || contact._id,
      firstName: contact.firstName || "",
      lastName: contact.lastName || "",
      email: contact.email || "",
      countryCode: contact.countryCode || "",
      phoneNumber: contact.phoneNumber || "",
      inquiryType: contact.inquiryType || "",
      message: contact.message || "",
    });
    setEditModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedContact({ ...selectedContact, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const res = await authService.updateContact(
        selectedContact.id,
        selectedContact,
      );
      if (res.success) {
        toast.success("Record updated successfully");
        setEditModal(false);
        fetchData();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-3 min-vh-100" style={{ backgroundColor: "#f9f9f9" }}>
      <ToastContainer theme="colored" autoClose={2000} />

      <div className="mb-4">
        <h4 className="fw-bold mb-0" style={{ color: "#333" }}>
          Contact Inquiries
        </h4>
        <p className="text-muted small">
          Manage website leads and client messages.
        </p>
      </div>

      <Card className="border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <CardBody className="p-0">
          <div className="table-responsive">
            <Table
              hover
              className="align-middle mb-0"
              style={{ minWidth: "1100px", fontSize: "13.5px" }}>
              <thead style={{ backgroundColor: LIGHT_GOLD }}>
                <tr className="text-dark">
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3">Email</th>
                  <th className="py-3" style={{ width: "70px" }}>
                    Code
                  </th>
                  <th className="py-3">Phone</th>
                  <th className="py-3">Type</th>
                  <th className="py-3" style={{ width: "350px" }}>
                    Message
                  </th>
                  <th className="py-3 text-nowrap" style={{ width: "100px" }}>
                    Date
                  </th>
                  <th className="py-3 text-center" style={{ width: "100px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      Loading...
                    </td>
                  </tr>
                ) : dataList.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      No inquiries found.
                    </td>
                  </tr>
                ) : (
                  dataList.map((item) => (
                    <tr key={item.id || item._id} className="border-bottom">
                      <td className="py-3 px-3 fw-bold">
                        {item.firstName} {item.lastName}
                      </td>
                      <td>{item.email}</td>
                      <td className="text-muted small">{item.countryCode}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        <Badge
                          style={{
                            backgroundColor: LIGHT_GOLD,
                            color: GOLD,
                            border: `1px solid ${GOLD}`,
                            fontSize: "11px",
                          }}
                          pill>
                          {item.inquiryType || "inquiry"}
                        </Badge>
                      </td>
                      <td>
                        <div
                          style={{
                            wordBreak: "break-word",
                            color: "#555",
                            lineHeight: "1.4",
                          }}>
                          {item.message}
                        </div>
                      </td>
                      <td className="text-nowrap">
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary border-0 p-1"
                            onClick={() => openEditModal(item)}>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                              width="16"
                              alt="edit"
                            />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger border-0 p-1"
                            onClick={() => handleDelete(item.id || item._id)}>
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                              width="16"
                              alt="delete"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* FULL UPDATE MODAL */}
      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(false)}
        centered
        size="lg">
        <ModalHeader toggle={() => setEditModal(false)} className="fw-bold">
          Update Client Inquiry
        </ModalHeader>
        <ModalBody className="px-4 py-3">
          <Form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Label className="small fw-bold">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={selectedContact.firstName}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Label className="small fw-bold">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={selectedContact.lastName}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 mb-3">
                <Label className="small fw-bold">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  value={selectedContact.email}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="col-md-5 mb-3">
                <Label className="small fw-bold">Inquiry Type</Label>
                <Input
                  type="text"
                  name="inquiryType"
                  value={selectedContact.inquiryType}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <Label className="small fw-bold">Country Code</Label>
                <Input
                  type="text"
                  name="countryCode"
                  value={selectedContact.countryCode}
                  onChange={handleUpdateChange}
                />
              </div>
              <div className="col-md-8 mb-3">
                <Label className="small fw-bold">Phone Number</Label>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={selectedContact.phoneNumber}
                  onChange={handleUpdateChange}
                />
              </div>
            </div>

            <div className="mb-2">
              <Label className="small fw-bold">Message Content</Label>
              <Input
                type="textarea"
                name="message"
                rows="5"
                value={selectedContact.message}
                onChange={handleUpdateChange}
              />
            </div>
          </Form>
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button
            color="secondary"
            outline
            size="sm"
            onClick={() => setEditModal(false)}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: GOLD, borderColor: GOLD, color: "#fff" }}
            size="sm"
            onClick={handleUpdateSubmit}>
            Update Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ContactUsPage;
