
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2800); // slightly less than CSS animation
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white py-2 px-5 rounded-full shadow-lg animate-fade-in-out">
      {message}
    </div>
  );
};

// Add keyframes to your index.html tailwind config or a global css file if you have one.
// For simplicity here's the CSS you would add:
/*
@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, 10px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -10px); }
}
.animate-fade-in-out {
  animation: fadeInOut 3s ease-in-out forwards;
}
*/
// As we can't add CSS files, let's update tailwind.config in index.html to include this animation.
// I'll add this to index.html instead.
