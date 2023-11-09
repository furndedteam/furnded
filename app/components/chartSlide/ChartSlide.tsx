"use client"
import React, { useEffect, useRef, memo } from 'react';

function ChartSlide() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500"
          },
          {
            "proName": "FOREXCOM:NSXUSD",
            "title": "US 100"
          },
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR to USD"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          },
          {
            "description": "Gold",
            "proName": "OANDA:XAUUSD"
          },
          {
            "description": "USDT",
            "proName": "CRYPTOCAP:USDT.D"
          }
        ],
          "showSymbolLogo": true,
          "colorTheme": "light",
          "isTransparent": true,
          "displayMode": "adaptive",
          "locale": "en"
        }`;

        if(container.current) container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container chartSlide" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(ChartSlide);
