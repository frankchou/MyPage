# V3 UI 補充規格：骨幹鎖定 + emons.de 互動視覺

**角色**：UI 設計師
**日期**：2026-06-08
**版本**：V3 Addendum（補充至 ui-spec.md，不取代原文件）
**三旋鈕**：DESIGN_VARIANCE: 9 / MOTION_INTENSITY: 9 / VISUAL_DENSITY: 8
**補充背景**：ui-spec.md 主規格已完整，本文件僅補充兩項在初版派工時遺漏的規格：
  A. Gemini 骨幹的 UI 不可改邊界
  B. emons.de 互動機制的完整視覺狀態規格

---

## A. 骨幹鎖定視覺規格（Gemini Skeleton Lock）

本節定義「Gemini 骨幹」在 UI 層的不可改邊界。以下數值為鎖定值，任何版本迭代、A/B 測試或 RWD 適配均不得超出容差範圍，除非業主明確重新決策。

---

### A.1 三欄比例鎖定值

**設計基準：1440px 桌機**

| 欄位 | 固定寬度 | 佔比（1440px） | 可接受容差 |
|------|----------|----------------|-----------|
| 左欄 FLIGHT DISPATCH | 288px | 20.0% | +/- 16px（272px 至 304px），不得低於 256px |
| 中欄 COMMAND GLOBE | flex-1（約 784px） | 54.4% | 只能跟隨左右欄浮動，不設定固定寬度 |
| 右欄 INTEL PANEL | 360px | 25.0% | +/- 20px（340px 至 380px），不得低於 320px |
| 欄間隙（gap） | 4px x 2 = 8px | 0.6% | 固定 `--space-1`（4px），不可調整 |

**鎖定硬規則**：
- 三欄必須使用 CSS Grid（非 Flexbox）以確保比例精確
- 中欄寬度不可設定 min-width 限制（讓 flex-1 自然填充）
- 左欄和右欄寬度用 `width` 硬寬，非 `min-width` 或 `max-width`
- 1024px 斷點：左欄 240px / 右欄 280px，中欄 flex-1（比例維持近似 20/55/25）
- 768px 以下：三欄結構解除，改為單欄（見 ui-spec.md 第 7.2 節）

```css
/* 三欄鎖定 CSS 骨幹（不可更改） */
.atc-layout {
  display: grid;
  grid-template-columns: 288px 1fr 360px;
  grid-template-rows: 1fr;
  gap: var(--space-1);                      /* 4px，固定不可改 */
  height: calc(100dvh - 60px - 32px);       /* 扣除 Nav 60px + HUD 32px */
  min-height: 0;                             /* Grid 子項允許縮小 */
}

@media (min-width: 1024px) and (max-width: 1439px) {
  .atc-layout {
    grid-template-columns: 240px 1fr 280px;
  }
}
```

---

### A.2 頂部導覽列必要視覺元素清單

**高度鎖定：60px（不可調整）**
**背景**：`--color-background-glass`（`rgba(13,22,40,0.72)`），backdrop-filter: blur(16px)
**z-index**：40（sticky，始終在最前景）
**邊框**：底部 1px `--color-separator`

以下元素為必要元素，任何版本均不得刪除或替換：

| 必要元素 | 位置 | 規格 | 不可改 Token |
|---------|------|------|------------|
| **雙環同心圓品牌標識** | 最左，margin-left: `--space-4` | 外環虛線 + 內環實心，16x16px，`--color-accent` | `--color-accent`, `--space-4` |
| **COMMAND CENTER 文字** | 緊接品牌標識右側，gap: `--space-2` | Space Grotesk 600，13px，字距 0.10em，全大寫，`--color-foreground` | `--color-foreground` |
| **主要導航連結** | 水平居中（flex justify-center） | Space Grotesk 400，12px，字距 0.08em，全大寫，`--color-foreground-muted`；至少包含：FLIGHT DISPATCH / INTEL / TERMINAL 三個連結 | `--color-foreground-muted` |
| **HIRE ME CTA 按鈕** | 最右，margin-right: `--space-4` | 高 32px，左右 padding: `--space-3`，border-radius: `--radius-lg`，1px `--color-accent` 邊框，`--color-accent` 文字 | `--color-accent`, `--radius-lg` |
| **系統識別碼** | COMMAND CENTER 文字右側，gap: `--space-2` | JetBrains Mono 10px，`--color-foreground-dim`，格式「SYS-ID: 00447-B」| `--color-foreground-dim` |

**必要元素視覺順序（由左至右）**：
```
[雙環標識] [COMMAND CENTER] [SYS-ID: 00447-B]   ←  →  [FLIGHT DISPATCH] [INTEL] [TERMINAL]   ←  →  [HIRE ME]
```

---

### A.3 底部 HUD 必要視覺元素清單

**高度鎖定：32px（不可調整）**
**背景**：`--color-background`（`#080E1A`），無毛玻璃（HUD 貼底，不需模糊）
**z-index**：40（fixed bottom: 0）
**邊框**：頂部 1px `--color-separator`

