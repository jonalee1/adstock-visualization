import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SaturationVisualization = () => {
  const [saturationLevel, setSaturationLevel] = useState(0.5);
  
  // Generate data based on saturation level
  const generateData = () => {
    const data = [];
    const maxSpend = 1000;
    
    for (let spend = 0; spend <= maxSpend; spend += 25) {
      // Different saturation curves
      // Hill function: y = x^a / (k^a + x^a) where a controls steepness and k is half-max point
      const responseLinear = spend;
      const responseSaturation = maxSpend * (Math.pow(spend, saturationLevel) / (Math.pow(300, saturationLevel) + Math.pow(spend, saturationLevel)));
      const responseDiminishing = maxSpend * (1 - Math.exp(-spend / (300 * (1 + saturationLevel))));
      
      // Normalize for better visualization
      const normalizer = maxSpend / 10;
      
      data.push({
        spend,
        linear: responseLinear / normalizer,
        diminishing: responseDiminishing,
        saturation: responseSaturation,
      });
    }
    
    return data;
  };
  
  const data = generateData();
  
  // Calculate where the marginal return drops below 0.2 (arbitrary threshold for diminishing returns)
  const findDiminishingPoint = () => {
    let lastValue = 0;
    for (let i = 1; i < data.length; i++) {
      const marginalReturn = (data[i].saturation - data[i-1].saturation) / 25; // 25 is the step size
      if (marginalReturn < 0.2 && data[i].spend > 100) {
        return data[i].spend;
      }
      lastValue = data[i].saturation;
    }
    return 800; // Default if threshold not found
  };
  
  const diminishingPoint = findDiminishingPoint();
  
  // Custom tooltip formatter that handles type safety
  const tooltipFormatter = (value: any, name: string) => {
    // Make sure value is a number before using toFixed
    const formattedValue = typeof value === 'number' ? value.toFixed(0) : value;
    
    let displayName = name;
    if (name === 'linear') displayName = 'Linear (No Saturation)';
    else if (name === 'saturation') displayName = 'S-shaped Saturation';
    else if (name === 'diminishing') displayName = 'Diminishing Returns';
    
    return [formattedValue, displayName];
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Advertising Saturation Effect</h2>
      <p className="mb-4">This visualization demonstrates how advertising effectiveness diminishes as spend increases due to saturation effects.</p>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="mr-2 font-semibold">Saturation Intensity:</span>
          <input 
            type="range" 
            min="0.1" 
            max="2" 
            step="0.1" 
            value={saturationLevel} 
            onChange={(e) => setSaturationLevel(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="ml-2">{saturationLevel.toFixed(1)}</span>
        </div>
        <div className="text-sm text-gray-600">
          Higher values = stronger saturation effect (diminishing returns occur earlier)
        </div>
      </div>
      
      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="spend" 
              label={{ value: 'Ad Spend ($)', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis label={{ value: 'Response (Sales/Conversions)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line type="monotone" dataKey="linear" stroke="#8884d8" name="Linear (No Saturation)" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="saturation" stroke="#82ca9d" name="S-shaped Saturation" strokeWidth={2} />
            <Line type="monotone" dataKey="diminishing" stroke="#ffc658" name="Diminishing Returns" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Key Concepts:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Initial spending provides high marginal returns</li>
            <li>As spend increases, each additional dollar generates less incremental response</li>
            <li>Saturation point: where marginal returns significantly diminish (around ${diminishingPoint} with current settings)</li>
            <li>The S-curve accounts for both threshold effects and saturation</li>
            <li>Optimal budget allocation considers these diminishing returns</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Mathematical Models:</h3>
          <p className="mb-2">Common saturation models include:</p>
          <p className="font-mono bg-white p-2 rounded mb-2">S-shaped: R = Rmax × (x^a / (k^a + x^a))</p>
          <p className="font-mono bg-white p-2 rounded mb-2">Diminishing: R = Rmax × (1 - e^(-x/k))</p>
          <p>Where R = response, x = spend, k = half-saturation constant, a = steepness</p>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Business Implications:</h3>
        <p>Understanding saturation helps determine optimal advertising spend levels. When a campaign reaches the saturation point, marketers should consider:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Reallocating budget to different channels</li>
          <li>Refreshing creative assets to combat ad fatigue</li>
          <li>Targeting new audience segments</li>
          <li>Adjusting the message or offer to increase effectiveness</li>
        </ul>
      </div>
    </div>
  );
};

export default SaturationVisualization;