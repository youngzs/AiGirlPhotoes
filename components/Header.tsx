
import React from 'react';

export const Header: React.FC = () => (
  <header className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
    <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark dark:text-primary-light">
      Professional Portrait Prompt Generator
    </h1>
    <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
      Generate precise prompts to create high-quality, professional AI portrait images.
    </p>
  </header>
);
