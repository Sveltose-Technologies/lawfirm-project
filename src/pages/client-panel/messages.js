"use client";
import React, { useState, useEffect, useRef } from "react";
// Add these lines below:
import { Row, Col } from "reactstrap";
import ClientLayout from "../../components/layout/ClientLayout";
import {
  getAllAttorneys,
  getAdminProfile,
  getUserMessageHistory,
  getClientAttorneyMessageHistory,
  adminClientMessage,
  attorneyClientMessage,
  getImgUrl,
} from "../../services/authService";

// ... rest of your code
export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [typedMessage, setTypedMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [conversations, setConversations] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [adminId, setAdminId] = useState("");
  const scrollRef = useRef(null);

  const professionalGreen = "#083f36";

  // 1. Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations, selectedChat]);

  // 2. Fetch Contacts (Admin & Verified Attorneys)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminRes, attorneysRes] = await Promise.all([
          getAdminProfile(),
          getAllAttorneys(),
        ]);

        let combined = [];

        // Process Admin (Admins are usually always verified/active)
        if (adminRes && adminRes.id) {
          setAdminId(adminRes.id);
          combined.push({
            id: adminRes.id,
            role: "Admin",
            chatId: `admin-${adminRes.id}`,
            name: adminRes.firstName || "Admin Office",
            img: getImgUrl(adminRes.profileImage),
          });
        }

        // Process Attorneys - ONLY VERIFIED
        const verifiedAttorneys = (attorneysRes?.attorneys || [])
          .filter((a) => a.status === "verified")
          .map((a) => ({
            id: a.id,
            role: "Attorney",
            chatId: `attorney-${a.id}`,
            name: `${a.firstName} ${a.lastName || ""}`,
            img: getImgUrl(a.profileImage),
          }));

        const fullList = [...combined, ...verifiedAttorneys];
        setChatList(fullList);

        // PERSISTENCE: Restore active chat on refresh
        const savedChatId = localStorage.getItem("client_active_chat");
        if (savedChatId) {
          const found = fullList.find((c) => c.chatId === savedChatId);
          if (found) setSelectedChat(found);
        }
      } catch (err) {
        console.error("Fetch contacts error:", err);
      }
    };
    fetchData();
  }, []);

  // 3. Fetch History when Chat is selected
  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedChat) return;

      // Save to localStorage for refresh persistence
      localStorage.setItem("client_active_chat", selectedChat.chatId);

      const user = JSON.parse(localStorage.getItem("user")); // Logged-in Client
      try {
        let response;
        if (selectedChat.role === "Admin") {
          // Client <-> Admin History
          response = await getUserMessageHistory(selectedChat.id, user.id);
        } else {
          // Client <-> Attorney History
          response = await getClientAttorneyMessageHistory(
            selectedChat.id,
            user.id,
          );
        }

        const formattedMessages = (response?.data || []).map((msg) => ({
          id: msg.id,
          text: msg.message,
          // If senderType is 'client', it's "Me"
          sender: msg.senderType === "client" ? "Me" : selectedChat.name,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));

        setConversations((prev) => ({
          ...prev,
          [selectedChat.chatId]: formattedMessages,
        }));
      } catch (error) {
        console.error("History fetch error:", error);
      }
    };
    fetchHistory();
  }, [selectedChat]);

  // 4. Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !selectedChat) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const msgText = typedMessage;
    setTypedMessage("");

    try {
      if (selectedChat.role === "Attorney") {
        await attorneyClientMessage({
          attorneyId: selectedChat.id,
          clientId: user?.id,
          senderType: "client",
          message: msgText,
        });
      } else {
        await adminClientMessage({
          adminId: selectedChat.id,
          clientId: user?.id,
          senderType: "client",
          message: msgText,
        });
      }

      // Local UI update (Optimistic Update)
      const newMessage = {
        id: Date.now(),
        text: msgText,
        sender: "Me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setConversations((prev) => ({
        ...prev,
        [selectedChat.chatId]: [
          ...(prev[selectedChat.chatId] || []),
          newMessage,
        ],
      }));
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  const filteredChatList = chatList.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <ClientLayout>
      <div className="p-2 p-md-3" style={{ height: "calc(100vh - 120px)" }}>
        <Row className="h-100 g-0 shadow-sm rounded-4 border overflow-hidden bg-white">
          {/* LEFT SIDE: CONTACT LIST */}
          <Col
            md="4"
            lg="3"
            className="border-end d-flex flex-column h-100 bg-light">
            <div className="p-3 bg-white border-bottom">
              <h5 className="fw-bold mb-3">Messages</h5>
              <input
                placeholder="Search..."
                className="form-control rounded-pill border-0 bg-light px-3"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-auto flex-grow-1 custom-scrollbar">
              {filteredChatList.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`p-3 border-bottom d-flex align-items-center gap-3 cursor-pointer transition-all ${
                    selectedChat?.chatId === chat.chatId
                      ? "bg-white active-chat"
                      : "hover-item"
                  }`}
                  onClick={() => setSelectedChat(chat)}>
                  <img
                    src={chat.img || "/assets/images/default-avatar.png"}
                    width="45"
                    height="45"
                    className="rounded-circle border"
                    alt=""
                  />
                  <div className="flex-grow-1 overflow-hidden">
                    <div className="fw-bold text-dark small text-truncate">
                      {chat.name}
                    </div>
                    <div className="text-muted" style={{ fontSize: "11px" }}>
                      {chat.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          {/* RIGHT SIDE: CHAT AREA */}
          <Col md="8" lg="9" className="d-flex flex-column h-100 bg-white">
            {selectedChat ? (
              <>
                {/* Header */}
                <div className="p-3 border-bottom d-flex align-items-center gap-3 bg-white">
                  <img
                    src={
                      selectedChat.img || "/assets/images/default-avatar.png"
                    }
                    width="40"
                    height="40"
                    className="rounded-circle border"
                    alt=""
                  />
                  <div>
                    <div className="fw-bold small">{selectedChat.name}</div>
                    <div
                      className="text-primary fw-bold"
                      style={{ fontSize: "10px" }}>
                      {selectedChat.role}
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div
                  className="flex-grow-1 p-4 overflow-auto bg-dots custom-scrollbar"
                  ref={scrollRef}>
                  {(conversations[selectedChat.chatId] || []).map((msg) => (
                    <div
                      key={msg.id}
                      className={`d-flex mb-3 ${msg.sender === "Me" ? "justify-content-end" : "justify-content-start"}`}>
                      <div
                        className={`p-3 shadow-sm ${msg.sender === "Me" ? "msg-me" : "msg-other"}`}
                        style={{ maxWidth: "75%" }}>
                        <div className="small">{msg.text}</div>
                        <div
                          className="text-end mt-1"
                          style={{ fontSize: "9px", opacity: 0.7 }}>
                          {msg.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-3 border-top bg-white">
                  <form onSubmit={handleSendMessage} className="d-flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a message..."
                      className="form-control rounded-pill bg-light border-0 px-4"
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                      style={{
                        backgroundColor: professionalGreen,
                        width: "45px",
                        height: "45px",
                        color: "#fff",
                      }}>
                      ➤
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                <i className="bi bi-chat-dots fs-1 opacity-25"></i>
                <p className="mt-2 fw-bold">Select a chat to start</p>
              </div>
            )}
          </Col>
        </Row>

        <style jsx>{`
          .active-chat {
            border-left: 4px solid ${professionalGreen} !important;
          }
          .hover-item:hover {
            background-color: #f8f9fa;
          }
          .msg-me {
            background-color: ${professionalGreen};
            color: white;
            border-radius: 15px 15px 2px 15px;
          }
          .msg-other {
            background-color: white;
            color: #333;
            border-radius: 15px 15px 15px 2px;
            border: 1px solid #e0e0e0;
          }
          .bg-dots {
            background-color: #f8f9fa;
            background-image: radial-gradient(#d1d5db 0.8px, transparent 0.8px);
            background-size: 20px 20px;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 5px;
          }
        `}</style>
      </div>
    </ClientLayout>
  );
}
