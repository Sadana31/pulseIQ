import { AlertTriangle, Bell, CalendarDays, FileText, LayoutDashboard, Stethoscope, ChevronRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const priorityData = [
  { name: "Critical", value: 6, color: "#7247d7" },
  { name: "Urgent", value: 14, color: "#9173e6" },
  { name: "Routine", value: 23, color: "#c9b9f1" }
];

const commonCases = [
  { type: "Respiratory", count: 48, trend: "+12% this week" },
  { type: "Cardiac", count: 34, trend: "+4% this week" },
  { type: "Diabetes", count: 27, trend: "-3% this week" },
  { type: "Orthopedic", count: 19, trend: "+6% this week" }
];

const upcomingAppointments = [
  { patient: "Meera Patel", type: "Respiratory Follow-up", time: "09:30 AM", priority: "Urgent" },
  { patient: "Rohan Sharma", type: "Chest Pain Evaluation", time: "10:15 AM", priority: "Critical" },
  { patient: "Arjun Rao", type: "Diabetes Review", time: "11:20 AM", priority: "Routine" },
  { patient: "Sara Khan", type: "Post-op Check", time: "12:05 PM", priority: "Urgent" }
];

const flags = [
  "4 patients with falling SpO2 in last 8 hours",
  "2 repeated no-shows in high-risk group",
  "1 abnormal ECG awaiting consultant review"
];

const priorityClass = {
  Critical: "bg-[#7247d7] text-white",
  Urgent: "bg-[#9173e6]/90 text-white",
  Routine: "bg-slate-100 text-slate-600"
};

export default function DashboardPage({ onOpenCase }) {
  const THEME_COLOR = "#9173e6";

  return (
    <div className="min-h-screen bg-[#f8f7ff] px-20 md:p-8 font-sans">
      <div className="px-20 mx-auto space-y-6">
        
        {/* NEW TOP NAVIGATION HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 mb-2">
          <div className="flex items-center gap-4">
            <div 
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg"
              style={{ backgroundColor: THEME_COLOR }}
            >
              <Stethoscope size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900">
                PulseIQ Pro<span style={{ color: THEME_COLOR }}>.</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Clinical Intelligence Suite
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active color={THEME_COLOR} />
          </nav>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="space-y-6">
          
          {/* HERO SECTION */}
          <section className="relative overflow-hidden rounded-[2.5rem] border border-white/40 bg-slate-900 p-8 text-white shadow-2xl transition-all">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full blur-[80px]" style={{ backgroundColor: `${THEME_COLOR}40` }} />
            
            <div className="relative grid gap-8 lg:grid-cols-[1fr_320px]">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/10 text-white/90">System Overview</span>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">March 2026</span>
                </div>
                <h2 className="text-5xl font-black tracking-tighter mb-4 leading-none">Intelligence Briefing</h2>
                <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed">
                  Triage signals are stabilized. High-priority risk patterns detected in Respiratory cases.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <Metric label="Today Appts" value="43" />
                  <Metric label="High Risk" value="20" />
                  <Metric label="Avg Wait" value="18m" />
                </div>
              </div>

              <div className="rounded-[2rem] bg-white/5 border border-white/10 p-6 backdrop-blur-md flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-4 text-center">Triage Distribution</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={priorityData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={65} paddingAngle={8} cornerRadius={6}>
                        {priorityData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', fontSize: '12px', fontWeight: 'bold' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* SECONDARY GRID */}
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-slate-100 xl:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Clinical Hotspots</h3>
                <span className="rounded-xl bg-slate-50 px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekly Trend</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {commonCases.map((caseType) => (
                  <article key={caseType.type} className="group rounded-[2rem] bg-[#f8f7ff] p-6 border border-transparent hover:border-[#9173e633] hover:bg-white hover:shadow-xl transition-all">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{caseType.type}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-4xl font-black tracking-tighter text-slate-800">{caseType.count}</p>
                      <p className="text-[10px] font-bold text-emerald-500 pb-1.5">{caseType.trend}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-white p-8 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex items-center gap-3 mb-8 text-rose-500">
                <AlertTriangle size={24} />
                <h3 className="text-2xl font-black tracking-tight">Risk Signals</h3>
              </div>
              <ul className="space-y-4 flex-1">
                {flags.map((flag, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-bold leading-snug transition-transform hover:scale-[1.02]">
                    <div className="h-2 w-2 mt-1.5 shrink-0 rounded-full bg-rose-500 animate-pulse" />
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

         
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active, color }) {
  return (
    <button 
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${active ? 'text-white' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
      style={{ backgroundColor: active ? color : 'transparent' }}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-5 border border-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors">
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{label}</p>
      <p className="text-3xl font-black tracking-tighter">{value}</p>
    </div>
  );
}