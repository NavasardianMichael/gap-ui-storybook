import { useState } from 'react';
import './App.css';

const App = () => {
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold">GAP UI Storybook</h1>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="10"
          max="30"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="w-full max-w-3xl"
        />
      </div>
      <div className="p-4 border rounded" style={{ fontSize: `${fontSize}px` }}>
        This is a sample text to demonstrate dynamic font sizing using Tailwind
        CSS and React.
      </div>
    </div>
  );
};

export default App;
