import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Proper Supabase configuration
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://pycdyfpowxwoiicrztmn.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5Y2R5ZnBvd3h3b2lpY3J6dG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNjY0MDcsImV4cCI6MjA3NTc0MjQwN30.89XNi9jJ0QTB8BNWjV1Xc86IAxtMPDnVTVjzDFS1jrE";

// Create proper Supabase client - THIS WILL ACTUALLY SAVE TO DATABASE
const supabase = createClient(supabaseUrl, supabaseKey);

// Bulletproof Loading Component
const LoadingScreen = ({ message = "Loading..." }: { message?: string }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f9fafb",
      fontFamily: "system-ui, sans-serif",
    }}
  >
    <div style={{ textAlign: "center", maxWidth: "400px", padding: "20px" }}>
      <div
        style={{
          width: "60px",
          height: "60px",
          border: "3px solid #e5e7eb",
          borderTop: "3px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 20px",
        }}
      ></div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#111827",
          marginBottom: "8px",
        }}
      >
        {message}
      </h2>
      <p style={{ color: "#6b7280" }}>Please wait...</p>
    </div>
  </div>
);

// Bulletproof Landing Page
const LandingPage = () => (
  <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
    <div
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "20px",
          margin: "0 0 20px 0",
        }}
      >
        📸 Photography Management System
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "40px", opacity: "0.9" }}>
        Professional photography booking and gallery management
      </p>
      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => (window.location.href = "/register")}
          style={{
            backgroundColor: "white",
            color: "#667eea",
            padding: "15px 30px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Get Started
        </button>
        <button
          onClick={() => (window.location.href = "/login")}
          style={{
            backgroundColor: "transparent",
            color: "white",
            padding: "15px 30px",
            borderRadius: "8px",
            border: "2px solid white",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </div>
    </div>

    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "40px",
          color: "#111827",
        }}
      >
        Features
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {[
          {
            icon: "📅",
            title: "Easy Booking",
            desc: "Simple session scheduling",
          },
          {
            icon: "📸",
            title: "Photo Management",
            desc: "Secure photo storage",
          },
          {
            icon: "🖼️",
            title: "Client Galleries",
            desc: "Beautiful photo galleries",
          },
          {
            icon: "📧",
            title: "Notifications",
            desc: "Email alerts and updates",
          },
        ].map((feature, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
              {feature.icon}
            </div>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              {feature.title}
            </h3>
            <p style={{ color: "#6b7280" }}>{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Bulletproof Login Page
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("🔐 LOGIN ATTEMPT - Using Proper Supabase Client");
    console.log("📧 Email:", email);

    try {
      // Use proper Supabase client for login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("📥 LOGIN RESPONSE:");
      console.log("✅ Data:", data);
      console.log("❌ Error:", error);

      if (error) {
        console.error("❌ LOGIN FAILED:", error);
        setError(`Login failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.user && data.session) {
        console.log("🎉 LOGIN SUCCESSFUL!");
        console.log("🆔 User ID:", data.user.id);
        console.log("📧 Email:", data.user.email);
        console.log("📊 Metadata:", data.user.user_metadata);

        // Get user role from metadata or default to client
        const userRole = data.user.user_metadata?.role || "client";

        localStorage.setItem(
          "user",
          JSON.stringify({
            email,
            role: userRole,
            id: data.user.id,
            supabase_user: data.user,
          })
        );

        const redirectPath =
          userRole === "photographer"
            ? "/photographer-dashboard"
            : "/client-dashboard";

        console.log("🔄 Redirecting to:", redirectPath);
        window.location.href = redirectPath;
      } else {
        console.error("❌ No user data or session returned");
        setError("Login failed - no user data returned");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("💥 LOGIN ERROR:", err);
      setError(`Network error: ${err.message || "Please try again"}`);
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Signing you in..." />;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            color: "#111827",
          }}
        >
          Sign In
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Sign In
          </button>
        </form>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "6px",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          Don't have an account?{" "}
          <a
            href="/register"
            style={{ color: "#3b82f6", textDecoration: "none" }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

// Bulletproof Register Page
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Debug: Log what we're sending to Supabase
    console.log("🚀 REGISTRATION ATTEMPT - Using Proper Supabase Client");
    console.log("📧 Email:", formData.email);
    console.log("👤 Name:", formData.name);
    console.log("🎭 Role:", formData.role);
    console.log("🌐 Supabase URL:", supabaseUrl);
    console.log("🔑 API Key present:", !!supabaseKey);

    try {
      // Use proper Supabase client - THIS WILL SAVE TO DATABASE
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role,
          },
        },
      });

      // Debug: Log complete Supabase response
      console.log("📥 SUPABASE RESPONSE:");
      console.log("✅ Data:", data);
      console.log("❌ Error:", error);

      if (error) {
        console.error("❌ REGISTRATION FAILED:", error);
        setError(`Registration failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.user) {
        console.log("🎉 USER CREATED SUCCESSFULLY!");
        console.log("🆔 User ID:", data.user.id);
        console.log("📧 Email:", data.user.email);
        console.log("📊 Metadata:", data.user.user_metadata);
        console.log(
          "✅ Email confirmed:",
          data.user.email_confirmed_at ? "Yes" : "No"
        );

        // Show detailed success message
        const successMessage = `🎉 SUCCESS! User created in Supabase!

📊 Details:
• User ID: ${data.user.id}
• Email: ${data.user.email}
• Role: ${formData.role}
• Name: ${formData.name}

🔍 To verify in Supabase:
1. Go to supabase.com
2. Open your project
3. Go to Authentication > Users
4. Look for: ${data.user.email}

${
  data.user.email_confirmed_at
    ? "✅ Email confirmed"
    : "⚠️ Email confirmation may be required"
}`;

        alert(successMessage);

        // Store user data locally
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            role: formData.role,
            name: formData.name,
            id: data.user.id,
            supabase_user: data.user,
          })
        );

        // Redirect to appropriate dashboard
        const redirectPath =
          formData.role === "photographer"
            ? "/photographer-dashboard"
            : "/client-dashboard";

        console.log("🔄 Redirecting to:", redirectPath);
        window.location.href = redirectPath;
      } else {
        console.error("❌ No user data returned from Supabase");
        setError("Registration failed - no user data returned");
        setLoading(false);
      }
    } catch (err: any) {
      console.error("💥 REGISTRATION ERROR:", err);
      setError(`Network error: ${err.message || "Please try again"}`);
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen message="Creating your account..." />;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "30px",
            color: "#111827",
          }}
        >
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            >
              <option value="client">Client</option>
              <option value="photographer">Photographer</option>
            </select>
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
                color: "#374151",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        {error && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "6px",
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <p style={{ textAlign: "center", marginTop: "20px", color: "#6b7280" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#3b82f6", textDecoration: "none" }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

// Debug Component to Check Supabase Connection
const SupabaseDebug = () => {
  const [status, setStatus] = useState("checking");
  const [connectionTest, setConnectionTest] = useState("testing");

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        console.log("🔍 Testing Supabase connection...");
        console.log("📍 Supabase URL:", supabaseUrl);
        console.log("🔑 API Key present:", !!supabaseKey);

        // Test connection with proper Supabase client
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("❌ Supabase connection error:", error);
          setStatus("error: " + error.message);
          setConnectionTest("failed");
        } else {
          console.log("✅ Supabase connection successful");
          setStatus("connected");
          setConnectionTest("success");
        }

        // Test if we can access auth admin (this will show if API key works)
        try {
          const { data: users, error: usersError } =
            await supabase.auth.admin.listUsers();
          if (!usersError) {
            console.log("✅ Admin access working");
          }
        } catch (adminError) {
          console.log("ℹ️ Admin access not available (normal for anon key)");
        }
      } catch (err) {
        console.error("💥 Connection test failed:", err);
        setStatus("connection failed");
        setConnectionTest("failed");
      }
    };
    checkSupabase();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontSize: "12px",
        zIndex: 1000,
        maxWidth: "280px",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "8px", color: "#111" }}>
        🔍 Supabase Connection Status
      </div>
      <div style={{ marginBottom: "4px" }}>
        Status:{" "}
        <span
          style={{
            color: connectionTest === "success" ? "#10b981" : "#ef4444",
          }}
        >
          {status}
        </span>
      </div>
      <div style={{ marginBottom: "4px" }}>URL: ✅ Configured</div>
      <div style={{ marginBottom: "4px" }}>
        API Key: {supabaseKey ? "✅ Present" : "❌ Missing"}
      </div>
      <div style={{ marginBottom: "8px" }}>
        Client: ✅ Proper Supabase Client
      </div>
      <div
        style={{
          fontSize: "10px",
          color: "#666",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "6px",
        }}
      >
        Open browser console for detailed logs
      </div>
    </div>
  );
};

