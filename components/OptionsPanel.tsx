
import React, { useState } from 'react';
import type { PromptOptions, Option, AspectRatio } from '../types';
import { ALL_OPTIONS } from '../constants';
import { SparklesIcon, ShuffleIcon } from './Icons';

interface OptionsPanelProps {
  options: PromptOptions;
  setOptions: React.Dispatch<React.SetStateAction<PromptOptions>>;
  onGeneratePrompt: () => void;
  onRandomize: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-semibold text-primary dark:text-primary-light mb-4">{children}</h3>
);

const OptionSelect: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly Option[];
}> = ({ label, value, onChange, options }) => (
    <div className="flex flex-col">
        <label className="mb-2 font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <select value={value} onChange={onChange} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition">
            {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
    </div>
);


const ToggleSwitch: React.FC<{
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, checked, onChange }) => (
    <div className="flex items-center space-x-3">
        <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-primary"></div>
        </label>
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
    </div>
);

const KeywordInput: React.FC<{
    keywords: string[];
    onAdd: (keyword: string) => void;
    onRemove: (keyword: string) => void;
}> = ({ keywords, onAdd, onRemove }) => {
    const [input, setInput] = useState('');
    const handleAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            onAdd(input.trim());
            setInput('');
        }
    }
    return (
         <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">Custom Keywords</label>
            <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleAdd}
                placeholder="Enter keyword and press Enter"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-primary focus:border-primary transition" 
            />
            <div className="flex flex-wrap gap-2 mt-3">
                {keywords.map(kw => (
                    <div key={kw} className="flex items-center bg-primary-light text-white text-sm font-medium px-3 py-1 rounded-full">
                        <span>{kw}</span>
                        <button onClick={() => onRemove(kw)} className="ml-2 text-white hover:text-red-300 font-bold">×</button>
                    </div>
                ))}
            </div>
        </div>
    )
};

const NumberPicker: React.FC<{
    value: number;
    onChange: (value: number) => void;
}> = ({ value, onChange }) => {
    const changeValue = (delta: number) => {
        const newValue = value + delta;
        if (newValue >= 1 && newValue <= 4) {
            onChange(newValue);
        }
    }
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
             <label className="font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">Image Count:</label>
             <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden w-fit">
                 <button onClick={() => changeValue(-1)} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50" disabled={value <= 1}>-</button>
                 <span className="px-4 py-1 font-mono">{value}</span>
                 <button onClick={() => changeValue(1)} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50" disabled={value >= 4}>+</button>
             </div>
        </div>
    )
}

export const OptionsPanel: React.FC<OptionsPanelProps> = ({ options, setOptions, onGeneratePrompt, onRandomize }) => {
    const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

    const handleChange = (key: keyof PromptOptions) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    const handleKeywords = {
        add: (kw: string) => !options.customKeywords.includes(kw) && setOptions(p => ({...p, customKeywords: [...p.customKeywords, kw]})),
        remove: (kw: string) => setOptions(p => ({...p, customKeywords: p.customKeywords.filter(k => k !== kw)})),
    }

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-fit">
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="flex space-x-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('basic')} className={`${activeTab === 'basic' ? 'border-primary text-primary dark:text-primary-light' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        Basic Options
                    </button>
                    <button onClick={() => setActiveTab('advanced')} className={`${activeTab === 'advanced' ? 'border-primary text-primary dark:text-primary-light' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        Advanced Options
                    </button>
                </nav>
            </div>

            <div hidden={activeTab !== 'basic'}>
                <SectionTitle>Model & Scene</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <OptionSelect label="Photography Style" value={options.portraitStyle} onChange={handleChange('portraitStyle')} options={ALL_OPTIONS.portraitStyle} />
                    <OptionSelect label="Scene Setting" value={options.sceneSetting} onChange={handleChange('sceneSetting')} options={ALL_OPTIONS.sceneSetting} />
                    <OptionSelect label="Pose Type" value={options.poseType} onChange={handleChange('poseType')} options={ALL_OPTIONS.poseType} />
                    <OptionSelect label="Facial Expression" value={options.facialExpression} onChange={handleChange('facialExpression')} options={ALL_OPTIONS.facialExpression} />
                </div>
                 <SectionTitle>Composition & Style</SectionTitle>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OptionSelect label="Framing & Composition" value={options.framingComposition} onChange={handleChange('framingComposition')} options={ALL_OPTIONS.framingComposition} />
                    <OptionSelect label="Lighting" value={options.lighting} onChange={handleChange('lighting')} options={ALL_OPTIONS.lighting} />
                    <OptionSelect label="Visual Style" value={options.styleInfluence} onChange={handleChange('styleInfluence')} options={ALL_OPTIONS.styleInfluence} />
                </div>
            </div>

            <div hidden={activeTab !== 'advanced'}>
                 <SectionTitle>Artistic & Technical Details</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <OptionSelect label="Art Style" value={options.artStyle} onChange={handleChange('artStyle')} options={ALL_OPTIONS.artStyle} />
                    <OptionSelect label="Color Scheme" value={options.colorScheme} onChange={handleChange('colorScheme')} options={ALL_OPTIONS.colorScheme} />
                    <OptionSelect label="Lens Type" value={options.lensType} onChange={handleChange('lensType')} options={ALL_OPTIONS.lensType} />
                    <OptionSelect label="Camera Settings" value={options.cameraSettings} onChange={handleChange('cameraSettings')} options={ALL_OPTIONS.cameraSettings} />
                    <OptionSelect label="Aspect Ratio" value={options.aspectRatio} onChange={e => setOptions(p => ({ ...p, aspectRatio: e.target.value as AspectRatio }))} options={ALL_OPTIONS.aspectRatio} />
                     <NumberPicker value={options.imageCount} onChange={val => setOptions(p => ({...p, imageCount: val}))} />
                </div>
                <div className="space-y-6">
                    <KeywordInput keywords={options.customKeywords} onAdd={handleKeywords.add} onRemove={handleKeywords.remove} />
                    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                       <ToggleSwitch label="High Resolution" checked={options.highResolution} onChange={handleChange('highResolution')} />
                       <ToggleSwitch label="Quality Boosters" checked={options.useQualityPrompt} onChange={handleChange('useQualityPrompt')} />
                    </div>
                </div>
            </div>
            
             <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={onGeneratePrompt} className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-transform transform hover:scale-102">
                    <SparklesIcon />
                    Generate Prompt
                </button>
                <button onClick={onRandomize} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                   <ShuffleIcon />
                   Randomize
                </button>
            </div>
        </div>
    );
}
