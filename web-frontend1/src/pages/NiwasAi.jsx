
// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import FAQSection from '../components/common/FAQSection';
// // import axios from "axios";
// // import {
// //   User,
// //   Send,
// //   Mic,
// //   Sparkles,
// //   MessageSquare,
// //   PlusCircle,
// //   Clock,
// //   MapPin,
// //   X,
// //   Navigation,
// //   Lock,
// //   ExternalLink,
// //   Trash2,
// // } from "lucide-react";
// // import logo from "../assets/images/homelogo.png";
// // import ai from "../assets/images/niwas_ai.png";

// // const MAX_TRIALS = 3;

// // /* ============================================================
// //    UTILS — Formatting & Helpers
// //    ============================================================ */
// // function formatPrice(price) {
// //   if (price === undefined || price === null || Number.isNaN(Number(price))) {
// //     return "Price on request";
// //   }
// //   const num = Number(price);
// //   if (num >= 10000000) {
// //     return `₹${(num / 10000000).toFixed(2)} Cr`;
// //   } else if (num >= 100000) {
// //     return `₹${(num / 100000).toFixed(2)} L`;
// //   }
// //   return `₹${num.toLocaleString("en-IN")}`;
// // }

// // /* ============================================================
// //    SUBCOMPONENTS
// //    ============================================================ */
// // function SuggestionChips({ suggestions, onPick, disabled }) {
// //   const list = suggestions || [
// //     "Find a 2 BHK in Vijay Nagar under ₹30K",
// //     "Average land price in Vijay Nagar, Indore",
// //     "Is Rau good for families?",
// //     "3 BHK under ₹1 Cr in Indore",
// //   ];
// //   return (
// //     <div className="flex flex-wrap gap-2 mt-4">
// //       {list.map((s) => (
// //         <button
// //           key={s}
// //           disabled={disabled}
// //           onClick={() => onPick(s)}
// //           className={`group flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm shadow-sm transition-all duration-200 ${
// //             disabled
// //               ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
// //               : "border-gray-200 bg-white text-gray-700 hover:border-[#1CB46D] hover:bg-[#1CB46D]/5 hover:text-[#0F2E46] hover:shadow-md active:scale-95"
// //           }`}
// //         >
// //           <Sparkles
// //             size={13}
// //             className={`text-[#1CB46D] ${
// //               disabled ? "opacity-30" : "opacity-70 group-hover:opacity-100"
// //             }`}
// //           />
// //           {s}
// //         </button>
// //       ))}
// //     </div>
// //   );
// // }

// // function TypingIndicator() {
// //   return (
// //     <div className="flex items-end gap-2 animate-[fadeInUp_0.25s_ease-out]">
// //       <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
// //         <img src={ai} alt="Niwas AI" className="h-full w-full object-contain" />
// //       </div>
// //       <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3.5">
// //         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
// //         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
// //         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />

// //       </div>

// //     </div>
// //   );
// // }

// // function PropertyCard({ property, isSelected, onSelect }) {
// //   return (
// //     <button
// //       type="button"
// //       onClick={() => onSelect?.(property)}
// //       className={`group w-full text-left overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
// //         isSelected
// //           ? "border-[#1CB46D] ring-2 ring-[#1CB46D]/30 shadow-lg"
// //           : "border-gray-200 shadow-sm"
// //       }`}
// //     >
// //       <div className="relative h-40 w-full overflow-hidden">
// //         <img
// //           src={
// //             property.image ||
// //             property.images?.[0] ||
// //             "https://via.placeholder.com/400x300"
// //           }
// //           alt={property.title || property.project_name || "Property"}
// //           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
// //         />
// //         <div className="absolute bottom-2 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F2E46] shadow">
// //           {property.price_label || formatPrice(property.price)}
// //         </div>
// //         {property.verified && (
// //           <div className="absolute top-2 right-2 rounded-full bg-[#1CB46D] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
// //             Verified
// //           </div>
// //         )}
// //       </div>
// //       <div className="p-3">
// //         <h4 className="font-bold text-sm text-[#0F2E46] leading-snug line-clamp-1">
// //           {property.title || property.project_name}
// //         </h4>
// //         <p className="text-xs text-gray-500 mt-0.5">
// //           {property.locality ? `${property.locality}, ` : ""}
// //           {property.city}
// //         </p>
// //       </div>
// //     </button>
// //   );
// // }

// // function ChatMessage({ message, selectedProperty, onSelectProperty }) {
// //   const isUser = message.role === "user";
// //   return (
// //     <div
// //       className={`flex items-end gap-2 animate-[fadeInUp_0.3s_ease-out] ${
// //         isUser ? "flex-row-reverse" : ""
// //       }`}
// //     >
// //       <div
// //         className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm ${
// //           isUser
// //             ? "bg-gray-100"
// //             : "bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5"
// //         }`}
// //       >
// //         {isUser ? (
// //           <User size={18} className="text-gray-600" />
// //         ) : (
// //           <img
// //             src={ai}
// //             alt="Niwas AI"
// //             className="h-full w-full object-contain"
// //           />
// //         )}
// //       </div>
// //       <div
// //         className={`flex flex-col gap-3 ${
// //           isUser ? "items-end" : "items-start"
// //         } max-w-[85%]`}
// //       >
// //         <div
// //           className={`inline-block px-4 py-3 shadow-sm ${
// //             isUser
// //               ? "rounded-2xl rounded-br-sm bg-[#0F2E46] text-white"
// //               : "rounded-2xl rounded-bl-sm bg-gray-100 text-gray-800"
// //           }`}
// //         >
// //           <div className="whitespace-pre-line text-sm leading-relaxed">
// //             {message.text || message.content}
// //           </div>
// //         </div>

// //         {/* Render Properties Cards */}
// //         {message.properties?.length > 0 && (
// //           <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
// //             {message.properties.map((p) => (
// //               <PropertyCard
// //                 key={p.id}
// //                 property={p}
// //                 isSelected={selectedProperty?.id === p.id}
// //                 onSelect={onSelectProperty}
// //               />
// //             ))}
// //           </div>
// //         )}

// //         {/* Render Cited Sources */}
// //         {message.sources?.length > 0 && (
// //           <div className="flex flex-col gap-1 text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200 w-full">
// //             <span className="font-semibold text-gray-700">Sources:</span>
// //             {message.sources.map((src, index) => (
// //               <a
// //                 key={index}
// //                 href={src.url}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="flex items-center gap-1 text-[#1CB46D] hover:underline"
// //               >
// //                 <ExternalLink size={12} /> {src.title || src.url}
// //               </a>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // function PropertyLocationPanel({ property, onClose }) {
// //   if (!property) return null;
// //   const lat = property.latitude;
// //   const lng = property.longitude;
// //   const title = property.title || property.project_name || "Selected Property";
// //   const address = property.address || `${property.locality}, ${property.city}`;

// //   const mapEmbedSrc =
// //     lat && lng
// //       ? `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`
// //       : `https://www.google.com/maps?q=${encodeURIComponent(
// //           address,
// //         )}&hl=en&z=12&output=embed`;

// //   const mapDirectionsUrl =
// //     lat && lng
// //       ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
// //       : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
// //           address,
// //         )}`;

// //   return (
// //     <div className="flex w-full flex-col gap-3 border-b border-gray-100 bg-white p-4 animate-[fadeInUp_0.25s_ease-out]">
// //       <div className="flex items-start justify-between gap-2">
// //         <div className="flex items-center gap-2 min-w-0">
// //           <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1CB46D]/10 text-[#1CB46D]">
// //             <MapPin size={16} />
// //           </span>
// //           <div className="min-w-0">
// //             <p className="truncate text-sm font-bold text-[#0F2E46]">{title}</p>
// //             <p className="truncate text-xs text-gray-500">{address}</p>
// //           </div>
// //         </div>
// //         <button
// //           onClick={onClose}
// //           aria-label="Close location"
// //           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
// //         >
// //           <X size={15} />
// //         </button>
// //       </div>
// //       <div className="overflow-hidden rounded-xl border border-gray-200">
// //         <iframe
// //           title={`map-${property.id}`}
// //           src={mapEmbedSrc}
// //           width="100%"
// //           height="180"
// //           style={{ border: 0 }}
// //           loading="lazy"
// //           referrerPolicy="no-referrer-when-downgrade"
// //         />
// //       </div>
// //       <a
// //         href={mapDirectionsUrl}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="flex items-center justify-center gap-2 rounded-xl bg-[#0F2E46] py-2.5 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
// //       >
// //         <Navigation size={14} /> Get Directions
// //       </a>
// //     </div>
// //   );
// // }

// // function HistoryPanel({
// //   chatHistory,
// //   activeChatId,
// //   onSelectChat,
// //   onNewChat,
// //   onDeleteChat,
// // }) {
// //   return (
// //     <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
// //       <button
// //         onClick={onNewChat}
// //         className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1CB46D] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#159659] active:scale-95"
// //       >
// //         <PlusCircle size={18} /> New Chat
// //       </button>
// //       <div className="flex-1">
// //         <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
// //           <Clock size={14} /> Recent Conversations
// //         </h3>
// //         <div className="flex flex-col gap-2">
// //           {chatHistory.length === 0 ? (
// //             <p className="py-6 text-center text-xs text-gray-400">
// //               No previous chats available.
// //             </p>
// //           ) : (
// //             chatHistory.map((chat) => (
// //               <div
// //                 key={chat.id}
// //                 className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 hover:bg-gray-50 ${
// //                   activeChatId === chat.id
// //                     ? "border-[#1CB46D] bg-[#1CB46D]/5"
// //                     : "border-gray-100"
// //                 }`}
// //               >
// //                 <button
// //                   onClick={() => onSelectChat(chat.id)}
// //                   className="flex min-w-0 flex-1 items-center gap-3 text-left"
// //                 >
// //                   <MessageSquare
// //                     size={16}
// //                     className={
// //                       activeChatId === chat.id
// //                         ? "text-[#1CB46D]"
// //                         : "text-gray-400"
// //                     }
// //                   />
// //                   <div className="min-w-0 flex-1">
// //                     <p className="truncate text-sm font-medium text-[#0F2E46]">
// //                       {chat.title || "New Conversation"}
// //                     </p>
// //                     <p className="text-[11px] text-gray-400">
// //                       {chat.messages.length} messages
// //                     </p>
// //                   </div>
// //                 </button>
// //                 <button
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     onDeleteChat(chat.id, chat.sessionId);
// //                   }}
// //                   title="Delete Chat"
// //                   className="p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
// //                 >
// //                   <Trash2 size={15} />
// //                 </button>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* ============================================================
// //    MAIN COMPONENT
// //    ============================================================ */
// // export default function NiwasAi() {
// //   // Store trial count permanently in localStorage
// //   const [userSearchCount, setUserSearchCount] = useState(() => {
// //     const saved = localStorage.getItem("diginiwas_search_count");
// //     return saved ? parseInt(saved, 10) : 0;
// //   });

// //   const [chatHistory, setChatHistory] = useState([
// //     {
// //       id: "session-1",
// //       sessionId: null, // Stores API session_id
// //       title: "New Conversation",
// //       messages: [
// //         {
// //           role: "assistant",
// //           text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
// //           properties: [],
// //           sources: [],
// //         },
// //       ],
// //     },
// //   ]);

// //   const [activeChatId, setActiveChatId] = useState("session-1");
// //   const [input, setInput] = useState("");
// //   const [typing, setTyping] = useState(false);
// //   const [selectedProperty, setSelectedProperty] = useState(null);
// //   const [listening, setListening] = useState(false);
// //   const scrollRef = useRef(null);
// //   const recognitionRef = useRef(null);

// //   const activeChat = useMemo(() => {
// //     return chatHistory.find((c) => c.id === activeChatId) || chatHistory[0];
// //   }, [chatHistory, activeChatId]);

