const TestPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#333",
          }}
        >
          🎉 Test Page Works!
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#666",
            marginBottom: "24px",
          }}
        >
          If you can see this, the React app is working properly.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <a
            href="/login"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Go to Login
          </a>
          <a
            href="/register"
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "8px 16px",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Go to Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
