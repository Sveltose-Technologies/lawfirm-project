"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Card,
  CardBody,
  Table,
  Input,
  Button,
  Badge,
} from "reactstrap";
import { toast } from "react-toastify";
import * as authService from "../../services/authService";
import PaginationComponent from "../../context/Pagination";

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

const fetchUsers = useCallback(async () => {
  try {
    const res = await authService.getAllClients();
    setUsers(res?.clients || []);
  } catch (err) {
    // 'err' will now contain the string "Admin access only"
    toast.error(err);
  }
}, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        const res = await authService.deleteClient(id);
        toast.success(res?.message || "Client deleted successfully");
        fetchUsers();
      } catch (err) {
        toast.error(err || "Failed to delete client");
      }
    }
  };

  const filteredData = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
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
        <h4 className="fw-bold">Client Management</h4>
        <Badge color="warning" className="px-3 py-2 text-dark">
          Total: {filteredData.length}
        </Badge>
      </div>

      <Card className="border-0 shadow-sm rounded-4">
        <CardBody className="p-0">
          <div className="p-3 border-bottom">
            <Input
              placeholder="Search by name or email..."
              className="rounded-pill bg-light border-0 px-4"
              style={{ maxWidth: "350px" }}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="table-responsive">
            <Table
              hover
              className="align-middle mb-0"
              style={{ fontSize: "13px" }}>
              <thead style={{ backgroundColor: "#fdf8ef" }}>
                <tr>
                  <th className="px-4 py-3">SR.</th>
                  <th className="py-3">NAME</th>
                  <th className="py-3">EMAIL</th>
                  <th className="py-3 text-center">STATUS</th>
                  <th className="py-3 text-end px-4">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((u, index) => (
                    <tr key={u.id || index}>
                      <td className="px-4">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="fw-bold text-dark">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="text-muted">{u.email}</td>
                      <td className="text-center">
                        <Badge
                          pill
                          color={u.isActive ? "success" : "secondary"}
                          className="px-2">
                          {u.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </td>
                      <td className="text-end px-4">
                        <Button
                          size="sm"
                          outline
                          color="danger"
                          className="rounded-pill px-3"
                          onClick={() => handleDelete(u.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-muted">
                      No clients found.
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
    </Container>
  );
};

export default Clients;
