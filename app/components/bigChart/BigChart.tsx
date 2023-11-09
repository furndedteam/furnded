"use client"
import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise: Promise<Event>;

export default function BigChart(): JSX.Element {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };
  }, []);

  function createWidget(): void {
    if (document.getElementById('tradingview_66b59') && 'TradingView' in window) {
      const tradingViewWindow = window as typeof window & { TradingView: any };
      new tradingViewWindow.TradingView.widget({
        autosize: true,
        symbol: 'NASDAQ:AAPL',
        interval: '60',
        timezone: 'Etc/UTC',
        theme: 'light',
        style: '1',
        locale: 'en',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview_66b59',
      });
    }
  }

  return (
    <div className='tradingview-widget-container' style={{ height: '100%', width: '100%' }}>
      <div id='tradingview_66b59' style={{ height: 'calc(100% - 32px)', width: '100%' }} />
    </div>
  );
}
