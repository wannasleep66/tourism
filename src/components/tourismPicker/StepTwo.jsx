// StepTwo.jsx
import TourCard from './TourCard';

const StepTwo = ({ shades, onSelect }) => {
  if (!shades || !Array.isArray(shades)) {
    return <div className="text-center p-4">Нет доступных оттенков</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {shades.map((shade, index) => (
        <TourCard 
          key={shade.id || `shade-${index}`}
          label={shade.label} 
          color={shade.color} 
          onClick={() => onSelect(shade)} 
        />
      ))}
    </div>
  );
};

export default StepTwo;