import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Calendar } from 'lucide-react';

const ClockWidget = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const tzLabel = tz.split('/').pop().replace(/_/g, ' ');

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;

  const pad = (n) => String(n).padStart(2, '0');

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-br from-kcsBlue to-kcsBlue-dark text-white rounded-2xl p-5 shadow-lg overflow-hidden relative">
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-white/5 rounded-full" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-kcsYellow" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-200">Local Time</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-300">
            <MapPin size={12} /> {tzLabel}
          </div>
        </div>

        {/* Time */}
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-3xl md:text-4xl font-bold tabular-nums">{pad(h12)}</span>
          <span className="text-2xl font-bold text-kcsYellow animate-pulse">:</span>
          <span className="text-3xl md:text-4xl font-bold tabular-nums">{pad(minutes)}</span>
          <span className="text-2xl font-bold text-kcsYellow animate-pulse">:</span>
          <span className="text-2xl md:text-3xl font-bold tabular-nums text-kcsYellow">{pad(seconds)}</span>
          <span className="text-sm font-bold ml-1 text-gray-200">{ampm}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-xs text-gray-200 mt-2">
          <Calendar size={12} className="text-kcsYellow" />
          {dateStr}
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;