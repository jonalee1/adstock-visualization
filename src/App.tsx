import React from 'react';
import './App.css';
import AdstockModelVisualization from './components/AdstockModelVisualization';

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adstock Model Visualizer</h1>
      <AdstockModelVisualization />
    </div>
  );
}

export default App;