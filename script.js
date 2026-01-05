// 无尽卷轴 - 永远的"此刻"
class InfiniteScrollOfNow {
    constructor() {
        this.container = document.querySelector('.scroll-container');
        this.content = document.getElementById('scrollContent');
        this.contentPool = this.getContentPool();
        this.currentIndex = 0;
        this.isScrolling = false;
        this.scrollThreshold = 300; // 触发重新定位的阈值

        this.init();
    }

    // 内容池 - 禅意句子
    getContentPool() {
        return [
            '春去秋来',
            '雲無心以出岫',
            '鳥倦飛而知還',
            '花開花落',
            '水流雲在',
            '行到水窮處',
            '坐看雲起時',
            '明月松間照',
            '清泉石上流',
            '空山新雨後',
            '天氣晚來秋',
            '采菊東籬下',
            '悠然見南山',
            '山氣日夕佳',
            '飛鳥相與還',
            '此中有真意',
            '欲辨已忘言',
            '萬物靜觀皆自得',
            '四時佳興與人同',
            '隨處遇之',
            '不滯於物',
            '去留無意',
            '寵辱不驚',
            '閑看庭前花開花落',
            '漫隨天外雲卷雲舒',
            '一花一世界',
            '一葉一菩提',
            '念念不住',
            '前念今念後念',
            '念念不相待',
            '剎那即永恆',
            '當下即是',
        ];
    }

    init() {
        // 初始化：创建初始内容
        this.createInitialContent();

        // 初始滚动到中间
        this.centerScroll();

        // 监听滚动事件
        this.container.addEventListener('scroll', () => this.handleScroll());

        // 平滑过渡
        setTimeout(() => {
            this.container.style.scrollBehavior = 'auto';
        }, 100);
    }

    createInitialContent() {
        // 创建足够的初始内容填充视口
        const itemCount = 15; // 初始项目数量

        for (let i = 0; i < itemCount; i++) {
            this.addItem('append');
        }
    }

    addItem(position = 'append') {
        const item = this.createScrollItem();
        const spacer = this.createSpacer();

        if (position === 'prepend') {
            this.content.insertBefore(spacer, this.content.firstChild);
            this.content.insertBefore(item, this.content.firstChild);
        } else {
            this.content.appendChild(item);
            this.content.appendChild(spacer);
        }
    }

    createScrollItem() {
        const item = document.createElement('div');
        item.className = 'scroll-item';

        // 随机选择内容
        const text = this.contentPool[this.currentIndex % this.contentPool.length];
        this.currentIndex++;

        // 随机添加变体样式 - 体现"每次角度略有不同"
        const variant = Math.floor(Math.random() * 3) + 1;
        item.classList.add(`variant-${variant}`);

        const content = document.createElement('div');
        content.className = 'scroll-item-content';
        content.textContent = text;

        item.appendChild(content);

        return item;
    }

    createSpacer() {
        const spacer = document.createElement('div');
        spacer.className = 'spacer';
        return spacer;
    }

    handleScroll() {
        if (this.isScrolling) return;

        this.isScrolling = true;

        requestAnimationFrame(() => {
            const scrollLeft = this.container.scrollLeft;
            const scrollWidth = this.container.scrollWidth;
            const clientWidth = this.container.clientWidth;
            const center = (scrollWidth - clientWidth) / 2;

            // 如果偏离中心太远，重新定位
            if (Math.abs(scrollLeft - center) > this.scrollThreshold) {
                this.rebalance(scrollLeft, center);
            }

            this.isScrolling = false;
        });
    }

    rebalance(currentScroll, center) {
        const isScrollingRight = currentScroll > center;

        if (isScrollingRight) {
            // 向右滚动 - 添加新内容到右边，移除左边
            this.addItem('append');
            this.removeOldItems('start', 2);
        } else {
            // 向左滚动 - 添加新内容到左边，移除右边
            this.addItem('prepend');
            this.removeOldItems('end', 2);
        }

        // 重新居中 - 这是关键：创造"永远在此刻"的幻觉
        setTimeout(() => {
            this.centerScroll();
        }, 10);
    }

    removeOldItems(position, count) {
        for (let i = 0; i < count; i++) {
            if (position === 'start') {
                if (this.content.firstChild) {
                    this.content.removeChild(this.content.firstChild);
                }
            } else {
                if (this.content.lastChild) {
                    this.content.removeChild(this.content.lastChild);
                }
            }
        }
    }

    centerScroll() {
        const scrollWidth = this.container.scrollWidth;
        const clientWidth = this.container.clientWidth;
        const center = (scrollWidth - clientWidth) / 2;

        this.container.scrollLeft = center;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new InfiniteScrollOfNow();
});
