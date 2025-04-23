import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data from our calculations
const campaignData = [
  {period: 0, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 1, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 2, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 3, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 4, spend: 100, geometric: 100, weibull_fast: 100, weibull_exp: 100, weibull_delayed: 100, weibull_slow: 100},
  {period: 5, spend: 150, geometric: 220, weibull_fast: 204.03, weibull_exp: 221.65, weibull_delayed: 239.48, weibull_slow: 249.20},
  {period: 6, spend: 200, geometric: 354, weibull_fast: 317.84, weibull_exp: 358.82, weibull_delayed: 398.34, weibull_slow: 442.61},
  {period: 7, spend: 250, geometric: 497.8, weibull_fast: 439.74, weibull_exp: 507.11, weibull_delayed: 561.93, weibull_slow: 669.68},
  {period: 8, spend: 200, geometric: 548.46, weibull_fast: 468.10, weibull_exp: 563.36, weibull_delayed: 624.03, weibull_slow: 816.40},
  {period: 9, spend: 150, geometric: 533.92, weibull_fast: 447.55, weibull_exp: 553.66, weibull_delayed: 594.41, weibull_slow: 870.74},
  {period: 10, spend: 100, geometric: 473.75, weibull_fast: 394.28, weibull_exp: 496.72, weibull_delayed: 499.39, weibull_slow: 830.64},
  {period: 11, spend: 50, geometric: 381.62, weibull_fast: 317.78, weibull_exp: 405.91, weibull_delayed: 367.10, weibull_slow: 707.53},
  {period: 12, spend: 0, geometric: 267.14, weibull_fast: 224.20, weibull_exp: 290.85, weibull_delayed: 217.78, weibull_slow: 522.93},
  {period: 13, spend: 0, geometric: 186.99, weibull_fast: 167.77, weibull_exp: 208.40, weibull_delayed: 112.21, weibull_slow: 351.01},
  {period: 14, spend: 0, geometric: 130.90, weibull_fast: 128.52, weibull_exp: 149.33, weibull_delayed: 49.55, weibull_slow: 210.81},
  {period: 15, spend: 0, geometric: 91.63, weibull_fast: 100.04, weibull_exp: 107.00, weibull_delayed: 18.51, weibull_slow: 111.06},
  {period: 16, spend: 0, geometric: 64.14, weibull_fast: 78.82, weibull_exp: 76.67, weibull_delayed: 5.79, weibull_slow: 49.94},
  {period: 17, spend: 0, geometric: 44.90, weibull_fast: 62.70, weibull_exp: 54.93, weibull_delayed: 1.50, weibull_slow: 18.48},
  {period: 18, spend: 0, geometric: 31.43, weibull_fast: 50.29, weibull_exp: 39.36, weibull_delayed: 0.32, weibull_slow: 5.39},
  {period: 19, spend: 0, geometric: 22.00, weibull_fast: 40.62, weibull_exp: 28.20, weibull_delayed: 0.06, weibull_slow: 1.18}
];

// Single impulse response data
const impulseData = [
  {period: 0, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 1, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 2, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 3, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 4, spend: 0, geometric: 0, weibull_fast: 0, weibull_exp: 0, weibull_delayed: 0, weibull_slow: 0},
  {period: 5, spend: 100, geometric: 100, weibull_fast: 100, weibull_exp: 100, weibull_delayed: 100, weibull_slow: 100},
  {period: 6, spend: 0, geometric: 70, weibull_fast: 54.03, weibull_exp: 71.65, weibull_delayed: 89.48, weibull_slow: 99.20},
  {period: 7, spend: 0, geometric: 49, weibull_fast: 36.79, weibull_exp: 51.34, weibull_delayed: 64.12, weibull_slow: 93.80},
  {period: 8, spend: 0, geometric: 34.3, weibull_fast: 26.50, weibull_exp: 36.79, weibull_delayed: 36.79, weibull_slow: 80.57},
  {period: 9, spend: 0, geometric: 24.01, weibull_fast: 19.70, weibull_exp: 26.36, weibull_delayed: 16.90, weibull_slow: 59.93},
  {period: 10, spend: 0, geometric: 16.81, weibull_fast: 14.97, weibull_exp: 18.89, weibull_delayed: 6.22, weibull_slow: 36.79},
  {period: 11, spend: 0, geometric: 11.76, weibull_fast: 11.56, weibull_exp: 13.53, weibull_delayed: 1.83, weibull_slow: 17.76},
  {period: 12, spend: 0, geometric: 8.24, weibull_fast: 9.04, weibull_exp: 9.70, weibull_delayed: 0.43, weibull_slow: 6.43},
  {period: 13, spend: 0, geometric: 5.76, weibull_fast: 7.14, weibull_exp: 6.95, weibull_delayed: 0.08, weibull_slow: 1.66},
  {period: 14, spend: 0, geometric: 4.04, weibull_fast: 5.69, weibull_exp: 4.98, weibull_delayed: 0.01, weibull_slow: 0.29},
  {period: 15, spend: 0, geometric: 2.82, weibull_fast: 4.57, weibull_exp: 3.57, weibull_delayed: 0, weibull_slow: 0.03}
];