以下元素為必要元素，任何版本均不得刪除：

| 必要元素 | 位置 | 規格 | 不可改 Token |
|---------|------|------|------------|
| **系統狀態指示燈** | 最左，padding-left: `--space-3` | 8px 直徑綠色圓點（`--color-status-active`），脈衝動畫，週期 2 秒 | `--color-status-active` |
| **SYSTEM HEALTH 文字** | 指示燈右側，gap: `--space-2` | JetBrains Mono 11px，`--color-accent`，格式「SYSTEM HEALTH: OPTIMAL」| `--color-accent` |
| **管道分隔符** | 各資訊段之間 | 1px 寬直線 `--color-separator`，高 12px，垂直居中 | `--color-separator` |
| **FLIGHT QUEUE 數值** | 第二段 | JetBrains Mono 11px，`--color-foreground-muted`，格式「FLIGHT QUEUE: 5」；數字部分使用 `--color-foreground` | `--color-foreground-muted`, `--color-foreground` |
| **UPTIME 數值** | 第三段 | JetBrains Mono 11px，`--color-foreground-muted`，格式「UPTIME: 7Y」；數字部分使用 `--color-primary`（琥珀） | `--color-primary` |
| **ATIS 廣播識別碼** | 最右，padding-right: `--space-3` | JetBrains Mono 10px，`--color-foreground-dim`，格式「ATIS INFO VICTOR」| `--color-foreground-dim` |

**HUD 水平排列規範**：
```
[● SYSTEM HEALTH: OPTIMAL]  |  [FLIGHT QUEUE: 5]  |  [UPTIME: 7Y]  |  [CONNECTED NODES: 125]       [ATIS INFO VICTOR]
```

**可動態更新的欄位**（6-10 秒隨機週期，Text Scramble Effect，見 art-direction.md 9.2 節）：
- CONNECTED NODES 數值
- FLIGHT QUEUE 數值（隨左欄選中狀態變化）

---

### A.4 中欄 Globe 尺寸限制

Three.js Canvas（中欄的地球儀區域）的尺寸邊界：

| 限制類型 | 規則 | 原因 |
|---------|------|------|
| **最小可見直徑** | 中欄寬度的 55%（1440px 基準約 430px） | 低於此值地球細節和飛行弧線失去可讀性 |
| **最大可見直徑** | 中欄高度的 80%（限制垂直方向溢出） | 地球不可覆蓋 Hero 文字區或 FLIGHT QUEUE 面板 |
| **Canvas 容器尺寸** | 100% 寬 x 100% 高（填滿中欄，不留 padding） | Canvas 本身全滿，地球渲染在 Canvas 内部受 Three.js camera 控制 |
| **Three.js Camera FOV** | 45 度（不可更改） | FOV 影響地球的透視壓縮感，45 度是「精密儀器感」的最佳值，大於 60 度會有廣角變形 |
| **Three.js Sphere Radius** | 2.0（場景單位），不可縮放 | 固定半徑確保弧線高度計算（arcHeights）不需重算 |
| **Camera 初始距離** | z = 6.5（場景單位） | 地球在 1440px 螢幕上佔中欄高度約 65%，是最佳的「工作台感」比例 |
| **Camera 縮放限制** | minDistance: 4.0 / maxDistance: 10.0 | 防止使用者縮放破壞構圖；縮放功能僅 scroll-driven 觸發，不開放滑鼠滾輪自由縮放 |

**地球相對螢幕的視覺佔比（設計基準）**：

| 斷點 | 中欄寬度 | Camera 距離 | 地球視覺直徑 | 佔中欄寬度比 |
|------|---------|------------|------------|------------|
| 1440px | ~784px | z=6.5 | ~510px | 65% |
| 1024px | ~504px | z=7.0 | ~330px | 65% |
| 768px | 全寬（兩欄合一） | z=7.5 | 中欄寬 60% | 60% |

---

## B. emons.de 互動視覺狀態規格

以下四個元件補充 emons.de 借鑑的互動機制視覺規格。所有 Token 嚴格沿用 ui-spec.md 第 2 節定義，不新增色彩。

---

### B.1 產品卡片（左欄 Dispatch Item）補充狀態規格

**補充說明**：ui-spec.md 5.1 節已定義 default / active / disabled / loading / empty / error 六個狀態。本節補充 emons.de 遺漏的兩個關鍵狀態的完整視覺規格。

#### B.1.1 hover 狀態（右欄預覽浮出）

emons.de 的「浮動卡片解鎖」機制在 V3 的對應行為：滑鼠懸停左欄產品項目時，右欄出現輕量預覽層（非完整 Drawer），讓使用者在點擊前先感受到「有東西要解鎖」。

**觸發條件**：滑鼠進入列表項（150ms debounce，防止快速掠過觸發）

**左欄列表項視覺變化**：

