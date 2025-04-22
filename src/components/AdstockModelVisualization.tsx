import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {period: 0, spend: 100, adstock_low: 100, adstock_medium: 100, adstock_high: 100},
  {period: 1, spend: 150, adstock_low: 180, adstock_medium: 210, adstock_high: 240},
  {period: 2, spend: 200, adstock_low: 254, adstock_medium: 326, adstock_high: 416},
  {period: 3, spend: 250, adstock_low: 326.2, adstock_medium: 445.6, adstock_high: 624.4},
  {period: 4, spend: 200, adstock_low: 297.86, adstock_medium: 467.36, adstock_high: 762.0},
  {period: 5, spend: 150, adstock_low: 239.36, adstock_medium: 430.42, adstock_high: 835.8},
  {period: 6, spend: 100, adstock_low: 171.81, adstock_medium: 358.25, adstock_high: 852.2},
  {period: 7, spend: 50, adstock_low: 101.54, adstock_medium: 264.95, adstock_high: 817.0},
  {period: 8, spend: 0, adstock_low: 30.46, adstock_medium: 158.97, adstock_high: 735.3},
  {period: 9, spend: 0, adstock_low: 9.14, adstock_medium: 95.38, adstock_high: 661.7},
  {period: 10, spend: 0, adstock_low: 2.74, adstock_medium: 57.23, adstock_high: 595.6},
  {period: 11, spend: 0, adstock_low: 0.82, adstock_medium: 34.34, adstock_high: 536.0},
  {period: 12, spend: 0, adstock_low: 0.25, adstock_medium: 20.60, adstock_high: 482.4},
  {period: 13, spend: 0, adstock_low: 0.07, adstock_medium: 12.36, adstock_high: 434.2},
  {period: 14, spend: 0, adstock_low: 0.02, adstock_medium: 7.42, adstock_high: 390.8},
  {period: 15, spend: 0, adstock_low: 0.01, adstock_medium: 4.45, adstock_high: 351.7},
  {period: 16, spend: 0, adstock_low: 0, adstock_medium: 2.67, adstock_high: 316.5},
  {period: 17, spend: 0, adstock_low: 0, adstock_medium: 1.60, adstock_high: 284.9},
  {period: 18, spend: 0, adstock_low: 0, adstock_medium: 0.96, adstock_high: 256.4},
  {period: 19, spend: 0, adstock_low: 0, adstock_medium: 0.58, adstock_high: 230.7},
];

const AdstockModelVisualization = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Geometric Adstock Model Demonstration</h2>
      <p className="mb-4">This visualization shows how the geometric adstock model transforms advertising spend into carryover effects with different decay parameters (θ).</p>
      
      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="period" 
              label={{ value: 'Time Period', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spend" stroke="#8884d8" name="Ad Spend" />
            <Line type="monotone" dataKey="adstock_low" stroke="#82ca9d" name="Adstock (θ=0.3)" />
            <Line type="monotone" dataKey="adstock_medium" stroke="#ffc658" name="Adstock (θ=0.6)" />
            <Line type="monotone" dataKey="adstock_high" stroke="#ff7300" name="Adstock (θ=0.9)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Key Observations:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Higher decay parameters (θ) lead to longer carryover effects</li>
            <li>With θ=0.3, advertising effects quickly disappear after spend stops</li>
            <li>With θ=0.9, effects persist for many periods even after spend stops</li>
            <li>Adstock accumulates during continuous spending periods</li>
            <li>The shape of decay differs significantly between parameters</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Mathematical Formula:</h3>
          <p className="mb-2">The geometric adstock is calculated as:</p>
          <p className="font-mono bg-white p-2 rounded mb-2">Adstock<sub>t</sub> = Ad<sub>t</sub> + θ × Adstock<sub>t-1</sub></p>
          <p className="mb-2">Which expands to:</p>
          <p className="font-mono bg-white p-2 rounded mb-2">Adstock<sub>t</sub> = Ad<sub>t</sub> + θ×Ad<sub>t-1</sub> + θ²×Ad<sub>t-2</sub> + ...</p>
          <p>Where θ is the decay parameter between 0 and 1.</p>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Periods to Decay to 10% of Original Effect:</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="font-bold">θ=0.3</div>
            <div className="text-xl">2 periods</div>
          </div>
          <div className="text-center">
            <div className="font-bold">θ=0.6</div>
            <div className="text-xl">5 periods</div>
          </div>
          <div className="text-center">
            <div className="font-bold">θ=0.9</div>
            <div className="text-xl">22 periods</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdstockModelVisualization;
