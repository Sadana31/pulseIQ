import React from "react";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  // UPDATED NAV ITEMS
  const NAV_ITEMS = [
    { label: "Dashboard", path: "/doctorDashboard", icon: "📊" },
    { label: "View a Case", path: "/cases", icon: "📁" },
    { label: "High Risk Page", path: "/highrisk", icon: "⚠️" },
    { label: "Notes Page", path: "/notes", icon: "📝" },
  ];

  const THEME_COLOR = "#9173e6";

  // FETCH USER NAME (Logic preserved)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "Doctor");
      }
    });

    return () => unsubscribe();
  }, []);

  // GENERATE INITIALS
  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "ST"; // Default for Staff/User

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-full bg-white transition-all duration-500 ease-in-out border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden ${
        isOpen ? "w-80" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* TOGGLE BUTTON SECTION */}
        <div className="h-20 flex items-center px-5 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 mb-1 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 hover:bg-white transition-all"
            style={{ borderColor: isOpen ? 'transparent' : '#f1f5f9' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = THEME_COLOR}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f1f5f9'}
          >
            <div className="flex flex-col gap-1">
              <span className={`h-0.5 bg-slate-800 transition-all ${isOpen ? "w-5" : "w-4"}`} />
              <span className="h-0.5 w-5 bg-slate-800" />
              <span className={`h-0.5 bg-slate-800 transition-all ${isOpen ? "w-5" : "w-3"}`} />
            </div>
          </button>
        </div>

        {/* LOGO SECTION */}
        <div
          className={`px-4 overflow-hidden shrink-0 transition-all duration-500 ${
            isOpen ? "h-20 opacity-100" : "h-0 opacity-0 mb-0"
          }`}
        >
          <div className="flex items-center gap-4 min-w-[280px]">
            <div 
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl text-white shadow-lg"
              style={{ backgroundColor: THEME_COLOR, boxShadow: `0 10px 15px -3px ${THEME_COLOR}40` }}
            >
              🛡️
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-bold tracking-tighter text-slate-800 uppercase">
                PulseIQ
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: THEME_COLOR }}>
                Web Portal
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 px-3 mt-4 space-y-2 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-6 rounded-2xl h-14 transition-all duration-300 group ${
                  isActive
                    ? "bg-slate-50"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
                style={{ color: isActive ? THEME_COLOR : "" }}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center text-xl">
                  {item.icon}
                </div>

                <span
                  className={`text-base font-semibold whitespace-nowrap transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER / USER PROFILE */}
        <div className="p-3 border-t border-slate-100 shrink-0 space-y-3">
          <Link
            to="/profile"
            className="flex items-center gap-4 rounded-2xl bg-slate-50 h-16 overflow-hidden transition-all hover:bg-slate-100 active:scale-95 group"
          >
            <div 
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl font-black text-white text-base shadow-lg group-hover:brightness-110 transition-all"
              style={{ backgroundColor: THEME_COLOR, boxShadow: `0 10px 15px -3px ${THEME_COLOR}40` }}
            >
              {initials}
            </div>

            <div
              className={`flex flex-col transition-all duration-300 ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none"
              }`}
            >
              <span className="text-sm font-black text-slate-800 tracking-tight">
                {userName || "Analyst"}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: THEME_COLOR }}>
                Internal Staff
              </span>
            </div>
          </Link>

          <button
            onClick={async () => {
              try {
                await signOut(auth);
                navigate("/");
              } catch (error) {
                console.error("Logout error:", error);
              }
            }}
            className={`w-full flex items-center gap-4 rounded-2xl h-14 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all active:scale-95 ${
              isOpen ? "px-4 justify-start" : "justify-center"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center text-lg">
              🚪
            </div>
            <span
              className={`${isOpen ? "block" : "hidden"} font-bold text-sm`}
            >
              Log Out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}