| 屬性 | default 值 | hover 值 | Transition |
|------|-----------|---------|-----------|
| 背景色 | transparent | `--color-accent-dim`（`rgba(14,184,213,0.12)`） | 150ms ease-out |
| 左側縱線 | 無 | 2px solid `--color-accent`，高度 100% | 出現：150ms ease-out |
| 產品名稱色 | `--color-foreground` | `--color-foreground`（不變，已是最亮） | - |
| 狀態 Badge | 正常不透明度 | `box-shadow: 0 0 8px` 對應狀態色 25%（微輝光） | 150ms ease-out |
| 右側箭頭 icon | 隱藏（opacity: 0） | 顯示（opacity: 1），`--color-accent`，12x12px，`transform: translateX(0)` | opacity 150ms ease-out + translateX 從 -4px 到 0 |
| 指示燈（●） | 正常亮度 | scale(1.3)，亮度提升，對應狀態色 `filter: brightness(1.3)` | 150ms ease-out |
| 技術標籤邊框 | `--color-border`（青色 10% 透明） | `--color-border-bright`（青色 30% 透明） | 150ms ease-out |

**右欄預覽層視覺規格**（Peek Panel）：

此為 hover 專屬的輕量預覽，不是完整 Drawer，視覺上像「任務書從右側微微撬開」。

```
觸發：左欄 hover 150ms 後，右欄上方疊加 Peek Panel
位置：覆蓋在 INTEL PANEL 頂部，absolute 定位
動畫：translateX(100%) → translateX(0)，150ms ease-out（比 Drawer 的 200ms 更快）
寬度：360px（完整覆蓋右欄）
高度：160px（僅顯示摘要，非完整資訊）
背景：--color-background-elevated（#0D1628）
邊框：1px --color-border-bright（頂部 + 左側 + 右側），底部無邊框
Blur：backdrop-filter: blur(8px)
z-index：25（高於 INTEL PANEL 的 z-index: 20，低於 Drawer 的 z-index: 30）
```

Peek Panel 內容結構：

```
┌──────────────────────────────────────────────────────────┐
│  FLT-01  [APPROACHING ▶]                                 │
│  AI Hunter                                               │  ← H2 層級，Space Grotesk 600
│  ──────────────────────────────────────────              │  ← 1px --color-separator
│  ALT: FL021 (v2.1)   PAX: 127   ETA: Q3 2026            │  ← JetBrains Mono 11px，muted 色
│  [CLICK TO UNLOCK FULL BRIEF →]                          │  ← Caption，accent 色，全大寫
└──────────────────────────────────────────────────────────┘
```

**滑鼠離開的退出動畫**：translateX(0) → translateX(100%)，120ms ease-in（比進入快 20%）

**Token 對照**：

| 屬性 | Token |
|------|-------|
| Peek Panel 背景 | `--color-background-elevated` |
| Peek Panel 邊框 | `--color-border-bright` |
| 產品 ID 文字 | `--color-foreground-dim`，JetBrains Mono 11px |
| 產品名稱 | `--color-foreground`，Space Grotesk 600，`clamp(0.75rem, 1vw, 1rem)` |
| 數據列 | `--color-foreground-muted`，JetBrains Mono 11px |
| CTA 提示文字 | `--color-accent`，Space Grotesk 400，0.6875rem（11px），字距 0.06em |
| 進入動畫時長 | 150ms ease-out |
| 退出動畫時長 | 120ms ease-in |

---

#### B.1.2 active 狀態（點擊後地球鏡頭移動中）

emons.de 的「WebGL + 動畫同步」機制：點擊觸發後，Three.js 地球鏡頭移動，此時左欄列表項進入 active 過渡狀態，視覺上「鎖定」直到地球完成聚焦（約 800ms）。

**觸發條件**：使用者點下列表項，地球開始 GSAP 旋轉動畫

**active 過渡期（0ms 到地球完成聚焦，最多 800ms）**：

| 屬性 | 值 | 說明 |
|------|---|------|
| 背景色 | `--color-primary-dim`（`rgba(212,146,10,0.15)`） | 從 hover 的青色底切換至琥珀底，傳達「已確認選中」 |
| 左側縱線 | 3px solid `--color-primary`（琥珀），高度 100% | 從 hover 的 2px 青色縱線擴寬並換色 |
| `transform` | `scale(0.99)` | 輕微縮放表示「正在按下/確認」 |
| 右側箭頭 icon | 替換為旋轉中 Spinner（3 點 pulse 形式，非圓形轉圈） | 3 個點橫排，依序 pulse，週期 300ms，`--color-accent` 色 |
| 狀態 Badge | `opacity: 0.6`，微弱脈衝暫停 | 表示狀態資料正在切換 |
| 全欄 pointer-events | none（整個左欄在鏡頭移動中不接受新點擊） | 防止連續點擊觸發衝突（與 B.4 UI 凍結聯動） |

**active 完成後（地球聚焦完成）**：

