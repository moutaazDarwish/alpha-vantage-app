import React, { useEffect, useState } from 'react';

interface StockData {
  'Time Series (5min)': {
    [key: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
      '5. volume': string;
    };
  };
}

const StockData: React.FC<{ symbol: string }> = ({ symbol }) => {
  const [data, setData] = useState<StockData | null>(null);
  const apiKey = 'RIBXT3XYLI69PC0Q';

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
      );
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [symbol]);

  if (!data) return <div>Loading...</div>;

  const timeSeries = data['Time Series (5min)'];
  const timeKeys = Object.keys(timeSeries);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Stock Data for {symbol}</h1>
      <table className="min-w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-200 p-2">Time</th>
            <th className="border border-gray-200 p-2">Open</th>
            <th className="border border-gray-200 p-2">High</th>
            <th className="border border-gray-200 p-2">Low</th>
            <th className="border border-gray-200 p-2">Close</th>
            <th className="border border-gray-200 p-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {timeKeys.map((time) => (
            <tr key={time}>
              <td className="border border-gray-200 p-2">{time}</td>
              <td className="border border-gray-200 p-2">{timeSeries[time]['1. open']}</td>
              <td className="border border-gray-200 p-2">{timeSeries[time]['2. high']}</td>
              <td className="border border-gray-200 p-2">{timeSeries[time]['3. low']}</td>
              <td className="border border-gray-200 p-2">{timeSeries[time]['4. close']}</td>
              <td className="border border-gray-200 p-2">{timeSeries[time]['5. volume']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockData;