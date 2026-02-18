// import React, { useState } from 'react';
// import Head from 'next/head';
// import AttorneyLayout from '../../components/layout/AttorneyLayout';

// export default function Messages() {
//   const [activeTab, setActiveTab] = useState('clients');
//   const [selectedChat, setSelectedChat] = useState({ id: 1, name: "Rajesh Malhotra", online: true, img: "/assets/images/attorney1.png" });
//   const [msgInput, setMsgInput] = useState("");

//   const chatList = {
//     clients: [
//       { id: 1, name: "Rajesh Malhotra", lastMsg: "Case file sent.", time: "10:30 AM", online: true, img: "/assets/images/attorney1.png" },
//       { id: 2, name: "Suman Lata", lastMsg: "When is the next hearing?", time: "Yesterday", online: false, img: "/assets/images/attorney1.png" },
//     ],
//     staff: [
//       { id: 101, name: "Rahul (Support)", lastMsg: "Verified documents.", time: "09:15 AM", online: true, img: "/assets/images/attorney1.png" },
//     ]
//   };

//   const [messages, setMessages] = useState([
//     { id: 1, text: "Hello, any update on my case?", sender: "other", time: "10:00 AM" },
//     { id: 2, text: "We are reviewing the documents.", sender: "me", time: "10:05 AM" },
//     { id: 3, text: "I'll get back to you by evening.", sender: "me", time: "10:06 AM" },
//   ]);

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!msgInput.trim()) return;
//     const newMsg = { id: Date.now(), text: msgInput, sender: "me", time: "Just now" };
//     setMessages([...messages, newMsg]);
//     setMsgInput("");
//   };

//   return (
//     <AttorneyLayout>
//       <Head><title>Lawstick | Messages</title></Head>

//       <div className="container-fluid px-0">
//         {/* Page Header */}
//         <div className="mb-4">
//           <h1 className="fw-bold mb-1" style={{ fontFamily: 'serif', color: '#002147', fontSize: '20px' }}>Messages</h1>
//           <p className="text-muted small">Chat with your clients and office staff.</p>
//         </div>

//         <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden" style={{ height: '70vh', minHeight: '550px' }}>
//           <div className="row g-0 h-100">
            
//             {/* --- LEFT: CONTACT LIST --- */}
//             <div className="col-lg-4 col-md-5 border-end d-flex flex-column h-100 bg-light">
//               <div className="p-3 bg-white border-bottom">
//                 <div className="nav nav-pills gap-2 p-1  rounded-pill border">
//                   <button className={`nav-link flex-grow-1 rounded-pill fw-bold small ${activeTab === 'clients' ? 'btn-active' : 'text-muted'}`} onClick={() => setActiveTab('clients')}>Clients</button>
//                   <button className={`nav-link flex-grow-1 rounded-pill fw-bold small ${activeTab === 'staff' ? 'btn-active' : 'text-muted'}`} onClick={() => setActiveTab('staff')}>Staff</button>
//                 </div>
//               </div>

//               <div className="flex-grow-1 overflow-auto">
//                 {chatList[activeTab].map(user => (
//                   <div 
//                     key={user.id} 
//                     className={`d-flex align-items-center p-3 border-bottom cursor-pointer transition-all ${selectedChat?.id === user.id ? 'active-chat-item' : 'hover-chat-item'}`}
//                     onClick={() => setSelectedChat(user)}
//                   >
//                     <div className="position-relative">
//                       <img src={user.img} className="circular-avatar-md" alt="user" />
//                       {user.online && <span className="online-indicator"></span>}
//                     </div>
//                     <div className="ms-3 flex-grow-1 overflow-hidden">
//                       <h6 className="mb-0 fw-bold text-navy small">{user.name}</h6>
//                       <p className="mb-0 text-muted text-truncate x-small">{user.lastMsg}</p>
//                     </div>
//                     <span className="x-small text-muted">{user.time}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* --- RIGHT: CHAT AREA --- */}
//             <div className="col-lg-8 col-md-7 d-flex flex-column h-100">
//               {selectedChat ? (
//                 <>
//                   {/* Chat Top Bar */}
//                   <div className="p-3 border-bottom d-flex align-items-center bg-white shadow-sm">
//                     <img src={selectedChat.img} className="circular-avatar-sm" alt="selected" />
//                     <div className="ms-3">
//                       <h6 className="mb-0 fw-bold text-navy small">{selectedChat.name}</h6>
//                       <span className="x-small text-success fw-bold">Online</span>
//                     </div>
//                   </div>

