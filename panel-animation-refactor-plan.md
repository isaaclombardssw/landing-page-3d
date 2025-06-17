# Panel Animation Component Refactor Plan

## Overview
Refactor the current `ContainerScroll` component into a more generic `PanelAnimation` component that supports configurable scenes with custom transformation rules. This will allow for flexible animations where different transformation behaviors can be defined from the parent component. The component will support both scroll-driven animations and standalone animations that play once without scroll dependency.

## Current State Analysis
- **Current Component**: `ContainerScroll` with hardcoded animation sequences
- **Fixed Transformations**: Rotate (20° to 0°), Scale (1.05 to 1 / 0.7 to 0.9), Translate (0 to -100px)
- **Fixed Timeline**: Single scroll progress from 0 to 1
- **Fixed Effects**: Shine effect with hardcoded keyframes

## Proposed Architecture

### 1. Core Component Structure
```
PanelAnimation
├── SceneManager (handles scene transitions)
├── TransformationEngine (applies transforms)
├── EffectsLayer (handles visual effects)
└── Panel (the animated container)
```

### 2. Scene System
Each scene represents a segment of the animation timeline with its own:
- **Duration**: Percentage of total animation progress (e.g., 0-0.3, 0.3-0.7, 0.7-1.0) or absolute time duration for standalone animations
- **Transformations**: Custom transform rules for that scene
- **Effects**: Visual effects active during that scene
- **Easing**: Custom easing functions per scene

### 3. Transformation Rules API
```typescript
interface TransformRule {
  property: 'rotateX' | 'rotateY' | 'rotateZ' | 'scale' | 'scaleX' | 'scaleY' | 'translateX' | 'translateY' | 'translateZ';
  from: number;
  to: number;
  easing?: EasingFunction;
}

interface Scene {
  id: string;
  startProgress: number; // 0-1 for scroll-driven, or start time in ms for standalone
  endProgress: number;   // 0-1 for scroll-driven, or end time in ms for standalone
  transforms: TransformRule[];
  effects?: EffectRule[];
}

interface AnimationConfig {
  mode: 'scroll' | 'standalone';
  duration?: number; // Total duration in ms for standalone animations
  autoPlay?: boolean; // Auto-start standalone animations
  trigger?: 'mount' | 'visible' | 'manual'; // When to start standalone animations
}
```

### 4. Effects System
```typescript
interface EffectRule {
  type: 'shine' | 'blur' | 'opacity';
  keyframes: { progress: number; value: any }[];
  easing?: EasingFunction;
}
```

## Implementation Plan

### Phase 1: Core Refactoring
1. **Extract Scene Manager**
   - Create `useSceneManager` hook
   - Handle scene transitions and progress calculation for both scroll and time-based animations
   - Manage active scene state
   - Support standalone animation triggers (mount, visible, manual)

2. **Create Transformation Engine**
   - `useTransformations` hook
   - Apply multiple transform rules simultaneously
   - Handle transform interpolation and easing
   - Support both scroll progress (0-1) and time-based progress

3. **Refactor Panel Component**
   - Make panel styling configurable
   - Separate visual styling from animation logic
   - Support custom panel content and layout

### Phase 2: Effects System
1. **Extract Effects Layer**
   - Create `useEffects` hook
   - Support multiple simultaneous effects
   - Make effects composable and reusable

2. **Built-in Effects Library**
   - Shine effect (current)
   - Blur effects
   - Opacity transitions

### Phase 3: Configuration & API
1. **Scene Configuration**
   - JSON/object-based scene definitions
   - Scene validation and error handling
   - Default scene presets

2. **Developer Experience**
   - TypeScript support for all configurations
   - Scene builder utilities
   - Animation preview/debug tools

## API Design

### Basic Usage

