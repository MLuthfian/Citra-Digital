export interface ModelMetric {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  type: string;
  best?: boolean;
}

export interface ConfusionMatrixData {
  tp: number;
  fn: number;
  fp: number;
  tn: number;
}

export interface TrainingParams {
  epoch: number;
  batchSize: number;
  optimizer: string;
  learningRate: number;
  lossFunction: string;
  inputSize: string;
  split: { train: number; val: number; test: number };
}

export interface ClassificationResult {
  label: 'BANJIR' | 'KEBAKARAN';
  confidence: number;
  floodProbability: number;
  fireProbability: number;
  modelUsed: string;
  inferenceTime: number;
}

export type ModelName = 'CNN Kustom' | 'VGG16' | 'ResNet50';

export interface TrainingEpochData {
  epoch: number;
  cnn_acc: number;
  vgg16_acc: number;
  resnet_acc: number;
  cnn_loss: number;
  vgg16_loss: number;
  resnet_loss: number;
}
