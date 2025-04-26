import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SaturationHillVisualization = () => {
  const [hillCoefficient, setHillCoefficient] = useState(2);
  const [halfMaxConcentration, setHalfMaxConcentration] = useState(500);
  
  // Generate data based on Hill parameters
  const generateData = () => {
    const data = [];
    const maxSpend = 1000;
    const maxResponse = 1000;
    
    for (let spend = 0; spend <= maxSpend; spend += 10) {
      // Calculate Hill equation response: R = Rmax * x^n / (k^n + x^n)
      // where n is Hill coefficient, k is half-max concentration
      const hillResponse = maxResponse * Math.pow(spend, hillCoefficient) / 
                           (Math.pow(halfMaxConcentration, hillCoefficient) + Math.pow(spend, hillCoefficient));
      
      // Calculate linear response (just for reference)
      const linearResponse = (spend / maxSpend) * maxResponse;
      
      // Calculate marginal response (derivative of Hill function)
      let marginalResponse = 0;
      if (spend > 0) {
        const prevSpend = Math.max(0, spend - 10);
        const prevResponse = maxResponse * Math.pow(prevSpend, hillCoefficient) / 
                             (Math.pow(halfMaxConcentration, hillCoefficient) + Math.pow(prevSpend, hillCoefficient));
        marginalResponse = (hillResponse - prevResponse) / 10 * 100; // Scale for visibility
      }
      
      data.push({
        spend,
        response: hillResponse,
        linear: linearResponse,
        marginal: marginalResponse
      });
    }
    
    return data;
  };
  
  const data = generateData();
  
  // Find inflection point (where curvature changes)
  const findInflectionPoint = () => {
    // For Hill equation, inflection point occurs at:
    // x = k * (n-1)^(1/n) / (n+1)^(1/n) where k is half-max and n is Hill coefficient
    if (hillCoefficient <= 1) return "Not present"; // No inflection for n <= 1
    
    const inflectionPoint = halfMaxConcentration * 
                            Math.pow((hillCoefficient - 1) / (hillCoefficient + 1), 1 / hillCoefficient);
    
    return Math.round(inflectionPoint);
  };
  
  // Custom tooltip formatter
  const tooltipFormatter = (value: any, name: string) => {
    // Make sure value is a number before using toFixed
    const formattedValue = typeof value === 'number' ? value.toFixed(0) : value;
    
    let displayName = name;
    if (name === 'response') displayName = 'Response (Hill Function)';
    else if (name === 'linear') displayName = 'Linear Response';
    else if (name === 'marginal') displayName = 'Marginal Response';
    
    return [formattedValue, displayName];
  };
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Hill Equation Saturation Model</h2>
      <p className="mb-4">The Hill equation is a common model in pharmacology and marketing to represent response saturation. It shows how response changes with input concentration, featuring a sigmoidal curve when the Hill coefficient is greater than 1.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hill Coefficient (n): {hillCoefficient}
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.1" 
            value={hillCoefficient} 
            onChange={(e) => setHillCoefficient(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            Controls the steepness of the curve. Higher values create more S-shaped curves.
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Half-Max Concentration (k): {halfMaxConcentration}
          </label>
          <input 
            type="range" 
            min="100" 
            max="900" 
            step="50" 
            value={halfMaxConcentration} 
            onChange={(e) => setHalfMaxConcentration(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">
            The spend level at which response reaches 50% of maximum.
          </p>
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
            <YAxis 
              yAxisId="left"
              label={{ value: 'Response', angle: -90, position: 'insideLeft' }} 
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              label={{ value: 'Marginal Response', angle: 90, position: 'insideRight' }} 
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="response" stroke="#8884d8" name="Response (Hill Function)" strokeWidth={2} />
            <Line yAxisId="left" type="monotone" dataKey="linear" stroke="#82ca9d" name="Linear Response" strokeDasharray="5 5" />
            <Line yAxisId="right" type="monotone" dataKey="marginal" stroke="#ff7300" name="Marginal Response" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Key Parameters:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Hill Coefficient (n):</strong> {hillCoefficient} - Controls curve steepness</li>
            <li><strong>Half-Max (k):</strong> ${halfMaxConcentration} - Spend at 50% response</li>
            <li><strong>Inflection Point:</strong> ${findInflectionPoint()} - Where curve changes from accelerating to decelerating</li>
            <li><strong>Maximum Response:</strong> 1,000 (fixed in this demo)</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Hill Equation:</h3>
          <p className="mb-2">The Hill equation is defined as:</p>
          <p className="font-mono bg-white p-2 rounded mb-2">R = Rmax × x^n / (k^n + x^n)</p>
          <p>Where R = response, x = spend/input, n = Hill coefficient, k = half-max concentration</p>
          <p className="mt-2 text-sm">Originally from biochemistry, this model works well for marketing because it captures both threshold effects and saturation in a single equation.</p>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Marketing Applications:</h3>
        <p>The Hill equation is valuable for marketing because:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>It can model both threshold effects (minimum spend to see results) and saturation</li>
          <li>The clear inflection point helps identify optimal spending levels</li>
          <li>The marginal response curve shows where additional spend becomes inefficient</li>
          <li>Different Hill coefficients can represent different marketing channels' efficiency curves</li>
        </ul>
      </div>
    </div>
  );
};

export default SaturationHillVisualization;