#### Scroll-Driven Animation
```typescript
const scrollScenes: Scene[] = [
  {
    id: 'intro',
    startProgress: 0,
    endProgress: 0.5,
    transforms: [
      { property: 'rotateX', from: 20, to: 0 },
      { property: 'scale', from: 1.05, to: 1 }
    ],
    effects: [
      { type: 'shine', keyframes: [...] }
    ]
  },
  {
    id: 'reveal',
    startProgress: 0.5,
    endProgress: 1,
    transforms: [
      { property: 'translateY', from: 0, to: -100 }
    ]
  }
];

<PanelAnimation 
  scenes={scrollScenes}
  config={{ mode: 'scroll' }}
  panelConfig={{
    className: "custom-panel-styles",
    dimensions: { width: "6xl", height: "38rem" }
  }}
>
  {content}
</PanelAnimation>
```

#### Standalone Animation (Play Once)
```typescript
const standaloneScenes: Scene[] = [
  {
    id: 'entrance',
    startProgress: 0,     // 0ms
    endProgress: 800,     // 800ms
    transforms: [
      { property: 'rotateX', from: 20, to: 0 },
      { property: 'scale', from: 0.8, to: 1 }
    ],
    effects: [
      { type: 'opacity', keyframes: [
        { progress: 0, value: 0 },
        { progress: 1, value: 1 }
      ]}
    ]
  }
];

<PanelAnimation 
  scenes={standaloneScenes}
  config={{ 
    mode: 'standalone',
    duration: 800,
    autoPlay: true,
    trigger: 'mount' // or 'visible' or 'manual'
  }}
  panelConfig={{
    className: "custom-panel-styles"
  }}
>
  {content}
</PanelAnimation>
```

### Advanced Usage
```typescript
// Custom transformation functions
const customTransforms = {
  wobble: (progress: number) => Math.sin(progress * Math.PI * 4) * 10,
  elastic: (progress: number) => /* custom easing */
};

// Scene presets
const PRESET_SCENES = {
  cardReveal: [...],
  slideIn: [...],
  morphing: [...]
};
```

## Migration Strategy

### Step 1: Backward Compatibility
- Keep current `ContainerScroll` as wrapper around new `PanelAnimation`
- Maintain existing API while adding new features
- Gradual migration path for existing usage

### Step 2: Feature Parity
- Ensure all current functionality works with new system
- Mobile responsiveness maintained
- Lenis integration preserved

### Step 3: Enhanced Features
- Add new scene types and effects
- Performance optimizations
- Developer tools and debugging

## File Structure
```
src/components/ui/
├── panel-animation/
│   ├── index.ts                 # Main exports
│   ├── PanelAnimation.tsx       # Main component
│   ├── hooks/
│   │   ├── useSceneManager.ts
│   │   ├── useTransformations.ts
│   │   ├── useEffects.ts
│   │   └── useStandaloneAnimation.ts
│   ├── effects/
│   │   ├── ShineEffect.tsx
│   │   ├── BlurEffect.tsx
│   │   ├── OpacityEffect.tsx
│   │   └── index.ts
│   ├── presets/
│   │   ├── cardReveal.ts
│   │   ├── slideIn.ts
│   │   └── index.ts
│   └── types.ts                 # TypeScript definitions
└── container-scroll-animation.tsx # Legacy wrapper (deprecated)
```

## Benefits of This Approach

1. **Flexibility**: Custom scenes and transformations from parent
2. **Reusability**: Same component for different animation types
3. **Performance**: Optimized transform calculations
4. **Maintainability**: Separated concerns and modular architecture
5. **Developer Experience**: Type-safe configuration and presets
6. **Extensibility**: Easy to add new effects and transformation types

## Considerations

1. **Bundle Size**: Ensure tree-shaking works for unused effects
2. **Performance**: Optimize for 60fps animations
3. **Accessibility**: Respect `prefers-reduced-motion`
4. **Browser Support**: Maintain current browser compatibility
5. **Testing**: Unit tests for scene calculations and transformations

## Next Steps

1. Review and approve this plan
2. Create detailed component interfaces
3. Start with Phase 1 implementation
4. Iterative development with feedback loops
5. Migration guide and documentation 