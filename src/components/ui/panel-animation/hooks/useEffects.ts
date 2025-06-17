import { useTransform, MotionValue } from 'framer-motion';
import { Scene } from '../types';

export const useEffects = (
  scenes: Scene[], 
  progress: MotionValue<number>,
  getCurrentSceneData: (progress: number) => { scene: Scene | null; localProgress: number }
) => {
  // Create shine effect transforms that work across scenes
  const shine = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return "0% 0%";
    
    const shineEffect = scene.effects?.find(e => e.type === 'shine');
    if (!shineEffect) return "0% 0%";
    
    // Use the original shine animation keyframes
    if (localProgress <= 0.5) {
      const t = localProgress * 2; // 0-1 for first half
      return `${150 - 150 * t}% 0%`; // 150% -> 0%
    } else {
      const t = (localProgress - 0.5) * 2; // 0-1 for second half
      return `${-150 * t}% 0%`; // 0% -> -150%
    }
  });

  const shineOpacity = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const shineEffect = scene.effects?.find(e => e.type === 'shine');
    if (!shineEffect) return 0;
    
    // Fade out towards the end of the scene
    if (localProgress <= 0.8) {
      return 1;
    } else {
      const fadeProgress = (localProgress - 0.8) / 0.2; // 0-1 for fade
      return 1 - fadeProgress;
    }
  });

  // Create opacity effect transform
  const opacityValue = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 1;
    
    const opacityEffect = scene.effects?.find(e => e.type === 'opacity');
    if (!opacityEffect) return 1;
    
    // Find the appropriate keyframes to interpolate between
    const keyframes = opacityEffect.keyframes;
    
    // Find surrounding keyframes
    let prevKeyframe = keyframes[0];
    let nextKeyframe = keyframes[keyframes.length - 1];
    
    for (let i = 0; i < keyframes.length - 1; i++) {
      if (localProgress >= keyframes[i].progress && localProgress <= keyframes[i + 1].progress) {
        prevKeyframe = keyframes[i];
        nextKeyframe = keyframes[i + 1];
        break;
      }
    }
    
    // Interpolate between keyframes
    if (prevKeyframe === nextKeyframe) {
      return Number(prevKeyframe.value);
    }
    
    const progressRange = nextKeyframe.progress - prevKeyframe.progress;
    const progressInRange = localProgress - prevKeyframe.progress;
    const t = progressRange === 0 ? 0 : progressInRange / progressRange;
    
    const fromValue = Number(prevKeyframe.value);
    const toValue = Number(nextKeyframe.value);
    
    return fromValue + (toValue - fromValue) * t;
  });
  
  return {
    shine: { 
      backgroundPosition: shine, 
      opacity: shineOpacity 
    },
    blur: { filter: 'blur(0px)' },
    opacity: { opacity: opacityValue },
  };
}; 