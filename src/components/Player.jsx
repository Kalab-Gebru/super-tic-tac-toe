import React from "react";

export default function player({ player, active }) {
  return (
    <div className="">
      <div
        className={`text-6xl font-bold font-mark ${
          active ? "text-green-700" : "text-gray-200"
        }`}
      >
        Player
      </div>
      <div
        className={`text-[250px] font-bold text-center font-mark ${
          active
            ? `${player == 1 ? "text-blue-700" : "text-red-700"}`
            : "text-gray-200"
        }`}
      >
        {player}
      </div>
    </div>
  );
}
