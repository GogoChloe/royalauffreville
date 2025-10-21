/**
 * 批量添加experience页面的翻译
 */

const fs = require('fs');
const path = require('path');

const experienceTranslations = {
  fr: {
    famillePage: {
      // 已添加
    },
    entreAmisPage: {
      breadcrumbHome: "Accueil",
      breadcrumbExperiences: "Expériences",
      breadcrumbFriends: "Entre Amis",
      title: "Retrouvailles Entre Amis",
      subtitle: "Confort, élégance et rires partagés"
    },
    teamBuildingPage: {
      breadcrumbHome: "Accueil",
      breadcrumbExperiences: "Expériences",
      breadcrumbTeamBuilding: "Team Building",
      title: "Team Building & Séminaires",
      subtitle: "Inspiration, cohésion et sérénité"
    },
    retraitesStagesPage: {
      breadcrumbHome: "Accueil",
      breadcrumbExperiences: "Expériences",
      breadcrumbRetreats: "Retraites & Stages",
      title: "Retraites & Stages",
      subtitle: "Un havre de sérénité au cœur de la nature"
    }
  },
  en: {
    famillePage: {
      breadcrumbHome: "Home",
      breadcrumbExperiences: "Experiences",
      breadcrumbFamily: "Family",
      title: "Family Moments",
      subtitle: "Equipped to delight, designed for sharing",
      testimonialQuote: "A dream setting to experience the magic of Christmas with family, around the fire and smiles.",
      testimonialAuthor: "Elisabeth Noel, 2024",
      discoverHouse: "Discover the family home",
      whyFamiliesLove: "Why families love Royal Auffreville",
      momentsToShare: "Moments to share",
      localActivities: "Local activities nearby",
      localActivitiesSubtitle: "A haven of peace surrounded by nature, with many activities for the whole family",
      moreActivities: "And many other activities to discover in the surroundings of Auffreville-Brasseuil",
      ctaTitle: "What if your next family getaway was here?",
      ctaButton: "Book your stay",
      features: {
        babyEquipment: "Baby equipment: cot, high chair",
        diningSpace: "Friendly dining area (large table, barbecue, large terrace)",
        calmNature: "Calm environment and nature nearby",
        gameSpaces: "Multiple game spaces"
      },
      moments: {
        pool: "Relax in the heated pool",
        games: "Play together - billiards, ping-pong, board games",
        dinner: "Dine at sunset on the terrace"
      },
      activities: {
        farm: {
          title: "Educational Farms",
          description: "Discovery of farm animals and nature workshops",
          time: "10 min"
        },
        zoo: {
          title: "Thoiry Zoo",
          description: "Safari, exotic animals and activities for children",
          time: "15 min"
        },
        paintball: {
          title: "Paintball Adventure",
          description: "Paintball games and adventure courses in the forest",
          time: "20 min"
        },
        hiking: {
          title: "Hiking Trails",
          description: "Walking or cycling in the countryside",
          time: "5 min"
        },
        castle: {
          title: "Château de Thoiry",
          description: "Historic castle and French gardens",
          time: "15 min"
        },
        aquatic: {
          title: "Swimming Pool & Water Activities",
          description: "Aquatic center and sports activities",
          time: "12 min"
        }
      }
    },
    entreAmisPage: {
      breadcrumbHome: "Home",
      breadcrumbExperiences: "Experiences",
      breadcrumbFriends: "Among Friends",
      title: "Reunions Among Friends",
      subtitle: "Comfort, elegance and shared laughter"
    },
    teamBuildingPage: {
      breadcrumbHome: "Home",
      breadcrumbExperiences: "Experiences",
      breadcrumbTeamBuilding: "Team Building",
      title: "Team Building & Seminars",
      subtitle: "Inspiration, cohesion and serenity"
    },
    retraitesStagesPage: {
      breadcrumbHome: "Home",
      breadcrumbExperiences: "Experiences",
      breadcrumbRetreats: "Retreats & Workshops",
      title: "Retreats & Workshops",
      subtitle: "A haven of serenity in the heart of nature"
    }
  },
  cn: {
    famillePage: {
      breadcrumbHome: "首页",
      breadcrumbExperiences: "体验",
      breadcrumbFamily: "家庭",
      title: "家庭时光",
      subtitle: "装备齐全，专为分享而设计",
      testimonialQuote: "一个梦幻般的环境，可以与家人一起体验圣诞节的魔力，围绕着火炉和微笑。",
      testimonialAuthor: "Elisabeth Noel, 2024",
      discoverHouse: "探索家庭住宅",
      whyFamiliesLove: "为什么家庭喜爱Royal Auffreville",
      momentsToShare: "分享时刻",
      localActivities: "附近的当地活动",
      localActivitiesSubtitle: "被大自然环绕的宁静港湾，为全家提供众多活动",
      moreActivities: "还有更多活动可在Auffreville-Brasseuil周边探索",
      ctaTitle: "下一次家庭度假会在这里吗？",
      ctaButton: "预订您的住宿",
      features: {
        babyEquipment: "婴儿设备：婴儿床、高脚椅",
        diningSpace: "友好的用餐区（大桌子、烧烤、大露台）",
        calmNature: "宁静的环境和附近的自然",
        gameSpaces: "多个游戏空间"
      },
      moments: {
        pool: "在加热泳池中放松",
        games: "一起玩耍 - 台球、乒乓球、桌游",
        dinner: "在露台上享受日落晚餐"
      },
      activities: {
        farm: {
          title: "教育农场",
          description: "发现农场动物和自然工作坊",
          time: "10 分钟"
        },
        zoo: {
          title: "托里动物园",
          description: "野生动物园、异国动物和儿童活动",
          time: "15 分钟"
        },
        paintball: {
          title: "彩弹冒险",
          description: "彩弹游戏和森林冒险课程",
          time: "20 分钟"
        },
        hiking: {
          title: "徒步小径",
          description: "在乡村步行或骑行",
          time: "5 分钟"
        },
        castle: {
          title: "托里城堡",
          description: "历史城堡和法式花园",
          time: "15 分钟"
        },
        aquatic: {
          title: "游泳池和水上活动",
          description: "水上中心和体育活动",
          time: "12 分钟"
        }
      }
    },
    entreAmisPage: {
      breadcrumbHome: "首页",
      breadcrumbExperiences: "体验",
      breadcrumbFriends: "朋友聚会",
      title: "朋友重聚",
      subtitle: "舒适、优雅和共享欢笑"
    },
    teamBuildingPage: {
      breadcrumbHome: "首页",
      breadcrumbExperiences: "体验",
      breadcrumbTeamBuilding: "团队建设",
      title: "团队建设和研讨会",
      subtitle: "灵感、凝聚力和宁静"
    },
    retraitesStagesPage: {
      breadcrumbHome: "首页",
      breadcrumbExperiences: "体验",
      breadcrumbRetreats: "静修和工作坊",
      title: "静修和工作坊",
      subtitle: "大自然中的宁静港湾"
    }
  }
};

console.log('✅ Experience translations structure ready');
console.log('这个脚本包含了experience页面的翻译结构');
console.log('请手动将这些翻译添加到 translations.js 文件中');
