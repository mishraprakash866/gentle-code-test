"use client";
import BodyLayout from "@/components/layout";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function WatchList() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstrument();
  }, []);

  const getInstrument = async () => {
    try {
      setLoading(true);

      const data = await axios("/api/seeder");

      console.log(data.data);

      if (data.data.status) {
        setInstruments(data.data.data);
      }
    } catch (error) {
      console.error("Error fetching instruments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BodyLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <div>
          <div className="kicker">Portfolio</div>
          <h1>watchlist</h1>
        </div>
        <div className="iconbtn" title="refresh">
          ⟳
        </div>
      </div>

      <input className="search" placeholder="Search assets"></input>

      <div className="chips">
        <span className="chip on">All</span>
        <span className="chip">Pinned</span>
        <span className="chip">Gainers</span>
        <span className="chip">Losers</span>
      </div>

      {loading ? (
        <div>
          {[...new Array(10)].map((ele, index) => (
            <div className="shimmer" key={index} />
          ))}
        </div>
      ) : (
        <div>
          {instruments.map((instrument: any) => (
            <div key={instrument?.id} className="row">
              <div className="logo">
                <Image
                  loader={() => instrument?.image}
                  src={instrument?.image}
                  alt={instrument?.name}
                  width={40}
                  height={40}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div className="nm">{instrument?.name} 📌</div>
                <div className="sym">{instrument?.symbol}</div>
              </div>
              <div>
                <div className="pr">{instrument?.price}</div>
                <div className="chg up">▲ {instrument?.change}%</div>
              </div>
              <span className="star fav">★</span>
            </div>
          ))}
        </div>
      )}
    </BodyLayout>
  );
}
