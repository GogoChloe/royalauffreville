// 图标组件管理文件
// 这个文件用来统一管理所有的自定义SVG图标

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

  const iconPath = iconMap[type];

  return iconPath ? (
    <img 
      src={iconPath} 
      alt={type} 
      className={className}
    />
  ) : null;
}

// 图标列表（方便引用）
export const availableIcons = [
  'Alarme', 'Bidet', 'Billard', 'Cendrier', 'ChaiseHaute', 'ChaisesLongues',
  'Cintres', 'Corde', 'EauChaude', 'Échecs', 'Étendoir', 'Hamac',
  'JeuxSociété', 'Serviettes', 'ShampooGelDouche', 'Ventilateurs',
  'VueSurLaPiscine', 'VueSurLeJardin', 'Yoga', 'babybed', 'boxe',
  'cafeGrains', 'cheveux', 'linge', 'panoramiques', 'pingPong', 'repasser'
];
