import React, { useState } from 'react';
import './App.css';
import AdstockModelVisualization from './components/AdstockModelVisualization';
import WeibullAdstockVisualization from './components/WeibullAdstockVisualization';
import SaturationVisualization from './components/SaturationVisualization';
import SaturationHillVisualization from './components/SaturationHillVisualization';
import SaturationModelsVisualization from './components/SaturationModelsVisualization';

function App() {
  const [activeTab, setActiveTab] = useState('geometric');
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Marketing Model Visualizations</h1>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap mb-4 border-b">
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
        <button 
          className={`py-2 px-4 ${activeTab === 'saturation' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('saturation')}
        >
          Saturation Effects
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'hill' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('hill')}
        >
          Hill Saturation
        </button>
        <button 
          className={`py-2 px-4 ${activeTab === 'comparison' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
          onClick={() => setActiveTab('comparison')}
        >
          Saturation Models
        </button>
      </div>
      
      {/* Visualization Container */}
      <div>
        {activeTab === 'geometric' && <AdstockModelVisualization />}
        {activeTab === 'weibull' && <WeibullAdstockVisualization />}
        {activeTab === 'saturation' && <SaturationVisualization />}
        {activeTab === 'hill' && <SaturationHillVisualization />}
        {activeTab === 'comparison' && <SaturationModelsVisualization />}
      </div>
    </div>
  );
}

export default App;