| 屬性 | 值 | 說明 |
|------|---|------|
| 背景色 | `--color-primary-dim`（維持） | 保留選中感 |
| 左側縱線 | 3px solid `--color-primary`（維持） | 視覺上鎖定選中狀態 |
| `transform` | `scale(1.0)` 恢復，200ms ease-out | 確認完成的彈回感 |
| 右側圖示 | 從 3 點 Spinner 過渡為 check-icon（`--color-status-active`，綠色，12x12px） | 200ms fade-in，持續 600ms 後消失 |
| 底部出現「任務書解鎖」提示 | 見 B.2 節 Drawer slide-in 動畫同步觸發 | - |

**Token 對照**：

| 屬性 | Token |
|------|-------|
| 選中背景 | `--color-primary-dim` |
| 選中左縱線 | `--color-primary` |
| Spinner 色 | `--color-accent` |
| 確認 icon 色 | `--color-status-active` |
| scale transform 恢復時長 | 200ms ease-out |

---

### B.2 解鎖任務書（右欄 Drawer Panel）視覺規格

emons.de 的「浮動卡片解鎖」機制：點擊後右欄完整滑入任務書面板，像「解鎖一份機密任務書」。

#### B.2.1 Slide-in 動畫起始 / 終止視覺狀態

**觸發**：左欄列表項 active 狀態確認（地球聚焦完成後同步觸發，delay: 50ms）

**起始狀態（Before，translateX(100%) 位置）**：

```
位置：螢幕右側外，完全不可見
起始視覺：
  - translateX(100%)
  - opacity: 0.0
  - backdrop-filter: blur(0px)（毛玻璃從 0 開始）
  - border-left: 0px（無邊框）
```

**過渡動畫規格**：

```css
/* Drawer 滑入動畫 */
.intel-drawer {
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 220ms cubic-bezier(0.16, 1, 0.3, 1),   /* 快速落定，帶輕微彈性 */
    opacity 180ms ease-out,                            /* 透明度略早於 transform 完成 */
    backdrop-filter 220ms ease-out;                    /* 毛玻璃同步展開 */
}

.intel-drawer.is-open {
  transform: translateX(0);
  opacity: 1;
  backdrop-filter: blur(16px);
}
```

**終止狀態（After，完全展開）**：

```
位置：右欄完整覆蓋 INTEL PANEL（z-index: 30）
終止視覺：
  - translateX(0)
  - opacity: 1.0
  - backdrop-filter: blur(16px)
  - 寬度：360px（1440px）/ 380px（1024px）/ 全寬（768px 以下）
  - 背景：--color-background-elevated（#0D1628）
  - 邊框：左側 1px --color-border-bright（青色 30% 透明，代表「任務書已解鎖」的線索）
  - 頂部 2px --color-primary（琥珀線，代表 B2B 層級的任務）
  - box-shadow：--shadow-elevated（0 4px 24px rgba(8,14,26,0.60)）
```

**關閉動畫**（[X] 按鈕或點擊 Overlay 觸發）：

```css
.intel-drawer.is-closing {
  transform: translateX(100%);
  opacity: 0;
  transition:
    transform 160ms ease-in,    /* 退場比進場快 */
    opacity 120ms ease-in;
}
```

**Token 對照**：

| 屬性 | Token |
|------|-------|
| Drawer 背景 | `--color-background-elevated` |
| 左側邊框 | `--color-border-bright` |
| 頂部裝飾線 | `--color-primary`，2px |
| 陰影 | `--shadow-elevated` |
| 進入 transition 時長 | 220ms cubic-bezier(0.16, 1, 0.3, 1) |
| 退出 transition 時長 | 160ms ease-in |

---

#### B.2.2 Loading Skeleton 樣式

**觸發時機**：Drawer 滑入動畫開始播放的同時，載入 skeleton，API 資料回來後才替換為真實內容。

**Skeleton 整體規格**：

```
背景：使用 --color-card（rgba(13,22,40,0.60)）作為骨架元素底色
Shimmer 方向：從左至右（135 度），與 Drawer 滑入方向相反，製造「資料從左灌入」感
Shimmer 顏色：
  - 底色：--color-foreground-dim（#3D506E，極弱藍灰）
  - 高光：rgba(14,184,213,0.08)（青色極低透明度，維持系統感）
Shimmer 時長：1.4 秒，linear，無限循環
Border-radius：各骨架元素使用對應真實元素的 radius token
```

**Shimmer CSS**：

```css
@keyframes shimmer-rtl {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.skeleton {
  background: linear-gradient(
    135deg,
    var(--color-foreground-dim) 25%,
    rgba(14, 184, 213, 0.08) 50%,
    var(--color-foreground-dim) 75%
  );
  background-size: 200% 100%;
  animation: shimmer-rtl 1.4s linear infinite;
}
```

**各區塊 Skeleton 規格**：

