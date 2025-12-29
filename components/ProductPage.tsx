
import React, { useState, useEffect } from 'react';
import { TranslationSchema } from '../types';
import { Cpu, HardDrive, Shield, Server, ArrowRight, Check, Scale, Database, ShieldAlert, ArrowRightLeft, Activity, ChevronRight } from 'lucide-react';

interface ProductPageProps {
  t: TranslationSchema;
  productId: 
    | 'cloud-compute' 
    | 'bare-metal' 
    | 'auto-scaling' 
    | 'hdd' 
    | 'nas' 
    | 'firewall' 
    | 'ddos' 
    | 'load-balancing';
  onOpenAuth: (mode: 'login') => void;
  onNavigate: (view: any) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ t, productId, onOpenAuth, onNavigate }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Define product data mapping
  const productData = {
    'cloud-compute': {
      category: t.productsDropdown.computing,
      title: t.productsDropdown.cloudCompute,
      desc: t.productsDropdown.cloudComputeDesc,
      icon: Cpu,
      color: 'blue',
      features: ['Virtual CPU Isolation', 'Memory Encryption', 'Instant Provisioning'],
      specs: [
        { label: 'vCPU', value: 'Up to 96 Cores' },
        { label: 'Memory', value: 'Up to 384GB' },
        { label: 'Network', value: '25 Gbps' }
      ]
    },
    'bare-metal': {
      category: t.productsDropdown.computing,
      title: t.productsDropdown.bareMetal,
      desc: t.productsDropdown.bareMetalDesc,
      icon: Server,
      color: 'blue',
      features: ['No Virtualization Overhead', 'Direct Hardware Access', 'Custom Kernel Support'],
      specs: [
        { label: 'Processor', value: 'Intel Xeon Platinum' },
        { label: 'Storage', value: 'NVMe Local RAID' },
        { label: 'Uplink', value: '100 Gbps Dedicated' }
      ]
    },
    'auto-scaling': {
      category: t.productsDropdown.computing,
      title: t.productsDropdown.autoScaling,
      desc: t.productsDropdown.autoScalingDesc,
      icon: Scale,
      color: 'blue',
      features: ['Traffic-based Scaling', 'Scheduled Actions', 'Health Check Integration'],
      specs: [
        { label: 'Trigger', value: 'CPU / Network / Custom' },
        { label: 'Cooldown', value: 'Configurable' },
        { label: 'Cost', value: 'Pay per Second' }
      ]
    },
    'hdd': {
      category: t.productsDropdown.storage,
      title: t.productsDropdown.hdd,
      desc: t.productsDropdown.hddDesc,
      icon: HardDrive,
      color: 'indigo',
      features: ['High Capacity', 'Cost Effective', 'Data Archiving'],
      specs: [
        { label: 'Max Size', value: '16TB per Volume' },
        { label: 'Throughput', value: '350 MB/s' },
        { label: 'Redundancy', value: 'Triple Replica' }
      ]
    },
    'nas': {
      category: t.productsDropdown.storage,
      title: t.productsDropdown.nas,
      desc: t.productsDropdown.nasDesc,
      icon: Database,
      color: 'indigo',
      features: ['Shared File System', 'NFS/CIFS Support', 'Snapshot Management'],
      specs: [
        { label: 'Protocol', value: 'NFSv4 / SMB' },
        { label: 'Capacity', value: 'Elastic' },
        { label: 'Access', value: 'VPC Internal' }
      ]
    },
    'firewall': {
      category: t.productsDropdown.network,
      title: t.productsDropdown.firewall,
      desc: t.productsDropdown.firewallDesc,
      icon: Shield,
      color: 'purple',
      features: ['Stateful Inspection', 'Rule-based Filtering', 'VPN Support'],
      specs: [
        { label: 'Rules', value: 'Inbound / Outbound' },
        { label: 'Logging', value: 'Real-time' },
        { label: 'Type', value: 'Managed Service' }
      ]
    },
    'ddos': {
      category: t.productsDropdown.network,
      title: t.productsDropdown.ddos,
      desc: t.productsDropdown.ddosDesc,
      icon: ShieldAlert,
      color: 'purple',
      features: ['Traffic Scrubbing', 'Bot Mitigation', 'Layer 7 Protection'],
      specs: [
        { label: 'Capacity', value: '2 Tbps+' },
        { label: 'Latency', value: '< 1ms Added' },
        { label: 'Activation', value: 'Always On' }
      ]
    },
    'load-balancing': {
      category: t.productsDropdown.network,
      title: t.productsDropdown.loadBalancing,
      desc: t.productsDropdown.loadBalancingDesc,
      icon: ArrowRightLeft,
      color: 'purple',
      features: ['Round Robin', 'Least Connection', 'SSL Termination'],
      specs: [
        { label: 'Type', value: 'L4 / L7' },
        { label: 'Health Check', value: 'TCP / HTTP(S)' },
        { label: 'SSL', value: 'Free Certs' }
      ]
    }
  };

  const currentProduct = productData[productId];
  const Icon = currentProduct.icon;

  // Define sidebar navigation items based on the current category
  const getRelatedLinks = () => {
      const allKeys = Object.keys(productData) as Array<keyof typeof productData>;
      // Filter keys that belong to the same category
      return allKeys.filter(key => productData[key].category === currentProduct.category);
  };

  const relatedLinks = getRelatedLinks();

  return (
    <div className="pt-24 pb-20 container mx-auto px-6 min-h-screen flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Navigation (Like Docs Home) */}
      <aside className="w-full md:w-64 shrink-0 animate-in slide-in-from-left-4 duration-500 hidden md:block">
         <div className="sticky top-28 space-y-8">
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-${currentProduct.color}-500`}></span>
                    {currentProduct.category}
                </h3>
                <div className="space-y-1">
                    {relatedLinks.map((key) => (
                        <button 
                            key={key}
                            onClick={() => onNavigate(key)}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                                productId === key 
                                ? `bg-${currentProduct.color}-500/10 text-${currentProduct.color}-400 border border-${currentProduct.color}-500/20` 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {productData[key].title}
                            {productId === key && <ChevronRight className="w-3.5 h-3.5" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <div className="text-xs font-bold text-gray-400 mb-2">Need Help?</div>
                <p className="text-[11px] text-gray-500 mb-4 leading-relaxed">
                    Our architects are ready to design your infrastructure.
                </p>
                <button className="text-xs font-bold text-white hover:underline decoration-blue-500 underline-offset-4">
                    Contact Sales &rarr;
                </button>
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 animate-in slide-in-from-bottom-4 duration-500 delay-100">
        
        {/* Mobile Category Select (Visible only on small screens) */}
        <div className="md:hidden mb-8 overflow-x-auto pb-2 flex gap-2 no-scrollbar">
             {relatedLinks.map((key) => (
                <button 
                    key={key}
                    onClick={() => onNavigate(key)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                         productId === key 
                         ? `bg-${currentProduct.color}-600 text-white border-${currentProduct.color}-500` 
                         : 'bg-zinc-900/50 text-gray-400 border-white/10'
                    }`}
                >
                    {productData[key].title}
                </button>
             ))}
        </div>

        <div className="max-w-4xl">
            {/* Hero Section of Product */}
            <div className="mb-12 relative p-8 md:p-12 rounded-[40px] overflow-hidden border border-white/10 bg-[#0a0a0a]">
                {/* Background Glows */}
                <div className={`absolute top-0 right-0 w-64 h-64 bg-${currentProduct.color}-600/10 rounded-full blur-[80px] -z-10`}></div>
                
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center relative z-10">
                    <div className={`w-20 h-20 rounded-2xl bg-${currentProduct.color}-500/10 flex items-center justify-center border border-${currentProduct.color}-500/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                        <Icon className={`w-10 h-10 text-${currentProduct.color}-400`} />
                    </div>
                    <div>
                        <div className={`text-xs font-bold text-${currentProduct.color}-400 mb-2 uppercase tracking-widest`}>
                            {currentProduct.category}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{currentProduct.title}</h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            {currentProduct.desc}
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap gap-4">
                     <button 
                        onClick={() => onOpenAuth('login')}
                        className={`px-8 py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors flex items-center gap-2 active:scale-95`}
                    >
                        Get Started <ArrowRight className="w-4 h-4" />
                     </button>
                     <button className="px-8 py-3 rounded-xl bg-white/5 text-white font-bold hover:bg-white/10 transition-colors border border-white/10">
                        Documentation
                     </button>
                </div>
            </div>

            {/* Specs & Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Key Features */}
                <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-gray-400" />
                        Key Features
                    </h2>
                    <ul className="space-y-4">
                        {currentProduct.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                <div className={`mt-0.5 w-5 h-5 rounded-full bg-${currentProduct.color}-500/20 flex items-center justify-center shrink-0`}>
                                    <Check className={`w-3 h-3 text-${currentProduct.color}-400`} />
                                </div>
                                {feat}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Technical Specs */}
                <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Server className="w-5 h-5 text-gray-400" />
                        Technical Specifications
                    </h2>
                    <div className="space-y-4">
                        {currentProduct.specs.map((spec, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                <span className="text-sm font-medium text-gray-500">{spec.label}</span>
                                <span className="text-sm font-bold text-white">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Content / FAQ Style */}
            <div className="p-8 rounded-3xl bg-zinc-900/20 border border-white/5 border-dashed">
                <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-2">Enterprise Grade Security</h3>
                        <p className="text-sm text-gray-500 max-w-2xl">
                            All {currentProduct.title} instances are protected by our global DDoS mitigation system and isolated in private VLANs by default. Compliance with ISO 27001 and GDPR.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default ProductPage;
