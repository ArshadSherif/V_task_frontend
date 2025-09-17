import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
const queryClient = new QueryClient();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [session_id, set_session_id] = useState<string | null>(null);

  useEffect(() => {
    const createSession = async () => {
      try {
        // Check if session already exists
        let storedSession = localStorage.getItem("user_session");
        
        if (!storedSession) {
          const { data } = await axios.post(`${BACKEND_URL}/session/new`);
          storedSession = data.session_id;
          console.log("New session created:", storedSession);
          localStorage.setItem("user_session", storedSession);
        }
        set_session_id(storedSession);
      } catch (err) {
        console.error("Failed to create session:", err);
      }
    };

    createSession();
  }, [session_id]);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chat session_id={session_id} set_session_id ={set_session_id} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
