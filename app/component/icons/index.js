// 图标组件管理文件
// 这个文件用来统一管理所有的自定义SVG图标

// 导入 Lucide 图标
import { ShowerHead, Bath } from "lucide-react";

// 基础图标组件
export function CustomIcon({ name, className = "w-6 h-6", ...props }) {
  const iconPath = `/icons/${name}.svg`;
  
  return (
    <img 
      src={iconPath} 
      alt={name} 
      className={className}
      {...props}
    />
  );
}

// 厨房设备图标组件 - 使用您现有的SVG
export function KitchenIcon({ type, className = "w-6 h-6" }) {
  const iconMap = {
    'four': '/icons/cafeGrains.svg', // 可以替换为更合适的图标
    'refrigerateur': '/icons/EauChaude.svg', // 可以替换为更合适的图标
    'lave-vaisselle': '/icons/Serviettes.svg',
    'plaque': '/icons/cafeGrains.svg',
    'hotte': '/icons/Ventilateurs.svg',
    'vapeur': '/icons/EauChaude.svg'
  };

  const iconPath = iconMap[type];

  return (
    <img 
      src={iconPath} 
      alt={type} 
      className={className}
    />
  );
}

// 房间设施图标组件
export function RoomIcon({ type, className = "w-6 h-6" }) {
  // Lucide 图标映射（带金色样式）
  const lucideIconMap = {
    'shower-head': () => <ShowerHead className={className} color="#D4AF37" strokeWidth={1.5} />,
    'douche': () => <ShowerHead className={className} color="#D4AF37" strokeWidth={1.5} />, // 法语别名
  };

  // JSX 组件映射
  const jsxIconMap = {
    // 保留自定义 JSX 组件以备将来使用
  };

  // SVG 文件映射
  const iconMap = {
    'alarme': '/icons/Alarme.svg',
    'bidet': '/icons/Bidet.svg',
    'billard': '/icons/Billard.svg',
    'cendrier': '/icons/Cendrier.svg',
    'chaise-haute': '/icons/ChaiseHaute.svg',
    'chaises-longues': '/icons/ChaisesLongues.svg',
    'cintres': '/icons/Cintres.svg',
    'corde': '/icons/Corde.svg',
    'eau-chaude': '/icons/EauChaude.svg',
    'echecs': '/icons/Échecs.svg',
    'etendoir': '/icons/Étendoir.svg',
    'hamac': '/icons/Hamac.svg',
    'jeux-societe': '/icons/JeuxSociété.svg',
    'serviettes': '/icons/Serviettes.svg',
    'shampoo': '/icons/ShampooGelDouche.svg',
    'toilette': '/icons/Toilette.svg',
    'ventilateurs': '/icons/Ventilateurs.svg',
    'vue-piscine': '/icons/VueSurLaPiscine.svg',
    'vue-jardin': '/icons/VueSurLeJardin.svg',
    'yoga': '/icons/Yoga.svg',
    'baby-bed': '/icons/babybed.svg',
    'boxe': '/icons/boxe.svg',
    'cafe': '/icons/cafeGrains.svg',
    'cheveux': '/icons/cheveux.svg',
    'linge': '/icons/linge.svg',
    'panoramiques': '/icons/panoramiques.svg',
    'ping-pong': '/icons/pingPong.svg',
    'repasser': '/icons/repasser.svg'
  };

  // 优先检查 Lucide 图标
  const LucideComponent = lucideIconMap[type];
  if (LucideComponent) {
    return LucideComponent();
  }

  // 然后检查 JSX 组件
  const JsxComponent = jsxIconMap[type];
  if (JsxComponent) {
    return <JsxComponent className={className} />;
  }

  // 最后回退到 SVG 文件
  const iconPath = iconMap[type];
  return iconPath ? (
    <img 
      src={iconPath} 
      alt={type} 
      className={className}
    />
  ) : null;
}

// 导出所有图标组件
export { ShowerHead };

// 图标列表（方便引用）
export const availableIcons = [
  'Alarme', 'Bidet', 'Billard', 'Cendrier', 'ChaiseHaute', 'ChaisesLongues',
  'Cintres', 'Corde', 'EauChaude', 'Échecs', 'Étendoir', 'Hamac',
  'JeuxSociété', 'Serviettes', 'ShampooGelDouche', 'Ventilateurs',
  'VueSurLaPiscine', 'VueSurLeJardin', 'Yoga', 'babybed', 'boxe',
  'cafeGrains', 'cheveux', 'linge', 'panoramiques', 'pingPong', 'repasser',
  'Toilette', // 新增 Toilette 图标
  'shower-head' // 新增淋浴头图标
];
