import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function DoctorLogin() {
  const navigate = useNavigate();

  // --- LOGIC PRESERVED EXACTLY AS PROVIDED ---
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Checking the 'doctors' collection instead of 'patients'
      const docRef = doc(db, "doctors", user.uid);
      const docSnap = await getDoc(docRef);

      navigate("/doctorDashboard", { replace: true });

  
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white font-sans">
      {/* LEFT SIDE — AUTHENTICATION SECTION */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-[#f8f7ff]">
        <div className="w-full max-w-md">
          <header className="mb-10 text-center lg:text-left">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl text-white shadow-lg mx-auto lg:mx-0 mb-8"
              style={{ 
                backgroundColor: "#9173e6", 
                boxShadow: "0 10px 25px -5px rgba(145, 115, 230, 0.4)" 
              }}
            >
              🩺
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic">
              PulseIQ<span style={{ color: "#9173e6" }}>.</span>Pro
            </h1>
            <p className="text-lg font-bold text-slate-400 mt-2 uppercase tracking-[0.2em] text-xs">
              Secure Practitioner Access
            </p>
          </header>

          {/* GOOGLE SIGN IN BUTTON — FUNCTIONALITY PRESERVED */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-6 rounded-2xl border-2 border-slate-200 bg-white py-5 text-lg font-bold text-slate-800 hover:border-[#9173e6] hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-6 w-6"
            />
            Sign in as Practitioner
          </button>

          <div className="mt-12 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-sm">
            <p className="text-[11px] text-slate-400 text-center leading-relaxed font-bold uppercase tracking-widest">
              Authorized Personnel Only
            </p>
            <p className="text-[10px] text-slate-300 text-center mt-2">
              This system is HIPAA compliant. All access attempts are monitored and recorded for security auditing purposes.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — CLINICAL INSIGHTS PANEL */}
      <div className="hidden lg:flex w-[60%] bg-slate-900 p-20 items-center justify-center relative overflow-hidden">
        {/* Background Decorative Text */}
        <div 
          className="absolute top-[-5%] right-[-5%] opacity-[0.03] text-[45rem] font-black pointer-events-none select-none text-white"
        >
          IQ
        </div>

        <div className="max-w-xl relative z-10 text-white">
          <div 
            className="inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            style={{ backgroundColor: "#9173e6" }}
          >
            Professional Suite
          </div>
          
          <h2 className="text-7xl font-black tracking-tighter leading-[1.05] mb-12">
            Advanced Case Management.
          </h2>

          <div className="space-y-12">
            <div className="flex gap-8 group">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                📋
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">Unified Case Flow</h4>
                <p className="text-lg text-slate-400 leading-relaxed font-medium">
                  Instant access to high-risk patient triage and AI-synthesized medical summaries.
                </p>
              </div>
            </div>

            <div className="flex gap-8 group">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-2">Real-time Triage</h4>
                <p className="text-lg text-slate-400 leading-relaxed font-medium">
                  Optimized alert system for psychiatric counseling and emergency escalations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}