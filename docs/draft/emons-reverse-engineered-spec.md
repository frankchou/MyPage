# emons.de 技術逆向工程規格
**來源：** https://www.emons.de/en
**逆向工程日期：** 2026-06-08
**用途：** 參考 emons.de 的互動機制來建構類似體驗

> **重要發現：** emons.de 的互動機制跟「感受」上理解的不同。
> 看起來像 scroll-driven，實際上是 **wheel/touch 事件驅動的卡片切換 + 分段影片跳轉**。

---

## TECH STACK

| 類別 | 工具 | 用途 |
|------|------|------|
| 網站框架 | Webflow | 整體頁面結構 |
| 動畫 | GSAP + ScrollTrigger | 所有 timeline 動畫 |
| 平滑滾動 | Lenis | 替換原生 scroll，產生慣性感 |
| 輪播 | Splide | 服務卡片 carousel |
| DOM 操作 | jQuery | 卡片展開邏輯 |

---

## COLOR SYSTEM

| 變數名 | 值 | 用途 |
|--------|-----|------|
| 品牌紅漸層 | `linear-gradient(270deg, #C00719 0%, #FA4E42 100%)` | 按鈕、CTA |
| 深色文字 | `var(--text-color--01)` | 主要文字（深色） |
| 淺色文字 | `var(--text-color--07)` | 白色文字（Hero 上） |
| 導覽列白底 | `#ffffff` | 滾動後 navbar 背景 |
| 按鈕主色 | `var(--button-primary--fill)` | 主要按鈕 |

*注意：emons.de 的色彩 token 定義在外部 CSS 檔案，具體 hex 需開 DevTools 查。*

---

## FONTS

- **字型：** 未公開命名（Webflow 自訂載入）
- **字重：** 400（正文）、500（粗體）
- **大小：** 使用 `clamp()` 響應式縮放
  - 標題 h4：`clamp(10px, 2rem, 2rem)`
  - 正文：`clamp(10px, 1rem, 1rem)`
- **Antialiasing：** `-webkit-font-smoothing: antialiased`

---

## LAYOUT

- 頁面分為兩個主要區域：
  1. **Hero 鎖定區**（`.scroll_wrap`）：高度 100vh，wheel 事件被攔截，不觸發真實滾動
  2. **正常滾動區**：Hero 下方的服務、新聞、Footer

---

## SECTION 1：HERO（核心機制）

### 結構
```
.hero_section
  └── .scroll_wrap（滾動鎖定容器）
        ├── video.hero_video_el（背景影片）
        └── 5x .hero_card_trigger（服務卡片）
              └── .hero_card_wrap（可展開內容）
                    └── .hero_card_wrap_anim（內部可滾動內容）
```

### 5 張服務卡片（對應 5 個影片分段）
| 卡片 | 服務名稱 | 影片 frames | 影片秒數（46秒總長） |
|------|---------|------------|-------------------|
| 01 | Road | 0 – 216 | 0s – 9.0s |
| 02 | Logistics | 258 – 403（過渡 220–254） | 10.7s – 16.8s |
| 03 | Air & Sea | 470 – 614（過渡 410–467） | 19.6s – 25.6s |
| 04 | Rail | 662 – 788（過渡 622–652） | 27.6s – 32.8s |
| 05 | Digital | 827 – 1091（過渡 795–824） | 34.4s – 45.4s |

**換算公式：** `秒數 = frame × (46 / 1103)`

### 卡片展開動畫
- **觸發：** wheel up/down 事件或點擊（非 scroll）
- **展開狀態：** jQuery 加上 `.is-active` class
- **高度動畫：**
  - 收起：`max-height: 0`
  - 展開（桌機）：`max-height: 35rem`
  - 展開（手機）：`max-height: 53vh`
- **動畫參數：** `duration: 0.5s, easing: cubic-bezier(0.3, 0, 0.2, 1)`
- **圖示旋轉：** 展開時 SVG icon `transform: rotate(135deg)`
- **圓角：** 展開時 `border-radius: 0.5rem`
- **互斥：** 同時只有一張卡片展開，新卡片展開時其他自動收起

### 影片切換邏輯
- 收到 wheel/touch 事件 → 判斷 onUp / onDown
- 計算目標 segment → 播放 transition frames → loop 目標 segment
- 影片用 `currentTime` 直接跳轉（不是 scroll progress）

