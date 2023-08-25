import React, { useState } from 'react';
import useWebWorker from './useWebWorker';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const { result: calculationResult, executeCalculation } = useWebWorker('calculatorWorker.js');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCalculate = () => {
    executeCalculation(Number(inputValue));
  };

  const handleColorChange = () => {
    const colors = ['#ff5733', '#33ff57', '#5733ff', '#33ffff', '#ff33a3'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBackgroundColor(randomColor);
  };

  return (
    <div className="App" style={{ backgroundColor }}>
      <h1>Web Workers Calculator</h1>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
      <button onClick={handleCalculate}>Calculate Sum</button>
      <div className="result">
        Calculation Result: {calculationResult !== null ? calculationResult : 'No result yet'}
      </div>
      <button onClick={handleColorChange}>Change Background Color</button>
    </div>
  );
};

export default App;
// 6000000000









// import React, { useState } from 'react';
// import './App.css';
// import Calculator from './Calculator';

// const App = () => {
//   const [backgroundColor, setBackgroundColor] = useState('#ffffff');

//   const changeBackgroundColor = () => {
//     const colors = ['#ff5733', '#33ff57', '#5733ff', '#ffff33'];
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];
//     setBackgroundColor(randomColor);
//   };

//   const appStyle = {
//     backgroundColor: backgroundColor,
//     minHeight: '100vh',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     transition: 'background-color 0.3s ease',
//   };

//   return (
//     <div style={appStyle}>
//       <Calculator />
//       <button onClick={changeBackgroundColor}>Change Background Color</button>
//     </div>
//   );
// };

// export default App;
