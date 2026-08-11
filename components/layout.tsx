"use client";
import { usePathname } from "next/navigation";

export default function BodyLayout({
  children,
  isWatchList = true,
}: {
  children: React.ReactNode;
  isWatchList?: boolean;
}) {
  const pathname = usePathname();

  return (
    <div className="phone">
      {isWatchList ? (
        <div
          className="glow"
          style={{ background: "#7f77dd", top: "-90px", right: "-70px" }}
        ></div>
      ) : (
        <div
          className="glow"
          style={{
            backgroundColor: "#1d9e75",
            top: "-80px",
            left: "-80px",
          }}
        ></div>
      )}

      <div key={pathname} className="phone-content page-transition">
        {children}
      </div>
    </div>
  );
}
