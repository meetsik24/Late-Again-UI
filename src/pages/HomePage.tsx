import React, { useState } from 'react';
import { excuses, categories } from '../data/excuses';
import { Sparkles, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('late_for_work');
  const [currentExcuse, setCurrentExcuse] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateExcuse = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const categoryExcuses = excuses[selectedCategory as keyof typeof excuses];
      const randomIndex = Math.floor(Math.random() * categoryExcuses.length);
      setCurrentExcuse(categoryExcuses[randomIndex]);
      setIsGenerating(false);
    }, 500);
  };

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
            Perfect for when you need a laugh or a clever way out.
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
              disabled={isGenerating}
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
            <p className="text-gray-600 text-sm">Choose from work, money, or school excuses</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Generation</h3>
            <p className="text-gray-600 text-sm">Get creative excuses in seconds</p>
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