//                   {/* Messages Content */}
//                   <div className="flex-grow-1 overflow-auto p-4 bg-dots">
//                     {messages.map(msg => (
//                       <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
//                         {msg.sender === 'other' && <img src={selectedChat.img} className="circular-avatar-xs me-2" alt="avatar" />}
//                         <div className={`msg-bubble ${msg.sender === 'me' ? 'me-msg' : 'other-msg'}`}>
//                           <p className="mb-1">{msg.text}</p>
//                           <span className="msg-time">{msg.time}</span>
//                         </div>
//                         {msg.sender === 'me' && <img src="/assets/images/attorney1.png" className="circular-avatar-xs ms-2" alt="avatar" />}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Message Input - UPDATED SEND ICON */}
//                   <form className="p-3 border-top bg-white d-flex align-items-center gap-2" onSubmit={handleSendMessage}>
//                     <div className="input-group bg-light rounded-pill px-3 border flex-grow-1 shadow-sm">
//                       <button type="button" className="btn border-0 text-muted"><i className="bi bi-paperclip fs-5"></i></button>
//                       <input 
//                         type="text" 
//                         className="form-control border-0 bg-transparent py-2" 
//                         placeholder="Write your message..." 
//                         style={{ fontSize: '15px' }}
//                         value={msgInput}
//                         onChange={(e) => setMsgInput(e.target.value)}
//                       />
//                       <button type="button" className="btn border-0 text-muted"><i className="bi bi-emoji-smile fs-5"></i></button>
//                     </div>
                    
//                     {/* BLACK SEND ICON BUTTON */}
//                     <button type="submit" className="send-btn-black">
//                  <i className="bi bi-send"></i>
//                     </button>
//                   </form>
//                 </>
//               ) : (
//                 <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
//                   <i className="bi bi-chat-left-dots display-1 opacity-25"></i>
//                   <p className="fw-bold mt-3">Select a chat to start messaging</p>
//                 </div>
//               )}
//             </div>

//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         /* Colors */
//         .text-navy { color: #002147; }
//         .btn-active { background: #002147 !important; color: white !important; }
//         .active-chat-item { background-color: #f1f5f9; border-left: 5px solid #002147; }
//         .hover-chat-item:hover { background-color: #f8f9fa; cursor: pointer; }

//         /* Goal (Circular) Images Fix */
//         .circular-avatar-md { width: 50px; height: 50px; border-radius: 50% !important; object-fit: cover; border: 1px solid #ddd; }
//         .circular-avatar-sm { width: 40px; height: 40px; border-radius: 50% !important; object-fit: cover; border: 2px solid #002147; }
//         .circular-avatar-xs { width: 30px; height: 30px; border-radius: 50% !important; object-fit: cover; align-self: flex-end; }
//         .online-indicator { width: 13px; height: 13px; background: #22c55e; border: 2px solid white; border-radius: 50%; position: absolute; bottom: 2px; right: 2px; }

//         /* Small Professional Bubbles */
//         .msg-bubble { padding: 10px 16px; max-width: 70%; font-size: 14px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
//         .me-msg { background: #002147; color: white; border-radius: 15px 15px 0 15px; }
//         .other-msg { background: #f1f1f1; color: #333; border-radius: 15px 15px 15px 0; }
//         .msg-time { font-size: 10px; display: block; margin-top: 4px; opacity: 0.7; text-align: right; }

//         /* BLACK SEND ICON - NO BLUE BACKGROUND */
//         .send-btn-black { 
//         background:none;
//           border: none; 
//           color: #000000; /* Pure Black Icon */
//           font-size: 26px; 
//           padding: 0 15px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: 0.2s;
//           cursor: pointer;
//         }
//         .send-btn-black:hover { 
//           color: #de9f57; /* Gold on hover */
//           transform: scale(1.1); 
//         }