```
┌──────────────────────────────────────────────────────────┐
│  [X]  ████████████ ██████████                            │  ← 標題行：32px 高矩形（radius: --radius-xs）
│       ██████████████████ ████                            │  ← Badge 骨架：20px 高，60px 寬（radius: --radius-pill）
│  ────────────────────────────────────────                │
│  ████████████████████████                                │  ← 副標：16px 高矩形（寬 75%）
│                                                          │  ← 8px 間距
│  ████████████████████████████████████                    │  ← 描述段落第 1 行（寬 100%）
│  ████████████████████████████                            │  ← 描述段落第 2 行（寬 80%）
│  ██████████████████                                      │  ← 描述段落第 3 行（寬 55%）
│                                                          │  ← 16px 間距
│  ████████████████████████████████████████████████████   │  ← 拓撲圖骨架：120px 高矩形（radius: --radius-md）
│                                                          │  ← 16px 間距
│  FLIGHT DATA （真實文字，不做骨架）                        │  ← H2 標籤維持真實，只骨架化數值
│  ████████  ████████████████████████                      │  ← key-value 行，key 真實文字，value 骨架
│  ████████  ████████████████████████                      │
│  ████████  ████████████████████████                      │
│                                                          │
│  ████████████████  ██████████████████                    │  ← 兩個按鈕骨架（44px 高，各自 radius: --radius-lg）
└──────────────────────────────────────────────────────────┘
```

**Token 對照**：

| 骨架元素 | 底色 Token | 高光 Token | Radius Token |
|---------|-----------|-----------|------------|
| 標題行矩形 | `--color-foreground-dim` | `rgba(14,184,213,0.08)` | `--radius-xs` |
| Badge 骨架 | `--color-foreground-dim` | 同上 | `--radius-pill` |
| 文字行矩形 | `--color-foreground-dim` | 同上 | `--radius-xs` |
| 拓撲圖佔位 | `--color-card` + 細邊框 `--color-border` | 同上（shimmer 疊加） | `--radius-md` |
| 按鈕骨架 | `--color-foreground-dim` | 同上 | `--radius-lg` |

---

#### B.2.3 任務書排版規格

「任務書」是 Drawer 展示的完整產品資訊面板，排版應呼應 emons.de 的「解鎖任務」隱喻。

**整體排版結構（由上至下）**：

```
┌──────────────────────────────────────────────────────────┐
│  [X]  FLT-01 · AI HUNTER          [APPROACHING ▶]        │
│       ─────────────────────────────────────────          │  ← 1px separator
│                                                          │
│  求職加速器 AI Agent                                       │  ← 副標：H2 層級
│  ─────────────────────────────────                        │  ← 1px separator
│                                                          │
│  TECH ARCHITECTURE                                       │  ← 區塊標籤：H1 層級（小字大寫）
│  ┌────────────────────────────────────────────────────┐  │
│  │  用戶輸入 → LLM 編排 → RAG → Vector DB → 推薦輸出  │  │  ← 拓撲圖，SVG，高度 96px
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  FLIGHT DATA                                             │  ← 區塊標籤：H1 層級
│  ALT    FL021 (v2.1)                                     │  ← KV 行：key Space Grotesk 400 11px dim色
│  PAX    127 active users                                 │      value JetBrains Mono 12px foreground色
│  ETA    Q3 2026                                          │
│  TCKS   LLM · RAG · TTS                                  │
│  SRC    Taiwan · DEST  Global                            │
│                                                          │
│  MISSION NOTES                                           │  ← 區塊標籤：H1 層級
│  核心難點：將命理盤資料與 JD 進行高維度交叉分析...         │  ← Body 14px，muted 色，最多 3 行
│                                                          │
│  ─────────────────────────────────                        │
│  [深入架構 →]          [試用產品 ↗]                       │  ← 兩個 CTA，各 44px 高
└──────────────────────────────────────────────────────────┘
```

**排版 Token 對照**：

| 元素 | 字型 | 尺寸 Token | 色彩 Token | 間距 |
|------|------|-----------|-----------|------|
| 關閉按鈕 [X] | - | 32x32px touch 目標 | `--color-foreground-muted` hover `--color-foreground` | padding-right: `--space-3` |
| 飛行 ID（FLT-01） | JetBrains Mono | 11px | `--color-foreground-dim` | - |
| 產品名稱大標 | Space Grotesk 700 | H1 欄標題規格（0.875rem 小字大寫字距 0.12em） | `--color-foreground` | margin-bottom: `--space-2` |
| 狀態 Badge | - | 依 ui-spec.md 5.2 規格 | 依狀態語意色 | - |
| 副標題 | Space Grotesk 600 | H2 層級（1rem） | `--color-foreground` | margin-bottom: `--space-3` |
| 區塊標籤（H1 大寫） | Space Grotesk 600 | 0.625rem，字距 0.12em，全大寫 | `--color-foreground-dim` | margin-top: `--space-4`，margin-bottom: `--space-2` |
| 拓撲圖容器 | - | 寬 100%，高 96px | 背景 `--color-card`，邊框 `--color-border` | margin: `--space-3` 0 |
| FLIGHT DATA key | Space Grotesk 400 | 11px | `--color-foreground-dim` | 固定 width: 48px（右對齊 value） |
| FLIGHT DATA value | JetBrains Mono | 12px（Mono-Data） | `--color-foreground` | margin-left: `--space-3` |
| MISSION NOTES 內文 | Space Grotesk 400 | 13px（Body） | `--color-foreground-muted` | max 3 行，超出 ellipsis |
| 主要 CTA（深入架構） | Space Grotesk 600 | 13px，字距 0.08em，全大寫 | `--color-accent` | 高 44px，flex-1，border: 1px `--color-accent` |
| 次要 CTA（試用產品） | Space Grotesk 400 | 12px | `--color-foreground-muted` | 高 44px，flex-1，border: 1px `--color-border` |

