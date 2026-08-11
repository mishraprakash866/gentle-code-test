"use client";
import BodyLayout from "@/components/layout";
import { useDebounce } from "@/helper/debounce";
import axios from "axios";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Child } from "./child";
import { Instrument } from "@/types/instruments";

const STORAGE_KEY = "watchlist_instruments";

export default function WatchList() {
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  const abortSignal = useRef<AbortController | null>(null);

  const debounce = useDebounce(300);

  useLayoutEffect(() => {
    const cached = sessionStorage.getItem(STORAGE_KEY);

    if (cached) {
      try {
        const data = JSON.parse(cached);

        setInstruments(data);
        setLoading(false);

        return; // Don't call API
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }

    getInstrument();
  }, []);

  const getInstrument = useCallback(async (name = "") => {
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
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(response.data.data));
      }
      setLoading(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request cancelled");
        return;
      }
      setLoading(false);
      console.error("Error fetching instruments:", error);
    }
  }, []);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    abortSignal.current?.abort();
    debounce(() => getInstrument(keyword));
  }, []);

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
          {instruments.map((instrument: Instrument, index: number) => (
            <Child instrument={instrument} index={index} key={instrument?.id} />
          ))}
        </div>
      )}
    </BodyLayout>
  );
}