### Scroll 鎖定機制
- **Lenis** 初始化，接管所有 scroll 事件
- `.scroll_wrap` 內的 wheel/touch 事件被 custom observer 攔截
- 攔截後不觸發真實滾動，改為觸發卡片切換
- 當 `.scroll_wrap` 下緣接近視窗底部 5% 時，釋放 scroll 鎖定

---

## NAVBAR

### 初始狀態（Hero 上方）
- 高度：`--nav--height: 5rem`
- 背景：透明
- 文字色：`var(--text-color--07)`（白色）

### 滾動後狀態（scroll 超過 Hero）
- 高度：`3.5rem`
- 背景：`#ffffff`
- 文字色：`var(--text-color--01)`（深色）
- **動畫：** GSAP timeline，`duration: 0.3, ease: "power2.out"`
- **觸發：** ScrollTrigger `start: "bottom 5%"`，`toggleActions: "play none none reverse"`

---

## GSAP 配置摘要

```javascript
// Navbar 收縮 timeline
gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll_wrap",
    start: "bottom 5%",
    toggleActions: "play none none reverse"
  }
}).to(navbar, {
  height: "3.5rem",
  backgroundColor: "#ffffff",
  duration: 0.3,
  ease: "power2.out"
});

// 卡片展開（jQuery + CSS transition）
$(cardTrigger).on('click', function() {
  $('.hero_card_trigger').removeClass('is-active');
  $('.hero_card_wrap').removeClass('is-active');
  $(this).addClass('is-active');
  $(this).next('.hero_card_wrap').addClass('is-active');
});
```

---

## 實作這個體驗的關鍵洞察

### 1. 「scroll 感」的真相
emons.de **不是真的 scroll-driven**。它攔截了 wheel 事件，用來切換卡片。這讓使用者感覺在「scroll 推進關卡」，實際上是在切換預設狀態。

**實作方法：**
```javascript
window.addEventListener('wheel', (e) => {
  e.preventDefault(); // 阻止真實滾動
  if (e.deltaY > 0) activateNextCard();
  else activatePrevCard();
}, { passive: false });
```

### 2. 影片的「同步感」
影片分成 5 段，每段在對應卡片展開時 loop。切換時播放 transition frames 才 loop 新段。這產生「場景在流動」的感覺，但技術上是 5 個獨立 loop 片段。

**實作方法：**
```javascript
function switchSegment(targetSegment) {
  const transition = segments[targetSegment].transition;
  video.currentTime = transition.start * (46/1103);
  // 監聽 timeupdate，到達 transition.end 後開始 loop main segment
}
```

### 3. 「空間穿越感」的來源
不是因為有複雜的 3D 動畫，而是：
- 卡片高度從 0 → 35rem 的過場（速度感）
- 同步的影片切換（視覺場景改變）
- 只有一張卡片展開（焦點聚集）

---

## 用這個機制建構類似體驗的 Prompt 模板

```
Hero 區塊使用 wheel-event 驅動的卡片切換系統：

- 5 張服務卡片垂直排列，預設全部收起（max-height: 0）
- wheel down → 下一張卡片展開（max-height: [目標高度]）；wheel up → 上一張
- 展開動畫：0.5s cubic-bezier(0.3, 0, 0.2, 1)，同時播放背景影片的對應片段
- 背景影片分 5 個 loop 片段，切換時先播 transition frames 再進入新 loop
- wheel 事件在 Hero 區塊內被攔截（preventDefault），離開 Hero 後釋放正常滾動
- 導覽列：初始透明 5rem；scroll 超過 Hero 後 GSAP 動畫縮為 3.5rem 白底，0.3s power2.out
```

---

## 與 v3/v3_1 的差異

| 面向 | emons.de 實際做法 | v3_1 的做法 |
|------|-----------------|-------------|
| Scroll 機制 | wheel 事件攔截 + 卡片切換 | IntersectionObserver scroll 偵測 |
| 影片 | 分段 loop + transition frames | 無影片，Three.js 地球 |
| 「場景切換」 | 影片片段 + 卡片高度動畫 | Fresnel shader uniform 過渡 |
| 鎖定感 | preventDefault 攔截 wheel | 未鎖定 |

**結論：** v3_1 的「遊戲感」弱，核心原因是沒有實作 wheel 事件攔截 + 鎖定焦點機制。
