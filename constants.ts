
import type { Option, AspectRatio } from "./types";

const portraitStyle: readonly Option[] = [
  { value: "fashion", label: "Fashion Photography" },
  { value: "portrait", label: "Portrait Photography" },
  { value: "artistic", label: "Artistic Photography" },
  { value: "editorial", label: "Editorial" },
  { value: "commercial", label: "Commercial Photography" },
  { value: "beauty", label: "Beauty Photography" },
  { value: "street", label: "Street Style" },
  { value: "cinematic", label: "Cinematic Style" },
];

const sceneSetting: readonly Option[] = [
  { value: "studio", label: "Studio" },
  { value: "urban", label: "Urban Environment" },
  { value: "nature", label: "Nature Environment" },
  { value: "beach", label: "Beach" },
  { value: "forest", label: "Forest" },
  { value: "mountains", label: "Mountains" },
  { value: "cafe", label: "Cafe" },
  { value: "library", label: "Library" },
  { value: "modern-interior", label: "Modern Interior" },
  { value: "vintage-interior", label: "Vintage Interior" },
  { value: "rooftop", label: "Rooftop" },
];

const poseType: readonly Option[] = [
  { value: "natural", label: "Natural" },
  { value: "professional", label: "Professional Model" },
  { value: "sitting", label: "Sitting" },
  { value: "standing", label: "Standing" },
  { value: "leaning", label: "Leaning" },
  { value: "candid", label: "Candid" },
  { value: "artistic", label: "Artistic Pose" },
  { value: "action", label: "Action Pose" },
  { value: "profile", label: "Profile Pose" },
];

const facialExpression: readonly Option[] = [
  { value: "neutral", label: "Neutral Expression" },
  { value: "smiling", label: "Smiling" },
  { value: "serious", label: "Serious" },
  { value: "confident", label: "Confident" },
  { value: "pensive", label: "Pensive" },
  { value: "joyful", label: "Joyful" },
  { value: "melancholic", label: "Melancholic" },
  { value: "dramatic", label: "Dramatic Expression" },
];

const framingComposition: readonly Option[] = [
  { value: "close-up", label: "Close-up" },
  { value: "medium-shot", label: "Medium shot" },
  { value: "full-body", label: "Full body" },
  { value: "over-the-shoulder", label: "Over the shoulder" },
  { value: "environmental", label: "Environmental Portrait" },
  { value: "symmetrical", label: "Symmetrical Composition" },
  { value: "rule-of-thirds", label: "Rule of thirds" },
  { value: "dutch-angle", label: "Dutch angle" },
  { value: "birds-eye", label: "Bird's eye view" },
  { value: "low-angle", label: "Low angle shot" },
];

const lighting: readonly Option[] = [
  { value: "soft", label: "Soft light" },
  { value: "dramatic", label: "Dramatic light" },
  { value: "natural", label: "Natural light" },
  { value: "golden-hour", label: "Golden hour" },
  { value: "blue-hour", label: "Blue hour" },
  { value: "studio-lighting", label: "Studio lighting" },
  { value: "backlight", label: "Backlight" },
  { value: "side-light", label: "Side light" },
  { value: "rembrandt", label: "Rembrandt lighting" },
  { value: "split", label: "Split lighting" },
  { value: "high-key", label: "High key lighting" },
  { value: "low-key", label: "Low key lighting" },
];

const styleInfluence: readonly Option[] = [
  { value: "modern", label: "Modern" },
  { value: "vintage", label: "Vintage" },
  { value: "film", label: "Film look" },
  { value: "high-fashion", label: "High Fashion" },
  { value: "minimalist", label: "Minimalist" },
  { value: "glamour", label: "Glamour" },
  { value: "experimental", label: "Experimental" },
  { value: "classic", label: "Classic" },
  { value: "edgy", label: "Edgy" },
  { value: "documentary", label: "Documentary" },
  { value: "punk", label: "Punk" },
  { value: "bohemian", label: "Bohemian" },
  { value: "elegant", label: "Elegant" },
];

const artStyle: readonly Option[] = [
  { value: "", label: "-- None --" },
  { value: "photorealistic", label: "Photorealistic" },
  { value: "watercolor", label: "Watercolor style" },
  { value: "oil-painting", label: "Oil painting style" },
  { value: "sketch", label: "Sketch style" },
  { value: "digital-art", label: "Digital art" },
  { value: "pop-art", label: "Pop art" },
  { value: "anime", label: "Anime style" },
  { value: "comic", label: "Comic style" },
];

const colorScheme: readonly Option[] = [
  { value: "vibrant", label: "Vibrant Colors" },
  { value: "muted", label: "Muted Tones" },
  { value: "monochrome", label: "Monochrome" },
  { value: "black-and-white", label: "Black and white" },
  { value: "sepia", label: "Sepia" },
  { value: "pastel", label: "Pastel Tones" },
  { value: "warm", label: "Warm Tones" },
  { value: "cool", label: "Cool Tones" },
  { value: "complementary", label: "Complementary Colors" },
];

const lensType: readonly Option[] = [
  { value: "standard", label: "Standard Lens" },
  { value: "wide-angle", label: "Wide angle Lens" },
  { value: "telephoto", label: "Telephoto Lens" },
  { value: "prime-35mm", label: "Prime 35mm" },
  { value: "prime-50mm", label: "Prime 50mm" },
  { value: "prime-85mm", label: "Prime 85mm" },
  { value: "macro", label: "Macro Lens" },
  { value: "fisheye", label: "Fisheye Lens" },
  { value: "tilt-shift", label: "Tilt-shift Lens" },
];

const cameraSettings: readonly Option[] = [
  { value: "shallow-dof", label: "Shallow DoF" },
  { value: "deep-dof", label: "Deep DoF" },
  { value: "long-exposure", label: "Long exposure" },
  { value: "fast-shutter", label: "Fast shutter" },
  { value: "bokeh", label: "Bokeh" },
  { value: "high-iso", label: "High ISO" },
  { value: "motion-blur", label: "Motion blur" },
  { value: "hdr", label: "HDR" },
];

const aspectRatio: readonly { value: AspectRatio; label: string }[] = [
  { value: "3:4", label: "3:4 (Portrait)" },
  { value: "9:16", label: "9:16 (Mobile)" },
  { value: "1:1", label: "1:1 (Square)" },
  { value: "4:3", label: "4:3 (Landscape)" },
  { value: "16:9", label: "16:9 (Widescreen)" },
];

export const ALL_OPTIONS = {
    portraitStyle,
    sceneSetting,
    poseType,
    facialExpression,
    framingComposition,
    lighting,
    styleInfluence,
    artStyle,
    colorScheme,
    lensType,
    cameraSettings,
    aspectRatio,
};
