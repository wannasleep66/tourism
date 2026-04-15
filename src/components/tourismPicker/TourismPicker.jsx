import { useState } from 'react';
import { useTourismSelector } from '../hooks/useTourismSelector';
import tourismData from '../../data/tourism.json';
import TourCard from './TourCard';
import { supabase } from "./../../supabaseClient";

const TourismPicker = () => {
  const {
    step,
    isFinished,
    currentSelection,
    selectOption,
    goBack,
    reset,
  } = useTourismSelector();

  const [stagedSelection, setStagedSelection] = useState(null);

  const currentOptions = currentSelection ? currentSelection.options : tourismData;

  const handleNext = () => {
    if (stagedSelection) {
      selectOption(stagedSelection);
      setStagedSelection(null);
    }
  };

  const handleBack = () => {
    setStagedSelection(null);
    goBack();
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleFinishAndSave = async () => {
    setIsSaving(true); 
    
    try {
      const { error } = await supabase
        .from('test_results')
        .insert([
          {
            tourism_type: currentSelection.tourismType,
            description: currentSelection.description,
            manager_profile: currentSelection.managerProfile
          }
        ]);

      if (error) throw error; 
      
      console.log('Успешно сохранено!');
      
    } catch (error) {
      console.error('Ошибка при сохранении в БД:', error.message);
      alert('Не удалось сохранить результат. Проверьте консоль.');
    } finally {
      setIsSaving(false);
      reset(); 
      setStagedSelection(null);
    }
  };

return (
    
    <div className="max-w-xl w-full mx-auto bg-stone-50 min-h-dvh sm:min-h-162.5 flex flex-col rounded-none sm:rounded-3xl shadow-none sm:shadow-xl p-4 sm:p-8 relative overflow-hidden">
      
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6 mt-2 sm:mt-0">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: isFinished ? '100%' : `${Math.min((step / 3) * 100, 95)}%` }}
        />
      </div>

      {!isFinished ? (
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg sm:text-xl md:text-2xl text-center font-medium text-gray-800 mb-6 sm:mb-8">
            Какая из этих картинок отзывается Вам больше всего?
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 flex-grow content-center mb-8">
            {currentOptions?.map((item) => (
              <TourCard
                key={item.id}
                image={item.image}
                active={stagedSelection?.id === item.id}
                onClick={() => setStagedSelection(item)}
              />
            ))}
          </div>

          <div className="flex justify-between items-center mt-auto pb-4 sm:pb-0">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-800 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-colors font-medium"
              >
                ← Назад
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNext}
              disabled={!stagedSelection}
              className={`px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all ${
                stagedSelection
                  ? 'bg-green-500 text-white shadow-md hover:bg-green-600 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Далее →
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center animate-fade-in relative pb-4 sm:pb-0">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Ваш идеальный отдых:</h2>
          
          <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg mb-4 sm:mb-6 ring-4 ring-green-100">
             <img src={currentSelection.image} alt="Выбранный тур" className="w-full h-full object-cover" />
          </div>
          
          <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
            {currentSelection.tourismType}
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
            {currentSelection.description}
          </p>

          <button
            onClick={handleFinishAndSave}
            disabled={isSaving}
            className={`w-full text-white py-4 rounded-xl font-bold transition-all active:scale-95 ${
              isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSaving ? 'Сохранение...' : 'Завершить (Начать заново)'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TourismPicker;