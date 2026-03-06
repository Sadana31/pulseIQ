import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const THEME_COLOR = "#9173e6";

const initialNotes = [
    { id: 1, title: 'Check P-10042 Labs', content: 'Potassium levels pending. Follow up by 15:00.', color: 'bg-[#fdf9ff] border-[#f0e7ff] text-[#6b46c1]' },
    { id: 2, title: 'Bed 4 Transfer', content: 'Step-down unit confirmation needed for Pt. Thorne.', color: 'bg-blue-50 border-blue-100 text-blue-900' },
    { id: 3, title: 'Reminders', content: '- Restock central line kits\n- Review new sepsis protocol', color: 'bg-slate-50 border-slate-200 text-slate-900' },
];

const colors = [
    'bg-[#fdf9ff] border-[#f0e7ff] text-[#6b46c1]', // PulseIQ Soft Violet
    'bg-blue-50 border-blue-100 text-blue-900',
    'bg-emerald-50 border-emerald-100 text-emerald-900',
    'bg-rose-50 border-rose-100 text-rose-900',
    'bg-amber-50 border-amber-100 text-amber-900',
];

export default function NotesPage() {
    const [notes, setNotes] = useState(initialNotes);
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const addNote = () => {
        const newNote = {
            id: Date.now(),
            title: 'New Observation',
            content: 'Start typing...',
            color: colors[Math.floor(Math.random() * colors.length)],
        };
        setNotes([newNote, ...notes]);
        startEditing(newNote);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(n => n.id !== id));
    };

    const startEditing = (note) => {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const saveEdit = (id) => {
        setNotes(notes.map(n => n.id === id ? { ...n, title: editTitle, content: editContent } : n));
        setEditingId(null);
    };

    return (
        <div className="min-h-screen bg-[#f8f7ff] md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: THEME_COLOR }}>
                            Staff Workspace
                        </p>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                            Clinical Notes<span style={{ color: THEME_COLOR }}>.</span>
                        </h1>
                        <p className="text-slate-400 font-medium mt-2">Personal scratchpad for patient observations and clinical reminders.</p>
                    </div>
                    
                    <button
                        onClick={addNote}
                        className="flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-2xl transition-all shadow-xl active:scale-95 hover:brightness-110"
                        style={{ backgroundColor: THEME_COLOR, boxShadow: `0 10px 20px ${THEME_COLOR}30` }}
                    >
                        <Plus className="w-4 h-4" strokeWidth={3} /> New Entry
                    </button>
                </div>

                {/* NOTES GRID */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence>
                        {notes.map((note) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={note.id}
                                className={`relative group rounded-[2rem] p-8 border shadow-sm transition-all duration-300 flex flex-col h-80 hover:shadow-2xl hover:-translate-y-1 ${note.color}`}
                            >
                                {editingId === note.id ? (
                                    <div className="flex flex-col h-full space-y-4">
                                        <input
                                            type="text"
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            className="bg-white/50 text-slate-900 font-black p-4 text-lg rounded-2xl border border-black/5 focus:outline-none focus:ring-2 w-full tracking-tight"
                                            style={{ '--tw-ring-color': THEME_COLOR }}
                                            placeholder="Title"
                                            autoFocus
                                        />
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="flex-1 bg-white/50 text-slate-700 p-4 rounded-2xl border border-black/5 focus:outline-none focus:ring-2 resize-none w-full leading-relaxed font-medium"
                                            style={{ '--tw-ring-color': THEME_COLOR }}
                                            placeholder="Write your note..."
                                        />
                                        <button
                                            onClick={() => saveEdit(note.id)}
                                            className="w-full py-3 rounded-xl text-white font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-lg"
                                            style={{ backgroundColor: THEME_COLOR }}
                                        >
                                            <Check className="w-3 h-3" strokeWidth={4} /> Save Note
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        {/* Actions overlay */}
                                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <button
                                                onClick={() => startEditing(note)}
                                                className="p-2.5 bg-white/80 hover:bg-white text-slate-800 rounded-xl transition-all shadow-sm border border-black/5"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                className="p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all shadow-md"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-2 mb-4 opacity-40">
                                            <Bookmark size={14} />
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Encrypted Log</span>
                                        </div>

                                        <h3 className="text-2xl font-black mb-4 pr-12 tracking-tighter leading-tight line-clamp-2">
                                            {note.title}
                                        </h3>
                                        
                                        <div className="text-sm font-bold opacity-70 whitespace-pre-wrap flex-1 overflow-y-auto custom-scrollbar pr-2 leading-relaxed italic">
                                            "{note.content}"
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-black/5 text-[9px] font-black uppercase tracking-[0.2em] opacity-40 flex justify-between">
                                            <span>LOG-{note.id.toString().slice(-4)}</span>
                                            <span>Staff Verified</span>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* FOOTER */}
                <div className="mt-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                        PulseIQ Internal Scratchpad • Data Auto-Clears after 24h
                    </p>
                </div>
            </div>
        </div>
    );
}