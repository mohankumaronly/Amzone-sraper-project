import React from 'react';
import { Loader2, Database, Search, ShieldCheck } from 'lucide-react';

const ScrapingLoadingScreen = ({ message = "Extracting data from Amazon..." }) => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/80 backdrop-blur-sm transition-all">
            <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-sm w-full text-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-25"></div>
                    <div className="relative bg-orange-50 p-5 rounded-full border-2 border-orange-500/20">
                        <Database className="w-10 h-10 text-orange-600 animate-pulse" />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-full shadow-md border border-slate-50">
                        <Search className="w-4 h-4 text-blue-500 animate-bounce" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">Scraping in Progress</h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    {message} <br />
                    Please do not refresh or close this tab.
                </p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-6">
                    <div className="bg-orange-500 h-full w-2/3 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
                </div>

                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Secure Cloud Proxy Active</span>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(200%); }
                }
            `}} />
        </div>
    );
};

export default ScrapingLoadingScreen;