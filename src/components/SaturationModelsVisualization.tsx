import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define types for data
interface DataPoint {
  x: number;
  hill1: number;
  hill2: number;
  hill3: number;
  logistic: number;
  log: number;
  michaelis: number;
}

// Define type for active models state
interface ActiveModels {
  hill1: boolean;
  hill2: boolean;
  hill3: boolean;
  logistic: boolean;
  log: boolean;
  michaelis: boolean;
}

// Generate data for saturation models
const generateData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let x = 0; x <= 100; x += 5) {
    data.push({
      x: x,
      hill1: hillSaturation(x, 100, 2, 50),     // Sigmoidal curve
      hill2: hillSaturation(x, 100, 1, 30),     // Hyperbolic curve
      hill3: hillSaturation(x, 100, 4, 70),     // Steeper sigmoidal
      logistic: logisticSaturation(x, 100, 0.1, 50),
      log: logSaturation(x, 25, 0.1),
      michaelis: michaelisMentenSaturation(x, 100, 20)
    });
  }
  return data;
};

// Hill function saturation model
function hillSaturation(x: number, a: number, b: number, c: number): number {
  return a * Math.pow(x, b) / (Math.pow(c, b) + Math.pow(x, b));
}

// Logistic function saturation model
function logisticSaturation(x: number, a: number, b: number, c: number): number {
  return a / (1 + Math.exp(-b * (x - c)));
}

// Log transformation saturation model
function logSaturation(x: number, a: number, b: number): number {
  return a * Math.log(1 + b * x);
}

// Michaelis-Menten kinetics (simplified Hill function)
function michaelisMentenSaturation(x: number, a: number, c: number): number {
  return a * x / (c + x);
}

