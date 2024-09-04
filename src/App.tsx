import React from 'react';
import StockData from './components/StockData';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl">Alpha Vantage Stock Data</h1>
      </header>
      <StockData symbol="IBM" />
    </div>
  );
};

export default App;