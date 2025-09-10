
export type AspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export interface PromptOptions {
  portraitStyle: string;
  sceneSetting: string;
  poseType: string;
  facialExpression: string;
  framingComposition: string;
  lighting: string;
  styleInfluence: string;
  artStyle: string;
  colorScheme: string;
  lensType: string;
  cameraSettings: string;
  aspectRatio: AspectRatio;
  customKeywords: string[];
  highResolution: boolean;
  useQualityPrompt: boolean;
  imageCount: number;
}

export interface Option {
  value: string;
  label: string;
}