const WeibullAdstockVisualization = () => {
  const [viewMode, setViewMode] = useState('campaign');
  
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Weibull Adstock Model Comparison</h2>
      
      <div className="mb-4">
        <div className="flex justify-center space-x-4">
          <button 
            className={`px-4 py-2 rounded ${viewMode === 'campaign' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('campaign')}
          >
            Campaign Response
          </button>
          <button 
            className={`px-4 py-2 rounded ${viewMode === 'impulse' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('impulse')}
          >
            Impulse Response
          </button>
        </div>
      </div>
      
      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={viewMode === 'campaign' ? campaignData : impulseData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="spend" stroke="#8884d8" name="Ad Spend" />
            <Line type="monotone" dataKey="geometric" stroke="#82ca9d" name="Geometric (θ=0.7)" />
            <Line type="monotone" dataKey="weibull_fast" stroke="#ff7300" name="Weibull Fast Decay" />
            <Line type="monotone" dataKey="weibull_exp" stroke="#0088fe" name="Weibull Exponential" />
            <Line type="monotone" dataKey="weibull_delayed" stroke="#ff3366" name="Weibull Delayed Peak" />
            <Line type="monotone" dataKey="weibull_slow" stroke="#00c49f" name="Weibull Slow Build" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Weibull Adstock Characteristics:</h3>
          <p className="mb-2">Shape parameter (k) controls the pattern of decay:</p>
          <ul className="list-disc pl-5 mb-2">
            <li>k &lt; 1: Immediate peak with heavy tail (orange)</li>
            <li>k = 1: Exponential decay, similar to geometric (blue)</li>
            <li>k &gt; 1: Delayed peak followed by decay (red)</li>
            <li>k &gt; 1 with large λ: Slow build-up and decay (green)</li>
          </ul>
          <p className="mb-2">Scale parameter (λ) influences the rate of decay:</p>
          <ul className="list-disc pl-5">
            <li>Larger λ: Slower decay and longer-lasting effects</li>
            <li>Smaller λ: Faster decay and shorter-lasting effects</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Mathematical Formula:</h3>
          <p className="mb-2">The Weibull adstock weights are calculated as:</p>
          <p className="font-mono bg-white p-2 rounded mb-2">weight(lag) = exp(-(lag/λ)^k)</p>
          <p className="mb-2">Key advantages over geometric adstock:</p>
          <ul className="list-disc pl-5">
            <li>Can model delayed effects (when k &gt; 1)</li>
            <li>More flexible decay patterns</li>
            <li>Better fits for complex advertising dynamics</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Applications in Marketing Models:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded">
            <div className="font-bold text-center">Television</div>
            <p>Often modeled with k &gt; 1 to capture delayed brand-building effects</p>
          </div>
          <div className="p-3 bg-white rounded">
            <div className="font-bold text-center">Search Advertising</div>
            <p>Typically uses k &lt; 1 for immediate effect with some carryover</p>
          </div>
          <div className="p-3 bg-white rounded">
            <div className="font-bold text-center">Social Media</div>
            <p>May use k ≈ 1 with varied λ values depending on platform</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeibullAdstockVisualization;
