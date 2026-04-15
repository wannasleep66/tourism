const TourCard = ({ image, onClick, active }) => {
  return (
    <div 
      onClick={onClick}
      // Добавили aspect-square сюда:
      className={`relative w-full aspect-square cursor-pointer overflow-hidden rounded-xl transition-all active:scale-95 ${
        active ? 'ring-4 ring-green-500' : 'border border-transparent'
      }`}
    >
      <img 
        src={image} 
        alt="вариант туризма" 
        className="w-full h-full object-cover"
      />
      {active && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
          ✓
        </div>
      )}
    </div>
  );
};

export default TourCard;