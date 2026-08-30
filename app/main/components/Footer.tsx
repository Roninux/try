// Footer — sits at the bottom of every /main page.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: 0,
          }}
        >
          &copy; {year} FileHub. All rights reserved.
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#9ca3af",
            marginTop: "0.25rem",
          }}
        >
          File Sharing Made Simple
        </p>
      </div>
    </footer>
  );
}
