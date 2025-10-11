import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const SystemStatus = () => {
  const [supabaseStatus, setSupabaseStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");
  const { user } = useAuth();

  useEffect(() => {
    checkSupabaseConnection();
    checkBackendConnection();
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const { error } = await supabase.auth.getSession();
      setSupabaseStatus(error ? "error" : "connected");
    } catch (err) {
      setSupabaseStatus("error");
    }
  };

  const checkBackendConnection = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/");
      setBackendStatus(response.ok ? "connected" : "error");
    } catch (err) {
      setBackendStatus("error");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return "🟢";
      case "error":
        return "🔴";
      default:
        return "🟡";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "Connected";
      case "error":
        return "Error";
      default:
        return "Checking...";
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg p-3 border text-xs">
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span>{getStatusIcon(supabaseStatus)}</span>
          <span>Supabase: {getStatusText(supabaseStatus)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{getStatusIcon(backendStatus)}</span>
          <span>Backend: {getStatusText(backendStatus)}</span>
        </div>
        {user && (
          <div className="flex items-center space-x-2">
            <span>🟢</span>
            <span>Auth: Logged in</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemStatus;
