"use client";

import { useRouter } from "next/navigation";

export function Breadcrumb({ items }) {
  const router = useRouter();

  const handleClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
      <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
        {items.map((item, index) => (
          <span key={index}>
            {item.path ? (
              <button
                onClick={() => handleClick(item.path)}
                className="hover:text-[#D4AF37] hover:underline transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-[#8B5E3C] font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && <span className="mx-1">&gt;</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
