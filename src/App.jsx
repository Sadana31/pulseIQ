import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { User, Stethoscope } from "lucide-react";

import DoctorLogin from "./screens/doctors/doctorLogin";
import PatientLogin from "./screens/patient/patientLogin";

import CaseViewPage from "./screens/doctors/doctorCaseViewing";
import DashboardPage from "./screens/doctors/doctorDashboard";
import NotesPage from "./screens/doctors/doctorNotes";
import PatientsPage from "./screens/doctors/doctorHighRisk";

import PatientDashboard from "./screens/patient/patientSymptoms";

import Layout from "./components/Layout"; // doctor layout

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex flex-col items-center py-12 px-6">

      <div className="w-full max-w-2xl mb-16 text-center">
        <h1 className="text-7xl font-black tracking-tighter mb-4 text-[#9173e6]">
          PulseIQ
        </h1>

        <p className="text-slate-500 text-xl font-medium">
          Clinical intelligence redefined. Choose your gateway.
        </p>
      </div>

      <div className="flex flex-col gap-8 w-full max-w-2xl">

        {/* Patient */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow flex flex-col md:flex-row items-center gap-8">

          <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-[#9173e6]">
            <User size={40} color="white"/>
          </div>

          <div className="flex flex-col flex-1 text-center md:text-left">

            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Patient Portal
            </h2>

            <p className="text-slate-500 mb-6 text-lg">
              Access your medical records and manage appointments.
            </p>

            <button
              onClick={() => navigate("/patientLogin")}
              className="px-10 py-4 text-white rounded-2xl font-bold bg-[#9173e6]"
            >
              Enter Portal
            </button>

          </div>
        </div>

        {/* Doctor */}
        <div className="bg-[#9173e6] rounded-[2.5rem] p-10 shadow flex flex-col md:flex-row items-center gap-8">

          <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-white/10">
            <Stethoscope size={40} color="white"/>
          </div>

          <div className="flex flex-col flex-1 text-center md:text-left">

            <h2 className="text-3xl font-bold text-white mb-2">
              Medical Staff
            </h2>

            <p className="text-white mb-6 text-lg">
              Review cases and manage clinical alerts.
            </p>

            <button
              onClick={() => navigate("/doctorLogin")}
              className="px-10 py-4 bg-white text-slate-900 rounded-2xl font-bold"
            >
              Staff Login
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>

      <Toaster position="top-right" />

      <Routes>

        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Login pages */}
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/patientLogin" element={<PatientLogin />} />

        {/* Patient pages */}
        <Route path="/patientDashboard" element={<PatientDashboard />} />

        {/* Doctor pages using layout */}
        <Route element={<Layout />}>
          <Route path="/doctorDashboard" element={<DashboardPage />} />
          <Route path="/cases" element={<CaseViewPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/highrisk" element={<PatientsPage />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}