// StepThree.jsx
import TourCard from './TourCard';

const StepThree = ({ subShades, onSelect }) => {
  if (!subShades || !Array.isArray(subShades)) {
    return <div className="text-center p-4">Нет доступных оттенков</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {subShades.map((sub, index) => (
        <TourCard 
          key={sub.id || `sub-${index}`} 
          label={sub.label || 'Без названия'} 
          color={sub.color || sub.hex || '#cccccc'} 
          onClick={() => onSelect(sub)} 
        />
      ))}
    </div>
  );
};

export default StepThree;