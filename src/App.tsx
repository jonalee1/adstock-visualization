import React, { useState } from 'react';
import './App.css';
import AdstockModelVisualization from './components/AdstockModelVisualization';
import WeibullAdstockVisualization from './components/WeibullAdstockVisualization';

function App() {
  const [activeTab, setActiveTab] = useState('geometric');
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Adstock Model Visualizer</h1>
      
      {/* Simple Tab Navigation */}
      <div className="flex mb-4 border-b">
        <button 
          className={`py-2 px-4 ${activeTab === 'geometric' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('geometric')}
        >
          Geometric Adstock
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'weibull' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('weibull')}
        >
          Weibull Adstock
        </button>
      </div>
      
      {/* Visualization Container */}
      <div>
        {activeTab === 'geometric' && <AdstockModelVisualization />}
        {activeTab === 'weibull' && <WeibullAdstockVisualization />}
      </div>
    </div>
  );
}

export default App;