import React from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function PatientLogin() {
  const navigate = useNavigate();

  // --- LOGIC PRESERVED EXACTLY ---
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const docRef = doc(db, "patients", user.uid);
      const docSnap = await getDoc(docRef);

      navigate("/patientDashboard", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white">
      {/* LEFT SIDE — AUTHENTICATION */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-[#f8f7ff]">
        <div className="w-full max-w-md">
          <header className="mb-10">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-3xl text-3xl text-white shadow-lg mb-8"
              style={{ 
                backgroundColor: "#9173e6", 
                boxShadow: "0 10px 25px -5px rgba(145, 115, 230, 0.4)" 
              }}
            >
              🩺
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              PulseIQ<span style={{ color: "#9173e6" }}>.</span>
            </h1>
            <p className="text-lg font-bold text-slate-400 mt-2">
              Your Digital Health Journey Starts Here
            </p>
          </header>

          {/* GOOGLE LOGIN BUTTON — FUNCTIONALITY PRESERVED */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full mt-6 rounded-[1.5rem] border-2 border-slate-200 bg-white py-5 text-lg font-bold text-slate-800 hover:border-[#9173e6] hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-6 w-6"
            />
            Continue with Google
          </button>

          <p className="mt-10 text-center text-sm text-slate-400 font-medium">
            By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — PATIENT EXPERIENCE PANEL */}
      <div 
        className="hidden lg:flex w-[60%] p-20 items-center justify-center relative overflow-hidden text-white"
        style={{ backgroundColor: "#9173e6" }}
      >
        {/* Large Decorative Icon */}
        <div className="absolute top-[-10%] right-[-10%] opacity-10 text-[40rem] font-black pointer-events-none select-none">
          🩺
        </div>

        <div className="max-w-xl relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.4em] mb-6 opacity-80">
            Clinical Intelligence
          </p>
          <h2 className="text-7xl font-black tracking-tighter leading-tight mb-12">
            Better care, <br /> simplified.
          </h2>

          <div className="space-y-10">
            <div className="flex gap-6 items-start">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
                🤖
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1">PulseBot Triage</h4>
                <p className="text-lg text-white/80 leading-relaxed font-medium">
                  Smart symptom analysis that helps you understand your health 
                  before your appointment even begins.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl">
                📅
              </div>
              <div>
                <h4 className="text-2xl font-bold mb-1">Instant Booking</h4>
                <p className="text-lg text-white/80 leading-relaxed font-medium">
                  Skip the phone queues. Book and reschedule appointments 
                  directly with your care team in seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}