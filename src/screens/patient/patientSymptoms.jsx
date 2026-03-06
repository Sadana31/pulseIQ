import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { classifyMessage } from "./triageEngine";
import { db, auth } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "assistant",
    text: "Hi! I'm PulseIQ Bot. I can help with symptoms, medications, and general health inquiries. How can I assist you today?",
  },
];

export default function PatientDashboard() {

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const user = auth.currentUser;  

  const [triageState, setTriageState] = useState({});
  const [triageResult, setTriageResult] = useState(null);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const THEME_COLOR = "#9173e6";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);


  const [vitals, setVitals] = useState({
  bp: "",
  pulse: "",
  spo2: "",
  temp: ""
});

  async function savePatient(triageData) {

  const user = auth.currentUser;
  if (!user) return;

  try {

    const docRef = await addDoc(collection(db, "patients"), {

      patientName: user.displayName,

      primaryIssue: triageData.primaryIssue,

      symptoms: triageData.symptoms,

      category: triageData.category,

      priority: triageData.priority,

      queueLevel: triageData.queueLevel,

      differential: triageData.differential,

      createdAt: serverTimestamp()

    });

    setTriageResult({
      ...triageData,
      patientId: docRef.id
    });

    console.log("Patient saved");

  } catch (error) {

    console.error("Error saving patient:", error);

  }

}

