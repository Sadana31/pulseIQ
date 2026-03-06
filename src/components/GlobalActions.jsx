import { useNavigate } from "react-router-dom";

export default function GlobalActions() {
  const navigate = useNavigate();

  return (
    <>
      {/* FLOATING CHAT BUBBLE */}
      <button
        onClick={() => navigate("/chat")}
        className="fixed bottom-8 right-8 z-40 flex h-16 w-16 items-center justify-center rounded-full text-2xl text-white shadow-2xl transition-all hover:scale-110 active:scale-90"
        style={{ 
          backgroundColor: "#9173e6", 
          boxShadow: "0 20px 25px -5px rgba(145, 115, 230, 0.4)" 
        }}
      >
        💬
      </button>
    </>
  );
}