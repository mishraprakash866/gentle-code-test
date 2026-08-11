export default function BodyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="phone">
      <div
        className="glow"
        style={{ background: "#7f77dd", top: "-90px", right: "-70px" }}
      ></div>
      <div className="phone-content">{children}</div>
    </div>
  );
}
