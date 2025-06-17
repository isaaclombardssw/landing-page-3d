import { useTransform, MotionValue } from 'framer-motion';
import { Scene } from '../types';

export const useTransformations = (
  scenes: Scene[], 
  progress: MotionValue<number>,
  getCurrentSceneData: (progress: number) => { scene: Scene | null; localProgress: number }
) => {
  // Create transforms that dynamically switch based on active scene
  const rotateX = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const rule = scene.transforms.find(t => t.property === 'rotateX');
    if (!rule) return 0;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const rotateY = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const rule = scene.transforms.find(t => t.property === 'rotateY');
    if (!rule) return 0;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const rotateZ = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const rule = scene.transforms.find(t => t.property === 'rotateZ');
    if (!rule) return 0;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const scale = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 1;
    
    const rule = scene.transforms.find(t => t.property === 'scale');
    if (!rule) return 1;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const scaleX = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 1;
    
    const rule = scene.transforms.find(t => t.property === 'scaleX');
    if (!rule) return 1;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const scaleY = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 1;
    
    const rule = scene.transforms.find(t => t.property === 'scaleY');
    if (!rule) return 1;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const translateX = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const rule = scene.transforms.find(t => t.property === 'translateX');
    if (!rule) return 0;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const translateY = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const rule = scene.transforms.find(t => t.property === 'translateY');
    if (!rule) return 0;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });

  const translateZ = useTransform(progress, (globalProgress) => {
    const { scene, localProgress } = getCurrentSceneData(globalProgress);
    if (!scene) return 0;
    
    const rule = scene.transforms.find(t => t.property === 'translateZ');
    if (!rule) return 0;
    
    return rule.from + (rule.to - rule.from) * localProgress;
  });
  
  return {
    rotateX,
    rotateY,
    rotateZ,
    scale,
    scaleX,
    scaleY,
    translateX,
    translateY,
    translateZ,
  };
}; 