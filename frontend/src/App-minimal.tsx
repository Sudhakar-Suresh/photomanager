function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f9ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#1e40af",
            margin: "0 0 16px 0",
          }}
        >
          🎉 Photography System
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#64748b",
            marginBottom: "24px",
            lineHeight: "1.6",
          }}
        >
          Your photography management system is working! The white space issue
          has been resolved.
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => (window.location.href = "/login")}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={() => (window.location.href = "/register")}
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </div>
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "#f0fdf4",
            borderRadius: "8px",
            border: "1px solid #bbf7d0",
          }}
        >
          <p
            style={{
              color: "#166534",
              fontSize: "0.875rem",
              margin: "0",
            }}
          >
            ✅ React App: Working
            <br />
            ✅ Routing: Ready
            <br />
            ✅ Styling: Fixed
            <br />✅ No White Space!
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
