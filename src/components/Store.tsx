import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, ArrowRight, Camera, Sparkles, Loader2, Plane } from 'lucide-react';
import { Product } from '../types';
import { GoogleGenAI } from '@google/genai';

interface StoreProps {
  products: Product[];
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function Store({ products = [] }: StoreProps) {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runwayLooks = products.filter(p => p.runwayLook);
  const otherProducts = products.filter(p => !p.runwayLook);

  const getSmartLead = async (productName: string) => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a luxury fashion & travel concierge for TGC (Tokyo Girls Collection) Vietnam. 
        A user is interested in the "${productName}". 
        Suggest a specific trendy spot in Tokyo to visit wearing this item, and a "Travel Lead" (e.g. a high-end hotel or experience).
        Keep it brief (max 2 sentences), chic, and alluring.`,
      });
      setRecommendation(response.text || null);
    } catch (error) {
      console.error(error);
      setRecommendation("Discover the neon lights of Shibuya in your new look. Book our Tokyo Luxe package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20 p-4">
      {/* Smart Assistant Overlay */}
      <AnimatePresence>
        {recommendation && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-x-4 bottom-28 z-50 glass-panel p-6 rounded-3xl shadow-2xl border-tgc-pink/30 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2 text-tgc-pink">
                <Sparkles size={16} />
                <span className="text-[10px] uppercase font-bold tracking-widest">TGC AI Concierge</span>
              </div>
              <button onClick={() => setRecommendation(null)} className="text-xs opacity-40 hover:opacity-100 transition-opacity">Close</button>
            </div>
            <p className="text-sm font-display leading-relaxed">{recommendation}</p>
            <div className="flex gap-2">
              <button className="flex-1 bg-tgc-pink text-white py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Plane size={14} /> View Travel Deals
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop the Look Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="font-display text-xs uppercase tracking-[0.2em] opacity-40 ml-1">Runway Trends</h3>
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-tgc-pink">
            Shop the Look <ArrowRight size={12} />
          </span>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
          {runwayLooks.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              className="min-w-[280px] group relative rounded-3xl overflow-hidden aspect-[4/5] neo-border"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tgc-black/90 via-tgc-black/20 to-transparent" />
              
              <div className="absolute top-4 right-4 bg-tgc-pink text-white px-3 py-1 rounded-full flex items-center gap-1">
                <Camera size={12} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Runway</span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 space-y-2">
                <h4 className="font-display text-lg font-bold leading-tight">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-mono text-tgc-pink font-bold">${product.price}</span>
                    <button 
                      onClick={() => getSmartLead(product.name)}
                      className="text-[9px] uppercase tracking-widest opacity-60 hover:opacity-100 flex items-center gap-1 mt-1"
                    >
                      {loading ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                      AI Suggestion
                    </button>
                  </div>
                  <button className="bg-tgc-silver text-tgc-black p-2 rounded-full hover:bg-white transition-colors">
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories / Other Products */}
      <div className="space-y-4">
        <h3 className="font-display text-xs uppercase tracking-[0.2em] opacity-40 ml-1">Official Merch & Travel</h3>
        <div className="grid grid-cols-2 gap-4">
          {otherProducts.map((product) => (
            <motion.div 
              key={product.id}
              className="glass-panel p-4 rounded-2xl flex flex-col gap-3"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-tgc-grey">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-mono tracking-widest text-tgc-pink">{product.category}</p>
                <h4 className="font-display text-sm font-bold mt-1 line-clamp-1">{product.name}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono text-xs">${product.price}</span>
                  <div className="flex items-center text-tgc-pink">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-mono ml-1">4.9</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Travel Lead Banner */}
      <div className="rounded-3xl overflow-hidden relative aspect-[16/7] neo-border">
        <img 
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" 
          alt="Tokyo Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-tgc-pink/20 mix-blend-overlay" />
        <div className="absolute inset-0 flex flex-col justify-center p-8 gap-2">
          <h3 className="font-accent italic text-3xl text-white">Destination: Tokyo</h3>
          <p className="text-[10px] uppercase tracking-[0.3em] font-display font-medium text-white/80">Exclusive Fan Packages Available</p>
          <button className="mt-2 w-fit bg-white text-tgc-black text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-tgc-pink hover:text-white transition-colors">
            Inquire Now
          </button>
        </div>
      </div>
    </div>
  );
}
