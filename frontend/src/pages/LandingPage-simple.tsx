import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(to right, #2563eb, #7c3aed)",
          color: "white",
          padding: "80px 16px",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", textAlign: "center" }}
        >
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              marginBottom: "24px",
            }}
          >
            Photography Management System
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "32px",
              maxWidth: "672px",
              margin: "0 auto 32px",
            }}
          >
            Connect with photographers, book sessions, and manage your photo
            galleries all in one place.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/register"
              style={{
                backgroundColor: "white",
                color: "#2563eb",
                padding: "12px 32px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              style={{
                border: "2px solid white",
                color: "white",
                padding: "12px 32px",
                borderRadius: "8px",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: "80px 16px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Everything You Need
            </h2>
            <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
              Streamline your photography business with our comprehensive
              platform
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "32px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#dbeafe",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                📅
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Easy Booking
              </h3>
              <p style={{ color: "#6b7280" }}>
                Simple session booking system for clients and photographers
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#dcfce7",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                📸
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Photo Management
              </h3>
              <p style={{ color: "#6b7280" }}>
                Secure photo storage and organized gallery management
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#f3e8ff",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                🖼️
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Client Galleries
              </h3>
              <p style={{ color: "#6b7280" }}>
                Beautiful galleries for clients to view and download photos
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  backgroundColor: "#fed7aa",
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                📧
              </div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Notifications
              </h3>
              <p style={{ color: "#6b7280" }}>
                Automated email notifications for bookings and uploads
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: "64px 16px",
        }}
      >
        <div
          style={{ maxWidth: "896px", margin: "0 auto", textAlign: "center" }}
        >
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "bold",
              marginBottom: "16px",
            }}
          >
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: "1.125rem", marginBottom: "32px" }}>
            Join thousands of photographers and clients using our platform
          </p>
          <Link
            to="/register"
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 32px",
              borderRadius: "8px",
              fontWeight: "600",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