//         .bg-dots { background-color: #ffffff; background-image: radial-gradient(#e5e7eb 0.7px, transparent 0.7px); background-size: 20px 20px; }
//         .x-small { font-size: 11px; }
//         .form-control:focus { box-shadow: none; border: none; }
//         :global(.container-fluid) { max-width: 100% !important; }
//       `}</style>
//     </AttorneyLayout>
//   );
// }

import React, { useState } from 'react';
import Head from 'next/head';
import AttorneyLayout from '../../components/layout/AttorneyLayout'; // Attorney Layout use kiya gaya hai

export default function Messages() {
  const navyColor = '#002147';
  
  // Excel Sheet ke mutabik: client chat aur support staff
  const [activeTab, setActiveTab] = useState('client_chat');
  const [selectedChat, setSelectedChat] = useState({ 
    id: 1, 
    name: "Rajesh Malhotra (Client)", 
    online: true, 
    img: "/assets/images/attorney1.png" 
  });
  const [msgInput, setMsgInput] = useState("");

  const chatList = {
    client_chat: [
      { id: 1, name: "Rajesh Malhotra", lastMsg: "Sir, did you check the file?", time: "10:30 AM", online: true, img: "/assets/images/attorney1.png" },
      { id: 2, name: "Suman Lata", lastMsg: "Thank you for the update.", time: "Yesterday", online: false, img: "/assets/images/attorney1.png" },
    ],
    support_staff: [
      { id: 101, name: "Rahul (Support Staff)", lastMsg: "Document verification pending.", time: "09:15 AM", online: true, img: "/assets/images/attorney1.png" },
      { id: 102, name: "Admin Office", lastMsg: "New hearing date added.", time: "11:00 AM", online: true, img: "/assets/images/attorney1.png" },
    ]
  };

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, I am reviewing your case documents.", sender: "me", time: "10:00 AM" },
    { id: 2, text: "Okay sir, please let me know if anything else is needed.", sender: "other", time: "10:05 AM" },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    const newMsg = { id: Date.now(), text: msgInput, sender: "me", time: "Just now" };
    setMessages([...messages, newMsg]);
    setMsgInput("");
  };

  return (
    <AttorneyLayout>
      <Head><title>Messages | Attorney Panel</title></Head>

      <div className="animate-fade">
        {/* Page Header - Consistent with Client UI */}
        <div className="mb-4">
          <h4 className="fw-bold mb-1" style={{ color: navyColor, fontSize: '20px' }}>Messages</h4>
          <p className="text-muted small">Communicate with your clients and support staff</p>
        </div>

        <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden" style={{ height: '75vh', minHeight: '600px' }}>
          <div className="row g-0 h-100">
            
            {/* --- LEFT SIDEBAR: CHAT SECTIONS --- */}
            <div className="col-lg-4 col-md-5 border-end d-flex flex-column h-100">
              
              {/* Excel Categories: client chat | support staff */}
              <div className="p-3 border-bottom bg-white">
                <div className="d-flex p-1 bg-light rounded-3">
                  <button 
                    className={`btn flex-grow-1 py-2 fw-bold small border-0 transition-all ${activeTab === 'client_chat' ? 'bg-white shadow-sm' : 'text-muted'}`} 
                    style={{ color: activeTab === 'client_chat' ? navyColor : '', borderRadius: '8px', fontSize: '12px' }}
                    onClick={() => setActiveTab('client_chat')}
                  >
                    Client Chat
                  </button>
                  <button 
                    className={`btn flex-grow-1 py-2 fw-bold small border-0 transition-all ${activeTab === 'support_staff' ? 'bg-white shadow-sm' : 'text-muted'}`} 
                    style={{ color: activeTab === 'support_staff' ? navyColor : '', borderRadius: '8px', fontSize: '12px' }}
                    onClick={() => setActiveTab('support_staff')}
                  >
                    Support Staff
                  </button>
                </div>
              </div>

              {/* Chat Contact List */}
              <div className="flex-grow-1 overflow-auto custom-scrollbar">
                {chatList[activeTab].map(user => (
                  <div 
                    key={user.id} 
                    className={`d-flex align-items-center p-3 border-bottom cursor-pointer transition-all ${selectedChat?.id === user.id ? 'active-chat-item' : 'hover-chat'}`}
                    onClick={() => setSelectedChat(user)}
                  >
                    <div className="position-relative">
                      <img src={user.img} className="rounded-circle" style={{ width: '45px', height: '45px', objectFit: 'cover' }} alt="user" />
                      {user.online && <span className="online-dot"></span>}
                    </div>
                    <div className="ms-3 flex-grow-1 overflow-hidden">
                      <h6 className="mb-0 fw-bold small" style={{ color: navyColor }}>{user.name}</h6>
                      <p className="mb-0 text-muted text-truncate" style={{ fontSize: '11px' }}>{user.lastMsg}</p>
                    </div>
                    <span className="text-muted" style={{ fontSize: '10px' }}>{user.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- RIGHT: CHAT SECTION --- */}
            <div className="col-lg-8 col-md-7 d-flex flex-column h-100 bg-light-gray">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-3 border-bottom d-flex align-items-center bg-white shadow-sm">
                    <img src={selectedChat.img} className="rounded-circle border" style={{ width: '38px', height: '38px' }} alt="selected" />
                    <div className="ms-3">
                      <h6 className="mb-0 fw-bold small" style={{ color: navyColor }}>{selectedChat.name}</h6>
                      <span className="text-success fw-bold" style={{ fontSize: '10px' }}>Online</span>
                    </div>
                  </div>

                  {/* Messages Window */}
                  <div className="flex-grow-1 overflow-auto p-4 bg-dots custom-scrollbar">
                    {messages.map(msg => (
                      <div key={msg.id} className={`d-flex mb-3 ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}>
                        <div className={`p-3 shadow-sm ${msg.sender === 'me' ? 'me-msg' : 'other-msg'}`} 
                             style={{ maxWidth: '75%', fontSize: '14px' }}>
                          <p className="mb-1">{msg.text}</p>
                          <span style={{ fontSize: '10px', opacity: 0.7, display: 'block', textAlign: 'right' }}>{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input with Black Send Button */}
                  <form className="p-3 border-top bg-white d-flex align-items-center gap-2" onSubmit={handleSendMessage}>
                    <div className="input-group bg-light rounded-pill px-3 border-0 flex-grow-1 shadow-sm">
                      <button type="button" className="btn border-0 text-muted px-2"><i className="bi bi-paperclip fs-5"></i></button>
                      <input 
                        type="text" 
                        className="form-control border-0 bg-transparent py-2" 
                        placeholder="Type your message..." 
                        style={{ fontSize: '14px' }}
                        value={msgInput}
                        onChange={(e) => setMsgInput(e.target.value)}
                      />
                    </div>
                    
                    <button type="submit" className="send-btn-black">
                      <i className="bi bi-send-fill"></i>
                    </button>
                  </form>
                </>
              ) : (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center text-muted">
                  <i className="bi bi-chat-dots display-1 opacity-25"></i>
                  <p className="fw-bold mt-3">Select a chat to begin</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-light-gray { background-color: #f9fbfd; }
        .active-chat-item { background-color: #f1f5f9; border-left: 4px solid ${navyColor}; }
        .hover-chat:hover { background-color: #f8f9fa; }
        
        .online-dot {
          width: 11px; height: 11px; background: #22c55e; 
          border: 2px solid white; border-radius: 50%; 
          position: absolute; bottom: 2px; right: 2px;
        }

        /* Message Bubbles Styling */
        .me-msg { background: ${navyColor}; color: white; border-radius: 18px 18px 2px 18px; }
        .other-msg { background: white; color: #333; border-radius: 18px 18px 18px 2px; }

        /* Black Send Button */
        .send-btn-black { 
          background: #000; border: none; color: white; 
          width: 42px; height: 42px; border-radius: 50%; 
          display: flex; align-items: center; justify-content: center;
          transition: 0.2s; cursor: pointer;
        }
        .send-btn-black:hover { transform: scale(1.05); background: #222; }

        /* Patterns and Scroll */
        .bg-dots { 
          background-color: #f8f9fa; 
          background-image: radial-gradient(#d1d5db 0.8px, transparent 0.8px); 
          background-size: 20px 20px; 
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .form-control:focus { box-shadow: none; outline: none; }
      `}</style>
    </AttorneyLayout>
  );
}