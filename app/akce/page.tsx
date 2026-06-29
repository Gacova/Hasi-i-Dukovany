export default function AdminPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(38px, 9vw, 42px)",
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: "12px",
          }}
        >
          Administrace
        </h1>

        <p
          style={{
            color: "#6b7280",
            fontSize: "clamp(16px, 4vw, 18px)",
            lineHeight: 1.6,
            marginBottom: "28px",
          }}
        >
          Vyber, co chceš spravovat.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "22px",
          }}
        >
          <a href="/admin/clenove" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>👥</div>
              <h2 style={titleStyle}>Správa členů</h2>
              <p style={textStyle}>Přidávání, úpravy a mazání členů SDH.</p>
              <div style={linkStyle}>Otevřít →</div>
            </div>
          </a>

          <a href="/admin/finance" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>💰</div>
              <h2 style={titleStyle}>Finance</h2>
              <p style={textStyle}>Evidence příjmů, výdajů a zůstatku.</p>
              <div style={linkStyle}>Otevřít →</div>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
}

const cardStyle = {
  border: "1px solid #ececec",
  borderRadius: "28px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  minHeight: "220px",
};

const titleStyle = {
  fontSize: "26px",
  fontWeight: 800,
  marginBottom: "12px",
};

const textStyle = {
  fontSize: "16px",
  color: "#6b7280",
  lineHeight: 1.6,
};

const linkStyle = {
  marginTop: "22px",
  color: "#dc2626",
  fontWeight: 800,
  fontSize: "17px",
};