// Bulletproof Dashboard
const ClientDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      window.location.href = "/login";
    }
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    console.log("🚪 LOGOUT ATTEMPT");
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("❌ Logout error:", error);
      } else {
        console.log("✅ Logout successful");
      }
    } catch (err) {
      console.error("💥 Logout error:", err);
    }

    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (loading) return <LoadingScreen message="Loading your dashboard..." />;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <SupabaseDebug />
      {/* Header */}
      <div
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          padding: "15px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#111827",
              margin: "0",
            }}
          >
            📸 PhotoBook
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "#6b7280" }}>{user?.email}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "8px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#111827",
          }}
        >
          {user?.role === "photographer"
            ? "Photographer Dashboard"
            : "Client Dashboard"}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {(user?.role === "photographer"
            ? [
                {
                  title: "Session Requests",
                  desc: "Review and approve bookings",
                  color: "#3b82f6",
                },
                {
                  title: "Upload Photos",
                  desc: "Upload photos for sessions",
                  color: "#10b981",
                },
                {
                  title: "My Sessions",
                  desc: "Manage your sessions",
                  color: "#8b5cf6",
                },
              ]
            : [
                {
                  title: "Book Session",
                  desc: "Schedule a photography session",
                  color: "#3b82f6",
                },
                {
                  title: "My Sessions",
                  desc: "View your bookings",
                  color: "#10b981",
                },
                {
                  title: "Photo Gallery",
                  desc: "Browse your photos",
                  color: "#8b5cf6",
                },
              ]
          ).map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#111827",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#6b7280", marginBottom: "20px" }}>
                {item.desc}
              </p>
              <button
                style={{
                  backgroundColor: item.color,
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                {item.title}
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "30px",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "15px",
              color: "#111827",
            }}
          >
            Recent Activity
          </h3>
          <p
            style={{ color: "#6b7280", textAlign: "center", padding: "40px 0" }}
          >
            No recent activity. Start using the system to see updates here!
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial load
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <LoadingScreen message="Starting Photography System..." />;
  }

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: system-ui, sans-serif; }
      `}</style>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/photographer-dashboard" element={<ClientDashboard />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f9fafb",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1
                    style={{
                      fontSize: "4rem",
                      fontWeight: "bold",
                      color: "#111827",
                      marginBottom: "20px",
                    }}
                  >
                    404
                  </h1>
                  <p style={{ color: "#6b7280", marginBottom: "30px" }}>
                    Page not found
                  </p>
                  <a
                    href="/"
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "12px 24px",
                      borderRadius: "6px",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
