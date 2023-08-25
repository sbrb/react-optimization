import React, { useState } from 'react';

const Calculator = () => {
    const [result, setResult] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const performCalculation = () => {
        const range = parseInt(inputValue);
        if (!isNaN(range)) {
            let sum = 0;
            for (let i = 1; i <= range; i++) {
                sum += i;
            }
            setResult(sum);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div>
            <input
                type="number"
                placeholder="Enter a number"
                value={inputValue}
                onChange={handleInputChange}
            />
            <button onClick={performCalculation}>Perform Heavy Calculation</button>
            {result && <p>Result: {result}</p>}
        </div>
    );
};

export default Calculator;
