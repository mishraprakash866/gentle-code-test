import React, { useMemo } from "react";
import Image from "next/image";
import { Instrument } from "@/types/instruments";
import { useInView } from "@/helper/useInView";

type ChildProps = {
  instrument: Instrument;
  index: number;
};

const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};

export const Child = React.memo(({ instrument, index }: ChildProps) => {
  const { ref, isVisible } = useInView();

  const values = useMemo(() => {
    let change = instrument?.price_change_percentage_24h_in_currency ?? 0;

    return {
      price: formatNumber(instrument?.current_price),
      change: change,
      isPositive: change > 0,
    };
  }, [
    instrument?.current_price,
    instrument?.price_change_percentage_24h_in_currency,
  ]);

  const animationDelay = useMemo(
    () => (index < 7 ? `${index * 100}ms` : "0ms"),
    [],
  );

  return (
    <div
      ref={ref}
      className={`row instrument-row ${
        isVisible ? "instrument-row-visible" : ""
      }`}
      style={{ animationDelay: animationDelay }}
    >
      <div className="logo">
        <Image
          src={instrument.image}
          alt={instrument.name}
          width={40}
          height={40}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className="nm">{instrument?.name}</div>
        <div className="sym">{instrument?.symbol}</div>
      </div>
      <div>
        <div className="pr">{`₹${values?.price}`}</div>
        {values?.isPositive ? (
          <div className="chg up">▲ {values?.change}%</div>
        ) : (
          <div className="chg dn">▼ {values?.change}%</div>
        )}
      </div>
      <span className="star">☆</span>
      {/* <span className="star fav">★</span> */}
    </div>
  );
});
