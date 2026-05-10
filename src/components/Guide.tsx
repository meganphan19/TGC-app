import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { MapPin, Navigation, Info } from 'lucide-react';
import { MOCK_LOCATIONS } from '../mockData';
import { EventLocation } from '../types';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface MarkerWithInfoProps {
  location: EventLocation;
  key?: string | number;
}

function MarkerWithInfo({ location }: MarkerWithInfoProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [open, setOpen] = useState(false);

  const getPinColor = (type: string) => {
    switch (type) {
      case 'Stage': return '#FF007A';
      case 'Booth': return '#38BDF8';
      case 'Shop': return '#E4E3E0';
      default: return '#94A3B8';
    }
  };

  return (
    <>
      <AdvancedMarker 
        ref={markerRef} 
        position={{ lat: location.lat, lng: location.lng }} 
        onClick={() => setOpen(true)}
      >
        <Pin background={getPinColor(location.type)} glyphColor="#080808" />
      </AdvancedMarker>
      {open && (
        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
          <div className="p-2 space-y-1 text-tgc-black">
            <p className="text-[10px] uppercase font-mono tracking-widest text-tgc-pink">{location.type}</p>
            <h4 className="font-display font-bold text-sm">{location.name}</h4>
            <p className="text-[11px] leading-tight opacity-70">{location.description}</p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function Guide() {
  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] p-8 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-tgc-pink/10 flex items-center justify-center mb-2">
          <MapPin size={32} className="text-tgc-pink" />
        </div>
        <h2 className="font-display text-xl font-bold uppercase tracking-tight">Map Key Required</h2>
        <p className="text-sm opacity-60 max-w-xs mx-auto">
          Add your <code>GOOGLE_MAPS_PLATFORM_KEY</code> to the AI Studio Secrets panel to unlock the interactive guide.
        </p>
        <div className="text-[10px] uppercase tracking-widest p-4 glass-panel rounded-xl text-left space-y-2">
           <div>1. Open Settings (⚙️ icon)</div>
           <div>2. Secrets -&gt; Add GOOGLE_MAPS_PLATFORM_KEY</div>
           <div>3. App will auto-rebuild</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[75vh] w-full rounded-3xl overflow-hidden neo-border relative mt-4">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{ lat: 10.7769, lng: 106.7009 }}
          defaultZoom={17}
          mapId="TGC_VN_MAP"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          gestureHandling="greedy"
          disableDefaultUI={true}
          style={{ width: '100%', height: '100%' }}
        >
          {MOCK_LOCATIONS.map(loc => (
            <MarkerWithInfo key={loc.id} location={loc} />
          ))}
        </Map>
      </APIProvider>

      {/* Floating Info Overlay */}
      <div className="absolute top-4 left-4 right-4 flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        {MOCK_LOCATIONS.map(loc => (
          <motion.button 
            key={loc.id}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center gap-2 bg-tgc-black/80 backdrop-blur-md border border-tgc-silver/20 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
          >
           <div className={`w-2 h-2 rounded-full ${loc.type === 'Stage' ? 'bg-tgc-pink' : 'bg-tgc-silver'}`} />
           {loc.name}
          </motion.button>
        ))}
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col gap-3">
        <button className="bg-tgc-pink text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-tgc-pink/40 scale-110">
          <Navigation size={20} />
        </button>
      </div>
    </div>
  );
}
