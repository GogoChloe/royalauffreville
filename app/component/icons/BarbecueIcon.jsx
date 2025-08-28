// BarbecueIcon.jsx
export default function BarbecueIcon({ className = "", ...props }) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 煤炉盆 */}
      <path d="M14 28a18 18 0 0 0 36 0H14z" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 炉盖 */}
      <path d="M20 20a12 8 0 0 1 24 0" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="12" x2="32" y2="8" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 烟雾 */}
      <path d="M25 10c-2 2 2 3 0 5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M39 9c-2 2 2 3 0 5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 脚架 */}
      <line x1="24" y1="46" x2="18" y2="58" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="40" y1="46" x2="46" y2="58" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="32" y1="46" x2="32" y2="60" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* 轮子 */}
      <circle cx="18" cy="58" r="2" fill="#D4AF37" stroke="none" />
      <circle cx="46" cy="58" r="2" fill="#D4AF37" stroke="none" />
      {/* 烤网 */}
      <line x1="18" y1="34" x2="46" y2="34" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="38" x2="44" y2="38" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
