
import React, { useState } from 'react';
import { CopyIcon, SaveIcon, GenerateIcon, HistoryIcon, CameraIcon } from './Icons';


interface ResultPanelProps {
    generatedPrompt: string;
    setGeneratedPrompt: (prompt: string) => void;
    onSavePrompt: () => void;
    onGenerateImages: () => void;
    history: string[];
    isLoading: boolean;
    error: string | null;
    generatedImages: string[];
    onViewImage: (index: number) => void;
    showToast: (message: string) => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode; icon: React.ReactNode }> = ({ children, icon }) => (
    <h3 className="text-lg font-semibold text-primary dark:text-primary-light mb-4 flex items-center gap-2">
        {icon}
        {children}
    </h3>
);

const ImageGrid: React.FC<{ images: string[], onViewImage: (index: number) => void }> = ({ images, onViewImage }) => {
    const gridClasses = [
        'grid-cols-1', // for 1 image
        'grid-cols-2', // for 2 images
        'grid-cols-2', // for 3 images, will wrap
        'grid-cols-2'  // for 4 images
    ];

    return (
        <div className={`grid ${gridClasses[images.length-1]} gap-4`}>
            {images.map((src, index) => (
                <div key={index} className="aspect-[3/4] rounded-lg overflow-hidden cursor-pointer group shadow-md" onClick={() => onViewImage(index)}>
                    <img 
                        src={src} 
                        alt={`Generated Portrait ${index + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                    />
                </div>
            ))}
        </div>
    );
};

export const ResultPanel: React.FC<ResultPanelProps> = ({ 
    generatedPrompt, setGeneratedPrompt, onSavePrompt, onGenerateImages, history, 
    isLoading, error, generatedImages, onViewImage, showToast
}) => {
    const [copyButtonText, setCopyButtonText] = useState('Copy Prompt');

    const handleCopy = () => {
        if (!generatedPrompt) {
            showToast("Nothing to copy!");
            return;
        }
        navigator.clipboard.writeText(generatedPrompt).then(() => {
            setCopyButtonText('Copied!');
            setTimeout(() => setCopyButtonText('Copy Prompt'), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            showToast("Failed to copy prompt.");
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-6">
            <div>
                <SectionTitle icon={<GenerateIcon />}>Generated Prompt</SectionTitle>
                <div className="min-h-[120px] p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                    {generatedPrompt || "Your generated prompt will appear here..."}
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <button onClick={handleCopy} className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition">
                        <CopyIcon /> {copyButtonText}
                    </button>
                    <button onClick={onSavePrompt} className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                        <SaveIcon /> Save Prompt
                    </button>
                </div>
            </div>

            <div>
                <SectionTitle icon={<CameraIcon />}>Generate Image</SectionTitle>
                <button 
                    onClick={onGenerateImages}
                    disabled={isLoading}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Generate with Gemini'}
                </button>

                 <div className="mt-4 min-h-[100px] p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {isLoading && <p>Generating images, this may take a moment...</p>}
                    {error && <p className="text-red-500 text-center">Error: {error}</p>}
                    {!isLoading && !error && generatedImages.length > 0 && <ImageGrid images={generatedImages} onViewImage={onViewImage} />}
                    {!isLoading && !error && generatedImages.length === 0 && <p className="text-gray-500 dark:text-gray-400">Your generated images will appear here.</p>}
                </div>
            </div>
            
            {history.length > 0 && (
                <div>
                    <SectionTitle icon={<HistoryIcon />}>History</SectionTitle>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {history.map((p, i) => (
                            <div key={i} onClick={() => setGeneratedPrompt(p)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 truncate text-xs">
                                {p}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
