"use client";

import BodyLayout from "@/components/layout";

export default function Details() {
  return (
    <BodyLayout isWatchList={false}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          position: "relative",
        }}
      >
        <div
          className="logo"
          style={{
            width: "48px",
            height: "48px",
            color: "#e8b84b",
          }}
        >
          ₿
        </div>
        <div>
          <div className="nm" style={{ fontSize: "17px" }}>
            Bitcoin
          </div>
          <div className="sym">BTC · RANK 1</div>
        </div>
        <div className="badge">+2.4%</div>
      </div>
    </BodyLayout>
  );
}
