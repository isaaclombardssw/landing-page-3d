"use client";
import React from "react";
import { motion } from "framer-motion";
import { PanelAnimation } from './panel-animation';
import { Panel } from './panel-animation/Panel';
import { cardRevealCenteredPreset } from './panel-animation/presets';
import { Scene } from './panel-animation/types';

export const ContainerScrollCentered = ({
  titleComponent,
  children,
  scrollHeight = "120rem", // Taller container for more scroll
  scrollSpeed = "normal", // "slow", "normal", "fast"
  panel = null, // Panel styling variant
  preset = cardRevealCenteredPreset,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  scrollHeight?: string;
  scrollSpeed?: "slow" | "normal" | "fast";
  panel?: "default" | "minimal" | "glass" | null;
  preset?: Scene[];
}) => {
  // Configure scroll speed based on prop
  const getScrollConfig = () => {
    switch (scrollSpeed) {
      case "slow":
        return {
          maxSpeed: 1.0,
          smoothness: 2.5,
          wheelMultiplier: 0.6
        };
      case "fast":
        return {
          maxSpeed: 2.5,
          smoothness: 1.2,
          wheelMultiplier: 1.2
        };
      default: // "normal"
        return {
          maxSpeed: 1.5,
          smoothness: 2.0,
          wheelMultiplier: 0.8
        };
    }
  };

  return (
    <div style={{ height: scrollHeight }} className="relative">
      {/* Title Component */}
      <motion.div
        className="max-w-5xl mx-auto text-center relative z-10 pt-20"
      >
        {titleComponent}
      </motion.div>
      
      {/* Panel Animation */}
      <PanelAnimation
        scenes={preset}
        config={{ mode: 'scroll' }}
        panelConfig={{
          className: "sticky top-1/2 transform -translate-y-[25%]" // Center the panel
        }}
        scrollConfig={getScrollConfig()}
      >
        {panel ? <Panel variant={panel}>
          {children}
        </Panel> : children}
      </PanelAnimation>
    </div>
  );
}; 