// //   const messages = activeChat.messages;
// //   const isChatLocked = userSearchCount >= MAX_TRIALS;

// //   useEffect(() => {
// //     scrollRef.current?.scrollTo({
// //       top: scrollRef.current.scrollHeight,
// //       behavior: "smooth",
// //     });
// //   }, [messages, typing]);

// //   const handleVoice = () => {
// //     if (isChatLocked) return;
// //     const SpeechRecognition =
// //       window.SpeechRecognition || window.webkitSpeechRecognition;
// //     if (!SpeechRecognition) {
// //       alert("Voice input isn't supported in this browser.");
// //       return;
// //     }
// //     if (listening) {
// //       recognitionRef.current?.stop();
// //       return;
// //     }
// //     const recognition = new SpeechRecognition();
// //     recognition.lang = "en-IN";
// //     recognition.interimResults = false;
// //     recognition.onstart = () => setListening(true);
// //     recognition.onend = () => setListening(false);
// //     recognition.onresult = (e) => {
// //       const transcript = e.results?.[0]?.[0]?.transcript;
// //       if (transcript) setInput(transcript);
// //     };
// //     recognitionRef.current = recognition;
// //     recognition.start();
// //   };

// //   const runSearch = async (rawQuery) => {
// //     if (!rawQuery.trim() || typing || isChatLocked) return;

// //     const userMsg = { role: "user", text: rawQuery };

// //     // Increment and store search count locally
// //     const newCount = userSearchCount + 1;
// //     setUserSearchCount(newCount);
// //     localStorage.setItem("diginiwas_search_count", newCount.toString());

// //     // Update state to append User message
// //     setChatHistory((prev) =>
// //       prev.map((chat) => {
// //         if (chat.id === activeChatId) {
// //           const updatedTitle =
// //             chat.messages.length === 1 ? rawQuery : chat.title;
// //           return {
// //             ...chat,
// //             title: updatedTitle,
// //             messages: [...chat.messages, userMsg],
// //           };
// //         }
// //         return chat;
// //       }),
// //     );

// //     setInput("");
// //     setTyping(true);

// //     try {
// //       const payload = {
// //         message: rawQuery,
// //       };

// //       if (activeChat.sessionId) {
// //         payload.session_id = activeChat.sessionId;
// //       }

// //       if (selectedProperty?.id) {
// //         payload.property_id = selectedProperty.id;
// //       }

// //       const headers = {
// //         "Content-Type": "application/json",
// //       };

// //       if (activeChat.sessionId) {
// //         headers["X-Session-ID"] = activeChat.sessionId;
// //       }

// //       const res = await axios.post(
// //         `https://diginiwas-niwas-ai-api.onrender.com/v1/chat`,
// //         payload,
// //         { headers },
// //       );

// //       const data = res.data;
// //       const newSessionId = data.session_id || res.headers["x-session-id"];

// //       const assistantMsg = {
// //         role: "assistant",
// //         text: data.reply || "No reply received.",
// //         properties: data.properties || [],
// //         sources: data.sources || [],
// //       };

// //       setChatHistory((prev) =>
// //         prev.map((chat) => {
// //           if (chat.id === activeChatId) {
// //             return {
// //               ...chat,
// //               sessionId: newSessionId || chat.sessionId,
// //               messages: [...chat.messages, assistantMsg],
// //             };
// //           }
// //           return chat;
// //         }),
// //       );
// //     } catch (err) {
// //       console.error("API Error:", err);
// //       const errorMessage =
// //         err.response?.data?.detail ||
// //         "Sorry, I am facing an issue fetching real estate data right now.";

// //       const assistantMsg = {
// //         role: "assistant",
// //         text:
// //           typeof errorMessage === "string"
// //             ? errorMessage
// //             : JSON.stringify(errorMessage),
// //         properties: [],
// //         sources: [],
// //       };

// //       setChatHistory((prev) =>
// //         prev.map((chat) => {
// //           if (chat.id === activeChatId) {
// //             return { ...chat, messages: [...chat.messages, assistantMsg] };
// //           }
// //           return chat;
// //         }),
// //       );
// //     } finally {
// //       setTyping(false);
// //     }
// //   };

// //   // Fetch Session History on Selection
// //   const handleSelectChat = async (chatId) => {
// //     setActiveChatId(chatId);
// //     const chat = chatHistory.find((c) => c.id === chatId);

// //     if (chat?.sessionId && chat.messages.length <= 1) {
// //       try {
// //         const res = await axios.get(
// //           `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${chat.sessionId}/history`,
// //         );
// //         if (res.data?.messages) {
// //           const apiMessages = res.data.messages.map((m) => ({
// //             role: m.role,
// //             text: m.content || m.text,
// //             properties: m.properties || [],
// //             sources: m.sources || [],
// //           }));

// //           setChatHistory((prev) =>
// //             prev.map((c) =>
// //               c.id === chatId ? { ...c, messages: apiMessages } : c,
// //             ),
// //           );
// //         }
// //       } catch (err) {
// //         console.error("Failed to load chat history:", err);
// //       }
// //     }
// //   };

// //   // Delete Session from Backend & Local State
// //   const handleDeleteChat = async (chatId, sessionId) => {
// //     if (sessionId) {
// //       try {
// //         await axios.delete(
// //           `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${sessionId}`,
// //         );
// //       } catch (err) {
// //         console.error("Failed to delete session on server:", err);
// //       }
// //     }

// //     setChatHistory((prev) => {
// //       const filtered = prev.filter((c) => c.id !== chatId);
// //       if (filtered.length === 0) {
// //         const newId = `session-${Date.now()}`;
// //         return [
// //           {
// //             id: newId,
// //             sessionId: null,
// //             title: "New Conversation",
// //             messages: [
// //               {
// //                 role: "assistant",
// //                 text: "👋 Welcome to DigiNiwas.\nWhat brings you to DigiNiwas today?",
// //                 properties: [],
// //                 sources: [],
// //               },
// //             ],
// //           },
// //         ];
// //       }
// //       return filtered;
// //     });

// //     if (activeChatId === chatId) {
// //       setActiveChatId(chatHistory[0]?.id || "session-1");
// //     }
// //   };

// //   const handleNewChat = () => {
// //     const newId = `session-${Date.now()}`;
// //     const newChatSession = {
// //       id: newId,
// //       sessionId: null,
// //       title: "New Conversation",
// //       messages: [
// //         {
// //           role: "assistant",
// //           text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
// //           properties: [],
// //           sources: [],
// //         },
// //       ],
// //     };
// //     setChatHistory((prev) => [newChatSession, ...prev]);
// //     setActiveChatId(newId);
// //     setSelectedProperty(null);
// //   };

// //   const handleSelectProperty = (property) => {
// //     setSelectedProperty((prev) => (prev?.id === property.id ? null : property));
// //   };

// //   const handleSend = () => runSearch(input);
// //   const handleSuggestion = (text) => runSearch(text);

// //   const showChips =
// //     !typing &&
// //     !isChatLocked &&
// //     messages[messages.length - 1]?.role === "assistant";

// //   return (
// //     <div className="flex h-dvh w-full flex-col overflow-hidden bg-gray-50 lg:h-screen lg:flex-row">
// //       <style>{`
// //         @keyframes fadeInUp {
// //           from { opacity: 0; transform: translateY(8px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>

// //       {/* Main Chat Column */}
// //       <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden lg:flex-1">
// //         {/* Header */}
// //         <div className="flex shrink-0 items-center justify-between border-b bg-white p-4 sm:p-5">
// //           <div className="flex items-center gap-3">
// //             <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
// //               <img
// //                 src={ai}
// //                 alt="Niwas AI Avatar"
// //                 className="h-full w-full object-contain"
// //               />
// //             </div>
// //             <div>
// //               <div className="font-bold text-[#0F2E46]">Niwas AI</div>
// //               <div className="text-xs text-gray-500">
// //                 {isChatLocked
// //                   ? "Trial Limit Reached"
// //                   : "AI Property Consultant"}
// //               </div>
// //             </div>
// //           </div>
// //           <button
// //             onClick={handleNewChat}
// //             className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 lg:hidden"
// //           >
// //             <PlusCircle size={14} /> New Chat
// //           </button>
// //         </div>

// //         {/* Selected Property Location Bar */}
// //         {selectedProperty && (
// //           <PropertyLocationPanel
// //             property={selectedProperty}
// //             onClose={() => setSelectedProperty(null)}
// //           />
// //         )}

// //         {/* Messages Scroll Area */}
// //         <div
// //           ref={scrollRef}
// //           className="relative flex-1 min-h-0 space-y-5 overflow-y-auto p-4 sm:p-6 pb-6"
// //         >
// //           {messages.map((msg, index) => (
// //             <ChatMessage
// //               key={index}
// //               message={msg}
// //               selectedProperty={selectedProperty}
// //               onSelectProperty={handleSelectProperty}
// //             />
// //           ))}

// //           {typing && <TypingIndicator />}

// //           {showChips && (
// //             <SuggestionChips onPick={handleSuggestion} disabled={typing} />
// //           )}

// //           {/* Locked State Notification */}
// //           {/* {isChatLocked && (
// //             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
// //               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
// //                 <Lock size={22} />
// //               </div>
// //               <div>
// //                 <h4 className="font-bold text-amber-900 text-base">You've reached your 3 free searches limit</h4>
// //                 <p className="text-xs text-amber-700 mt-1 max-w-md">
// //                   We're here to help! Share your details below and a dedicated DigiNiwas Relationship Manager will contact you shortly.
// //                 </p>
// //               </div>
// //             </div>
// //           )} */}

// //           {/* Locked Overlay Message with Play Store Download Link */}
// //           {isChatLocked && (
// //             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
// //               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
// //                 <Lock size={22} />
// //               </div>
// //               <div>
// //                 <h4 className="font-bold text-amber-900 text-base">
// //                   You've reached your 3 free searches limit
// //                 </h4>
// //                 <p className="text-xs text-amber-700 mt-1 max-w-md">
// //                   For more searches, download <b>DigiNiwas</b> app on mobile
// //                   from Google Play Store.
// //                 </p>
// //               </div>

// //               {/* Google Play Store Badge / Button */}
// //               <a
// //                 href="https://play.google.com/store/apps/details?id=com.diginiwas" // Apna Play Store Link Yahan Dalein
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="mt-2 inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
// //               >
// //                 {/* Play Store Svg Icon */}
// //                 <svg
// //                   className="h-6 w-6"
// //                   viewBox="0 0 24 24"
// //                   fill="currentColor"
// //                 >
// //                   <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C19.74,13.44 19.74,12.56 18.81,12.03L16.81,10.88L14.81,12.88L16.81,15.12M4.6,2.83L14.1,12.33L11.5,14.93L4.6,2.83M4.6,21.17L11.5,14.27L14.1,16.87L4.6,21.17Z" />
// //                 </svg>
// //                 <div className="text-left">
// //                   <div className="text-[9px] uppercase font-semibold leading-none text-gray-300">
// //                     GET IT ON
// //                   </div>
// //                   <div className="text-xs font-bold leading-tight">
// //                     Google Play
// //                   </div>
// //                 </div>
// //               </a>
// //             </div>
// //           )}
// //         </div>

