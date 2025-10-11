import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "testing" | "connected" | "error"
  >("testing");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test the connection by trying to get the session
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setConnectionStatus("error");
          setError(error.message);
        } else {
          setConnectionStatus("connected");
        }
      } catch (err) {
        setConnectionStatus("error");
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border">
      <div className="flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            connectionStatus === "testing"
              ? "bg-yellow-500"
              : connectionStatus === "connected"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        ></div>
        <span className="text-sm font-medium">
          Supabase:{" "}
          {connectionStatus === "testing"
            ? "Testing..."
            : connectionStatus === "connected"
            ? "Connected"
            : "Error"}
        </span>
      </div>
      {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
    </div>
  );
};

export default SupabaseTest;
