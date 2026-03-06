import { useState } from 'react';
import { mockPatients } from './data/mockPatients';
import PatientDetailsModal from './PatientDetailsModal';
import { AlertCircle, Clock, HeartPulse, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function PatientsPage() {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const THEME_COLOR = "#9173e6";

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
    };

    return (
        <div className="min-h-screen bg-[#f8f7ff] p-4 md:p-10 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: THEME_COLOR }}>
                            Clinical Oversight
                        </p>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                            High Risk Triage<span style={{ color: THEME_COLOR }}>.</span>
                        </h1>
                        <p className="text-slate-400 font-medium mt-2">
                            Monitoring <span className="text-slate-900 font-bold">{mockPatients.length} critical cases</span> requiring immediate intervention.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Critical</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">High</span>
                        </div>
                    </div>
                </div>

                {/* PATIENTS LIST */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-4"
                >
                    {mockPatients.map((patient) => (
                        <motion.button
                            key={patient.id}
                            variants={item}
                            onClick={() => setSelectedPatient(patient)}
                            className="w-full text-left bg-white hover:bg-[#f8f7ff] border border-slate-100 hover:border-[#9173e6]/30 rounded-[2.5rem] p-8 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 group flex flex-col md:flex-row md:items-center justify-between gap-8"
                        >
                            {/* Left side: Profile Info */}
                            <div className="flex items-center gap-6 flex-1">
                                <div className="shrink-0">
                                    <div className={clsx(
                                        "w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-lg transition-transform group-hover:scale-110",
                                        patient.priority === 'Critical' ? 'bg-rose-500 text-white' :
                                            patient.priority === 'High' ? 'bg-amber-100 text-amber-600' :
                                                'bg-[#f8f7ff] text-[#9173e6]'
                                    )}>
                                        <HeartPulse className="w-8 h-8" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-[#9173e6] transition-colors">
                                            {patient.name}
                                        </h2>
                                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
                                            {patient.id}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                        {patient.age}Y • {patient.gender} • <span className="text-slate-600">{patient.room}</span>
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-[#9173e6] bg-[#f8f7ff] inline-flex px-4 py-2 rounded-xl font-bold border border-[#9173e6]/10">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{patient.condition}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right side: Stats & AI Insights */}
                            <div className="flex items-center gap-10 md:border-l border-slate-100 md:pl-10">
                                <div className="space-y-1">
                                    <div className="text-[9px] text-slate-300 font-black uppercase tracking-[0.2em]">Wait Time</div>
                                    <div className="flex items-center gap-2 text-slate-800 text-lg font-black tracking-tighter">
                                        <Clock className="w-4 h-4" style={{ color: THEME_COLOR }} /> 12m
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[9px] text-slate-300 font-black uppercase tracking-[0.2em]">AI Alerts</div>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-2xl font-black text-sm transition-all shadow-sm border border-slate-100"
                                        style={{ 
                                            backgroundColor: patient.warnings.length > 1 ? '#fff1f2' : '#fffbeb',
                                            color: patient.warnings.length > 1 ? '#e11d48' : '#d97706',
                                            borderColor: patient.warnings.length > 1 ? '#fecdd3' : '#fef3c7'
                                        }}
                                    >
                                        {patient.warnings.length}
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-[#9173e6] group-hover:text-white group-hover:border-[#9173e6] group-hover:shadow-lg transition-all">
                                        <ChevronRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Slide-over portal */}
                {selectedPatient && (
                    <PatientDetailsModal
                        patient={selectedPatient}
                        onClose={() => setSelectedPatient(null)}
                    />
                )}

                {/* FOOTER */}
                <div className="mt-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                        PulseIQ Case Triage Engine • High-Priority Filter Active
                    </p>
                </div>
            </div>
        </div>
    );
}