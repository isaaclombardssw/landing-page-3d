"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from 'lenis';
import { Scene, AnimationConfig, PanelConfig } from './types';
import { useSceneManager } from './hooks/useSceneManager';
import { useTransformations } from './hooks/useTransformations';
import { useEffects } from './hooks/useEffects';

interface PanelAnimationProps {
  scenes: Scene[];
  config: AnimationConfig;
  panelConfig?: PanelConfig;
  children: React.ReactNode;
  scrollConfig?: {
    maxSpeed?: number;
    smoothness?: number;
    wheelMultiplier?: number;
  };
}

export const PanelAnimation: React.FC<PanelAnimationProps> = ({
  scenes,
  config,
  panelConfig,
  children,
  scrollConfig = {},
}) => {
  
  // Use our custom hooks with multi-scene support
  const { containerRef, progress, getCurrentSceneData } = useSceneManager(scenes, config);
  const transforms = useTransformations(scenes, progress, getCurrentSceneData);
  const effects = useEffects(scenes, progress, getCurrentSceneData);

  // Initialize Lenis smooth scrolling with speed limiting
  useEffect(() => {
    if (config.mode !== 'scroll') return;
    
    const {
      maxSpeed = 1.5,
      smoothness = 2.0,
      wheelMultiplier = 0.8
    } = scrollConfig;
    
    const lenis = new Lenis({
      duration: smoothness, // Higher = smoother/slower
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: wheelMultiplier, // Lower = slower scroll response
      touchMultiplier: wheelMultiplier * 0.6, // Even slower on touch
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Add scroll speed limiting
    let lastScrollTime = 0;
    let scrollVelocity = 0;
    
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      const now = Date.now();
      const deltaTime = now - lastScrollTime;
      
      if (deltaTime > 0) {
        scrollVelocity = Math.abs(velocity);
        
        // If scrolling too fast, temporarily increase smoothness
        if (scrollVelocity > maxSpeed) {
          lenis.options.duration = smoothness * 1.5;
        } else {
          lenis.options.duration = smoothness;
        }
      }
      
      lastScrollTime = now;
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [config.mode, scrollConfig]);


  return (
    <div
      className="h-[100rem] md:h-[140rem] flex items-center justify-center relative p-2 md:p-25"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Animated Container - applies transforms to children */}
        <motion.div
          style={{
            rotateX: transforms.rotateX,
            rotateY: transforms.rotateY,
            rotateZ: transforms.rotateZ,
            scale: transforms.scale,
            translateX: transforms.translateX,
            translateY: transforms.translateY,
            translateZ: transforms.translateZ,
            opacity: effects.opacity.opacity,
          }}
          className={`relative ${panelConfig?.className || ''}`}
        >
          {/* Shine Effect Layer */}
          <motion.div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              backgroundSize: "300% 100%",
              backgroundPosition: effects.shine.backgroundPosition,
              opacity: effects.shine.opacity
            }}
          />
          
          {/* Children with relative positioning for shine effect */}
          <div className="relative z-0">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 