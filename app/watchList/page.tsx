"use client";
import BodyLayout from "@/components/layout";
import { useDebounce } from "@/helper/debounce";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function WatchList() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  const abortSignal = useRef<AbortController | null>(null);

  const debounce = useDebounce(800);

  useEffect(() => {
    getInstrument();
  }, []);

  const getInstrument = async (name = "") => {
    try {
      setLoading(true);

      abortSignal.current = new AbortController();

      const response = await axios(
        "/api/seeder?q=" + encodeURIComponent(name.trim()),
        {
          signal: abortSignal.current.signal,
        },
      );

      if (response.data.status) {
        setInstruments(response.data.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
        return;
      }

      console.error("Error fetching instruments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    abortSignal.current?.abort();
    debounce(() => getInstrument(keyword));
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

      <input
        className="search"
        onChange={handleSearch}
        placeholder="Search assets"
      ></input>

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
                  src={instrument.image}
                  alt={instrument.name}
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
