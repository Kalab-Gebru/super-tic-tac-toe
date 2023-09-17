import React from "react";

export default function Cell({ data, blno, func, currentBlock }) {
  function clicked() {
    func().markCall(data.no);
  }
  return (
    <button
      onClick={clicked}
      disabled={
        data.value != undefined ||
        (currentBlock != "any" && currentBlock != blno)
      }
      className={`relative flex items-center justify-center h-full w-full`}
    >
      {data.value ? (
        <div
          className={`text-7xl ${
            currentBlock != "any" && currentBlock != blno && "opacity-30"
          } font-mark ${data.value == "X" ? "text-blue-700" : "text-red-700"} `}
        >
          {data.value}
        </div>
      ) : (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="text-3xl text-black/25 font-mark">
            {currentBlock == blno && data.no}
          </div>
        </div>
      )}
    </button>
  );
}
