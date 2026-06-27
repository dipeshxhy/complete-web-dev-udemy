import { useState } from 'react';
const App = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(0);

  const handleIncrease = (num) => {
    setCount((prev) => prev + num);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-stone-800 text-white">
      <h1 className="text-5xl text-center font-black underline text-cyan-700 underline-offset-4 decoration-pink-600">
        Counter
      </h1>
      <div className="w-98 bg-orange-500 p-8 text-3xl font-bold">count is {count}</div>
      <div>
        <button onClick={() => handleIncrease(1)} className="px-1.5 py-4 bg-gray-800 text-white">
          increase
        </button>
        <button
          onClick={() => setCount((prev) => Math.max(0, prev - 1))}
          className="px-1.5 py-4 bg-gray-800 text-white"
        >
          decrease
        </button>
        <button onClick={() => setCount(0)} className="px-1.5 py-4 bg-gray-800 text-white">
          reset
        </button>
      </div>
      <div className="">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.target.value))}
          type="text"
          className="bg-stone-100 py-2 w-80 border ring-2 focus:ring-orange-500 rounded-xl focus:outline-0 px-2 text-black"
        />
        <button
          onClick={() => {
            setCount(inputValue);
          }}
          className="px-1.5 py-3 bg-green-500 mx-3 rounded-md uppercase"
        >
          set to {inputValue}
        </button>
      </div>
    </div>
  );
};
export default App;
