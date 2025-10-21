#!/bin/bash

# 备份和恢复翻译文件的脚本

BACKUP_DIR="backups"
TRANSLATIONS_FILE="app/translations.js"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 创建备份
backup() {
    echo -e "${YELLOW}📦 创建备份...${NC}"
    
    # 创建备份目录
    mkdir -p "$BACKUP_DIR"
    
    # 备份文件
    BACKUP_FILE="$BACKUP_DIR/translations_${TIMESTAMP}.js"
    cp "$TRANSLATIONS_FILE" "$BACKUP_FILE"
    
    echo -e "${GREEN}✅ 备份已创建: $BACKUP_FILE${NC}"
    echo -e "${GREEN}   时间: $(date)${NC}"
}

# 列出所有备份
list() {
    echo -e "${YELLOW}📋 可用的备份:${NC}\n"
    
    if [ ! -d "$BACKUP_DIR" ] || [ -z "$(ls -A $BACKUP_DIR)" ]; then
        echo -e "${RED}❌ 没有找到备份文件${NC}"
        exit 1
    fi
    
    ls -lht "$BACKUP_DIR" | tail -n +2 | awk '{print NR". "$9" ("$6" "$7" "$8")"}'
}

# 恢复备份
restore() {
    if [ -z "$1" ]; then
        echo -e "${RED}❌ 请指定要恢复的备份编号${NC}"
        echo -e "${YELLOW}使用方法: ./backup.sh restore <编号>${NC}"
        list
        exit 1
    fi
    
    # 获取指定的备份文件
    BACKUP_FILE=$(ls -t "$BACKUP_DIR"/*.js | sed -n "${1}p")
    
    if [ -z "$BACKUP_FILE" ]; then
        echo -e "${RED}❌ 找不到备份 #$1${NC}"
        list
        exit 1
    fi
    
    echo -e "${YELLOW}🔄 恢复备份: $BACKUP_FILE${NC}"
    
    # 先备份当前文件
    echo -e "${YELLOW}📦 先备份当前文件...${NC}"
    backup
    
    # 恢复
    cp "$BACKUP_FILE" "$TRANSLATIONS_FILE"
    
    echo -e "${GREEN}✅ 恢复完成！${NC}"
}

# 显示帮助
help() {
    echo -e "${YELLOW}📖 备份和恢复工具${NC}\n"
    echo "用法:"
    echo "  ./scripts/backup.sh backup          - 创建备份"
    echo "  ./scripts/backup.sh list            - 列出所有备份"
    echo "  ./scripts/backup.sh restore <编号>  - 恢复指定备份"
    echo "  ./scripts/backup.sh help            - 显示帮助"
    echo ""
    echo "示例:"
    echo "  ./scripts/backup.sh backup          # 备份当前文件"
    echo "  ./scripts/backup.sh list            # 查看备份列表"
    echo "  ./scripts/backup.sh restore 1       # 恢复第1个备份"
}

# 主逻辑
case "$1" in
    backup)
        backup
        ;;
    list)
        list
        ;;
    restore)
        restore "$2"
        ;;
    help|--help|-h|"")
        help
        ;;
    *)
        echo -e "${RED}❌ 未知命令: $1${NC}"
        help
        exit 1
        ;;
esac
