import React, { useState, useEffect } from "react";
import { 
  HeartPulse, 
  Activity, 
  Clock, 
  Brain, 
  FileText, 
  ShieldAlert, 
  Pill, 
  ChevronRight, 
  Stethoscope, 
  Search,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const PATIENTS = [
  {
    id: "PT-39201",
    name: "Rohan Sharma",
    age: 58,
    sex: "Male",
    priority: "Critical",
    type: "Cardiac",
    time: "10:15 AM",
    complaint: "Acute chest discomfort with shortness of breath",
    vitals: { bp: "154/98", pulse: "112", spo2: "91%", temp: "99.1 F" },
    history: ["Type 2 Diabetes", "Hypertension", "Smoker"],
    differential: [
        { name: "Acute Coronary Syndrome", conf: "HIGH", active: true },
        { name: "Pulmonary Embolism", conf: "MOD", active: false }
    ]
  },
  {
    id: "PT-40212",
    name: "Meera Patel",
    age: 42,
    sex: "Female",
    priority: "Urgent",
    type: "Respiratory",
    time: "09:30 AM",
    complaint: "Persistent cough and low oxygen saturation (SpO2 94%)",
    vitals: { bp: "128/84", pulse: "92", spo2: "94%", temp: "100.2 F" },
    history: ["Asthma", "Allergies"],
    differential: [
        { name: "Pneumonia", conf: "HIGH", active: true },
        { name: "Bronchitis", conf: "MOD", active: false }
    ]
  },
  {
    id: "PT-38552",
    name: "Arjun Rao",
    age: 29,
    sex: "Male",
    priority: "Routine",
    type: "Diabetes Review",
    time: "11:20 AM",
    complaint: "Routine glucose monitoring follow-up, asymptomatic",
    vitals: { bp: "120/80", pulse: "72", spo2: "98%", temp: "98.6 F" },
    history: ["T1 Diabetes"],
    differential: [
        { name: "Hyperglycemia", conf: "LOW", active: true }
    ]
  }
];

export default function CaseViewPage() {
  const [activePatient, setActivePatient] = useState(null);
  const THEME_COLOR = "#9173e6";

  const priorityStyles = {
  High: "bg-[#7247d7] text-white shadow-[#7247d7]/20",
  Medium: "bg-[#9173e6] text-white shadow-[#9173e6]/20",
  Low: "bg-slate-100 text-slate-500",
};

  const [patients, setPatients] = useState([]);


useEffect(() => {

  async function fetchPatients() {

    const snapshot = await getDocs(collection(db, "patients"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setPatients(data);

    if (data.length > 0) {
      setActivePatient(data[0]);
    }

  }

  fetchPatients();


}, []);

if (!activePatient) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Loading patients...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-20 font-sans space-y-8">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: THEME_COLOR }}>
            Central Command v2.6
          </p>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
            PulseIQ Workspace<span style={{ color: THEME_COLOR }}>.</span>
          </h1>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
          <Search size={18} className="text-slate-300" />
          <input type="text" placeholder="Search pipeline..." className="bg-transparent text-sm font-bold outline-none" />
        </div>
      </header>

      {/* INTERACTIVE TABLE */}
      <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden transition-all">
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Appointment Pipeline</h2>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Click a row to expand case details</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Patient</th>
                <th className="px-8 py-4">Category</th>
                <th className="px-8 py-4">Arrival</th>
                <th className="px-8 py-4">Priority</th>
                <th className="px-8 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {(patients || []).map((p) => (
                <tr 
                  key={p.id} 
                  onClick={() => setActivePatient(p)}
                  className={`cursor-pointer transition-all duration-300 ${activePatient?.id === p.id ? 'bg-[#f8f7ff]' : 'hover:bg-slate-50'}`}
                >
                  <td className="px-8 py-5">
                    <div className={`font-black tracking-tight transition-colors ${activePatient?.id === p.id ? 'text-[#9173e6] text-lg' : 'text-slate-800'}`}>{p.patientName}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{p.id}</div>
                  </td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">{p.category}</td>
                  <td className="px-8 py-5 text-xs font-bold text-slate-500">{p.createdAt?.toDate().toLocaleTimeString()}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg ${priorityStyles[p.priority]}`}>
                      {p.priority}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    {activePatient?.id === p.id ? (
                      <div className="inline-flex p-2 bg-[#9173e6] text-white rounded-full shadow-lg shadow-[#9173e6]/30">
                        <ChevronDown size={18} />
                      </div>
                    ) : (
                      <div className="inline-flex p-2 bg-slate-100 text-slate-300 rounded-full">
                        <ChevronRight size={18} />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DYNAMIC CASE WORKSPACE (Updates on row click) */}
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="space-y-8">
          {/* CORE CLINICAL DATA */}
          <article className="bg-white rounded-[3rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100">
            <div className="flex justify-between items-start mb-10">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: THEME_COLOR }}>Selected Case Profile</p>
                <h2 className="text-6xl font-black text-slate-900 tracking-tighter mb-2">{activePatient.patientName}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                  {activePatient.patientAge}Y • {activePatient.patientGender} • <span className="text-slate-900 font-black italic">Active Session</span>
                </p>
              </div>
              <div className="h-16 w-16 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center justify-center">
                <Stethoscope size={32} />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatCard icon={<Activity size={20}/>} label="BP" value={activePatient.vitals?.bp || "N/A"} color={THEME_COLOR} />
<StatCard icon={<HeartPulse size={20}/>} label="Pulse" value={activePatient.vitals?.pulse || "N/A"} color={THEME_COLOR} />
<StatCard icon={<ShieldAlert size={20}/>} label="SpO2" value={activePatient.vitals?.spo2 || "N/A"} color={THEME_COLOR} isWarning={parseInt(activePatient.vitals?.spo2) < 92} />
<StatCard icon={<Pill size={20}/>} label="Temp" value={activePatient.vitals?.temp || "N/A"} color={THEME_COLOR} />
</div>
            <div className="p-8 rounded-[2.5rem] bg-[#f8f7ff] border border-slate-50 italic font-bold text-slate-700 leading-relaxed text-xl">
              "{activePatient.primaryIssue}"
            </div>
          </article>

          {/* PATIENT HISTORY & DOCUMENTS */}
          
        </div>

        {/* AI INTEL & ACTIONS */}
        <div className="space-y-8">
          <article className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[60px]" style={{ backgroundColor: THEME_COLOR, opacity: 0.3 }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-white/10 text-[#9173e6]"><Brain size={28} /></div>
                <h2 className="text-3xl font-black italic tracking-tight">AI Differential</h2>
              </div>
              <ul className="space-y-4">
                {(activePatient.differential || []).map((diff, i) => (
                  <li key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${diff.active ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/5 opacity-40'}`}>
                    <span className="font-bold text-slate-200">{diff.name}</span>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black text-white ${diff.active ? 'bg-[#9173e6]' : 'bg-transparent border border-white/10'}`}>
                      {diff.conf}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">PulseIQ Triage Classification</p>
            <div 
              className="py-8 rounded-[2.5rem] text-white font-black text-5xl tracking-tighter shadow-2xl mb-8 transition-colors duration-500" 
              style={{ backgroundColor: activePatient.priority === 'Critical' ? '#f43f5e' : THEME_COLOR }}
            >
              {activePatient.priority.toUpperCase()}
            </div>
            <button className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl active:scale-95">
              Confirm Clinical Decision
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon, color, isWarning }) {
  return (
    <div className={`p-6 rounded-[2rem] border transition-all duration-500 ${isWarning ? 'bg-rose-50 border-rose-100' : 'bg-[#f8f7ff] border-slate-50'}`}>
      <div className={`flex items-center gap-2 mb-3 ${isWarning ? 'text-rose-500' : ''}`} style={{ color: isWarning ? '' : color }}>
        {icon} <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <p className={`text-2xl font-black tracking-tighter ${isWarning ? 'text-rose-700' : 'text-slate-800'}`}>{value}</p>
    </div>
  );
}