import { useState, useEffect } from 'react';
import { supabase } from "./../../supabaseClient";

const ManagerDashboard = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResults(data);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error.message);
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Шапка */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Панель менеджера</h1>
          <button 
            onClick={fetchResults}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex justify-center items-center gap-2"
          >
            <span>↻</span> Обновить данные
          </button>
        </div>

        {/* Список результатов */}
        {loading ? (
          <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
            <p className="text-gray-500 animate-pulse">Загрузка результатов...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 shadow-sm text-center">
            <p className="text-gray-500">Пока никто не прошел тест.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            {results.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-gray-800 leading-tight">
                      {item.tourism_type}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="bg-gray-50 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-gray-400 whitespace-nowrap shrink-0">
                    {new Date(item.created_at).toLocaleString('ru-RU', {
                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                    })}
                  </div>
                </div>

                <div className="bg-orange-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-orange-100">
                  <p className="text-xs text-orange-800 uppercase font-bold mb-1.5 flex items-center gap-1.5">
                    <span>Служебная информация</span>
                    <span>🔒</span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {item.manager_profile}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;