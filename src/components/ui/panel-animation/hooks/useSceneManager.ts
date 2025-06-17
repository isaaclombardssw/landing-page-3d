import { useRef, useMemo } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Scene, AnimationConfig } from '../types';

export const useSceneManager = (scenes: Scene[], config: AnimationConfig) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // For scroll mode, use framer-motion's useScroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Find the active scene based on scroll progress
  const findActiveScene = useMemo(() => (progress: number) => {
    for (const scene of scenes) {
      if (progress >= scene.startProgress && progress <= scene.endProgress) {
        return scene;
      }
    }
    // Return last scene if we're past all scenes
    return scenes[scenes.length - 1] || null;
  }, [scenes]);

  // Calculate local progress within the active scene (0-1)
  const calculateSceneProgress = useMemo(() => (globalProgress: number, scene: Scene) => {
    const sceneRange = scene.endProgress - scene.startProgress;
    if (sceneRange === 0) return 1; // Avoid division by zero
    const sceneOffset = globalProgress - scene.startProgress;
    return Math.max(0, Math.min(1, sceneOffset / sceneRange));
  }, []);

  // Get current scene and its local progress
  const currentScene = useTransform(scrollYProgress, (progress) => {
    return findActiveScene(progress);
  });

  const sceneProgress = useTransform(scrollYProgress, (progress) => {
    const scene = findActiveScene(progress);
    return scene ? calculateSceneProgress(progress, scene) : 0;
  });

  // For transforms, we need to get the actual scene object, not the MotionValue
  // So we'll compute it directly from scroll progress
  const getCurrentSceneData = (progress: number) => {
    const scene = findActiveScene(progress);
    const localProgress = scene ? calculateSceneProgress(progress, scene) : 0;
    return { scene, localProgress };
  };
  
  return {
    containerRef,
    currentScene,
    progress: scrollYProgress,
    sceneProgress,
    getCurrentSceneData,
    isAnimating: config.mode === 'scroll',
  };
}; 