// //         {/* Input Bar */}
// //         <div className="sticky bottom-0 z-30 shrink-0 border-t border-[#DCE7EA] bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,46,70,0.08)] backdrop-blur sm:p-4">
// //           <div
// //             className={`flex items-center gap-2 rounded-2xl border px-3 py-2 transition-all ${
// //               isChatLocked
// //                 ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
// //                 : "bg-gray-50 border-gray-200 focus-within:border-[#1CB46D] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1CB46D]/20"
// //             }`}
// //           >
// //             <button
// //               type="button"
// //               disabled={isChatLocked}
// //               onClick={handleVoice}
// //               className={`p-2 transition-colors ${
// //                 listening
// //                   ? "text-red-500 animate-pulse"
// //                   : "text-gray-400 hover:text-gray-600"
// //               }`}
// //             >
// //               <Mic size={18} />
// //             </button>
// //             <input
// //               type="text"
// //               disabled={isChatLocked}
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && handleSend()}
// //               placeholder={
// //                 isChatLocked
// //                   ? "Chat is locked after 3 trials."
// //                   : "Ask about properties, locality guides, or land rates..."
// //               }
// //               className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
// //             />
// //             <button
// //               type="button"
// //               onClick={handleSend}
// //               disabled={!input.trim() || typing || isChatLocked}
// //               className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F2E46] text-white transition-all ${
// //                 !input.trim() || typing || isChatLocked
// //                   ? "opacity-40 cursor-not-allowed"
// //                   : "hover:bg-[#159659] active:scale-95"
// //               }`}
// //             >
// //               <Send size={16} />
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* History Sidebar for Desktop */}
// //       <div className="hidden w-80 shrink-0 border-l bg-white lg:block">
// //         <HistoryPanel
// //           chatHistory={chatHistory}
// //           activeChatId={activeChatId}
// //           onSelectChat={handleSelectChat}
// //           onNewChat={handleNewChat}
// //           onDeleteChat={handleDeleteChat}
// //         />
// //       </div>

// //       {/* Niwas AI FAQs */}
// //       {/* <div className="w-full shrink-0 border-t border-[#DCE7EA] bg-white">
// //         <FAQSection
// //           title="Niwas AI FAQs"
// //           subtitle="Quick answers about Niwas AI, verification, support and safe property decisions."
// //           groups={[
// //             {
// //               title: "Niwas AI FAQs",
// //               items: [
// //                 {
// //                   question: "What is Niwas AI?",
// //                   answer:
// //                     "A property-assistance feature designed to help users search, understand and compare property information more easily.",
// //                 },
// //                 {
// //                   question: "Can Niwas AI make mistakes?",
// //                   answer:
// //                     "Yes. AI-generated information may be incomplete or incorrect. Important legal, financial, valuation and property information should be independently verified.",
// //                 },
// //               ],
// //             },
// //             {
// //               title: "Safety FAQs",
// //               items: [
// //                 {
// //                   question: "How do I report a suspicious property?",
// //                   answer:
// //                     "Open the property listing, use Report Property, choose the reason and submit the report. You may also report a Partner/User where the feature is available.",
// //                 },
// //               ],
// //             },
// //             {
// //               title: "Support FAQs",
// //               items: [
// //                 {
// //                   question: "How do I contact DigiNiwas?",
// //                   answer:
// //                     "Use Help & Support in the app or email info@diginiwas.com.",
// //                 },
// //               ],
// //             },
// //           ]}
// //         />
// //       </div> */}
// //     </div>
// //   );
// // }


// import React, { useEffect, useMemo, useRef, useState } from "react";
// import FAQSection from '../components/common/FAQSection';
// import axios from "axios";
// import {
//   User,
//   Send,
//   Mic,
//   Sparkles,
//   MessageSquare,
//   PlusCircle,
//   Clock,
//   MapPin,
//   X,
//   Navigation,
//   Lock,
//   ExternalLink,
//   Trash2,
//   PanelLeftClose,
//   PanelLeftOpen,
//   Building2,
// } from "lucide-react";
// import logo from "../assets/images/homelogo.png";
// import ai from "../assets/images/niwas_ai.png";

// const MAX_TRIALS = 3;

// /* ============================================================
//    UTILS — Formatting & Helpers
//    ============================================================ */
// function formatPrice(price) {
//   if (price === undefined || price === null || Number.isNaN(Number(price))) {
//     return "Price on request";
//   }
//   const num = Number(price);
//   if (num >= 10000000) {
//     return `₹${(num / 10000000).toFixed(2)} Cr`;
//   } else if (num >= 100000) {
//     return `₹${(num / 100000).toFixed(2)} L`;
//   }
//   return `₹${num.toLocaleString("en-IN")}`;
// }

// /* ============================================================
//    SUBCOMPONENTS
//    ============================================================ */
// function SuggestionChips({ suggestions, onPick, disabled }) {
//   const list = suggestions || [
//     "Find a 2 BHK in Vijay Nagar under ₹30K",
//     "Average land price in Vijay Nagar, Indore",
//     "Is Rau good for families?",
//     "3 BHK under ₹1 Cr in Indore",
//   ];
//   return (
//     <div className="flex flex-wrap gap-2 mt-4">
//       {list.map((s) => (
//         <button
//           key={s}
//           disabled={disabled}
//           onClick={() => onPick(s)}
//           className={`group flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm shadow-sm transition-all duration-200 ${
//             disabled
//               ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
//               : "border-gray-200 bg-white text-gray-700 hover:border-[#1CB46D] hover:bg-[#1CB46D]/5 hover:text-[#0F2E46] hover:shadow-md active:scale-95"
//           }`}
//         >
//           <Sparkles
//             size={13}
//             className={`text-[#1CB46D] ${
//               disabled ? "opacity-30" : "opacity-70 group-hover:opacity-100"
//             }`}
//           />
//           {s}
//         </button>
//       ))}
//     </div>
//   );
// }

// function TypingIndicator() {
//   return (
//     <div className="flex items-end gap-2 animate-[fadeInUp_0.25s_ease-out]">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
//         <img src={ai} alt="Niwas AI" className="h-full w-full object-contain" />
//       </div>
//       <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3.5">
//         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
//         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
//         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />

//       </div>

//     </div>
//   );
// }

// function PropertyCard({ property, isSelected, onSelect }) {
//   return (
//     <button
//       type="button"
//       onClick={() => onSelect?.(property)}
//       className={`group w-full text-left overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
//         isSelected
//           ? "border-[#1CB46D] ring-2 ring-[#1CB46D]/30 shadow-lg"
//           : "border-gray-200 shadow-sm"
//       }`}
//     >
//       <div className="relative h-40 w-full overflow-hidden">
//         <img
//           src={
//             property.image ||
//             property.images?.[0] ||
//             "https://via.placeholder.com/400x300"
//           }
//           alt={property.title || property.project_name || "Property"}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute bottom-2 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F2E46] shadow">
//           {property.price_label || formatPrice(property.price)}
//         </div>
//         {property.verified && (
//           <div className="absolute top-2 right-2 rounded-full bg-[#1CB46D] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
//             Verified
//           </div>
//         )}
//       </div>
//       <div className="p-3">
//         <h4 className="font-bold text-sm text-[#0F2E46] leading-snug line-clamp-1">
//           {property.title || property.project_name}
//         </h4>
//         <p className="text-xs text-gray-500 mt-0.5">
//           {property.locality ? `${property.locality}, ` : ""}
//           {property.city}
//         </p>
//       </div>
//     </button>
//   );
// }

// function ChatMessage({ message, selectedProperty, onSelectProperty }) {
//   const isUser = message.role === "user";
//   return (
//     <div
//       className={`flex items-end gap-2 animate-[fadeInUp_0.3s_ease-out] ${
//         isUser ? "flex-row-reverse" : ""
//       }`}
//     >
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm ${
//           isUser
//             ? "bg-gray-100"
//             : "bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5"
//         }`}
//       >
//         {isUser ? (
//           <User size={18} className="text-gray-600" />
//         ) : (
//           <img
//             src={ai}
//             alt="Niwas AI"
//             className="h-full w-full object-contain"
//           />
//         )}
//       </div>
//       <div
//         className={`flex flex-col gap-3 ${
//           isUser ? "items-end" : "items-start"
//         } max-w-[85%]`}
//       >
//         <div
//           className={`inline-block px-4 py-3 shadow-sm ${
//             isUser
//               ? "rounded-2xl rounded-br-sm bg-[#0F2E46] text-white"
//               : "rounded-2xl rounded-bl-sm bg-gray-100 text-gray-800"
//           }`}
//         >
//           <div className="whitespace-pre-line text-sm leading-relaxed">
//             {message.text || message.content}
//           </div>
//         </div>

//         {/* Render Properties Cards */}
//         {message.properties?.length > 0 && (
//           <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
//             {message.properties.map((p) => (
//               <PropertyCard
//                 key={p.id}
//                 property={p}
//                 isSelected={selectedProperty?.id === p.id}
//                 onSelect={onSelectProperty}
//               />
//             ))}
//           </div>
//         )}

//         {/* Render Cited Sources */}
//         {message.sources?.length > 0 && (
//           <div className="flex flex-col gap-1 text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200 w-full">
//             <span className="font-semibold text-gray-700">Sources:</span>
//             {message.sources.map((src, index) => (
//               <a
//                 key={index}
//                 href={src.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-1 text-[#1CB46D] hover:underline"
//               >
//                 <ExternalLink size={12} /> {src.title || src.url}
//               </a>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function PropertyLocationPanel({ property, onClose }) {
//   if (!property) return null;
//   const lat = property.latitude;
//   const lng = property.longitude;
//   const title = property.title || property.project_name || "Selected Property";
//   const address = property.address || `${property.locality}, ${property.city}`;

//   const mapEmbedSrc =
//     lat && lng
//       ? `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`
//       : `https://www.google.com/maps?q=${encodeURIComponent(
//           address,
//         )}&hl=en&z=12&output=embed`;

//   const mapDirectionsUrl =
//     lat && lng
//       ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
//       : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//           address,
//         )}`;

//   return (
//     <div className="flex w-full flex-col gap-3 border-b border-gray-100 bg-white p-4 animate-[fadeInUp_0.25s_ease-out]">
//       <div className="flex items-start justify-between gap-2">
//         <div className="flex items-center gap-2 min-w-0">
//           <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1CB46D]/10 text-[#1CB46D]">
//             <MapPin size={16} />
//           </span>
//           <div className="min-w-0">
//             <p className="truncate text-sm font-bold text-[#0F2E46]">{title}</p>
//             <p className="truncate text-xs text-gray-500">{address}</p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           aria-label="Close location"
//           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
//         >
//           <X size={15} />
//         </button>
//       </div>
//       <div className="overflow-hidden rounded-xl border border-gray-200">
//         <iframe
//           title={`map-${property.id}`}
//           src={mapEmbedSrc}
//           width="100%"
//           height="180"
//           style={{ border: 0 }}
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         />
//       </div>
//       <a
//         href={mapDirectionsUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center gap-2 rounded-xl bg-[#0F2E46] py-2.5 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
//       >
//         <Navigation size={14} /> Get Directions
//       </a>
//     </div>
//   );
// }

// function HistoryPanel({
//   chatHistory,
//   activeChatId,
//   onSelectChat,
//   onNewChat,
//   onDeleteChat,
// }) {
//   return (
//     <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
//       <button
//         onClick={onNewChat}
//         className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1CB46D] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#159659] active:scale-95"
//       >
//         <PlusCircle size={18} /> New Chat
//       </button>
//       <div className="flex-1">
//         <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
//           <Clock size={14} /> Recent Conversations
//         </h3>
//         <div className="flex flex-col gap-2">
//           {chatHistory.length === 0 ? (
//             <p className="py-6 text-center text-xs text-gray-400">
//               No previous chats available.
//             </p>
//           ) : (
//             chatHistory.map((chat) => (
//               <div
//                 key={chat.id}
//                 className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 hover:bg-gray-50 ${
//                   activeChatId === chat.id
//                     ? "border-[#1CB46D] bg-[#1CB46D]/5"
//                     : "border-gray-100"
//                 }`}
//               >
//                 <button
//                   onClick={() => onSelectChat(chat.id)}
//                   className="flex min-w-0 flex-1 items-center gap-3 text-left"
//                 >
//                   <MessageSquare
//                     size={16}
//                     className={
//                       activeChatId === chat.id
//                         ? "text-[#1CB46D]"
//                         : "text-gray-400"
//                     }
//                   />
//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-sm font-medium text-[#0F2E46]">
//                       {chat.title || "New Conversation"}
//                     </p>
//                     <p className="text-[11px] text-gray-400">
//                       {chat.messages.length} messages
//                     </p>
//                   </div>
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDeleteChat(chat.id, chat.sessionId);
//                   }}
//                   title="Delete Chat"
//                   className="p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
//                 >
//                   <Trash2 size={15} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    MAIN COMPONENT
//    ============================================================ */
// export default function NiwasAi() {
//   // Store trial count permanently in localStorage
//   const [userSearchCount, setUserSearchCount] = useState(() => {
//     const saved = localStorage.getItem("diginiwas_search_count");
//     return saved ? parseInt(saved, 10) : 0;
//   });

//   const [chatHistory, setChatHistory] = useState([
//     {
//       id: "session-1",
//       sessionId: null, // Stores API session_id
//       title: "New Conversation",
//       messages: [
//         {
//           role: "assistant",
//           text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
//           properties: [],
//           sources: [],
//         },
//       ],
//     },
//   ]);

//   const [activeChatId, setActiveChatId] = useState("session-1");
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [historyOpen, setHistoryOpen] = useState(true);
//   const [popularProperties, setPopularProperties] = useState([]);
//   const [listening, setListening] = useState(false);
//   const scrollRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const activeChat = useMemo(() => {
//     return chatHistory.find((c) => c.id === activeChatId) || chatHistory[0];
//   }, [chatHistory, activeChatId]);

//   const messages = activeChat.messages;
//   useEffect(() => {
//     let mounted = true;
//     axios.get(`${import.meta.env.VITE_API_URL}/api/properties`).then((res) => {
//       const list = res?.data?.properties || res?.data?.data || [];
//       if (mounted) setPopularProperties(Array.isArray(list) ? list.filter((p) => p && (p.media?.images?.length || p.images?.length || p.image)).slice(0, 6) : []);
//     }).catch(() => {});
//     return () => { mounted = false; };
//   }, []);
//   const isChatLocked = userSearchCount >= MAX_TRIALS;

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages, typing]);

