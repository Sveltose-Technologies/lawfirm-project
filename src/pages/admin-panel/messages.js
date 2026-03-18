"use client";
import React, { useState } from "react";
import { Row, Col, Input, ListGroup, ListGroupItem, Badge } from "reactstrap";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Static Data for UI demonstration
  const chatList = [
    {
      id: 1,
      name: "John",
      role: "User",
      lastMsg: "Salut",
      time: "a month ago",
      img: "https://i.pravatar.cc/150?u=john",
    },
    {
      id: 2,
      name: "Name",
      role: "Attorney",
      lastMsg: "asdsad",
      time: "a month ago",
      img: "https://i.pravatar.cc/150?u=name",
    },
    {
      id: 3,
      name: "Robert",
      role: "User",
      lastMsg: "hi",
      time: "4 months ago",
      img: "https://i.pravatar.cc/150?u=robert",
    },
    {
      id: 4,
      name: "Rifat Mia",
      role: "User",
      lastMsg: "dlgnei jr",
      time: "4 months ago",
      img: "https://i.pravatar.cc/150?u=rifat",
    },
    {
      id: 5,
      name: "Peter Kungu",
      role: "Attorney",
      lastMsg: "hlooo",
      time: "8 months ago",
      img: "https://i.pravatar.cc/150?u=peter",
    },
  ];

  return (
    <div
      className="p-4 animate-fade-in"
      style={{ height: "calc(100vh - 120px)" }}>
      <Row className="h-100 bg-white shadow-sm rounded-4 overflow-hidden g-0 border">
        {/* Left Side: Inbox List */}
        <Col
          md="4"
          lg="3"
          className="border-end d-flex flex-column bg-light-subtle">
          <div className="p-3 bg-white border-bottom">
            <h5 className="fw-bold mb-3">Inbox</h5>
            <div className="position-relative">
              <Input
                type="text"
                placeholder="Search chats..."
                className="rounded-pill bg-light border-0 ps-3"
              />
            </div>
          </div>

          <ListGroup
            flush
            className="overflow-auto flex-grow-1 custom-scrollbar">
            {chatList.map((chat) => (
              <ListGroupItem
                key={chat.id}
                action
                active={selectedChat?.id === chat.id}
                onClick={() => setSelectedChat(chat)}
                className="border-0 border-bottom p-3 d-flex align-items-center gap-3 chat-item">
                <img
                  src={chat.img}
                  alt={chat.name}
                  className="rounded-circle border"
                  width="45"
                  height="45"
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-dark">{chat.name}</span>
                    <small className="text-muted" style={{ fontSize: "10px" }}>
                      {chat.time}
                    </small>
                  </div>
                  <div
                    className="small text-muted text-truncate"
                    style={{ maxWidth: "150px" }}>
                    {chat.role} • {chat.lastMsg}
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>

        {/* Right Side: Message Content */}
        <Col md="8" lg="9" className="d-flex flex-column bg-white">
          {selectedChat ? (
            <div className="h-100 d-flex flex-column animate-slide-up">
              {/* Active Chat Header */}
              <div className="p-3 border-bottom d-flex align-items-center gap-3">
                <img
                  src={selectedChat.img}
                  className="rounded-circle"
                  width="40"
                  height="40"
                  alt=""
                />
                <div>
                  <div className="fw-bold">{selectedChat.name}</div>
                  <small className="text-success">Online</small>
                </div>
              </div>

              {/* Placeholder for messages */}
              <div className="flex-grow-1 p-4 text-center d-flex align-items-center justify-content-center text-muted">
                <p>Start your conversation with {selectedChat.name}</p>
              </div>
            </div>
          ) : (
            /* Default Empty State (Matches your screenshot) */
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
              <div className="mb-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3665/3665922.png"
                  alt="mobile animation"
                  className="img-fluid floating-animation"
                  style={{ width: "120px", opacity: 0.6 }}
                />
              </div>
              <h5 className="text-muted fw-light">
                Click an inbox card to view the messages.
              </h5>
            </div>
          )}
        </Col>
      </Row>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
        .floating-animation {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .chat-item {
          transition: background 0.2s;
          cursor: pointer;
        }
        .chat-item:hover {
          background-color: #f8f9fa !important;
        }
        .chat-item.active {
          background-color: #fff9ed !important;
          border-left: 4px solid #ffc107 !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Messages;
