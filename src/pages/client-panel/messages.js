import React, { useState } from 'react';
import Head from 'next/head';
import ClientLayout from '../../components/layout/ClientLayout'; // ClientLayout use kiya hai kyuki excel ke mutabik client attorney se baat kar raha hai

export default function Messages() {
  const navyColor = '#002147';
  const [activeTab, setActiveTab] = useState('attorney'); // Default tab 'attorney'
  const [selectedChat, setSelectedChat] = useState({ id: 1, name: "Adv. Rajesh Malhotra", online: true, img: "/assets/images/attorney1.png", role: "Senior Attorney" });
  const [msgInput, setMsgInput] = useState("");

  // Excel sheet ke hisaab se categories
  const chatList = {
    attorney: [
      { id: 1, name: "Adv. Rajesh Malhotra", lastMsg: "Please share the property docs.", time: "10:30 AM", online: true, img: "/assets/images/attorney1.png", role: "Senior Attorney" },
      { id: 2, name: "Adv. Suman Lata", lastMsg: "Hearing is scheduled for tomorrow.", time: "Yesterday", online: false, img: "/assets/images/attorney1.png", role: "Legal Consultant" },
    ],
    staff: [
      { id: 101, name: "Rahul (Support)", lastMsg: "Your payment is verified.", time: "09:15 AM", online: true, img: "/assets/images/attorney1.png", role: "Case Manager" },
      { id: 102, name: "Priya Singh", lastMsg: "Document upload pending.", time: "11:00 AM", online: true, img: "/assets/images/attorney1.png", role: "Office Staff" },
    ]
  };

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, can I get an update on my case?", sender: "me", time: "10:00 AM" },
    { id: 2, text: "Yes, we are reviewing the documents right now.", sender: "other", time: "10:05 AM" },
    { id: 3, text: "I'll update you by the evening.", sender: "other", time: "10:06 AM" },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    const newMsg = { id: Date.now(), text: msgInput, sender: "me", time: "Just now" };
    setMessages([...messages, newMsg]);
    setMsgInput("");
  };

  return (
    <ClientLayout>
 

      <div className="container-fluid px-0">
        {/* Page Header */}
        <div className="mb-4">
          <h4 className="fw-bold mb-1" style={{ color: navyColor, fontSize: '20px' }}>Messages</h4>
          <p className="text-muted small">Connect with your Attorneys and Office Staff.</p>
        </div>

        <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden" style={{ height: '75vh', minHeight: '600px' }}>
          <div className="row g-0 h-100">
            
            {/* --- LEFT SIDEBAR: CATEGORIES & CONTACTS --- */}
            <div className="col-lg-4 col-md-5 border-end d-flex flex-column h-100 bg-white">
              
              {/* Tabs based on Excel (Attorney / Office Staff) */}
              <div className="p-3 border-bottom">
                <div className="d-flex p-1 bg-light rounded-3 shadow-sm">
                  <button 
                    className={`btn flex-grow-1 py-2 fw-bold small transition-all border-0 ${activeTab === 'attorney' ? 'bg-white shadow-sm text-navy' : 'text-muted'}`} 
                    onClick={() => setActiveTab('attorney')}
                    style={{ borderRadius: '8px' }}
                  >
                    Attorney
                  </button>
                  <button 
                    className={`btn flex-grow-1 py-2 fw-bold small transition-all border-0 ${activeTab === 'staff' ? 'bg-white shadow-sm text-navy' : 'text-muted'}`} 
                    onClick={() => setActiveTab('staff')}
                    style={{ borderRadius: '8px' }}
                  >
                    Office Staff
                  </button>
                </div>
              </div>

              {/* Contact List */}
              <div className="flex-grow-1 overflow-auto custom-scrollbar">
                {chatList[activeTab].map(user => (
                  <div 
                    key={user.id} 
                    className={`d-flex align-items-center p-3 border-bottom cursor-pointer transition-all ${selectedChat?.id === user.id ? 'active-chat-bg' : 'hover-chat-item'}`}
                    onClick={() => setSelectedChat(user)}
                  >
                    <div className="position-relative">
                      <img src={user.img} className="circular-avatar-md" alt="user" />
                      {user.online && <span className="online-indicator"></span>}
                    </div>
                    <div className="ms-3 flex-grow-1 overflow-hidden">
                      <h6 className="mb-0 fw-bold text-navy small">{user.name}</h6>
                      <p className="mb-0 text-muted text-truncate x-small">{user.lastMsg}</p>
                    </div>
                    <span className="x-small text-muted">{user.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT: CHAT AREA --- */}
            <div className="col-lg-8 col-md-7 d-flex flex-column h-100 bg-light-gray">
              {selectedChat ? (
                <>
                  {/* Top Bar */}
                  <div className="p-3 border-bottom d-flex align-items-center bg-white">
                    <img src={selectedChat.img} className="circular-avatar-sm" alt="selected" />
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold text-navy small">{selectedChat.name}</h6>
                      <span className="x-small text-muted">{selectedChat.role} • <span className="text-success fw-bold">Online</span></span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-grow-1 overflow-auto p-4 bg-dots custom-scrollbar">
                    {messages.map(msg => (
                      <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`msg-bubble shadow-sm ${msg.sender === 'me' ? 'me-msg' : 'other-msg'}`}>
                          <p className="mb-1">{msg.text}</p>
                          <span className="msg-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input Form */}
                  <form className="p-3 border-top bg-white d-flex align-items-center gap-2" onSubmit={handleSendMessage}>
                    <div className="input-group bg-light rounded-pill px-3 border-0 flex-grow-1 shadow-sm">
                      <button type="button" className="btn border-0 text-muted"><i className="bi bi-plus-circle fs-5"></i></button>
                      <input 
                        type="text" 
                        className="form-control border-0 bg-transparent py-2" 
                        placeholder="Type your message..." 
                        style={{ fontSize: '14px' }}
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                      />
                      <button type="button" className="btn border-0 text-muted"><i className="bi bi-emoji-smile fs-5"></i></button>
                    </div>
                    
                    <button type="submit" className="send-btn-black">
                      <i className="bi bi-send-fill"></i>
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                  <i className="bi bi-chat-dots display-1 opacity-25"></i>
                  <p className="fw-bold mt-3">Select a person from {activeTab} section to start</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .text-navy { color: #002147; }
        .bg-light-gray { background-color: #f8f9fa; }
        .active-chat-bg { background-color: #f0f4f8; border-right: 4px solid #002147; }
        .hover-chat-item:hover { background-color: #f8f9fa; }

        .circular-avatar-md { width: 45px; height: 45px; border-radius: 50% !important; object-fit: cover; }
        .circular-avatar-sm { width: 38px; height: 38px; border-radius: 50% !important; object-fit: cover; }
        .online-indicator { width: 12px; height: 12px; background: #28a745; border: 2px solid white; border-radius: 50%; position: absolute; bottom: 0; right: 0; }

        .msg-bubble { padding: 10px 16px; max-width: 75%; font-size: 14px; }
        .me-msg { background: #002147; color: white; border-radius: 18px 18px 2px 18px; }
        .other-msg { background: white; color: #333; border-radius: 18px 18px 18px 2px; }
        .msg-time { font-size: 10px; display: block; margin-top: 4px; opacity: 0.7; }

        .send-btn-black { 
          background: #000; 
          border: none; 
          color: #fff; 
          width: 40px; 
          height: 40px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          transition: 0.3s;
          cursor: pointer;
        }
        .send-btn-black:hover { transform: scale(1.05); background: #333; }

        .bg-dots { background-color: #f8f9fa; background-image: radial-gradient(#d1d5db 0.8px, transparent 0.8px); background-size: 24px 24px; }
        .x-small { font-size: 11px; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .form-control:focus { box-shadow: none; }
      `}</style>
    </ClientLayout>
  );
}