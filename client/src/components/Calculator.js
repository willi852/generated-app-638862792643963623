import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = (value) => {
    if (error) setError('');
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleCalculate = async () => {
    try {
      if (!input.trim()) {
        setError('Please enter an expression');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/calculate', {
        expression: input
      });

      setResult(response.data.result.toString());
    } catch (err) {
      setError(err.response?.data?.error || 'Calculation error');
    }
  };

  const scientificFunctions = [
    'sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'π', 'e', '^', '!'
  ];

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="calculator-buttons">
        <div className="scientific-buttons">
          {scientificFunctions.map(func => (
            <button key={func} onClick={() => handleButtonClick(func)}>
              {func.replace('(', '()')}
            </button>
          ))}
        </div>

        <div className="standard-buttons">
          <button className="clear" onClick={handleClear}>AC</button>
          <button className="backspace" onClick={handleBackspace}>⌫</button>
          <button onClick={() => handleButtonClick('(')}>(</button>
          <button onClick={() => handleButtonClick(')')}>)</button>

          {[7, 8, 9, 4, 5, 6, 1, 2, 3, '.'].map(num => (
            <button key={num} onClick={() => handleButtonClick(num.toString())}>
              {num}
            </button>
          ))}

          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
          <button onClick={() => handleButtonClick('*')}>×</button>
          <button onClick={() => handleButtonClick('/')}>÷</button>
          <button className="equals" onClick={handleCalculate}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;