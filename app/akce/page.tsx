export default function AdminPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", padding: "56px 24px" }}>
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "12px" }}>
          Administrace
        </h1>

        <p style={{ color: "#6b7280", fontSize: "18px", marginBottom: "32px" }}>
          Vyber, co chceš spravovat.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <a href="/admin/clenove" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ fontSize: "42px", marginBottom: "16px" }}>👥</div>
              <h2 style={titleStyle}>Správa členů</h2>
              <p style={textStyle}>Přidávání, úpravy a mazání členů SDH.</p>
              <div style={linkStyle}>Otevřít →</div>
            </div>
          </a>

          <a href="/admin/finance" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={cardStyle}>
              <div style={{ fontSize: "42px", marginBottom: "16px" }}>💰</div>
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
  padding: "32px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
  minHeight: "240px",
};

const titleStyle = {
  fontSize: "28px",
  fontWeight: 800,
  marginBottom: "12px",
};

const textStyle = {
  fontSize: "17px",
  color: "#6b7280",
  lineHeight: 1.6,
};

const linkStyle = {
  marginTop: "24px",
  color: "#dc2626",
  fontWeight: 800,
  fontSize: "18px",
};