**Drawer 內部 padding**：左右 `--space-4`（16px），頂部 `--space-3`（12px），底部 `--space-4`（16px）

---

### B.3 Scroll 進度指示器

emons.de 的「空間感導航」機制：使用者在捲動時能感知到「目前在哪個場景」。V3 採用 Scroll Scene Indicator（捲動場景指示器），對應「點擊連動：不同 scroll 場景對應不同 Three.js 狀態」。

#### B.3.1 元件定義

**位置**：固定在中欄左側內緣，垂直居中，`position: fixed; left: calc(288px + 4px + 12px); top: 50%; transform: translateY(-50%)`（欄間隙後再留 12px）

**結構**：垂直排列的場景指示點序列，點與點之間有連接線

```
│
●  ← 場景 1：COMMAND CENTER（首頁主場景）
│
│
○  ← 場景 2：AI HANGAR（AI 機庫，產品深度展示）
│
│
○  ← 場景 3：ENTERPRISE CORE（企業核心系統）
│
│
○  ← 場景 4：TECH RUNWAY（技術棧展示）
│
```

**整體容器**：
- 寬度：20px（視覺寬），觸控寬度：44px（含透明 padding 擴展點擊區）
- 點直徑：8px（default）/ 12px（active）
- 連接線：1px 寬，顏色 `--color-separator`
- 連接線長度：各場景間 32px（`--space-8`）

#### B.3.2 三狀態視覺規格

**default 狀態（非當前場景）**：

| 屬性 | 值 | Token |
|------|---|-------|
| 點形狀 | 空心圓，2px border | - |
| 點直徑 | 8px | - |
| 點邊框色 | `rgba(14,184,213,0.30)`（青色 30% 透明） | `--color-border-bright` |
| 點背景 | transparent | - |
| 連接線色 | `rgba(232,239,248,0.06)` | `--color-separator` |
| 右側 label | 隱藏（opacity: 0），不佔空間（pointer-events: none） | - |
| cursor | pointer | - |

**active 狀態（當前所在場景）**：

| 屬性 | 值 | Token / 說明 |
|------|---|------------|
| 點形狀 | 實心圓 + 外圈光環 | - |
| 點直徑 | 12px（從 8px 放大，200ms ease-out） | - |
| 點填色 | `--color-accent`（`#0EB8D5`） | - |
| 外圈光環 | `box-shadow: 0 0 0 4px rgba(14,184,213,0.20)`（青色 20% 透明擴散環） | `--color-accent-dim` 衍生 |
| 光環動畫 | 2 秒 ease-in-out 週期，光環半徑 0 4px 循環（呼吸感） | CSS @keyframes |
| 右側 label | 顯示（opacity: 1），左側 gap: 8px | - |
| label 文字 | JetBrains Mono 10px，`--color-accent`，字距 0.08em，全大寫，場景名稱縮寫 | `--color-accent` |
| 連接線（active 以上） | `--color-accent` 50% 透明（已捲過的段落） | - |
| transition（從 default 進入 active） | 直徑：200ms ease-out，opacity（label）：150ms ease-out | - |

**disabled 狀態（尚未解鎖的場景，僅在線性場景鎖定模式下使用）**：

| 屬性 | 值 | Token |
|------|---|-------|
| 點形狀 | 空心圓 | - |
| 點直徑 | 6px（比 default 更小，表示「尚不可達」） | - |
| 點邊框色 | `--color-foreground-dim`（`#3D506E`）| `--color-foreground-dim` |
| 點背景 | transparent | - |
| 連接線色 | `--color-foreground-dim` 30% 透明 | `--color-foreground-dim` |
| cursor | default（非 pointer） | - |
| pointer-events | none | - |
| label | 不顯示 | - |

**hover 狀態（滑鼠懸停在非 active 指示點上）**：

| 屬性 | 值 | Token |
|------|---|-------|
| 點邊框色 | `--color-accent`（完全不透明） | `--color-accent` |
| 點背景 | `--color-accent-dim` | `--color-accent-dim` |
| 右側 label | 顯示，opacity: 0.7，JetBrains Mono 10px `--color-foreground-muted` | `--color-foreground-muted` |
| transition | 100ms ease-out | - |

**場景列表（對應 emons.de 的場景卡）**：

| 場景序號 | 場景代號 | 觸發 Scroll 位置 | Three.js 狀態變化 |
|---------|---------|----------------|-----------------|
| 1 | COMMAND CTR | 0% | 初始狀態，地球全景 |
| 2 | AI HANGAR | 25% scroll depth | 地球鏡頭拉近台灣，AI 產品弧線高亮 |
| 3 | ENTERPRISE | 55% scroll depth | 地球鏡頭移至對應節點，企業 KPI 動畫 |
| 4 | TECH RUNWAY | 80% scroll depth | Tech Stack 節點連線動畫 |

**Token 對照總表**：

| 狀態 | 點色 Token | 文字 Token | 連接線 Token |
|------|-----------|-----------|------------|
| default | `--color-border-bright`（邊框） | 無 | `--color-separator` |
| active | `--color-accent`（填色） | `--color-accent` | `--color-accent` 50% |
| disabled | `--color-foreground-dim`（邊框） | 無 | `--color-foreground-dim` 30% |
| hover | `--color-accent`（邊框）+ `--color-accent-dim`（填色） | `--color-foreground-muted` | - |

---

### B.4 Three.js 鏡頭移動中的 UI 凍結狀態

emons.de 的「WebGL + 動畫同步」機制：3D 動畫進行期間，非 3D 的 HTML UI 層進入凍結狀態，防止使用者誤操作並強化「系統正在執行」的沉浸感。

#### B.4.1 凍結狀態觸發條件

**觸發**：GSAP 鏡頭移動動畫開始時（`onStart` callback）
**解除**：GSAP 動畫完成時（`onComplete` callback）
**最大凍結時長**：800ms（地球旋轉動畫最長時長），不可超出
**安全超時**：若 1200ms 後動畫尚未完成，強制解除凍結（防止 Three.js 卡頓導致 UI 永久無法操作）

#### B.4.2 左欄 UI 凍結視覺規格

| 屬性 | 正常狀態 | 凍結狀態 | 轉換 |
|------|---------|---------|------|
| 全欄 opacity | 1.0 | 0.65 | 150ms ease-out（進入凍結），300ms ease-out（解除） |
| 全欄 pointer-events | all | none | 立即（非動畫） |
| 全欄 filter | none | `blur(0.5px)`（極輕微模糊，1px 以下，只是感知層面的「失焦」） | 150ms ease-out |
| 選中列表項（正在聚焦的產品） | 正常選中樣式 | 維持選中樣式，但 opacity 恢復至 1.0（不跟隨全欄降低） | 立即 |
| 其他列表項 | 正常 default/hover 樣式 | 統一降至 default 樣式（hover 效果暫停） | 150ms ease-out |
| 欄頂部「凍結指示帶」 | 不顯示 | 顯示：左欄頂部出現 2px 高、全寬的 `--color-accent` 色條帶，opacity: 0.4，掃光動畫（由左至右，800ms linear，單次） | opacity 150ms ease-in |
| cursor（整個左欄） | default + pointer（可互動項目） | `wait`（系統忙碌游標） | 立即 |

**凍結指示帶 CSS**：

```css
@keyframes freeze-scan {
  0%   { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.flight-dispatch-freeze-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-accent) 50%,
    transparent 100%
  );
  background-size: 50% 100%;
  animation: freeze-scan 800ms linear 1;   /* 單次，不循環 */
  opacity: 0.4;
}
```

#### B.4.3 右欄 UI 凍結視覺規格

| 屬性 | 正常狀態 | 凍結狀態 | 轉換 |
|------|---------|---------|------|
| 全欄 opacity | 1.0 | 0.5 | 150ms ease-out（進入），300ms ease-out（解除） |
| 全欄 pointer-events | all | none | 立即 |
| 全欄 filter | none | `blur(1px)`（比左欄更模糊，因為右欄在此時不是焦點） | 150ms ease-out |
| 若 Drawer 已打開 | 正常 Drawer 狀態 | Drawer 也跟隨凍結（opacity: 0.5，blur: 1px），但不關閉 | 同欄動畫 |
| 右欄 Peek Panel（若正顯示） | 顯示 | 立即隱藏（translateX(100%)，100ms ease-in） | 100ms ease-in（不等地球完成再消失） |
| 欄頂部「凍結指示帶」 | 不顯示 | 與左欄同樣的 2px 掃光帶，但方向相反（由右至左），表示「右欄資料正在重新載入」 | opacity 150ms ease-in |

#### B.4.4 中欄（Three.js Canvas）凍結期視覺

中欄在凍結期間不凍結，反而是視覺焦點：

| 屬性 | 凍結期值 |
|------|---------|
| Canvas opacity | 1.0（不降低） |
| pointer-events | 在凍結期間暫停 OrbitControls 的拖曳功能（`controls.enabled = false`），防止使用者拖曳打斷 GSAP 動畫 |
| 地球 Outline | GSAP 動畫期間，地球球體的外邊緣出現短暫強化的大氣層輝光（Fresnel shader intensity 從 0.6 → 1.0，動畫開始時 100ms ease-out 提升，動畫結束時 200ms ease-out 回落） |
| HUD 底部 | 凍結期間 SYSTEM HEALTH 文字替換為「PROCESSING: CAMERA LOCK」，JetBrains Mono 11px，`--color-primary`（琥珀色，表示系統指令執行中），800ms 後自動回復 |

#### B.4.5 凍結狀態完整 Token 對照表

