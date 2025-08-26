import React from 'react';
import { Code, ExternalLink, Copy, CheckCircle } from 'lucide-react';

const DocsPage: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
            <Code size={16} />
            API Documentation
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Late Again API Documentation
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Integrate creative excuses into your applications with our simple REST API. 
            Powered by the Late Again API service.
          </p>
        </div>

        {/* Base URL */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Base URL</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <code className="text-gray-800 font-mono">https://late-again-api.onrender.com</code>
            <button 
              onClick={() => copyToClipboard('https://late-again-api.onrender.com')}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* API Status */}
        <div className="mb-12 p-6 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-600" />
            <div>
              <h3 className="font-semibold text-green-800">API Status: Live</h3>
              <p className="text-green-700 text-sm">The Late Again API is currently operational and serving requests.</p>
            </div>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-12">
          {/* Get Categories */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
              <h3 className="text-xl font-semibold text-gray-900">Get Categories</h3>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
              <code className="text-gray-800 font-mono">/categories</code>
            </div>
            
            <p className="text-gray-600 mb-4">Returns all available excuse categories.</p>
            
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`{
  "categories": [
    "late_for_work",
    "not_sending_money", 
    "school",
    "meeting",
    "gym",
    "cant_go_to_work",
    "cant_send_money",
    "cant_do_homework",
    "cant_attend_meeting",
    "cant_go_to_party",
    "cant_go_to_gym",
    "cant_play_games",
    "developer"
  ]
}`}
              </pre>
            </div>
          </div>

          {/* Get Random Excuse */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
              <h3 className="text-xl font-semibold text-gray-900">Get Random Excuse</h3>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
              <code className="text-gray-800 font-mono">/excuse?category=late_for_work</code>
            </div>
            
            <p className="text-gray-600 mb-4">Returns a random excuse from the specified category.</p>
            
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-blue-400 text-sm">
{`{
  "excuse": "My cat was having an existential crisis and needed emotional support"
}`}
              </pre>
            </div>
          </div>

          {/* Get All Excuses */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
              <h3 className="text-xl font-semibold text-gray-900">Get All Excuses</h3>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
              <code className="text-gray-800 font-mono">/excuses?category=school</code>
            </div>
            
            <p className="text-gray-600 mb-4">Returns all excuses from the specified category.</p>
            
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <pre className="text-purple-400 text-sm">
{`{
  "category": "school",
  "excuses": [
    "My homework was eaten by a very literate goat who's now smarter than me",
    "I got lost in the library and lived there for three days surviving on bookmarks",
    "My textbook ran away to join the circus as a trapeze artist"
  ],
  "count": 3
}`}
              </pre>
            </div>
          </div>

         
        </div>

        {/* Available Categories */}
        <div className="mt-16 p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Work & Professional</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• late_for_work</li>
                <li>• cant_go_to_work</li>
                <li>• meeting</li>
                <li>• cant_attend_meeting</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Personal & Social</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• not_sending_money</li>
                <li>• cant_send_money</li>
                <li>• cant_go_to_party</li>
                <li>• cant_go_to_gym</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Education & Hobbies</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• school</li>
                <li>• cant_do_homework</li>
                <li>• cant_play_games</li>
                <li>• developer</li>
              </ul>
            </div>
            
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Health & Fitness</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• gym</li>
                <li>• cant_go_to_gym</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            The Late Again API is free to use and doesn't require authentication.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
            
            <a
              href="https://github.com/meetsik24/Late-Again-API"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <Code size={18} />
              Add Your Excuse to the Chaos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;