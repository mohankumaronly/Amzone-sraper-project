import React, { useState } from 'react';
import { Bell, User, Menu, Settings, Database, Zap, Loader2 } from 'lucide-react';

const DashboardAppBar = ({ user = { name: "User" }, onMenuClick }) => {
    const [url, setUrl] = useState("");
    const [isScraping, setIsScraping] = useState(false);

    const handleScrape = () => {
        if (!url) return;
        setIsScraping(true);
        console.log("Scraping:", url);
        setTimeout(() => setIsScraping(false), 2000);
    };

    return (
        <header className="h-20 bg-white border-b border-slate-100 sticky top-0 z-40 w-full px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-slate-50 rounded-lg lg:hidden transition-colors"
                >
                    <Menu className="w-6 h-6 text-slate-600" />
                </button>
                <div className="relative max-w-xl w-full hidden md:flex items-center group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Database className={`h-4 w-4 transition-colors ${url ? 'text-orange-500' : 'text-slate-400'}`} />
                    </div>

                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Paste Amazon URL or ASIN to scrape..."
                        className="block w-full pl-10 pr-24 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    />
                    <button
                        onClick={handleScrape}
                        disabled={!url || isScraping}
                        className={`
                            absolute right-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2
                            ${!url
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-100 active:scale-95'}
                        `}
                    >
                        {isScraping ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <Zap className="w-3.5 h-3.5" />
                        )}
                        {isScraping ? 'Scraping...' : 'Scrape'}
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors group">
                    <Bell className="w-5 h-5 group-hover:text-orange-500" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                </button>
                <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors hidden sm:block group">
                    <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                </button>

                <div className="h-8 w-px bg-slate-100 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {user.name}
                        </p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                            Pro Plan
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-linear-to-tr from-orange-500 to-amber-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100 ring-2 ring-white group-hover:scale-105 transition-transform">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardAppBar;