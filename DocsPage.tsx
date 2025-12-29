
import React, { useState } from 'react';
import { TranslationSchema } from '../types';
import { Search, Book, Code, FileText, ChevronRight } from 'lucide-react';

interface DocsPageProps {
  t: TranslationSchema;
}

const DocsPage: React.FC<DocsPageProps> = ({ t }) => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="pt-24 pb-20 container mx-auto px-6 min-h-screen flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 animate-in slide-in-from-left-4 duration-500">
         <div className="sticky top-28 space-y-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                    type="text" 
                    placeholder={t.docs.searchPlaceholder}
                    className="w-full bg-zinc-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
            </div>

            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
                    Documentation
                </h3>
                <div className="space-y-1">
                    {t.docs.categories.map((cat, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setActiveCategory(idx)}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                                activeCategory === idx 
                                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {cat}
                            {activeCategory === idx && <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        <div className="max-w-3xl">
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-bold mb-4">
                    <Book className="w-4 h-4" />
                    Documentation / {t.docs.categories[activeCategory]}
                </div>
                <h1 className="text-4xl font-black mb-6">{t.docs.welcomeTitle}</h1>
                <p className="text-gray-400 text-lg leading-relaxed">
                    {t.docs.welcomeDesc}
                </p>
            </div>

            <div className="space-y-12">
                {/* Example Content Section 1 */}
                <section className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-purple-400" />
                        Quick Start Guide
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        To get started with Cloud REPUBLIC, you first need to initialize your environment. Use our CLI tool to authenticate and set up your first project.
                    </p>
                    <div className="bg-black/50 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-x-auto custom-scrollbar">
                        <div className="flex gap-2 mb-2 border-b border-white/5 pb-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        <div className="text-gray-300">
                            <span className="text-green-400">$</span> npm install -g @republic/cli<br/>
                            <span className="text-green-400">$</span> republic login<br/>
                            <span className="text-green-400">$</span> republic init my-project
                        </div>
                    </div>
                </section>

                {/* Example Content Section 2 */}
                <section className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                        <Code className="w-6 h-6 text-blue-400" />
                        API Integration
                    </h2>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                        Our REST API allows you to programmatically manage your instances. Here is an example of how to list all active instances in your account.
                    </p>
                    <div className="bg-black/50 rounded-xl border border-white/10 p-4 font-mono text-sm overflow-x-auto custom-scrollbar">
                         <div className="text-purple-400 mb-2">// GET /v1/instances</div>
                         <div className="text-gray-400">
                            fetch(<span className="text-green-400">'https://api.cloudrepublic.com/v1/instances'</span>, {'{'}<br/>
                            &nbsp;&nbsp;headers: {'{'}<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">'Authorization'</span>: <span className="text-green-400">'Bearer YOUR_API_KEY'</span><br/>
                            &nbsp;&nbsp;{'}'}<br/>
                            {'}'})
                         </div>
                    </div>
                </section>
            </div>
        </div>
      </main>
    </div>
  );
};

export default DocsPage;