async function updateVitals() {

  if (!triageResult?.patientId) return;

  try {

    const patientRef = doc(db, "patients", triageResult.patientId);


await updateDoc(patientRef, {
  vitals: {
    bp: vitals.bp,
    pulse: vitals.pulse,
    spo2: vitals.spo2,
    temp: vitals.temp
  }
});

    console.log("Vitals updated successfully");

  } catch (error) {

    console.error("Error updating vitals:", error);

  }

}
  function sendMessage() {

    const text = input.trim();
    if (!text) return;

    setMessages(prev => [
      ...prev,
      { id: Date.now(), sender: "user", text }
    ]);

    setInput("");
    setIsTyping(true);

    const result = classifyMessage(text, triageState);

    setTimeout(() => {

      setIsTyping(false);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "assistant",
          text: result.botResponse,
        },
      ]);

      if (result.state) setTriageState(result.state);

      if (result.triageSummary) {

        setTriageResult(result.triageSummary);

        savePatient(result.triageSummary);

      }

      if (result.navigate) {
        navigate(result.navigate);
      }

    }, 1200);
  }

  


  return (
    <div className="min-h-screen bg-[#f8f7ff] text-slate-900 font-sans">

      <div className="max-w-5xl mx-auto flex w-full flex-col h-screen px-6 py-6">

        {/* HEADER */}

        <header className="flex items-center justify-between gap-6 mb-6 shrink-0">

          <div className="flex items-center gap-4">

            <div
              className="h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ backgroundColor: THEME_COLOR }}
            >
              🤖
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900">
                PulseIQ Bot<span style={{ color: THEME_COLOR }}>.</span>
              </h1>

              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                AI Clinical Interface
              </p>
            </div>

          </div>

          <Link
            to="/"
            className="rounded-xl bg-rose-500 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-rose-600 shadow-lg active:scale-95"
          >
            Back
          </Link>

        </header>



        {/* CHAT BOX */}

        <section className="flex flex-1 flex-col overflow-hidden rounded-[3rem] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-slate-100 mb-4">

          {/* STATUS BAR */}

          <div className="flex items-center justify-between border-b border-slate-50 px-10 py-6 shrink-0 bg-slate-50/30">

            <div className="flex items-center gap-4">

              <div
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: THEME_COLOR }}
              />

              <h2 className="text-sm font-black uppercase tracking-widest text-slate-500">
                Secure Session Active
              </h2>

            </div>

            <span className="text-[10px] font-bold text-slate-300">
              V 2.6 • ENCRYPTED
            </span>

          </div>



          {/* MESSAGES */}

          <div className="flex-1 space-y-8 overflow-y-auto px-10 py-10 scrollbar-hide">

            {messages.map(msg => (

              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-[2.5rem] px-8 py-5 text-[15px] font-medium leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "text-white rounded-tr-none"
                      : "bg-slate-50 text-slate-800 rounded-tl-none border border-slate-100"
                  }`}
                  style={{
                    backgroundColor: msg.sender === "user" ? THEME_COLOR : "",
                  }}
                >
                  {msg.text}
                </div>

              </div>

            ))}



            {/* TYPING INDICATOR */}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-50 rounded-[2rem] px-8 py-5 border border-slate-100 flex gap-1.5 items-center">

                  <div
                    className="h-1.5 w-1.5 rounded-full animate-bounce"
                    style={{ backgroundColor: THEME_COLOR }}
                  />

                  <div
                    className="h-1.5 w-1.5 rounded-full animate-bounce [animation-delay:0.2s]"
                    style={{ backgroundColor: THEME_COLOR }}
                  />

                  <div
                    className="h-1.5 w-1.5 rounded-full animate-bounce [animation-delay:0.4s]"
                    style={{ backgroundColor: THEME_COLOR }}
                  />

                </div>
              </div>
            )}

            <div ref={messagesEndRef} />



            {/* TRIAGE SUMMARY */}

            {triageResult && (

              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-3xl p-8">

                <h3 className="font-black text-lg mb-4 text-purple-700">
                  Clinical Triage Summary
                </h3>

                <div className="space-y-2 text-sm">

                  <p><b>Primary Issue:</b> {triageResult.primaryIssue}</p>

                  <p><b>Category:</b> {triageResult.category}</p>

                  <p><b>Priority:</b> {triageResult.priority}</p>

                  <p><b>Doctor Type:</b> {triageResult.doctorType}</p>

                  <p><b>Queue Level:</b> {triageResult.queueLevel}</p>

                  <p><b>Recommended Action:</b> {triageResult.recommendedAction}</p>

                  {triageResult.symptoms?.length > 0 && (
                    <div>
                      <b>Symptoms:</b>
                      <ul className="list-disc ml-6">
                        {triageResult.symptoms.map((s,i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
<div className="mt-6 bg-white border rounded-3xl p-6">

<h3 className="font-black text-lg mb-4">Enter Vital Signs</h3>

<div className="grid grid-cols-2 gap-4">

<input
className="border p-3 rounded-xl"
placeholder="Blood Pressure"
value={vitals.bp}
onChange={(e)=>setVitals({...vitals, bp:e.target.value})}
/>

<input
className="border p-3 rounded-xl"
placeholder="Pulse"
value={vitals.pulse}
onChange={(e)=>setVitals({...vitals, pulse:e.target.value})}
/>

<input
className="border p-3 rounded-xl"
placeholder="SpO₂"
value={vitals.spo2}
onChange={(e)=>setVitals({...vitals, spo2:e.target.value})}
/>

<input
className="border p-3 rounded-xl"
placeholder="Temperature"
value={vitals.temp}
onChange={(e)=>setVitals({...vitals, temp:e.target.value})}
/>

<button
onClick={updateVitals}
className="mt-6 w-full py-4 bg-[#9173e6] text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg hover:scale-105 transition"
>
Update Vitals
</button>

</div>
</div>

              </div>

            )}

          </div>


          <div className="border-t border-slate-50 p-8 bg-white shrink-0">

            <div className="max-w-3xl mx-auto flex gap-4 items-center rounded-[2.5rem] bg-[#f8f7ff] p-2 pr-4 border border-slate-200 focus-within:border-[#9173e6]">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent px-8 py-4 text-sm font-bold text-slate-800 focus:outline-none"
              />

              <button
                onClick={sendMessage}
                className="rounded-2xl px-10 py-4 text-xs font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: THEME_COLOR }}
              >
                Send
              </button>

            </div>

            <p className="mt-4 text-center text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
              PulseIQ Clinical Intelligence Engine
            </p>

          </div>

        </section>

      </div>

    </div>
  );
}