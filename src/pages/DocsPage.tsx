import React from 'react';
import { Code, ExternalLink, Copy } from 'lucide-react';

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
            Excuse API Documentation
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Integrate creative excuses into your applications with our simple REST API.
          </p>
        </div>

        {/* Base URL */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Base URL</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <code className="text-gray-800 font-mono">https://api.excusegenerator.com/v1</code>
            <button 
              onClick={() => copyToClipboard('https://api.excusegenerator.com/v1')}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Copy size={16} />
            </button>
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
  "success": true,
  "categories": [
    {
      "id": "late_for_work",
      "name": "Late for Work",
      "count": 8
    },
    {
      "id": "not_sending_money",
      "name": "Not Sending Money", 
      "count": 8
    },
    {
      "id": "school",
      "name": "School Excuses",
      "count": 8
    }
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
  "success": true,
  "category": "late_for_work",
  "excuse": "My alarm clock was hacked by cyber criminals!",
  "id": "lfw_001",
  "timestamp": "2024-01-15T10:30:00Z"
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
  "success": true,
  "category": "school",
  "total": 8,
  "excuses": [
    "My homework was eaten by a goat!",
    "I got lost in the library!",
    "My textbook joined the circus!",
    "..."
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="mt-16 p-8 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rate Limits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">100</div>
              <div className="text-gray-600">requests/hour</div>
              <div className="text-sm text-gray-500 mt-2">Free Tier</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">1,000</div>
              <div className="text-gray-600">requests/hour</div>
              <div className="text-sm text-gray-500 mt-2">Pro Tier</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-2">∞</div>
              <div className="text-gray-600">requests/hour</div>
              <div className="text-sm text-gray-500 mt-2">Enterprise</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-12 bg-yellow-50 border border-yellow-200 rounded-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of developers using our Excuse API in their applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/meetsik/excuse-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              <Code size={18} />
              View Source Code
              <ExternalLink size={16} />
            </a>
            
            <button className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-medium hover:bg-yellow-600 transition-colors">
              Get API Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;