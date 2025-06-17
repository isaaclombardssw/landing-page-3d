import { Scene } from '../types';

export const cardRevealCenteredPreset: Scene[] = [
  {
    id: 'cardRevealCentered',
    startProgress: 0,
    endProgress: 0.2,
    transforms: [
      { property: 'rotateX', from: 10, to: 0 },
      { property: 'scale', from: 1.05, to: 1 },
      { property: 'translateY', from: -500, to: -100 } // Move further up to center
    ],
    effects: [
      { 
        type: 'shine', 
        keyframes: [
          { progress: 0, value: "150% 0%" },
          { progress: 0.3, value: "0% 0%" },
          { progress: 0.6, value: "-150% 0%" }
        ]
      }
    ]
  },
  {
    id: 'cardHalfOffscreen',
    startProgress: 0.2,
    endProgress: 0.7,
    transforms: [
      { property: 'translateY', from: -100, to: 550 },
      { property: 'translateX', from: 0, to: 600 }
    ]
  },
  {
    id: 'cardFollow',
    startProgress: 0.7,
    endProgress: 1,
    transforms: [
      { property: 'translateY', from: 550, to: 720 },
      { property: 'translateX', from: 600, to: 600 }
    ]
  }
]; 