const SaturationModelsVisualization: React.FC = () => {
  const [activeModels, setActiveModels] = useState<ActiveModels>({
    hill1: true,
    hill2: true,
    hill3: true,
    logistic: true,
    log: true,
    michaelis: true
  });

  const toggleModel = (model: keyof ActiveModels): void => {
    setActiveModels({
      ...activeModels,
      [model]: !activeModels[model]
    });
  };

  const data = generateData();

  // Custom tooltip formatter
  const tooltipFormatter = (value: any, name: string) => {
    // Make sure value is a number before using toFixed
    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
    return [formattedValue, name];
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Advertising Saturation Models Comparison</h2>
      <p className="mb-4">This visualization compares different mathematical models used to capture diminishing returns in advertising response.</p>
      
      <div className="mb-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button 
            className={`px-3 py-1 rounded text-sm ${activeModels.hill1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleModel('hill1')}
          >
            Hill (Sigmoidal)
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeModels.hill2 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleModel('hill2')}
          >
            Hill (Hyperbolic)
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeModels.hill3 ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleModel('hill3')}
          >
            Hill (Steep S-curve)
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeModels.logistic ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleModel('logistic')}
          >
            Logistic
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeModels.log ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleModel('log')}
          >
            Logarithmic
          </button>
          <button 
            className={`px-3 py-1 rounded text-sm ${activeModels.michaelis ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
            onClick={() => toggleModel('michaelis')}
          >
            Michaelis-Menten
          </button>
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
              dataKey="x" 
              label={{ value: 'Advertising Spend', position: 'insideBottom', offset: -5 }} 
            />
            <YAxis 
              label={{ value: 'Response', angle: -90, position: 'insideLeft' }} 
            />
            <Tooltip formatter={tooltipFormatter} />
            <Legend />
            {activeModels.hill1 && <Line type="monotone" dataKey="hill1" stroke="#3b82f6" name="Hill (Sigmoidal)" />}
            {activeModels.hill2 && <Line type="monotone" dataKey="hill2" stroke="#22c55e" name="Hill (Hyperbolic)" />}
            {activeModels.hill3 && <Line type="monotone" dataKey="hill3" stroke="#a855f7" name="Hill (Steep S-curve)" />}
            {activeModels.logistic && <Line type="monotone" dataKey="logistic" stroke="#ef4444" name="Logistic" />}
            {activeModels.log && <Line type="monotone" dataKey="log" stroke="#eab308" name="Logarithmic" />}
            {activeModels.michaelis && <Line type="monotone" dataKey="michaelis" stroke="#f97316" name="Michaelis-Menten" />}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Key Characteristics:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-semibold text-blue-500">Hill (Sigmoidal):</span> S-shaped curve with slow initial growth, then faster growth, then saturation</li>
            <li><span className="font-semibold text-green-500">Hill (Hyperbolic):</span> Rapid initial growth that gradually levels off</li>
            <li><span className="font-semibold text-purple-500">Hill (Steep S-curve):</span> More pronounced S-shape with delayed but steep response</li>
            <li><span className="font-semibold text-red-500">Logistic:</span> Symmetrical S-curve with well-defined inflection point</li>
            <li><span className="font-semibold text-yellow-500">Logarithmic:</span> Immediate diminishing returns from first dollar spent</li>
            <li><span className="font-semibold text-orange-500">Michaelis-Menten:</span> Special case of Hill function with hyperbolic response</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Mathematical Formulas:</h3>
          <div className="space-y-2">
            <p><span className="font-semibold text-blue-500">Hill Function:</span> <span className="font-mono">response = a * (x^b) / (c^b + x^b)</span></p>
            <p><span className="font-semibold text-red-500">Logistic Function:</span> <span className="font-mono">response = a / (1 + e^(-b * (x - c)))</span></p>
            <p><span className="font-semibold text-yellow-500">Log Transformation:</span> <span className="font-mono">response = a * log(1 + b * x)</span></p>
            <p><span className="font-semibold text-orange-500">Michaelis-Menten:</span> <span className="font-mono">response = a * x / (c + x)</span></p>
          </div>
          <p className="mt-2 text-sm">Where: <span className="font-mono">a</span> = maximum response, <span className="font-mono">b</span> = shape parameter, <span className="font-mono">c</span> = half-saturation constant</p>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Applications in Marketing Models:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold mb-1">Industry Implementation:</p>
            <ul className="list-disc pl-5">
              <li>Facebook's Robyn uses Hill function</li>
              <li>Google's Lightweight MMM uses Hill function</li>
              <li>Nielsen uses variations of logistic models</li>
              <li>Traditional models often use log transformation</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-1">Channel-Specific Patterns:</p>
            <ul className="list-disc pl-5">
              <li>TV: Often S-shaped (Hill with b{'>'}1)</li>
              <li>Paid Search: Often hyperbolic (Hill with b=1)</li>
              <li>Display: Varies by context and targeting</li>
              <li>Email: Typically rapid diminishing returns (Log)</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold mb-2">Comparison at Specific Ad Spend Levels:</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Ad Spend</th>
                <th className="border border-gray-300 p-2 text-blue-500">Hill (Sigmoidal)</th>
                <th className="border border-gray-300 p-2 text-green-500">Hill (Hyperbolic)</th>
                <th className="border border-gray-300 p-2 text-purple-500">Hill (Steep)</th>
                <th className="border border-gray-300 p-2 text-red-500">Logistic</th>
                <th className="border border-gray-300 p-2 text-yellow-500">Logarithmic</th>
                <th className="border border-gray-300 p-2 text-orange-500">Michaelis-Menten</th>
              </tr>
            </thead>
            <tbody>
              {[10, 30, 50, 70, 90].map(level => (
                <tr key={level}>
                  <td className="border border-gray-300 p-2 font-bold">{level}</td>
                  <td className="border border-gray-300 p-2">{hillSaturation(level, 100, 2, 50).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{hillSaturation(level, 100, 1, 30).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{hillSaturation(level, 100, 4, 70).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{logisticSaturation(level, 100, 0.1, 50).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{logSaturation(level, 25, 0.1).toFixed(2)}</td>
                  <td className="border border-gray-300 p-2">{michaelisMentenSaturation(level, 100, 20).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SaturationModelsVisualization;
