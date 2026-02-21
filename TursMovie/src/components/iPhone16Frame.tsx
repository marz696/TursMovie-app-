import type { ReactNode } from 'react';

interface IPhone16FrameProps {
  children: ReactNode;
}

export default function IPhone16Frame({ children }: IPhone16FrameProps) {
  // Get current time
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* iPhone 16 Device Frame */}
      <div className="relative">
        {/* Device Shadow */}
        <div className="absolute inset-0 bg-black/50 blur-3xl scale-95"></div>
        
        {/* Device Body */}
        <div className="relative bg-black rounded-[60px] p-3 shadow-2xl" style={{ width: '393px', height: '852px' }}>
          {/* Screen Bezel */}
          <div className="relative w-full h-full bg-white rounded-[50px] overflow-hidden">
            {/* Status Bar */}
            <div className="absolute top-0 left-0 right-0 h-[47px] px-6 flex items-center justify-between text-black z-50 pointer-events-none">
              <div className="text-[15px]">
                {hours}:{minutes}
              </div>
              <div className="flex items-center gap-1.5">
                {/* Signal */}
                <svg className="w-[18px] h-[12px]" viewBox="0 0 18 12" fill="currentColor">
                  <rect x="0" y="7" width="3" height="5" rx="1"/>
                  <rect x="5" y="4" width="3" height="8" rx="1"/>
                  <rect x="10" y="1" width="3" height="11" rx="1"/>
                  <rect x="15" y="0" width="3" height="12" rx="1"/>
                </svg>
                {/* WiFi */}
                <svg className="w-[18px] h-[12px]" viewBox="0 0 18 12" fill="currentColor">
                  <path d="M9 12C9.828 12 10.5 11.328 10.5 10.5C10.5 9.672 9.828 9 9 9C8.172 9 7.5 9.672 7.5 10.5C7.5 11.328 8.172 12 9 12Z"/>
                  <path d="M9 7.5C10.242 7.5 11.415 7.995 12.303 8.883L13.365 7.821C12.165 6.621 10.62 6 9 6C7.38 6 5.835 6.621 4.635 7.821L5.697 8.883C6.585 7.995 7.758 7.5 9 7.5Z"/>
                  <path d="M9 3C11.22 3 13.32 3.876 14.886 5.442L15.948 4.38C14.07 2.502 11.61 1.5 9 1.5C6.39 1.5 3.93 2.502 2.052 4.38L3.114 5.442C4.68 3.876 6.78 3 9 3Z"/>
                </svg>
                {/* Battery */}
                <svg className="w-[27px] h-[13px]" viewBox="0 0 27 13" fill="none">
                  <rect x="0.5" y="0.5" width="22" height="12" rx="2.5" stroke="currentColor" strokeOpacity="0.35"/>
                  <rect x="2" y="2" width="19" height="9" rx="1" fill="currentColor"/>
                  <path d="M24 4V9C25.5 8.5 25.5 4.5 24 4Z" fill="currentColor" fillOpacity="0.4"/>
                </svg>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
              <div className="w-[126px] h-[37px] bg-black rounded-b-3xl"></div>
            </div>
            
            {/* Screen Content */}
            <div className="w-full h-full overflow-hidden">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
              <div className="w-[140px] h-[5px] bg-black/30 rounded-full"></div>
            </div>
          </div>
          
          {/* Side Buttons */}
          <div className="absolute -left-[3px] top-[180px] w-[3px] h-[60px] bg-gray-800 rounded-l"></div>
          <div className="absolute -left-[3px] top-[260px] w-[3px] h-[60px] bg-gray-800 rounded-l"></div>
          <div className="absolute -left-[3px] top-[340px] w-[3px] h-[60px] bg-gray-800 rounded-l"></div>
          <div className="absolute -right-[3px] top-[240px] w-[3px] h-[100px] bg-gray-800 rounded-r"></div>
        </div>
        
        {/* Device Info Label */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
          <p className="text-gray-400 text-sm">iPhone 16</p>
        </div>
      </div>
    </div>
  );
}