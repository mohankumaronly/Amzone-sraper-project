import React from 'react';

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm animate-in fade-in duration-500">
            <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 bg-orange-100 rounded-full animate-ping opacity-20"></div>
                <div className="relative w-14 h-14">
                    <div className="absolute inset-0 border-[3px] border-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 border-[3px] border-orange-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
                </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-1">
                <p className="text-slate-700 font-bold text-base tracking-tight">
                    Loading...
                </p>
            </div>
            <div className="absolute bottom-10">
                <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] font-semibold">
                    AmzFlow Engine
                </p>
            </div>
        </div>
    );
};

export default LoadingScreen;