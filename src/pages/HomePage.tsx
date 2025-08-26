import React, { useState, useEffect } from 'react';
import { ExcuseAPI } from '../services/api';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Category {
  value: string;
  label: string;
}

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentExcuse, setCurrentExcuse] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryValues = await ExcuseAPI.getCategories();
        const categoryObjects = categoryValues.map(cat => ({
          value: cat,
          label: ExcuseAPI.getCategoryLabel(cat)
        }));
        setCategories(categoryObjects);
        if (categoryObjects.length > 0) {
          setSelectedCategory(categoryObjects[0].value);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        // Fallback to default categories
        const fallbackCategories = [
          { value: 'late_for_work', label: 'Late for Work' },
          { value: 'not_sending_money', label: 'Not Sending Money' },
          { value: 'school', label: 'School Excuses' }
        ];
        setCategories(fallbackCategories);
        setSelectedCategory('late_for_work');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const generateExcuse = async () => {
    if (!selectedCategory) return;
    
    setIsGenerating(true);
    setCurrentExcuse('');
    
    try {
      const excuse = await ExcuseAPI.getRandomExcuse(selectedCategory);
      if (excuse) {
        setCurrentExcuse(excuse);
      } else {
        // Fallback: get all excuses and pick random one
        const excuses = await ExcuseAPI.getExcuses(selectedCategory);
        if (excuses.length > 0) {
          const randomIndex = Math.floor(Math.random() * excuses.length);
          setCurrentExcuse(excuses[randomIndex]);
        }
      }
    } catch (error) {
      console.error('Failed to generate excuse:', error);
      setCurrentExcuse('Sorry, I ran out of excuses! Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading excuses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-8">
            <Sparkles size={16} />
            Creative Excuse Generator
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Need a creative
            <br />
            <span className="text-yellow-500">excuse?</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Generate hilarious and creative excuses for any situation. 
            Powered by the Late Again API with real-time excuse generation.
          </p>
        </div>

        {/* Generator Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose a category
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`p-4 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === category.value
                        ? 'bg-yellow-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateExcuse}
              disabled={isGenerating || !selectedCategory}
              className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  Generate Excuse
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Excuse Display */}
          {currentExcuse && (
            <div className="mt-8 p-8 bg-yellow-50 border border-yellow-200 rounded-2xl">
              <div className="text-center">
                <div className="text-2xl mb-2">💬</div>
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  "{currentExcuse}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Multiple Categories</h3>
            <p className="text-gray-600 text-sm">Choose from {categories.length} different excuse categories</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Real-time API</h3>
            <p className="text-gray-600 text-sm">Powered by the Late Again API for fresh excuses</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">😂</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Always Funny</h3>
            <p className="text-gray-600 text-sm">Guaranteed to make you smile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;