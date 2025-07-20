"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleClear = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const handleNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplayValue(num);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? num : displayValue + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);

      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (previousValue !== null && operator) {
      const newValue = calculate(previousValue, inputValue, operator);
      setDisplayValue(String(newValue));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue("0.");
      setWaitingForOperand(false);
    } else if (displayValue.indexOf(".") === -1) {
      setDisplayValue(displayValue + ".");
    }
  };

  const handleToggleSign = () => {
    if (displayValue !== "0") {
      setDisplayValue(
        displayValue.charAt(0) === "-"
          ? displayValue.slice(1)
          : "-" + displayValue
      );
    }
  };

  const handlePercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const calculate = (firstValue: number, secondValue: number, operator: string): number => {
    switch (operator) {
      case "+":
        return firstValue + secondValue;
      case "−":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        if (secondValue === 0) {
          return 0; // Handle division by zero gracefully
        }
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const formatDisplay = (value: string) => {
    if (value.length > 9) {
      return parseFloat(value).toExponential(3);
    }
    return value;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-sm bg-black rounded-3xl p-6 shadow-2xl">
        {/* Display */}
        <div className="bg-black text-right text-6xl font-light text-white p-6 mb-4 min-h-[120px] flex items-end justify-end">
          <span className="truncate">{formatDisplay(displayValue)}</span>
        </div>
        
        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleClear}
            className="h-20 text-xl font-medium bg-gray-500 hover:bg-gray-400 text-black rounded-full"
          >
            AC
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleToggleSign}
            className="h-20 text-xl font-medium bg-gray-500 hover:bg-gray-400 text-black rounded-full"
          >
            +/−
          </Button>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handlePercent}
            className="h-20 text-xl font-medium bg-gray-500 hover:bg-gray-400 text-black rounded-full"
          >
            %
          </Button>
          <Button 
            variant="destructive" 
            size="lg"
            onClick={() => handleOperator("÷")}
            className="h-20 text-2xl font-light bg-orange-500 hover:bg-orange-400 text-white rounded-full"
          >
            ÷
          </Button>
          
          {/* Row 2 */}
          <Button 
            onClick={() => handleNumber("7")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            7
          </Button>
          <Button 
            onClick={() => handleNumber("8")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            8
          </Button>
          <Button 
            onClick={() => handleNumber("9")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            9
          </Button>
          <Button 
            onClick={() => handleOperator("×")}
            className="h-20 text-2xl font-light bg-orange-500 hover:bg-orange-400 text-white rounded-full"
          >
            ×
          </Button>
          
          {/* Row 3 */}
          <Button 
            onClick={() => handleNumber("4")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            4
          </Button>
          <Button 
            onClick={() => handleNumber("5")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            5
          </Button>
          <Button 
            onClick={() => handleNumber("6")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            6
          </Button>
          <Button 
            onClick={() => handleOperator("−")}
            className="h-20 text-2xl font-light bg-orange-500 hover:bg-orange-400 text-white rounded-full"
          >
            −
          </Button>
          
          {/* Row 4 */}
          <Button 
            onClick={() => handleNumber("1")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            1
          </Button>
          <Button 
            onClick={() => handleNumber("2")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            2
          </Button>
          <Button 
            onClick={() => handleNumber("3")}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            3
          </Button>
          <Button 
            onClick={() => handleOperator("+")}
            className="h-20 text-2xl font-light bg-orange-500 hover:bg-orange-400 text-white rounded-full"
          >
            +
          </Button>
          
          {/* Row 5 */}
          <Button 
            onClick={() => handleNumber("0")}
            className="col-span-2 h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full text-left pl-8"
          >
            0
          </Button>
          <Button 
            onClick={handleDecimal}
            className="h-20 text-2xl font-light bg-gray-800 hover:bg-gray-700 text-white rounded-full"
          >
            .
          </Button>
          <Button 
            onClick={handleEquals}
            className="h-20 text-2xl font-light bg-orange-500 hover:bg-orange-400 text-white rounded-full"
          >
            =
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
