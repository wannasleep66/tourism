// StepOne.jsx
import TourCard from './TourCard';

const StepOne = ({ data, onSelect }) => {
    console.log('📦 data в StepOne:', data);
  console.log('📦 первый элемент:', data?.[0]);
  if (!data || !Array.isArray(data)) {
    return <div className="text-center p-4">Нет данных</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {data.slice(0, 6).map((item, index) => (
        <TourCard 
          key={item.id || `base-${index}`}
          label={item.label} 
          color={item.color} 
          onClick={() => onSelect(item)} 
        />
      ))}
    </div>
  );
};

export default StepOne;