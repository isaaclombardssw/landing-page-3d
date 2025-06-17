"use client";
import React, { useState } from "react";
import { ContainerScrollCentered } from './container-scroll-animation-centered';

export const ScrollSpeedDemo = ({ children }: { children: React.ReactNode }) => {
  const [scrollSpeed, setScrollSpeed] = useState<"slow" | "normal" | "fast">("normal");

  return (
    <div>
      {/* Speed Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold mb-2">Scroll Speed</h3>
        <div className="flex gap-2">
          {(["slow", "normal", "fast"] as const).map((speed) => (
            <button
              key={speed}
              onClick={() => setScrollSpeed(speed)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                scrollSpeed === speed
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {speed.charAt(0).toUpperCase() + speed.slice(1)}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Current: <strong>{scrollSpeed}</strong>
        </div>
      </div>

      {/* Animation */}
      <ContainerScrollCentered
        titleComponent={
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Scroll Speed Test
            </h1>
            <p className="text-lg text-gray-300">
              Try scrolling at different speeds - the animation should stay smooth!
            </p>
          </div>
        }
        scrollSpeed={scrollSpeed}
        scrollHeight="150rem"
      >
        {children}
      </ContainerScrollCentered>
    </div>
  );
}; 