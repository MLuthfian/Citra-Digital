import { ModelMetric, ConfusionMatrixData, TrainingParams, TrainingEpochData } from '@/types';

export const MODEL_METRICS: ModelMetric[] = [
  {
    name: 'CNN Kustom',
    accuracy: 92.08,
    precision: 0.9216,
    recall: 0.9208,
    f1: 0.9208,
    type: 'Training from Scratch',
    best: true,
  },
  {
    name: 'VGG16',
    accuracy: 91.67,
    precision: 0.9177,
    recall: 0.9167,
    f1: 0.9166,
    type: 'Transfer Learning',
  },
  {
    name: 'ResNet50',
    accuracy: 73.33,
    precision: 0.7335,
    recall: 0.7333,
    f1: 0.7232,
    type: 'Transfer Learning + Fine-tuning',
  },
];

export const CONFUSION_MATRICES: Record<string, ConfusionMatrixData> = {
  'CNN Kustom': { tp: 110, fn: 10, fp: 9, tn: 111 },
  VGG16: { tp: 110, fn: 10, fp: 10, tn: 110 },
  ResNet50: { tp: 88, fn: 32, fp: 32, tn: 88 },
};

export const TRAINING_PARAMS: TrainingParams = {
  epoch: 20,
  batchSize: 32,
  optimizer: 'Adam',
  learningRate: 0.001,
  lossFunction: 'Binary Crossentropy',
  inputSize: '224×224',
  split: { train: 70, val: 15, test: 15 },
};

export const MODEL_COLORS: Record<string, string> = {
  'CNN Kustom': '#4F6EF7',
  VGG16: '#7C5CFC',
  ResNet50: '#38BDF8',
};

// Simulated training history over 20 epochs
export const TRAINING_HISTORY: TrainingEpochData[] = Array.from({ length: 20 }, (_, i) => {
  const epoch = i + 1;
  const t = epoch / 20;
  return {
    epoch,
    // CNN Kustom - more volatile, converges well
    cnn_acc: Math.min(0.9208, 0.55 + 0.38 * (1 - Math.exp(-3.5 * t)) + (Math.random() - 0.5) * 0.03),
    cnn_loss: Math.max(0.18, 0.95 - 0.77 * (1 - Math.exp(-3 * t)) + (Math.random() - 0.5) * 0.05),
    // VGG16 - stable, steady convergence
    vgg16_acc: Math.min(0.9167, 0.65 + 0.27 * (1 - Math.exp(-4 * t)) + (Math.random() - 0.5) * 0.015),
    vgg16_loss: Math.max(0.20, 0.85 - 0.66 * (1 - Math.exp(-3.5 * t)) + (Math.random() - 0.5) * 0.02),
    // ResNet50 - lower accuracy / struggles to converge optimally on limited dataset
    resnet_acc: Math.min(0.7333, 0.50 + 0.24 * (1 - Math.exp(-2.5 * t)) + (Math.random() - 0.5) * 0.025),
    resnet_loss: Math.max(0.45, 0.90 - 0.43 * (1 - Math.exp(-2.5 * t)) + (Math.random() - 0.5) * 0.03),
  };
});

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Upload Citra', href: '/upload' },
  { label: 'Model Comparison', href: '/model-comparison' },
  { label: 'Hasil Analisis', href: '/hasil' },
  { label: 'Tentang', href: '/tentang' },
];

export const TECH_LOGOS = [
  { name: 'PyTorch', symbol: '🔥' },
  { name: 'TensorFlow', symbol: '⬡' },
  { name: 'Kaggle', symbol: '◈' },
  { name: 'ImageNet', symbol: '⬣' },
  { name: 'Python', symbol: '🐍' },
  { name: 'Keras', symbol: '◆' },
];

export const FLOATING_NODES = [
  { id: 'resnet', label: 'ResNet50', value: '73.33', position: { top: '15%', right: '8%' }, delay: '0s' },
  { id: 'cnn', label: 'CNN Kustom', value: '92.08', position: { top: '20%', left: '5%' }, delay: '0.8s' },
  { id: 'mobilenet', label: 'VGG16', value: '91.67', position: { bottom: '25%', left: '4%' }, delay: '1.6s' },
  { id: 'f1', label: 'F1-Score', value: '92.08', position: { bottom: '20%', right: '6%' }, delay: '2.4s' },
];
