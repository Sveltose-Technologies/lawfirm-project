"use client";
import React, { useState } from "react";
import { Row, Col, Input, ListGroup, ListGroupItem, Button } from "reactstrap";
import { adminMessage } from "../../services/authService";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [typedMessage, setTypedMessage] = useState("");

  // State to hold messages for each chat ID
  const [conversations, setConversations] = useState({
    1: [{ id: 101, text: "Salut", sender: "John", time: "10:00 AM" }],
    2: [{ id: 102, text: "asdsad", sender: "Name", time: "11:00 AM" }],
  });

  const handleSendMessages = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    //     "" :
    //     "clientId" : ,
    //     "senderType" : "",
    // "message" : "hii"
    const payload = {
      adminId: "adminId",
      senderType: "admin",
      message: typedMessage,
    };
    console.log("userId", userId);
    // try {
    //   const response = await adminMessage(payload);
    // } catch (error) {
    //   console.log(error);
    // }
  };

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
      name: "Mohit",
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
  ];

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!typedMessage.trim() || !selectedChat) return;

    const user = JSON.parse(localStorage.getItem("user"));
    console.log("userID", user);

    const payload = {
      adminId: user?.id || "1",
      clientId: "7",
      senderType: "admin",
      message: typedMessage,
    };

    try {
      const adminChatResponse = await adminMessage(payload);
      console.log("CHAT MESSAGE Successful", adminChatResponse?.data);
    } catch (error) {
      console.log("API Error:", error);
    }

    // UI update
    const newMessage = {
      id: Date.now(),
      text: typedMessage,
      sender: "Me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversations((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    setTypedMessage("");
  };

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
            <Input
              type="text"
              placeholder="Search chats..."
              className="rounded-pill  border-0 ps-3"
              style={{ backgroundColor: "#e1e7ee" }}
            />
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
                  alt=""
                  className="rounded-circle border"
                  width="45"
                  height="45"
                />
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
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
              {/* Header */}
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

              {/* Message Display Area */}
              <div className="flex-grow-1 p-4 overflow-auto bg-light custom-scrollbar">
                {(conversations[selectedChat.id] || []).map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${msg.sender === "Me" ? "justify-content-end" : "justify-content-start"}`}>
                    <div
                      className={`p-3 rounded-4 shadow-sm ${msg.sender === "Me" ? "text-white" : "bg-white text-dark"}`}
                      style={{
                        maxWidth: "70%",
                        backgroundColor:
                          msg.sender === "Me" ? "#22443e" : "#ffffff", // Dark green for 'Me', white for others
                        borderRadius:
                          msg.sender === "Me"
                            ? "15px 15px 2px 15px"
                            : "15px 15px 15px 2px",
                        border:
                          msg.sender === "Me" ? "none" : "1px solid #e0e0e0", // Optional: adds a light border to white bubbles
                      }}>
                      <p
                        className="mb-1 small"
                        style={{
                          color: msg.sender === "Me" ? "#fff" : "#161515",
                        }}>
                        {msg.text}
                      </p>
                      <div
                        className="text-end"
                        style={{
                          fontSize: "9px",
                          opacity: 0.6,
                          color: msg.sender === "Me" ? "#fff" : "#161515",
                        }}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-3 border-top bg-white">
                <form
                  onSubmit={handleSendMessage}
                  className="d-flex gap-2 align-items-center">
                  <Input
                    type="text"
                    placeholder="Write a message..."
                    className="rounded-pill bg-light border-0 px-3 py-2"
                    value={typedMessage}
                    onChange={(e) => setTypedMessage(e.target.value)}
                  />
                  <Button
                    type="submit"
                    className="rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                    style={{
                      width: "42px",
                      height: "42px",
                      backgroundColor: "#083f36", // Your deep professional green
                      color: "#ffffff", // White icon for contrast
                    }}>
                    {/* Unicode Plane Icon */}
                    <span
                      style={{
                        fontSize: "20px",
                        transform: "rotate(0deg)",
                        display: "inline-block",
                        // marginTop: "-4px",
                      }}>
                      ➤
                    </span>
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3665/3665922.png"
                alt="empty chat"
                className="img-fluid floating-animation mb-4"
                style={{ width: "120px", opacity: 0.6 }}
              />
              <h5 className="text-muted fw-light">
                Select a conversation to start messaging.
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
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .chat-item:hover {
          background-color: #f8f9fa !important;
        }
        .chat-item.active {
          background-color: #fff9ed !important;
          border-left: 4px solid #083f36 !important;
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
