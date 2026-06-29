type BackLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function BackLink({ href, children }: BackLinkProps) {
  return (
    <a
      href={href}
      style={{
        color: "#b91c1c",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: 700,
        display: "inline-block",
        marginBottom: "34px",
      }}
    >
      ← {children}
    </a>
  );
}