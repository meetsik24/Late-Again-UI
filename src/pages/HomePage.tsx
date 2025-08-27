import React, { useState, useEffect, useRef } from 'react';
import { LateAgainAPIs } from '../services/api';
import { Sparkles, ArrowRight, ChevronDown, Copy, Check, Share2, Download, Link, Twitter, Facebook, Instagram } from 'lucide-react';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const excuseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryValues = await LateAgainAPIs.getCategories();
        const categoryObjects = categoryValues.map(cat => ({
          value: cat,
          label: LateAgainAPIs.getCategoryLabel(cat)
        }));
        setCategories(categoryObjects);
        if (categoryObjects.length > 0) {
          setSelectedCategory(categoryObjects[0].value);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        // Fallback to default categories if API fails
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

  // Handle incoming shareable links
  useEffect(() => {
    if (categories.length > 0 && !isLoading) {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedExcuse = urlParams.get('excuse');
      const sharedCategory = urlParams.get('category');
      
      if (sharedExcuse && sharedCategory) {
        // Decode the excuse
        const decodedExcuse = decodeURIComponent(sharedExcuse);
        setCurrentExcuse(decodedExcuse);
        setSelectedCategory(sharedCategory);
        
        // Clear the URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [categories, isLoading]);

  const generateExcuse = async () => {
    if (!selectedCategory) return;
    
    setIsGenerating(true);
    setCurrentExcuse('');
    setCopied(false);
    setShowShareOptions(false);
    
    try {
      // First try to get a random excuse
      const randomExcuse = await LateAgainAPIs.getRandomExcuse(selectedCategory);
      
      if (randomExcuse) {
        setCurrentExcuse(randomExcuse);
        return;
      }
      
      // If random excuse fails, get all excuses and pick one randomly
      const allExcuses = await LateAgainAPIs.getExcuses(selectedCategory);
      
      if (allExcuses && allExcuses.length > 0) {
        const randomIndex = Math.floor(Math.random() * allExcuses.length);
        const selectedExcuse = allExcuses[randomIndex];
        setCurrentExcuse(selectedExcuse);
      } else {
        setCurrentExcuse('Sorry, no excuses available for this category right now.');
      }
    } catch (error) {
      console.error('Failed to generate excuse:', error);
      setCurrentExcuse('Sorry, I ran out of excuses! Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentExcuse);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const generatePNG = async () => {
    if (!excuseRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      
      // Make sure the div is visible for rendering
      const tempDiv = excuseRef.current.cloneNode(true) as HTMLElement;
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '-9999px';
      tempDiv.style.visibility = 'visible';
      tempDiv.style.display = 'block';
      document.body.appendChild(tempDiv);
      
      const canvas = await html2canvas(tempDiv, {
        background: '#fefce8',
        width: 600,
        height: 400,
        useCORS: true,
        allowTaint: true
      });
      
      // Clean up
      document.body.removeChild(tempDiv);
      
      const link = document.createElement('a');
      link.download = `excuse-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate PNG:', error);
    }
  };

  const generateShareableLink = () => {
    try {
      const shareableData = {
        excuse: currentExcuse,
        category: selectedCategory,
        timestamp: Date.now()
      };
      
      // Create a more robust shareable link
      const params = new URLSearchParams();
      params.set('excuse', encodeURIComponent(currentExcuse));
      params.set('category', selectedCategory);
      params.set('t', Date.now().toString());
      
      const shareableLink = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
      
      navigator.clipboard.writeText(shareableLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to generate shareable link:', error);
    }
  };

  const shareToSocialMedia = (platform: string) => {
    const text = `Check out this creative excuse: "${currentExcuse}"`;
    const url = window.location.origin;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing via URL, so we'll copy to clipboard
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const getSelectedCategoryLabel = () => {
    const category = categories.find(cat => cat.value === selectedCategory);
    return category ? category.label : 'Select a category';
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
              
              {/* Custom Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className={selectedCategory ? 'text-gray-900' : 'text-gray-500'}>
                    {getSelectedCategoryLabel()}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full p-4 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                      >
                        {category.label}
                      </button>
                    ))}
                  </div>
                )}
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
                <div className="text-2xl mb-4">💬</div>
                <p className="text-lg text-gray-800 leading-relaxed font-medium mb-4">
                  "{currentExcuse}"
                </p>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                  {/* Copy Button */}
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-yellow-300 text-yellow-700 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        Copy
                      </>
                    )}
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors"
                  >
                    <Share2 size={16} />
                    Share
                  </button>

                  {/* Download PNG Button */}
                  <button
                    onClick={generatePNG}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    <Download size={16} />
                    PNG
                  </button>

                  {/* Generate Link Button */}
                  <button
                    onClick={generateShareableLink}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                  >
                    <Link size={16} />
                    Link
                  </button>
                </div>

                {/* Share Options */}
                {showShareOptions && (
                  <div className="mt-4 p-4 bg-white rounded-xl border border-yellow-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Share on Social Media</h4>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => shareToSocialMedia('twitter')}
                        className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                        title="Share on Twitter"
                      >
                        <Twitter size={20} />
                      </button>
                      <button
                        onClick={() => shareToSocialMedia('facebook')}
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Share on Facebook"
                      >
                        <Facebook size={20} />
                      </button>
                      <button
                        onClick={() => shareToSocialMedia('instagram')}
                        className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                        title="Copy for Instagram"
                      >
                        <Instagram size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hidden div for PNG generation */}
          {currentExcuse && (
            <div 
              ref={excuseRef}
              className="hidden absolute left-[-9999px] top-[-9999px] w-[600px] h-[400px] bg-yellow-50 p-8 flex items-center justify-center border-2 border-yellow-200 rounded-2xl"
              style={{
                position: 'absolute',
                left: '-9999px',
                top: '-9999px',
                width: '600px',
                height: '400px',
                backgroundColor: '#fefce8',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #fde68a',
                borderRadius: '1rem'
              }}
            >
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-2xl text-gray-800 leading-relaxed font-medium mb-4 text-center">
                  "{currentExcuse}"
                </p>
                <p className="text-sm text-gray-500">Generated by Late Again</p>
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
              <div className="text-2xl">⚡</div>
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