import { useState } from 'react';

export const useTourismSelector = () => {
  const [path, setPath] = useState([]);

  const [isFinished, setIsFinished] = useState(false);

  const selectOption = (option) => {
    if (!option) return;

    if (option.options && option.options.length > 0) {
      setPath((prev) => [...prev, option]);
    } else {
      setPath((prev) => [...prev, option]);
      setIsFinished(true);
    }
  };

  const goBack = () => {
    if (isFinished) {
      setIsFinished(false);
      setPath((prev) => prev.slice(0, -1));
      return;
    }

    if (path.length > 0) {
      setPath((prev) => prev.slice(0, -1));
    }
  };

  const reset = () => {
    setPath([]);
    setIsFinished(false);
  };

  const currentSelection = path.length > 0 ? path[path.length - 1] : null;

  return {
    step: path.length + 1, 
    path,
    currentSelection,
    isFinished,
    selectOption,
    goBack,
    reset,
  };
};