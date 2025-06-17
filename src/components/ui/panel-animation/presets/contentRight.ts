import { Scene } from '../types';

export const contentRightPreset: Scene[] = [
  {
    id: 'contentRight',
    startProgress: 0,
    endProgress: 0.2,
    transforms: [
      { property: 'translateY', from: -500, to: 0 } // Move further up to center
    ],
    effects: [
      {
        type: 'opacity',
        keyframes: [
          { progress: 0, value: 0 },
          { progress: 1, value: 0 }
        ]
      }
    ]
  },
  {
    id: 'cardHalfOffscreen',
    startProgress: 0.2,
    endProgress: 0.7,
    transforms: [
      { property: 'translateY', from: 0, to: 500 },
      { property: 'translateX', from: 0, to: -300 }
    ],
    effects: [
      {
        type: 'opacity',
        keyframes: [
          { progress: 0, value: 0 },
          { progress: 0.8, value: 0.3 },
          { progress: 1, value: 1 }
        ]
      }
    ]
  },
  {
    id: 'cardFollow',
    startProgress: 0.7,
    endProgress: 0.9,
    transforms: [
      { property: 'translateY', from: 500, to: 700 },
      { property: 'translateX', from: -300, to: -300 }
    ],
  },
  {
    id: 'cardFollow',
    startProgress: 0.9,
    endProgress: 1,
    transforms: [
      { property: 'translateY', from: 700, to: 900 },
      { property: 'translateX', from: -300, to: -300 }
    ],
    effects: [
      {
        type: 'opacity',
        keyframes: [
          { progress: 1, value: 0 },
          { progress: 0, value: 1 }
        ]
      }
    ]
  }
]; 