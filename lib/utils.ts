import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

export function simulateClassification(modelName: string, modelAccuracy: number): {
  label: 'BANJIR' | 'KEBAKARAN';
  confidence: number;
  floodProbability: number;
  fireProbability: number;
  inferenceTime: number;
} {
  // Simulate based on model accuracy — higher accuracy = more confident results
  const baseConfidence = (modelAccuracy / 100) * 0.85 + Math.random() * 0.15;
  const confidence = Math.min(0.99, Math.max(0.65, baseConfidence));
  
  const isBanjir = Math.random() > 0.5;
  const floodProbability = isBanjir ? confidence : 1 - confidence;
  const fireProbability = 1 - floodProbability;
  
  return {
    label: isBanjir ? 'BANJIR' : 'KEBAKARAN',
    confidence: Math.round(confidence * 100),
    floodProbability: Math.round(floodProbability * 100),
    fireProbability: Math.round(fireProbability * 100),
    inferenceTime: Math.round((0.4 + Math.random() * 0.8) * 100) / 100,
  };
}
