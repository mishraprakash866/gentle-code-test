import React, { useMemo } from "react";
import Image from "next/image";
import { Instrument } from "@/types/instruments";

type ChildProps = {
  instrument: Instrument;
};

const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-IN").format(number);
};

export const Child = React.memo(({ instrument }: ChildProps) => {
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

  return (
    <div className="row">
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
