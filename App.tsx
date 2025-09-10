
import React, { useState, useEffect, useCallback } from 'react';
import { OptionsPanel } from './components/OptionsPanel';
import { ResultPanel } from './components/ResultPanel';
import { Header } from './components/Header';
import { ModeToggle } from './components/ModeToggle';
import { Toast } from './components/Toast';
import { ImageViewer } from './components/ImageViewer';
import type { PromptOptions, AspectRatio } from './types';
import { generateImagesFromPrompt } from './services/geminiService';
import { ALL_OPTIONS } from './constants';
import { SunIcon, MoonIcon } from './components/Icons';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [promptOptions, setPromptOptions] = useState<PromptOptions>({
    portraitStyle: 'fashion',
    sceneSetting: 'studio',
    poseType: 'natural',
    facialExpression: 'neutral',
    framingComposition: 'close-up',
    lighting: 'soft',
    styleInfluence: 'modern',
    artStyle: '',
    colorScheme: 'vibrant',
    lensType: 'standard',
    cameraSettings: 'shallow-dof',
    aspectRatio: '3:4',
    customKeywords: [],
    highResolution: true,
    useQualityPrompt: true,
    imageCount: 1,
  });
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [promptHistory, setPromptHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageViewerIndex, setCurrentImageViewerIndex] = useState(0);

  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDarkMode ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const generatePrompt = useCallback(() => {
    const {
      portraitStyle, sceneSetting, poseType, facialExpression, framingComposition,
      lighting, styleInfluence, artStyle, colorScheme, lensType, cameraSettings,
      highResolution, useQualityPrompt, customKeywords, aspectRatio
    } = promptOptions;

    let prompt = `Professional ${portraitStyle} photography of a model, ${poseType} pose with ${facialExpression} expression, in ${sceneSetting} setting, ${framingComposition} composition, with ${lighting} lighting, ${styleInfluence} style`;

    if (artStyle) prompt += `, ${artStyle} art style`;
    prompt += `, ${colorScheme} color scheme`;
    prompt += `, shot with ${lensType} lens, ${cameraSettings}`;
    if (highResolution) prompt += ', high resolution';
    if (useQualityPrompt) prompt += ', professional, detailed, sharp focus, high quality, 8k';
    if (customKeywords.length > 0) prompt += `, ${customKeywords.join(', ')}`;
    
    // Aspect ratio is used by the API, not added to prompt text
    // prompt += ` --aspect ${aspectRatio}`;

    setGeneratedPrompt(prompt);
    return prompt;
  }, [promptOptions]);

  const handleRandomize = () => {
    const randomOption = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
    
    setPromptOptions({
      ...promptOptions,
      portraitStyle: randomOption(ALL_OPTIONS.portraitStyle).value,
      sceneSetting: randomOption(ALL_OPTIONS.sceneSetting).value,
      poseType: randomOption(ALL_OPTIONS.poseType).value,
      facialExpression: randomOption(ALL_OPTIONS.facialExpression).value,
      framingComposition: randomOption(ALL_OPTIONS.framingComposition).value,
      lighting: randomOption(ALL_OPTIONS.lighting).value,
      styleInfluence: randomOption(ALL_OPTIONS.styleInfluence).value,
      artStyle: randomOption(ALL_OPTIONS.artStyle).value,
      colorScheme: randomOption(ALL_OPTIONS.colorScheme).value,
      lensType: randomOption(ALL_OPTIONS.lensType).value,
      cameraSettings: randomOption(ALL_OPTIONS.cameraSettings).value,
      aspectRatio: randomOption(ALL_OPTIONS.aspectRatio).value as AspectRatio,
      highResolution: Math.random() > 0.3,
      useQualityPrompt: Math.random() > 0.2,
      imageCount: Math.floor(Math.random() * 4) + 1,
    });
  };

  const handleSavePrompt = () => {
    if (!generatedPrompt || promptHistory.includes(generatedPrompt)) return;
    const newHistory = [generatedPrompt, ...promptHistory].slice(0, 10);
    setPromptHistory(newHistory);
    showToast('Prompt saved successfully!');
  };

  const handleGenerateImages = async () => {
    let promptToUse = generatedPrompt;
    if (!promptToUse) {
      promptToUse = generatePrompt();
    }
    if (!promptToUse) {
      showToast('Please generate a prompt first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesFromPrompt(promptToUse, promptOptions.imageCount, promptOptions.aspectRatio);
      setGeneratedImages(images);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      showToast(err instanceof Error ? `Error: ${err.message}`: 'Image generation failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewImage = (index: number) => {
    setCurrentImageViewerIndex(index);
    setIsImageViewerOpen(true);
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <ModeToggle theme={theme} toggleTheme={toggleTheme} />
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OptionsPanel
            options={promptOptions}
            setOptions={setPromptOptions}
            onGeneratePrompt={generatePrompt}
            onRandomize={handleRandomize}
          />
          <ResultPanel
            generatedPrompt={generatedPrompt}
            setGeneratedPrompt={setGeneratedPrompt}
            onSavePrompt={handleSavePrompt}
            onGenerateImages={handleGenerateImages}
            history={promptHistory}
            isLoading={isLoading}
            error={error}
            generatedImages={generatedImages}
            onViewImage={handleViewImage}
            showToast={showToast}
          />
        </main>
        {toastMessage && <Toast message={toastMessage} />}
        {isImageViewerOpen && (
          <ImageViewer
            images={generatedImages}
            startIndex={currentImageViewerIndex}
            onClose={() => setIsImageViewerOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
