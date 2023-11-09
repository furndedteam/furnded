import styles from "./Charts.module.css"


import { useEffect, useRef, memo } from 'react';
import { ImSpinner2 } from "react-icons/im";

function Charts() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          [
            "Apple",
            "AAPL|1D"
          ],
          [
            "Google",
            "GOOGL|1D"
          ],
          [
            "Microsoft",
            "MSFT|1D"
          ]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "light",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "backgroundColor": "#f5f5f5",
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }`;
      if(container.current) container.current.appendChild(script);
    },[]);

  return (
      <div className={styles.container}>
        <div className={`tradingview-widget-container ${styles.tv}`} ref={container}>
          <div className="tradingview-widget-container__widget"></div>
        </div>

        <div className={styles.loading}>
          <ImSpinner2 className={`${styles.spin} spinBig spin`} color="#1649ff"/>
        </div>
      </div>
  );
}

export default memo(Charts);