//   const handleVoice = () => {
//     if (isChatLocked) return;
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Voice input isn't supported in this browser.");
//       return;
//     }
//     if (listening) {
//       recognitionRef.current?.stop();
//       return;
//     }
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (e) => {
//       const transcript = e.results?.[0]?.[0]?.transcript;
//       if (transcript) setInput(transcript);
//     };
//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const runSearch = async (rawQuery) => {
//     if (!rawQuery.trim() || typing || isChatLocked) return;

//     const userMsg = { role: "user", text: rawQuery };

//     // Increment and store search count locally
//     const newCount = userSearchCount + 1;
//     setUserSearchCount(newCount);
//     localStorage.setItem("diginiwas_search_count", newCount.toString());

//     // Update state to append User message
//     setChatHistory((prev) =>
//       prev.map((chat) => {
//         if (chat.id === activeChatId) {
//           const updatedTitle =
//             chat.messages.length === 1 ? rawQuery : chat.title;
//           return {
//             ...chat,
//             title: updatedTitle,
//             messages: [...chat.messages, userMsg],
//           };
//         }
//         return chat;
//       }),
//     );

//     setInput("");
//     setTyping(true);

//     try {
//       const payload = {
//         message: rawQuery,
//       };

//       if (activeChat.sessionId) {
//         payload.session_id = activeChat.sessionId;
//       }

//       if (selectedProperty?.id) {
//         payload.property_id = selectedProperty.id;
//       }

//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (activeChat.sessionId) {
//         headers["X-Session-ID"] = activeChat.sessionId;
//       }

//       const res = await axios.post(
//         `https://diginiwas-niwas-ai-api.onrender.com/v1/chat`,
//         payload,
//         { headers },
//       );

//       const data = res.data;
//       const newSessionId = data.session_id || res.headers["x-session-id"];

//       const assistantMsg = {
//         role: "assistant",
//         text: data.reply || "No reply received.",
//         properties: data.properties || [],
//         sources: data.sources || [],
//       };

//       setChatHistory((prev) =>
//         prev.map((chat) => {
//           if (chat.id === activeChatId) {
//             return {
//               ...chat,
//               sessionId: newSessionId || chat.sessionId,
//               messages: [...chat.messages, assistantMsg],
//             };
//           }
//           return chat;
//         }),
//       );
//     } catch (err) {
//       console.error("API Error:", err);
//       const errorMessage =
//         err.response?.data?.detail ||
//         "Sorry, I am facing an issue fetching real estate data right now.";

//       const assistantMsg = {
//         role: "assistant",
//         text:
//           typeof errorMessage === "string"
//             ? errorMessage
//             : JSON.stringify(errorMessage),
//         properties: [],
//         sources: [],
//       };

//       setChatHistory((prev) =>
//         prev.map((chat) => {
//           if (chat.id === activeChatId) {
//             return { ...chat, messages: [...chat.messages, assistantMsg] };
//           }
//           return chat;
//         }),
//       );
//     } finally {
//       setTyping(false);
//     }
//   };

//   // Fetch Session History on Selection
//   const handleSelectChat = async (chatId) => {
//     setActiveChatId(chatId);
//     const chat = chatHistory.find((c) => c.id === chatId);

//     if (chat?.sessionId && chat.messages.length <= 1) {
//       try {
//         const res = await axios.get(
//           `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${chat.sessionId}/history`,
//         );
//         if (res.data?.messages) {
//           const apiMessages = res.data.messages.map((m) => ({
//             role: m.role,
//             text: m.content || m.text,
//             properties: m.properties || [],
//             sources: m.sources || [],
//           }));

//           setChatHistory((prev) =>
//             prev.map((c) =>
//               c.id === chatId ? { ...c, messages: apiMessages } : c,
//             ),
//           );
//         }
//       } catch (err) {
//         console.error("Failed to load chat history:", err);
//       }
//     }
//   };

//   // Delete Session from Backend & Local State
//   const handleDeleteChat = async (chatId, sessionId) => {
//     if (sessionId) {
//       try {
//         await axios.delete(
//           `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${sessionId}`,
//         );
//       } catch (err) {
//         console.error("Failed to delete session on server:", err);
//       }
//     }

//     setChatHistory((prev) => {
//       const filtered = prev.filter((c) => c.id !== chatId);
//       if (filtered.length === 0) {
//         const newId = `session-${Date.now()}`;
//         return [
//           {
//             id: newId,
//             sessionId: null,
//             title: "New Conversation",
//             messages: [
//               {
//                 role: "assistant",
//                 text: "👋 Welcome to DigiNiwas.\nWhat brings you to DigiNiwas today?",
//                 properties: [],
//                 sources: [],
//               },
//             ],
//           },
//         ];
//       }
//       return filtered;
//     });

//     if (activeChatId === chatId) {
//       setActiveChatId(chatHistory[0]?.id || "session-1");
//     }
//   };

//   const handleNewChat = () => {
//     const newId = `session-${Date.now()}`;
//     const newChatSession = {
//       id: newId,
//       sessionId: null,
//       title: "New Conversation",
//       messages: [
//         {
//           role: "assistant",
//           text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
//           properties: [],
//           sources: [],
//         },
//       ],
//     };
//     setChatHistory((prev) => [newChatSession, ...prev]);
//     setActiveChatId(newId);
//     setSelectedProperty(null);
//   };

//   const handleSelectProperty = (property) => {
//     setSelectedProperty((prev) => (prev?.id === property.id ? null : property));
//   };

//   const handleSend = () => runSearch(input);
//   const handleSuggestion = (text) => runSearch(text);

//   const showChips =
//     !typing &&
//     !isChatLocked &&
//     messages[messages.length - 1]?.role === "assistant";

//   return (
//     <div className="flex min-h-[calc(100dvh-102px)] w-full flex-col bg-gray-50">
//       {/* Niwas AI workspace: fill the space below the site navbar without adding a page footer */}
//       <div className="flex min-h-[calc(100dvh-72px)] w-full flex-col overflow-hidden lg:h-[calc(100dvh-76px)] lg:min-h-[620px] lg:flex-row">
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       {/* Collapsible left conversation rail */}
//       {historyOpen && <aside className="order-2 flex max-h-[32vh] w-full shrink-0 flex-col overflow-y-auto border-t border-[#e4ecef] bg-white lg:order-1 lg:max-h-none lg:h-full lg:w-[280px] lg:border-r lg:border-t-0">
//         <HistoryPanel chatHistory={chatHistory} activeChatId={activeChatId} onSelectChat={onSelectChat => handleSelectChat(onSelectChat)} onNewChat={handleNewChat} onDeleteChat={handleDeleteChat} />
//       </aside>}

//       {/* Main Chat Column */}
//       <div className="relative order-1 flex min-h-[62vh] w-full min-w-0 flex-col overflow-hidden lg:order-2 lg:h-full lg:min-h-0 lg:flex-1">
//         {/* Header */}
//         <div className="flex shrink-0 items-center justify-between border-b bg-white p-4 sm:p-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
//               <img
//                 src={ai}
//                 alt="Niwas AI Avatar"
//                 className="h-full w-full object-contain"
//               />
//             </div>
//             <div>
//               <div className="font-bold text-[#0F2E46]">Niwas AI</div>
//               <div className="text-xs text-gray-500">
//                 {isChatLocked
//                   ? "Trial Limit Reached"
//                   : "AI Property Consultant"}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button type="button" onClick={() => setHistoryOpen((v) => !v)} title={historyOpen ? "Hide conversations" : "Show conversations"} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#0F2E46] hover:border-[#1CB46D] hover:text-[#1CB46D]">
//               {historyOpen ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}
//             </button>
//             <button onClick={handleNewChat} className="flex items-center gap-1.5 rounded-lg bg-[#1CB46D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#159659]">
//               <PlusCircle size={14} /> New Chat
//             </button>
//           </div>
//         </div>

//         {/* Selected Property Location Bar */}
//         {selectedProperty && (
//           <PropertyLocationPanel
//             property={selectedProperty}
//             onClose={() => setSelectedProperty(null)}
//           />
//         )}

//         {/* Messages Scroll Area */}
//         <div
//           ref={scrollRef}
//           className="relative flex-1 min-h-0 space-y-5 overflow-y-auto p-4 sm:p-6 pb-6"
//         >
//           {messages.map((msg, index) => (
//             <ChatMessage
//               key={index}
//               message={msg}
//               selectedProperty={selectedProperty}
//               onSelectProperty={handleSelectProperty}
//             />
//           ))}

//           {typing && <TypingIndicator />}

//           {showChips && (
//             <SuggestionChips onPick={handleSuggestion} disabled={typing} />
//           )}

//           {/* Locked State Notification */}
//           {/* {isChatLocked && (
//             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
//                 <Lock size={22} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-amber-900 text-base">You've reached your 3 free searches limit</h4>
//                 <p className="text-xs text-amber-700 mt-1 max-w-md">
//                   We're here to help! Share your details below and a dedicated DigiNiwas Relationship Manager will contact you shortly.
//                 </p>
//               </div>
//             </div>
//           )} */}

//           {/* Locked Overlay Message with Play Store Download Link */}
//           {isChatLocked && (
//             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
//                 <Lock size={22} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-amber-900 text-base">
//                   You've reached your 3 free searches limit
//                 </h4>
//                 <p className="text-xs text-amber-700 mt-1 max-w-md">
//                   For more searches, download <b>DigiNiwas</b> app on mobile
//                   from Google Play Store.
//                 </p>
//               </div>

//               {/* Google Play Store Badge / Button */}
//               <a
//                 href="https://play.google.com/store/apps/details?id=com.diginiwas" // Apna Play Store Link Yahan Dalein
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-2 inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
//               >
//                 {/* Play Store Svg Icon */}
//                 <svg
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C19.74,13.44 19.74,12.56 18.81,12.03L16.81,10.88L14.81,12.88L16.81,15.12M4.6,2.83L14.1,12.33L11.5,14.93L4.6,2.83M4.6,21.17L11.5,14.27L14.1,16.87L4.6,21.17Z" />
//                 </svg>
//                 <div className="text-left">
//                   <div className="text-[9px] uppercase font-semibold leading-none text-gray-300">
//                     GET IT ON
//                   </div>
//                   <div className="text-xs font-bold leading-tight">
//                     Google Play
//                   </div>
//                 </div>
//               </a>
//             </div>
//           )}
//         </div>

//         {/* Input Bar */}
//         <div className="sticky bottom-0 z-30 shrink-0 border-t border-[#DCE7EA] bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,46,70,0.08)] backdrop-blur sm:p-4">
//           <div
//             className={`flex items-center gap-2 rounded-2xl border px-3 py-2 transition-all ${
//               isChatLocked
//                 ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
//                 : "bg-gray-50 border-gray-200 focus-within:border-[#1CB46D] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1CB46D]/20"
//             }`}
//           >
//             <button
//               type="button"
//               disabled={isChatLocked}
//               onClick={handleVoice}
//               className={`p-2 transition-colors ${
//                 listening
//                   ? "text-red-500 animate-pulse"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               <Mic size={18} />
//             </button>
//             <input
//               type="text"
//               disabled={isChatLocked}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder={
//                 isChatLocked
//                   ? "Chat is locked after 3 trials."
//                   : "Ask about properties, locality guides, or land rates..."
//               }
//               className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
//             />
//             <button
//               type="button"
//               onClick={handleSend}
//               disabled={!input.trim() || typing || isChatLocked}
//               className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F2E46] text-white transition-all ${
//                 !input.trim() || typing || isChatLocked
//                   ? "opacity-40 cursor-not-allowed"
//                   : "hover:bg-[#159659] active:scale-95"
//               }`}
//             >
//               <Send size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Popular properties rail */}
//       <aside className="order-3 hidden w-[300px] shrink-0 flex-col border-l border-[#e4ecef] bg-white p-4 lg:flex lg:h-full lg:overflow-y-auto">
//         <div className="mb-4 flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#1CB46D]">Discover</p><h3 className="mt-1 text-base font-extrabold text-[#0F2E46]">Popular Properties</h3></div><Building2 size={20} className="text-[#1CB46D]" /></div>
//         {popularProperties.length ? <div className="space-y-3">{popularProperties.map((property, index) => { const image = property.media?.images?.[0]?.url || property.media?.images?.[0] || property.images?.[0]?.url || property.images?.[0] || property.image; return <button key={property._id || property.id || index} onClick={() => setSelectedProperty({ ...property, id: property._id || property.id, title: property.title || property.project_name || property.propertyName, image })} className="group w-full overflow-hidden rounded-xl border border-gray-100 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#1CB46D] hover:shadow-md"><img src={image} alt={property.title || property.project_name || "Property"} className="h-28 w-full object-cover"/><div className="p-3"><p className="line-clamp-1 text-sm font-bold text-[#0F2E46]">{property.title || property.project_name || property.propertyName || "Property listing"}</p><p className="mt-1 line-clamp-1 text-xs text-gray-500">{property.locality || property.area || ""}{property.city ? `, ${property.city}` : ""}</p><p className="mt-2 text-sm font-extrabold text-[#159659]">{property.price_label || formatPrice(property.price || property.expectedPrice)}</p></div></button>; })}</div> : <p className="rounded-xl bg-gray-50 p-4 text-xs leading-5 text-gray-500">New and popular listings will appear here when available.</p>}
//       </aside>

//       </div>


//     </div>
//   );
// }




// import React, { useEffect, useMemo, useRef, useState } from "react";
// import FAQSection from '../components/common/FAQSection';
// import axios from "axios";
// import {
//   User,
//   Send,
//   Mic,
//   Sparkles,
//   MessageSquare,
//   PlusCircle,
//   Clock,
//   MapPin,
//   X,
//   Navigation,
//   Lock,
//   ExternalLink,
//   Trash2,
// } from "lucide-react";
// import logo from "../assets/images/homelogo.png";
// import ai from "../assets/images/niwas_ai.png";

// const MAX_TRIALS = 3;

// /* ============================================================
//    UTILS — Formatting & Helpers
//    ============================================================ */
// function formatPrice(price) {
//   if (price === undefined || price === null || Number.isNaN(Number(price))) {
//     return "Price on request";
//   }
//   const num = Number(price);
//   if (num >= 10000000) {
//     return `₹${(num / 10000000).toFixed(2)} Cr`;
//   } else if (num >= 100000) {
//     return `₹${(num / 100000).toFixed(2)} L`;
//   }
//   return `₹${num.toLocaleString("en-IN")}`;
// }

// /* ============================================================
//    SUBCOMPONENTS
//    ============================================================ */
// function SuggestionChips({ suggestions, onPick, disabled }) {
//   const list = suggestions || [
//     "Find a 2 BHK in Vijay Nagar under ₹30K",
//     "Average land price in Vijay Nagar, Indore",
//     "Is Rau good for families?",
//     "3 BHK under ₹1 Cr in Indore",
//   ];
//   return (
//     <div className="flex flex-wrap gap-2 mt-4">
//       {list.map((s) => (
//         <button
//           key={s}
//           disabled={disabled}
//           onClick={() => onPick(s)}
//           className={`group flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm shadow-sm transition-all duration-200 ${
//             disabled
//               ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
//               : "border-gray-200 bg-white text-gray-700 hover:border-[#1CB46D] hover:bg-[#1CB46D]/5 hover:text-[#0F2E46] hover:shadow-md active:scale-95"
//           }`}
//         >
//           <Sparkles
//             size={13}
//             className={`text-[#1CB46D] ${
//               disabled ? "opacity-30" : "opacity-70 group-hover:opacity-100"
//             }`}
//           />
//           {s}
//         </button>
//       ))}
//     </div>
//   );
// }

// function TypingIndicator() {
//   return (
//     <div className="flex items-end gap-2 animate-[fadeInUp_0.25s_ease-out]">
//       <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
//         <img src={ai} alt="Niwas AI" className="h-full w-full object-contain" />
//       </div>
//       <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3.5">
//         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
//         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
//         <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />

//       </div>

//     </div>
//   );
// }

// function PropertyCard({ property, isSelected, onSelect }) {
//   return (
//     <button
//       type="button"
//       onClick={() => onSelect?.(property)}
//       className={`group w-full text-left overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
//         isSelected
//           ? "border-[#1CB46D] ring-2 ring-[#1CB46D]/30 shadow-lg"
//           : "border-gray-200 shadow-sm"
//       }`}
//     >
//       <div className="relative h-40 w-full overflow-hidden">
//         <img
//           src={
//             property.image ||
//             property.images?.[0] ||
//             "https://via.placeholder.com/400x300"
//           }
//           alt={property.title || property.project_name || "Property"}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div className="absolute bottom-2 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F2E46] shadow">
//           {property.price_label || formatPrice(property.price)}
//         </div>
//         {property.verified && (
//           <div className="absolute top-2 right-2 rounded-full bg-[#1CB46D] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
//             Verified
//           </div>
//         )}
//       </div>
//       <div className="p-3">
//         <h4 className="font-bold text-sm text-[#0F2E46] leading-snug line-clamp-1">
//           {property.title || property.project_name}
//         </h4>
//         <p className="text-xs text-gray-500 mt-0.5">
//           {property.locality ? `${property.locality}, ` : ""}
//           {property.city}
//         </p>
//       </div>
//     </button>
//   );
// }

// function ChatMessage({ message, selectedProperty, onSelectProperty }) {
//   const isUser = message.role === "user";
//   return (
//     <div
//       className={`flex items-end gap-2 animate-[fadeInUp_0.3s_ease-out] ${
//         isUser ? "flex-row-reverse" : ""
//       }`}
//     >
//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm ${
//           isUser
//             ? "bg-gray-100"
//             : "bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5"
//         }`}
//       >
//         {isUser ? (
//           <User size={18} className="text-gray-600" />
//         ) : (
//           <img
//             src={ai}
//             alt="Niwas AI"
//             className="h-full w-full object-contain"
//           />
//         )}
//       </div>
//       <div
//         className={`flex flex-col gap-3 ${
//           isUser ? "items-end" : "items-start"
//         } max-w-[85%]`}
//       >
//         <div
//           className={`inline-block px-4 py-3 shadow-sm ${
//             isUser
//               ? "rounded-2xl rounded-br-sm bg-[#0F2E46] text-white"
//               : "rounded-2xl rounded-bl-sm bg-gray-100 text-gray-800"
//           }`}
//         >
//           <div className="whitespace-pre-line text-sm leading-relaxed">
//             {message.text || message.content}
//           </div>
//         </div>

//         {/* Render Properties Cards */}
//         {message.properties?.length > 0 && (
//           <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
//             {message.properties.map((p) => (
//               <PropertyCard
//                 key={p.id}
//                 property={p}
//                 isSelected={selectedProperty?.id === p.id}
//                 onSelect={onSelectProperty}
//               />
//             ))}
//           </div>
//         )}

//         {/* Render Cited Sources */}
//         {message.sources?.length > 0 && (
//           <div className="flex flex-col gap-1 text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200 w-full">
//             <span className="font-semibold text-gray-700">Sources:</span>
//             {message.sources.map((src, index) => (
//               <a
//                 key={index}
//                 href={src.url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-1 text-[#1CB46D] hover:underline"
//               >
//                 <ExternalLink size={12} /> {src.title || src.url}
//               </a>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function PropertyLocationPanel({ property, onClose }) {
//   if (!property) return null;
//   const lat = property.latitude;
//   const lng = property.longitude;
//   const title = property.title || property.project_name || "Selected Property";
//   const address = property.address || `${property.locality}, ${property.city}`;

//   const mapEmbedSrc =
//     lat && lng
//       ? `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`
//       : `https://www.google.com/maps?q=${encodeURIComponent(
//           address,
//         )}&hl=en&z=12&output=embed`;

//   const mapDirectionsUrl =
//     lat && lng
//       ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
//       : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//           address,
//         )}`;

//   return (
//     <div className="flex w-full flex-col gap-3 border-b border-gray-100 bg-white p-4 animate-[fadeInUp_0.25s_ease-out]">
//       <div className="flex items-start justify-between gap-2">
//         <div className="flex items-center gap-2 min-w-0">
//           <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1CB46D]/10 text-[#1CB46D]">
//             <MapPin size={16} />
//           </span>
//           <div className="min-w-0">
//             <p className="truncate text-sm font-bold text-[#0F2E46]">{title}</p>
//             <p className="truncate text-xs text-gray-500">{address}</p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           aria-label="Close location"
//           className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
//         >
//           <X size={15} />
//         </button>
//       </div>
//       <div className="overflow-hidden rounded-xl border border-gray-200">
//         <iframe
//           title={`map-${property.id}`}
//           src={mapEmbedSrc}
//           width="100%"
//           height="180"
//           style={{ border: 0 }}
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//         />
//       </div>
//       <a
//         href={mapDirectionsUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center justify-center gap-2 rounded-xl bg-[#0F2E46] py-2.5 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
//       >
//         <Navigation size={14} /> Get Directions
//       </a>
//     </div>
//   );
// }

// function HistoryPanel({
//   chatHistory,
//   activeChatId,
//   onSelectChat,
//   onNewChat,
//   onDeleteChat,
// }) {
//   return (
//     <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
//       <button
//         onClick={onNewChat}
//         className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1CB46D] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#159659] active:scale-95"
//       >
//         <PlusCircle size={18} /> New Chat
//       </button>
//       <div className="flex-1">
//         <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
//           <Clock size={14} /> Recent Conversations
//         </h3>
//         <div className="flex flex-col gap-2">
//           {chatHistory.length === 0 ? (
//             <p className="py-6 text-center text-xs text-gray-400">
//               No previous chats available.
//             </p>
//           ) : (
//             chatHistory.map((chat) => (
//               <div
//                 key={chat.id}
//                 className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 hover:bg-gray-50 ${
//                   activeChatId === chat.id
//                     ? "border-[#1CB46D] bg-[#1CB46D]/5"
//                     : "border-gray-100"
//                 }`}
//               >
//                 <button
//                   onClick={() => onSelectChat(chat.id)}
//                   className="flex min-w-0 flex-1 items-center gap-3 text-left"
//                 >
//                   <MessageSquare
//                     size={16}
//                     className={
//                       activeChatId === chat.id
//                         ? "text-[#1CB46D]"
//                         : "text-gray-400"
//                     }
//                   />
//                   <div className="min-w-0 flex-1">
//                     <p className="truncate text-sm font-medium text-[#0F2E46]">
//                       {chat.title || "New Conversation"}
//                     </p>
//                     <p className="text-[11px] text-gray-400">
//                       {chat.messages.length} messages
//                     </p>
//                   </div>
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDeleteChat(chat.id, chat.sessionId);
//                   }}
//                   title="Delete Chat"
//                   className="p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
//                 >
//                   <Trash2 size={15} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ============================================================
//    MAIN COMPONENT
//    ============================================================ */
// export default function NiwasAi() {
//   // Store trial count permanently in localStorage
//   const [userSearchCount, setUserSearchCount] = useState(() => {
//     const saved = localStorage.getItem("diginiwas_search_count");
//     return saved ? parseInt(saved, 10) : 0;
//   });

//   const [chatHistory, setChatHistory] = useState([
//     {
//       id: "session-1",
//       sessionId: null, // Stores API session_id
//       title: "New Conversation",
//       messages: [
//         {
//           role: "assistant",
//           text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
//           properties: [],
//           sources: [],
//         },
//       ],
//     },
//   ]);

//   const [activeChatId, setActiveChatId] = useState("session-1");
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const [selectedProperty, setSelectedProperty] = useState(null);
//   const [listening, setListening] = useState(false);
//   const scrollRef = useRef(null);
//   const recognitionRef = useRef(null);

//   const activeChat = useMemo(() => {
//     return chatHistory.find((c) => c.id === activeChatId) || chatHistory[0];
//   }, [chatHistory, activeChatId]);

//   const messages = activeChat.messages;
//   const isChatLocked = userSearchCount >= MAX_TRIALS;

//   useEffect(() => {
//     scrollRef.current?.scrollTo({
//       top: scrollRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages, typing]);

//   const handleVoice = () => {
//     if (isChatLocked) return;
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Voice input isn't supported in this browser.");
//       return;
//     }
//     if (listening) {
//       recognitionRef.current?.stop();
//       return;
//     }
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = false;
//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (e) => {
//       const transcript = e.results?.[0]?.[0]?.transcript;
//       if (transcript) setInput(transcript);
//     };
//     recognitionRef.current = recognition;
//     recognition.start();
//   };

//   const runSearch = async (rawQuery) => {
//     if (!rawQuery.trim() || typing || isChatLocked) return;

//     const userMsg = { role: "user", text: rawQuery };

//     // Increment and store search count locally
//     const newCount = userSearchCount + 1;
//     setUserSearchCount(newCount);
//     localStorage.setItem("diginiwas_search_count", newCount.toString());

//     // Update state to append User message
//     setChatHistory((prev) =>
//       prev.map((chat) => {
//         if (chat.id === activeChatId) {
//           const updatedTitle =
//             chat.messages.length === 1 ? rawQuery : chat.title;
//           return {
//             ...chat,
//             title: updatedTitle,
//             messages: [...chat.messages, userMsg],
//           };
//         }
//         return chat;
//       }),
//     );

//     setInput("");
//     setTyping(true);

//     try {
//       const payload = {
//         message: rawQuery,
//       };

//       if (activeChat.sessionId) {
//         payload.session_id = activeChat.sessionId;
//       }

//       if (selectedProperty?.id) {
//         payload.property_id = selectedProperty.id;
//       }

//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (activeChat.sessionId) {
//         headers["X-Session-ID"] = activeChat.sessionId;
//       }

//       const res = await axios.post(
//         `https://diginiwas-niwas-ai-api.onrender.com/v1/chat`,
//         payload,
//         { headers },
//       );

//       const data = res.data;
//       const newSessionId = data.session_id || res.headers["x-session-id"];

//       const assistantMsg = {
//         role: "assistant",
//         text: data.reply || "No reply received.",
//         properties: data.properties || [],
//         sources: data.sources || [],
//       };

//       setChatHistory((prev) =>
//         prev.map((chat) => {
//           if (chat.id === activeChatId) {
//             return {
//               ...chat,
//               sessionId: newSessionId || chat.sessionId,
//               messages: [...chat.messages, assistantMsg],
//             };
//           }
//           return chat;
//         }),
//       );
//     } catch (err) {
//       console.error("API Error:", err);
//       const errorMessage =
//         err.response?.data?.detail ||
//         "Sorry, I am facing an issue fetching real estate data right now.";

//       const assistantMsg = {
//         role: "assistant",
//         text:
//           typeof errorMessage === "string"
//             ? errorMessage
//             : JSON.stringify(errorMessage),
//         properties: [],
//         sources: [],
//       };

//       setChatHistory((prev) =>
//         prev.map((chat) => {
//           if (chat.id === activeChatId) {
//             return { ...chat, messages: [...chat.messages, assistantMsg] };
//           }
//           return chat;
//         }),
//       );
//     } finally {
//       setTyping(false);
//     }
//   };

//   // Fetch Session History on Selection
//   const handleSelectChat = async (chatId) => {
//     setActiveChatId(chatId);
//     const chat = chatHistory.find((c) => c.id === chatId);

//     if (chat?.sessionId && chat.messages.length <= 1) {
//       try {
//         const res = await axios.get(
//           `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${chat.sessionId}/history`,
//         );
//         if (res.data?.messages) {
//           const apiMessages = res.data.messages.map((m) => ({
//             role: m.role,
//             text: m.content || m.text,
//             properties: m.properties || [],
//             sources: m.sources || [],
//           }));

//           setChatHistory((prev) =>
//             prev.map((c) =>
//               c.id === chatId ? { ...c, messages: apiMessages } : c,
//             ),
//           );
//         }
//       } catch (err) {
//         console.error("Failed to load chat history:", err);
//       }
//     }
//   };

//   // Delete Session from Backend & Local State
//   const handleDeleteChat = async (chatId, sessionId) => {
//     if (sessionId) {
//       try {
//         await axios.delete(
//           `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${sessionId}`,
//         );
//       } catch (err) {
//         console.error("Failed to delete session on server:", err);
//       }
//     }

//     setChatHistory((prev) => {
//       const filtered = prev.filter((c) => c.id !== chatId);
//       if (filtered.length === 0) {
//         const newId = `session-${Date.now()}`;
//         return [
//           {
//             id: newId,
//             sessionId: null,
//             title: "New Conversation",
//             messages: [
//               {
//                 role: "assistant",
//                 text: "👋 Welcome to DigiNiwas.\nWhat brings you to DigiNiwas today?",
//                 properties: [],
//                 sources: [],
//               },
//             ],
//           },
//         ];
//       }
//       return filtered;
//     });

//     if (activeChatId === chatId) {
//       setActiveChatId(chatHistory[0]?.id || "session-1");
//     }
//   };

//   const handleNewChat = () => {
//     const newId = `session-${Date.now()}`;
//     const newChatSession = {
//       id: newId,
//       sessionId: null,
//       title: "New Conversation",
//       messages: [
//         {
//           role: "assistant",
//           text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
//           properties: [],
//           sources: [],
//         },
//       ],
//     };
//     setChatHistory((prev) => [newChatSession, ...prev]);
//     setActiveChatId(newId);
//     setSelectedProperty(null);
//   };

//   const handleSelectProperty = (property) => {
//     setSelectedProperty((prev) => (prev?.id === property.id ? null : property));
//   };

//   const handleSend = () => runSearch(input);
//   const handleSuggestion = (text) => runSearch(text);

//   const showChips =
//     !typing &&
//     !isChatLocked &&
//     messages[messages.length - 1]?.role === "assistant";

//   return (
//     <div className="flex h-dvh w-full flex-col overflow-hidden bg-gray-50 lg:h-screen lg:flex-row">
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(8px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       {/* Main Chat Column */}
//       <div className="relative flex h-full w-full min-h-0 flex-col overflow-hidden lg:flex-1">
//         {/* Header */}
//         <div className="flex shrink-0 items-center justify-between border-b bg-white p-4 sm:p-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
//               <img
//                 src={ai}
//                 alt="Niwas AI Avatar"
//                 className="h-full w-full object-contain"
//               />
//             </div>
//             <div>
//               <div className="font-bold text-[#0F2E46]">Niwas AI</div>
//               <div className="text-xs text-gray-500">
//                 {isChatLocked
//                   ? "Trial Limit Reached"
//                   : "AI Property Consultant"}
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={handleNewChat}
//             className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 lg:hidden"
//           >
//             <PlusCircle size={14} /> New Chat
//           </button>
//         </div>

//         {/* Selected Property Location Bar */}
//         {selectedProperty && (
//           <PropertyLocationPanel
//             property={selectedProperty}
//             onClose={() => setSelectedProperty(null)}
//           />
//         )}

//         {/* Messages Scroll Area */}
//         <div
//           ref={scrollRef}
//           className="relative flex-1 min-h-0 space-y-5 overflow-y-auto p-4 sm:p-6 pb-6"
//         >
//           {messages.map((msg, index) => (
//             <ChatMessage
//               key={index}
//               message={msg}
//               selectedProperty={selectedProperty}
//               onSelectProperty={handleSelectProperty}
//             />
//           ))}

//           {typing && <TypingIndicator />}

//           {showChips && (
//             <SuggestionChips onPick={handleSuggestion} disabled={typing} />
//           )}

//           {/* Locked State Notification */}
//           {/* {isChatLocked && (
//             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
//                 <Lock size={22} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-amber-900 text-base">You've reached your 3 free searches limit</h4>
//                 <p className="text-xs text-amber-700 mt-1 max-w-md">
//                   We're here to help! Share your details below and a dedicated DigiNiwas Relationship Manager will contact you shortly.
//                 </p>
//               </div>
//             </div>
//           )} */}

//           {/* Locked Overlay Message with Play Store Download Link */}
//           {isChatLocked && (
//             <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
//               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
//                 <Lock size={22} />
//               </div>
//               <div>
//                 <h4 className="font-bold text-amber-900 text-base">
//                   You've reached your 3 free searches limit
//                 </h4>
//                 <p className="text-xs text-amber-700 mt-1 max-w-md">
//                   For more searches, download <b>DigiNiwas</b> app on mobile
//                   from Google Play Store.
//                 </p>
//               </div>

//               {/* Google Play Store Badge / Button */}
//               <a
//                 href="https://play.google.com/store/apps/details?id=com.diginiwas" // Apna Play Store Link Yahan Dalein
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-2 inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
//               >
//                 {/* Play Store Svg Icon */}
//                 <svg
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C19.74,13.44 19.74,12.56 18.81,12.03L16.81,10.88L14.81,12.88L16.81,15.12M4.6,2.83L14.1,12.33L11.5,14.93L4.6,2.83M4.6,21.17L11.5,14.27L14.1,16.87L4.6,21.17Z" />
//                 </svg>
//                 <div className="text-left">
//                   <div className="text-[9px] uppercase font-semibold leading-none text-gray-300">
//                     GET IT ON
//                   </div>
//                   <div className="text-xs font-bold leading-tight">
//                     Google Play
//                   </div>
//                 </div>
//               </a>
//             </div>
//           )}
//         </div>

//         {/* Input Bar */}
//         <div className="sticky bottom-0 z-30 shrink-0 border-t border-[#DCE7EA] bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,46,70,0.08)] backdrop-blur sm:p-4">
//           <div
//             className={`flex items-center gap-2 rounded-2xl border px-3 py-2 transition-all ${
//               isChatLocked
//                 ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
//                 : "bg-gray-50 border-gray-200 focus-within:border-[#1CB46D] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1CB46D]/20"
//             }`}
//           >
//             <button
//               type="button"
//               disabled={isChatLocked}
//               onClick={handleVoice}
//               className={`p-2 transition-colors ${
//                 listening
//                   ? "text-red-500 animate-pulse"
//                   : "text-gray-400 hover:text-gray-600"
//               }`}
//             >
//               <Mic size={18} />
//             </button>
//             <input
//               type="text"
//               disabled={isChatLocked}
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               placeholder={
//                 isChatLocked
//                   ? "Chat is locked after 3 trials."
//                   : "Ask about properties, locality guides, or land rates..."
//               }
//               className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
//             />
//             <button
//               type="button"
//               onClick={handleSend}
//               disabled={!input.trim() || typing || isChatLocked}
//               className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F2E46] text-white transition-all ${
//                 !input.trim() || typing || isChatLocked
//                   ? "opacity-40 cursor-not-allowed"
//                   : "hover:bg-[#159659] active:scale-95"
//               }`}
//             >
//               <Send size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* History Sidebar for Desktop */}
//       <div className="hidden w-80 shrink-0 border-l bg-white lg:block">
//         <HistoryPanel
//           chatHistory={chatHistory}
//           activeChatId={activeChatId}
//           onSelectChat={handleSelectChat}
//           onNewChat={handleNewChat}
//           onDeleteChat={handleDeleteChat}
//         />
//       </div>

//       {/* Niwas AI FAQs */}
//       {/* <div className="w-full shrink-0 border-t border-[#DCE7EA] bg-white">
//         <FAQSection
//           title="Niwas AI FAQs"
//           subtitle="Quick answers about Niwas AI, verification, support and safe property decisions."
//           groups={[
//             {
//               title: "Niwas AI FAQs",
//               items: [
//                 {
//                   question: "What is Niwas AI?",
//                   answer:
//                     "A property-assistance feature designed to help users search, understand and compare property information more easily.",
//                 },
//                 {
//                   question: "Can Niwas AI make mistakes?",
//                   answer:
//                     "Yes. AI-generated information may be incomplete or incorrect. Important legal, financial, valuation and property information should be independently verified.",
//                 },
//               ],
//             },
//             {
//               title: "Safety FAQs",
//               items: [
//                 {
//                   question: "How do I report a suspicious property?",
//                   answer:
//                     "Open the property listing, use Report Property, choose the reason and submit the report. You may also report a Partner/User where the feature is available.",
//                 },
//               ],
//             },
//             {
//               title: "Support FAQs",
//               items: [
//                 {
//                   question: "How do I contact DigiNiwas?",
//                   answer:
//                     "Use Help & Support in the app or email info@diginiwas.com.",
//                 },
//               ],
//             },
//           ]}
//         />
//       </div> */}
//     </div>
//   );
// }


import React, { useEffect, useMemo, useRef, useState } from "react";
import FAQSection from '../components/common/FAQSection';
import axios from "axios";
import {
  User,
  Send,
  Mic,
  Sparkles,
  MessageSquare,
  PlusCircle,
  Clock,
  MapPin,
  X,
  Navigation,
  Lock,
  ExternalLink,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
  Building2,
} from "lucide-react";
import logo from "../assets/images/homelogo.png";
import ai from "../assets/images/niwas_ai.png";

const MAX_TRIALS = 3;

/* ============================================================
   UTILS — Formatting & Helpers
   ============================================================ */
function formatPrice(price) {
  if (price === undefined || price === null || Number.isNaN(Number(price))) {
    return "Price on request";
  }
  const num = Number(price);
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}

function createPropertySlug(property) {
  const name = property.title || property.project_name || property.propertyName || property.name || "property";
  return String(name)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "property";
}

function openPropertyDetails(property) {
  const propertyId = property._id || property.id || property.propertyId || property.property_id;
  if (!propertyId) {
    console.warn("Cannot open property details: property ID is missing.", property);
    return;
  }
  window.location.href = `/property/${encodeURIComponent(propertyId)}/${createPropertySlug(property)}`;
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */
function SuggestionChips({ suggestions, onPick, disabled }) {
  const list = suggestions || [
    "Find a 2 BHK in Vijay Nagar under ₹30K",
    "Average land price in Vijay Nagar, Indore",
    "Is Rau good for families?",
    "3 BHK under ₹1 Cr in Indore",
  ];
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {list.map((s) => (
        <button
          key={s}
          disabled={disabled}
          onClick={() => onPick(s)}
          className={`group flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm shadow-sm transition-all duration-200 ${
            disabled
              ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              : "border-gray-200 bg-white text-gray-700 hover:border-[#1CB46D] hover:bg-[#1CB46D]/5 hover:text-[#0F2E46] hover:shadow-md active:scale-95"
          }`}
        >
          <Sparkles
            size={13}
            className={`text-[#1CB46D] ${
              disabled ? "opacity-30" : "opacity-70 group-hover:opacity-100"
            }`}
          />
          {s}
        </button>
      ))}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 animate-[fadeInUp_0.25s_ease-out]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
        <img src={ai} alt="Niwas AI" className="h-full w-full object-contain" />
      </div>
      <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-gray-100 px-4 py-3.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />

      </div>

    </div>
  );
}

function PropertyCard({ property, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(property)}
      className={`group w-full text-left overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
        isSelected
          ? "border-[#1CB46D] ring-2 ring-[#1CB46D]/30 shadow-lg"
          : "border-gray-200 shadow-sm"
      }`}
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={
            property.image ||
            property.images?.[0] ||
            "https://via.placeholder.com/400x300"
          }
          alt={property.title || property.project_name || "Property"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-2 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F2E46] shadow">
          {property.price_label || formatPrice(property.price)}
        </div>
        {property.verified && (
          <div className="absolute top-2 right-2 rounded-full bg-[#1CB46D] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
            Verified
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-bold text-sm text-[#0F2E46] leading-snug line-clamp-1">
          {property.title || property.project_name}
        </h4>
        <p className="text-xs text-gray-500 mt-0.5">
          {property.locality ? `${property.locality}, ` : ""}
          {property.city}
        </p>
      </div>
    </button>
  );
}

function ChatMessage({ message, selectedProperty, onSelectProperty }) {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex items-end gap-2 animate-[fadeInUp_0.3s_ease-out] ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl shadow-sm ${
          isUser
            ? "bg-gray-100"
            : "bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5"
        }`}
      >
        {isUser ? (
          <User size={18} className="text-gray-600" />
        ) : (
          <img
            src={ai}
            alt="Niwas AI"
            className="h-full w-full object-contain"
          />
        )}
      </div>
      <div
        className={`flex flex-col gap-3 ${
          isUser ? "items-end" : "items-start"
        } max-w-[85%]`}
      >
        <div
          className={`inline-block px-4 py-3 shadow-sm ${
            isUser
              ? "rounded-2xl rounded-br-sm bg-[#0F2E46] text-white"
              : "rounded-2xl rounded-bl-sm bg-gray-100 text-gray-800"
          }`}
        >
          <div className="whitespace-pre-line text-sm leading-relaxed">
            {message.text || message.content}
          </div>
        </div>

        {/* Render Properties Cards */}
        {message.properties?.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
            {message.properties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isSelected={selectedProperty?.id === p.id}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}

        {/* Render Cited Sources */}
        {message.sources?.length > 0 && (
          <div className="flex flex-col gap-1 text-xs text-gray-500 bg-white p-3 rounded-xl border border-gray-200 w-full">
            <span className="font-semibold text-gray-700">Sources:</span>
            {message.sources.map((src, index) => (
              <a
                key={index}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#1CB46D] hover:underline"
              >
                <ExternalLink size={12} /> {src.title || src.url}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyLocationPanel({ property, onClose }) {
  if (!property) return null;
  const lat = property.latitude;
  const lng = property.longitude;
  const title = property.title || property.project_name || "Selected Property";
  const address = property.address || `${property.locality}, ${property.city}`;

  const mapEmbedSrc =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=14&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(
          address,
        )}&hl=en&z=12&output=embed`;

  const mapDirectionsUrl =
    lat && lng
      ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          address,
        )}`;

  return (
    <div className="flex w-full flex-col gap-3 border-b border-gray-100 bg-white p-4 animate-[fadeInUp_0.25s_ease-out]">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1CB46D]/10 text-[#1CB46D]">
            <MapPin size={16} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-[#0F2E46]">{title}</p>
            <p className="truncate text-xs text-gray-500">{address}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close location"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={15} />
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <iframe
          title={`map-${property.id}`}
          src={mapEmbedSrc}
          width="100%"
          height="180"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        href={mapDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-xl bg-[#0F2E46] py-2.5 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] active:scale-95"
      >
        <Navigation size={14} /> Get Directions
      </a>
    </div>
  );
}

function HistoryPanel({
  chatHistory,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
}) {
  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-4">
      <button
        onClick={onNewChat}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1CB46D] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#159659] active:scale-95"
      >
        <PlusCircle size={18} /> New Chat
      </button>
      <div className="flex-1">
        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
          <Clock size={14} /> Recent Conversations
        </h3>
        <div className="flex flex-col gap-2">
          {chatHistory.length === 0 ? (
            <p className="py-6 text-center text-xs text-gray-400">
              No previous chats available.
            </p>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between rounded-xl border p-3 transition-all duration-200 hover:bg-gray-50 ${
                  activeChatId === chat.id
                    ? "border-[#1CB46D] bg-[#1CB46D]/5"
                    : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => onSelectChat(chat.id)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left"
                >
                  <MessageSquare
                    size={16}
                    className={
                      activeChatId === chat.id
                        ? "text-[#1CB46D]"
                        : "text-gray-400"
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#0F2E46]">
                      {chat.title || "New Conversation"}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {chat.messages.length} messages
                    </p>
                  </div>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(chat.id, chat.sessionId);
                  }}
                  title="Delete Chat"
                  className="p-1.5 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function NiwasAi() {
  // Store trial count permanently in localStorage
  const [userSearchCount, setUserSearchCount] = useState(() => {
    const saved = localStorage.getItem("diginiwas_search_count");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [chatHistory, setChatHistory] = useState([
    {
      id: "session-1",
      sessionId: null, // Stores API session_id
      title: "New Conversation",
      messages: [
        {
          role: "assistant",
          text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
          properties: [],
          sources: [],
        },
      ],
    },
  ]);

  const [activeChatId, setActiveChatId] = useState("session-1");
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(true);
  const [popularProperties, setPopularProperties] = useState([]);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  const activeChat = useMemo(() => {
    return chatHistory.find((c) => c.id === activeChatId) || chatHistory[0];
  }, [chatHistory, activeChatId]);

  const messages = activeChat.messages;
  useEffect(() => {
    let mounted = true;
    axios.get(`${import.meta.env.VITE_API_URL}/api/properties`).then((res) => {
      const list = res?.data?.properties || res?.data?.data || [];
      if (mounted) setPopularProperties(Array.isArray(list) ? list.filter((p) => p && (p.media?.images?.length || p.images?.length || p.image)).slice(0, 6) : []);
    }).catch(() => {});
    return () => { mounted = false; };
  }, []);
  const isChatLocked = userSearchCount >= MAX_TRIALS;

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const handleVoice = () => {
    if (isChatLocked) return;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input isn't supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript;
      if (transcript) setInput(transcript);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const runSearch = async (rawQuery) => {
    if (!rawQuery.trim() || typing || isChatLocked) return;

    const userMsg = { role: "user", text: rawQuery };

    // Increment and store search count locally
    const newCount = userSearchCount + 1;
    setUserSearchCount(newCount);
    localStorage.setItem("diginiwas_search_count", newCount.toString());

    // Update state to append User message
    setChatHistory((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          const updatedTitle =
            chat.messages.length === 1 ? rawQuery : chat.title;
          return {
            ...chat,
            title: updatedTitle,
            messages: [...chat.messages, userMsg],
          };
        }
        return chat;
      }),
    );

    setInput("");
    setTyping(true);

    try {
      const payload = {
        message: rawQuery,
      };

      if (activeChat.sessionId) {
        payload.session_id = activeChat.sessionId;
      }

      if (selectedProperty?.id) {
        payload.property_id = selectedProperty.id;
      }

      const headers = {
        "Content-Type": "application/json",
      };

      if (activeChat.sessionId) {
        headers["X-Session-ID"] = activeChat.sessionId;
      }

      const res = await axios.post(
        `https://diginiwas-niwas-ai-api.onrender.com/v1/chat`,
        payload,
        { headers },
      );

      const data = res.data;
      const newSessionId = data.session_id || res.headers["x-session-id"];

      const assistantMsg = {
        role: "assistant",
        text: data.reply || "No reply received.",
        properties: data.properties || [],
        sources: data.sources || [],
      };

      setChatHistory((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              sessionId: newSessionId || chat.sessionId,
              messages: [...chat.messages, assistantMsg],
            };
          }
          return chat;
        }),
      );
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage =
        err.response?.data?.detail ||
        "Sorry, I am facing an issue fetching real estate data right now.";

      const assistantMsg = {
        role: "assistant",
        text:
          typeof errorMessage === "string"
            ? errorMessage
            : JSON.stringify(errorMessage),
        properties: [],
        sources: [],
      };

      setChatHistory((prev) =>
        prev.map((chat) => {
          if (chat.id === activeChatId) {
            return { ...chat, messages: [...chat.messages, assistantMsg] };
          }
          return chat;
        }),
      );
    } finally {
      setTyping(false);
    }
  };

  // Fetch Session History on Selection
  const handleSelectChat = async (chatId) => {
    setActiveChatId(chatId);
    const chat = chatHistory.find((c) => c.id === chatId);

    if (chat?.sessionId && chat.messages.length <= 1) {
      try {
        const res = await axios.get(
          `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${chat.sessionId}/history`,
        );
        if (res.data?.messages) {
          const apiMessages = res.data.messages.map((m) => ({
            role: m.role,
            text: m.content || m.text,
            properties: m.properties || [],
            sources: m.sources || [],
          }));

          setChatHistory((prev) =>
            prev.map((c) =>
              c.id === chatId ? { ...c, messages: apiMessages } : c,
            ),
          );
        }
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }
  };

  // Delete Session from Backend & Local State
  const handleDeleteChat = async (chatId, sessionId) => {
    if (sessionId) {
      try {
        await axios.delete(
          `https://diginiwas-niwas-ai-api.onrender.com/v1/sessions/${sessionId}`,
        );
      } catch (err) {
        console.error("Failed to delete session on server:", err);
      }
    }

    setChatHistory((prev) => {
      const filtered = prev.filter((c) => c.id !== chatId);
      if (filtered.length === 0) {
        const newId = `session-${Date.now()}`;
        return [
          {
            id: newId,
            sessionId: null,
            title: "New Conversation",
            messages: [
              {
                role: "assistant",
                text: "👋 Welcome to DigiNiwas.\nWhat brings you to DigiNiwas today?",
                properties: [],
                sources: [],
              },
            ],
          },
        ];
      }
      return filtered;
    });

    if (activeChatId === chatId) {
      setActiveChatId(chatHistory[0]?.id || "session-1");
    }
  };

  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newChatSession = {
      id: newId,
      sessionId: null,
      title: "New Conversation",
      messages: [
        {
          role: "assistant",
          text: "👋 Welcome to DigiNiwas.\nI'm Niwas AI—here to help you discover properties, connect with verified agents, and simplify your real estate journey.\nWhat brings you to DigiNiwas today?",
          properties: [],
          sources: [],
        },
      ],
    };
    setChatHistory((prev) => [newChatSession, ...prev]);
    setActiveChatId(newId);
    setSelectedProperty(null);
  };

  const handleSelectProperty = (property) => {
    setSelectedProperty((prev) => (prev?.id === property.id ? null : property));
  };

  const handleSend = () => runSearch(input);
  const handleSuggestion = (text) => runSearch(text);

  const showChips =
    !typing &&
    !isChatLocked &&
    messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="h-[calc(100dvh-72px)] max-h-[calc(100dvh-72px)] min-h-0 w-full overflow-hidden bg-gray-50">
      {/* Fixed-height Niwas AI workspace: the document itself must not scroll. */}
      <div className="flex h-full min-h-0 w-full flex-col overflow-hidden lg:flex-row">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Collapsible left conversation rail */}
      {historyOpen && <aside className="order-2 flex h-[30%] min-h-0 w-full shrink-0 flex-col overflow-y-auto border-t border-[#e4ecef] bg-white lg:order-1 lg:h-full lg:w-[280px] lg:border-r lg:border-t-0">
        <HistoryPanel chatHistory={chatHistory} activeChatId={activeChatId} onSelectChat={onSelectChat => handleSelectChat(onSelectChat)} onNewChat={handleNewChat} onDeleteChat={handleDeleteChat} />
      </aside>}

      {/* Main Chat Column */}
      <div className="relative order-1 flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden lg:order-2 lg:h-full lg:flex-1">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b bg-white p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1CB46D] to-[#0F2E46] p-1.5 shadow-sm">
              <img
                src={ai}
                alt="Niwas AI Avatar"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-[#0F2E46]">Niwas AI</div>
              <div className="text-xs text-gray-500">
                {isChatLocked
                  ? "Trial Limit Reached"
                  : "AI Property Consultant"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setHistoryOpen((v) => !v)} title={historyOpen ? "Hide conversations" : "Show conversations"} className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-[#0F2E46] hover:border-[#1CB46D] hover:text-[#1CB46D]">
              {historyOpen ? <PanelLeftClose size={17} /> : <PanelLeftOpen size={17} />}
            </button>
            <button onClick={handleNewChat} className="flex items-center gap-1.5 rounded-lg bg-[#1CB46D] px-3 py-2 text-xs font-semibold text-white hover:bg-[#159659]">
              <PlusCircle size={14} /> New Chat
            </button>
          </div>
        </div>

        {/* Selected Property Location Bar */}
        {selectedProperty && (
          <PropertyLocationPanel
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
          />
        )}

        {/* Messages Scroll Area */}
        <div
          ref={scrollRef}
          className="relative flex-1 min-h-0 space-y-5 overflow-y-auto p-4 sm:p-6 pb-6"
        >
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              selectedProperty={selectedProperty}
              onSelectProperty={handleSelectProperty}
            />
          ))}

          {typing && <TypingIndicator />}

          {showChips && (
            <SuggestionChips onPick={handleSuggestion} disabled={typing} />
          )}

          {/* Locked State Notification */}
          {/* {isChatLocked && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Lock size={22} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-base">You've reached your 3 free searches limit</h4>
                <p className="text-xs text-amber-700 mt-1 max-w-md">
                  We're here to help! Share your details below and a dedicated DigiNiwas Relationship Manager will contact you shortly.
                </p>
              </div>
            </div>
          )} */}

          {/* Locked Overlay Message with Play Store Download Link */}
          {isChatLocked && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-amber-50 p-6 border border-amber-200 text-center my-4 animate-[fadeInUp_0.3s_ease-out]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                <Lock size={22} />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-base">
                  You've reached your 3 free searches limit
                </h4>
                <p className="text-xs text-amber-700 mt-1 max-w-md">
                  For more searches, download <b>DigiNiwas</b> app on mobile
                  from Google Play Store.
                </p>
              </div>

              {/* Google Play Store Badge / Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.diginiwas" // Apna Play Store Link Yahan Dalein
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-3 rounded-xl bg-black px-4 py-2.5 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                {/* Play Store Svg Icon */}
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L18.81,13.97C19.74,13.44 19.74,12.56 18.81,12.03L16.81,10.88L14.81,12.88L16.81,15.12M4.6,2.83L14.1,12.33L11.5,14.93L4.6,2.83M4.6,21.17L11.5,14.27L14.1,16.87L4.6,21.17Z" />
                </svg>
                <div className="text-left">
                  <div className="text-[9px] uppercase font-semibold leading-none text-gray-300">
                    GET IT ON
                  </div>
                  <div className="text-xs font-bold leading-tight">
                    Google Play
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="sticky bottom-0 z-30 shrink-0 border-t border-[#DCE7EA] bg-white/95 p-3 shadow-[0_-10px_30px_rgba(15,46,70,0.08)] backdrop-blur sm:p-4">
          <div
            className={`flex items-center gap-2 rounded-2xl border px-3 py-2 transition-all ${
              isChatLocked
                ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
                : "bg-gray-50 border-gray-200 focus-within:border-[#1CB46D] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#1CB46D]/20"
            }`}
          >
            <button
              type="button"
              disabled={isChatLocked}
              onClick={handleVoice}
              className={`p-2 transition-colors ${
                listening
                  ? "text-red-500 animate-pulse"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Mic size={18} />
            </button>
            <input
              type="text"
              disabled={isChatLocked}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={
                isChatLocked
                  ? "Chat is locked after 3 trials."
                  : "Ask about properties, locality guides, or land rates..."
              }
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none disabled:cursor-not-allowed"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || typing || isChatLocked}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0F2E46] text-white transition-all ${
                !input.trim() || typing || isChatLocked
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#159659] active:scale-95"
              }`}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Niwas AI suggested properties rail */}
      <aside className="order-3 hidden w-[300px] shrink-0 flex-col border-l border-[#e4ecef] bg-white p-4 lg:flex lg:h-full lg:overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#1CB46D]">Discover with AI</p>
            <h3 className="mt-1 text-base font-extrabold text-[#0F2E46]">Niwas AI Suggested</h3>
          </div>
          <Sparkles size={20} className="text-[#1CB46D]" />
        </div>
        {popularProperties.length ? (
          <div className="space-y-3">
            {popularProperties.map((property, index) => {
              const image = property.media?.images?.[0]?.url || property.media?.images?.[0] || property.images?.[0]?.url || property.images?.[0] || property.image;
              const propertyName = property.title || property.project_name || property.propertyName || "Property listing";
              const propertyId = property._id || property.id || property.propertyId || property.property_id;
              return (
                <article key={propertyId || index} className="group w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:border-[#1CB46D] hover:shadow-md">
                  <img src={image || "/images/property-placeholder.png"} alt={propertyName} loading="lazy" className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="line-clamp-1 text-sm font-bold text-[#0F2E46]">{propertyName}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-gray-500">{property.locality || property.area || ""}{property.city ? `, ${property.city}` : ""}</p>
                    <p className="mt-2 text-sm font-extrabold text-[#159659]">{property.price_label || formatPrice(property.price || property.expectedPrice)}</p>
                    <button
                      type="button"
                      disabled={!propertyId}
                      onClick={() => openPropertyDetails(property)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F2E46] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#159659] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      View Details <ExternalLink size={13} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-xl bg-gray-50 p-4 text-xs leading-5 text-gray-500">Suggested properties will appear here when listings are available.</p>
        )}
      </aside>

      </div>


    </div>
  );
}
