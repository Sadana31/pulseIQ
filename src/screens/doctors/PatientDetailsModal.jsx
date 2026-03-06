import React from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2, ChevronRight, ActivitySquare, HeartPulse, Droplets, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PatientDetailsModal({ patient, onClose }) {
    if (!patient) return null;

    const THEME_COLOR = "#9173e6";

    // Helper to handle priority colors in the new theme
    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'Critical': return 'bg-rose-500 text-white border-rose-600';
            case 'High': return 'bg-amber-100 text-amber-700 border-amber-200';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex justify-end"
                onClick={onClose}
            >
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-100 flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* MODAL HEADER */}
                    <div className="p-8 border-b border-slate-50 flex justify-between items-start bg-[#f8f7ff]">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm ${getPriorityStyles(patient.priority)}`}>
                                    {patient.priority}
                                </span>
                                <span className="text-slate-400 font-mono text-xs bg-white px-2 py-1 rounded border border-slate-200 shadow-inner">
                                    {patient.id}
                                </span>
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-1">
                                {patient.name}
                            </h2>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">
                                {patient.age}Y • {patient.gender} • Room {patient.room}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white rounded-2xl text-slate-300 hover:text-slate-900 transition-all shadow-sm border border-transparent hover:border-slate-100"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 space-y-10">

                        {/* VITALS SECTION */}
                        <section>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <ActivitySquare className="w-4 h-4" style={{ color: THEME_COLOR }} /> Vital Monitoring
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <VitalCard icon={<HeartPulse size={14}/>} label="Heart Rate" value={patient.vitals.hr} color={THEME_COLOR} />
                                <VitalCard icon={<Gauge size={14}/>} label="Blood Pres." value={patient.vitals.bp} color={THEME_COLOR} />
                                <VitalCard icon={<Droplets size={14}/>} label="Oxygen" value={patient.vitals.o2} color={THEME_COLOR} />
                            </div>
                        </section>

                        {/* CLINICAL WARNINGS */}
                        <section>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-rose-500" /> PulseIQ Risk Alerts
                            </h3>
                            <div className="space-y-4">
                                {patient.warnings.map(warning => (
                                    <div
                                        key={warning.id}
                                        className={`p-5 rounded-3xl border flex gap-4 transition-all ${
                                            warning.type === 'danger' 
                                            ? 'bg-rose-50 border-rose-100' 
                                            : 'bg-amber-50 border-amber-100'
                                        }`}
                                    >
                                        <ShieldAlert className={`w-6 h-6 shrink-0 mt-0.5 ${
                                            warning.type === 'danger' ? 'text-rose-500' : 'text-amber-500'
                                        }`} />
                                        <div>
                                            <h4 className={`font-black uppercase tracking-tight text-sm mb-1 ${
                                                warning.type === 'danger' ? 'text-rose-700' : 'text-amber-700'
                                            }`}>{warning.title}</h4>
                                            <p className="text-sm text-slate-600 font-medium leading-relaxed">{warning.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* AI INSIGHTS */}
                        <section>
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" style={{ color: THEME_COLOR }} /> AI Recommendations
                            </h3>
                            <ul className="space-y-3">
                                {patient.recommendations.map((rec, i) => (
                                    <li key={i} className="flex gap-4 items-start bg-slate-50 p-5 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                                        <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm shrink-0 mt-0.5">
                                            <ChevronRight className="w-4 h-4" style={{ color: THEME_COLOR }} />
                                        </div>
                                        <span className="text-slate-700 text-sm font-bold leading-relaxed">{rec}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                    </div>

                    {/* ACTION FOOTER */}
                    <div className="p-8 border-t border-slate-50 bg-[#f8f7ff]">
                        <button 
                            className="w-full text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl active:scale-[0.98] hover:brightness-110"
                            style={{ 
                                backgroundColor: THEME_COLOR, 
                                boxShadow: `0 15px 30px ${THEME_COLOR}40` 
                            }}
                        >
                            Acknowledge & Update Chart
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function VitalCard({ label, value, icon, color }) {
    return (
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center transition-all hover:border-[#9173e6]/30">
            <div className="flex items-center gap-2 text-slate-300 mb-2">
                {icon}
                <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
            </div>
            <div className="text-slate-900 font-black text-xl tracking-tighter">{value}</div>
        </div>
    );
}