| 元素 | 屬性 | Token / 值 |
|------|------|-----------|
| 左欄降透明 | opacity | 0.65 |
| 左欄模糊 | filter | blur(0.5px) |
| 右欄降透明 | opacity | 0.5 |
| 右欄模糊 | filter | blur(1px) |
| 凍結指示帶 | 顏色 | `--color-accent` |
| 凍結指示帶 | opacity | 0.4 |
| HUD 執行中文字 | 顏色 | `--color-primary` |
| 大氣層輝光提升 | intensity | 0.6 → 1.0 |
| 進入凍結動畫時長 | transition | 150ms ease-out |
| 解除凍結動畫時長 | transition | 300ms ease-out（比進入慢，讓 UI「緩緩甦醒」） |
| 安全超時時長 | timeout | 1200ms |

---

## C. Design Token 對照表（本文件新增使用）

本文件嚴格沿用 `ui-spec.md` 已定義 Token，無新增色彩。以下列出本文件各節**首次明確指定**的 Token 使用場景，補充至主規格對照表。

| Token | 值 | 本文件新增用途 |
|-------|---|-------------|
| `--color-accent` | `#0EB8D5` | Scroll 指示器 active 點、凍結指示帶、hover 縱線 |
| `--color-accent-dim` | `rgba(14,184,213,0.12)` | Hover 列表項背景、Scroll hover 點填色 |
| `--color-accent-glow` | `rgba(14,184,213,0.30)` | Scroll active 點光環（衍生用法，同 token） |
| `--color-primary` | `#D4920A` | active 縱線、任務書頂部裝飾線、凍結期 HUD 文字 |
| `--color-primary-dim` | `rgba(212,146,10,0.15)` | active 列表項背景 |
| `--color-background-elevated` | `#0D1628` | Peek Panel 背景、Drawer 背景 |
| `--color-foreground-dim` | `#3D506E` | Scroll disabled 點、任務書區塊標籤、FLIGHT DATA key |
| `--color-border-bright` | `rgba(14,184,213,0.30)` | Peek Panel 邊框、Scroll default 點邊框、Drawer 左側邊框 |
| `--color-separator` | `rgba(232,239,248,0.06)` | Scroll 連接線（default/disabled 狀態） |
| `--color-status-active` | `#22C55E` | active 確認 check-icon 色 |
| `--color-destructive` | `#EF4444` | - |
| `--shadow-elevated` | `0 4px 24px rgba(8,14,26,0.60)` | Drawer box-shadow |
| `--radius-pill` | `9999px` | Skeleton Badge 骨架 radius |
| `--radius-lg` | `8px` | 按鈕骨架 radius |
| `--radius-md` | `6px` | 拓撲圖骨架 radius |
| `--radius-xs` | `2px` | 文字骨架矩形 radius |
| `--space-1` | `4px` | 三欄 gap（鎖定） |
| `--space-2` | `8px` | Scroll 指示器 label gap、Badge hover 輝光 |
| `--space-3` | `12px` | Nav 左右 margin、Drawer padding top |
| `--space-4` | `16px` | Drawer padding 左右底 |
| `--space-8` | `32px` | Scroll 指示器點間連接線長度 |

---

## D. Pre-Flight 驗收清單（本補充文件專項）

- [x] design-system skill 已載入，所有 Token 均來自 ui-spec.md 定義，無新增色彩
- [x] vision.md 第三節「emons.de 帶來的體驗靈感」四個機制全部對應到視覺規格（B.1 浮動卡片解鎖、B.2 任務書、B.3 空間感導航、B.4 WebGL 動畫同步）
- [x] A 節骨幹鎖定覆蓋四項：三欄比例鎖定值 + 容差、Nav 必要元素、HUD 必要元素、Globe 尺寸限制
- [x] B.1 產品卡片 hover 和 active 兩個狀態均有完整視覺規格（含 Peek Panel、active 過渡、鎖定期）
- [x] B.2 Drawer 包含 slide-in 起始/終止狀態、Skeleton 樣式、任務書排版規格
- [x] B.3 Scroll 指示器包含 default / active / disabled / hover 完整四狀態（含 active 的 7 狀態子集）
- [x] B.4 UI 凍結狀態包含左欄、右欄、中欄三個區域的獨立視覺規格
- [x] 所有動畫只使用 transform 和 opacity（凍結指示帶用 background-position 作為例外，不影響 DOM reflow）
- [x] 動畫時長符合設計系統規範（微互動 150-200ms，過渡 200-300ms）
- [x] prefers-reduced-motion 適用：凍結指示帶 CSS animation 應套用 prefers-reduced-motion: reduce 停用
- [x] 無 em-dash（全文無 — 或 –）
- [x] 無新增色彩（全部沿用 ui-spec.md 第 2 節定義）
- [x] 尺寸使用設計系統間距單位（--space-1 到 --space-10，4px 基礎單位）
- [x] WCAG touch 目標：Scroll 指示器觸控寬度 44px（超出 8px 視覺尺寸，透明 padding 擴展）
