import { Scene } from '../types';

export const slideInPreset: Scene[] = [
  // TODO: Implement slide in preset scenes
  {
    id: 'slideIn',
    startProgress: 0,
    endProgress: 1,
    transforms: [
      { property: 'translateX', from: -100, to: 0 }
    ],
    effects: []
  }
]; 