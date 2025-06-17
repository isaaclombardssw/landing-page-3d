// TypeScript definitions for PanelAnimation system

export type EasingFunction = (t: number) => number;

export interface TransformRule {
  property: 'rotateX' | 'rotateY' | 'rotateZ' | 'scale' | 'scaleX' | 'scaleY' | 'translateX' | 'translateY' | 'translateZ';
  from: number;
  to: number;
  easing?: EasingFunction;
}

export interface EffectRule {
  type: 'shine' | 'blur' | 'opacity';
  keyframes: { progress: number; value: string | number }[];
  easing?: EasingFunction;
}

export interface Scene {
  id: string;
  startProgress: number; // 0-1 for scroll-driven, or start time in ms for standalone
  endProgress: number;   // 0-1 for scroll-driven, or end time in ms for standalone
  transforms: TransformRule[];
  effects?: EffectRule[];
}

export interface AnimationConfig {
  mode: 'scroll' | 'standalone';
  duration?: number; // Total duration in ms for standalone animations
  autoPlay?: boolean; // Auto-start standalone animations
  trigger?: 'mount' | 'visible' | 'manual'; // When to start standalone animations
}

export interface PanelConfig {
  className?: string;
  dimensions?: {
    width?: string;
    height?: string;
  };
} 