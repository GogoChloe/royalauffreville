"use client";

import { CustomIcon, availableIcons } from "@/app/component/icons";

export function IconShowcase() {
  return (
    <div className="w-full px-24 py-16 bg-white">
      <div className="mb-8">
        <h2 className="text-3xl font-bold font-['Playfair_Display_SC'] text-black mb-4">
          Available Icons
        </h2>
        <p className="text-gray-600 font-['Playfair_Display']">
          所有可用的SVG图标库
        </p>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
        {availableIcons.map((iconName) => (
          <div key={iconName} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <CustomIcon 
              name={iconName} 
              className="w-8 h-8 mb-2 text-[#D4AF37]" 
            />
            <span className="text-xs text-center font-['Playfair_Display'] text-gray-700">
              {iconName}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-bold font-['Playfair_Display_SC'] mb-4">使用方法：</h3>
        <div className="space-y-2 text-sm font-['Playfair_Display'] text-gray-700">
          <p><code className="bg-gray-200 px-2 py-1 rounded">{'<CustomIcon name="Alarme" className="w-6 h-6" />'}</code></p>
          <p><code className="bg-gray-200 px-2 py-1 rounded">{'<RoomIcon type="alarme" className="w-6 h-6" />'}</code></p>
        </div>
      </div>
    </div>
  );
}
