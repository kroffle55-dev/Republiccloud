
import React from 'react';
import { TranslationSchema } from '../types';
import { CheckCircle, AlertTriangle, Activity, Server, Globe } from 'lucide-react';

interface StatusPageProps {
  t: TranslationSchema;
}

const StatusPage: React.FC<StatusPageProps> = ({ t }) => {
  const regions = [
    { name: 'Seoul (KR-SEL-1)', status: 'operational', latency: '2ms' },
    { name: 'Tokyo (JP-TYO-2)', status: 'operational', latency: '35ms' },
    { name: 'Virginia (US-EAST-1)', status: 'operational', latency: '180ms' },
    { name: 'Frankfurt (EU-CENTRAL)', status: 'operational', latency: '210ms' },
    { name: 'Singapore (AP-SE-1)', status: 'operational', latency: '80ms' },
  ];

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {t.status.operational}
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4">{t.status.title}</h1>
        <p className="text-gray-400 text-lg">{t.status.subtitle}</p>
      </div>

      {/* Main Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-in slide-in-from-bottom-8 duration-700 delay-100">
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 hover:border-blue-500/30 transition-colors">
            <Activity className="w-10 h-10 text-blue-500" />
            <div>
                <div className="text-3xl font-black text-white">99.99%</div>
                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">{t.status.uptime}</div>
            </div>
        </div>
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 hover:border-green-500/30 transition-colors">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <div>
                <div className="text-3xl font-black text-white">100%</div>
                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">API Availability</div>
            </div>
        </div>
        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-4 hover:border-purple-500/30 transition-colors">
            <Globe className="w-10 h-10 text-purple-500" />
            <div>
                <div className="text-3xl font-black text-white">5</div>
                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">Active Regions</div>
            </div>
        </div>
      </div>

      {/* Region Status List */}
      <div className="max-w-4xl mx-auto mb-16 animate-in slide-in-from-bottom-12 duration-700 delay-200">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-gray-400" />
            {t.status.regions}
        </h2>
        <div className="space-y-3">
            {regions.map((region, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <span className="font-bold text-sm text-gray-200">{region.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="text-xs font-mono text-gray-500 hidden sm:block">Latency: {region.latency}</span>
                        <span className="text-xs font-bold text-green-500 uppercase tracking-wider">{t.status.operational}</span>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Incident History */}
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-12 duration-700 delay-300">
         <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gray-400" />
            {t.status.incidentHistory}
        </h2>
        <div className="p-12 rounded-3xl bg-zinc-900/20 border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-12 h-12 text-gray-700 mb-4" />
            <p className="text-gray-500 font-medium">{t.status.noIncidents}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
