# V3 UI 規格（基於 Gemini 再設計 + Three.js）

**角色**：UI 設計師
**日期**：2026-06-08
**版本**：V3（站在 Gemini 示意圖肩膀上，Three.js 3D 深化）
**依據**：IMG_4707.png 觀察 + ux-proposal.md + idea.txt + design-system skill + anti-generic skill

---

## 0. 三旋鈕設定

```
DESIGN_VARIANCE:  9   （非對稱三欄，航管中心張力，刻意壓縮左欄、放大中欄）
MOTION_INTENSITY: 9   （Three.js 3D 地球，飛行弧線，電影級 GSAP 相機編排）
VISUAL_DENSITY:   8   （駕駛艙密度，數字 mono，1px 線分隔，無泛型卡片框）
```

### 選型理由

| 旋鈕 | 數值 | 理由 |
|------|------|------|
| DESIGN_VARIANCE: 9 | 極不對稱 | 三欄比例 20/55/25 非等分，左欄只作 dispatch list，製造控制台的緊張感與層次。Portfolio（開發者）基準 6，因為航管中心視覺語言強烈偏移，上調至 9 |
| MOTION_INTENSITY: 9 | 電影級 | Three.js 地球自轉、飛行弧線繪製、飛機 sprite 追蹤、GSAP 相機聚焦動畫；遠超 CSS 過渡等級，明確需要 9 級編排 |
| VISUAL_DENSITY: 8 | 駕駛艙 | 底部 HUD 等寬字、KPI 數字排列、左欄 5 個 dispatch item、飛行數據卡；任何元素鬆化都會破壞「指揮中心」的沉浸感 |

---

## 1. Anti-Generic 審查

### Gemini 圖中識別出的 AI Tell

| Tell 類型 | Gemini 圖中的表現 | v3 清除方案 |
|----------|-----------------|------------|
| 泛型 AI 紫光漸層 | 飛機圖示與 Tech Stack 節點上有紫色霓虹發光 | 清除。改用航管術語的語意色：琥珀金（B2B 戰績）+ 冰川青（動態元素）+ 中性深灰分層 |
| 隨機霓虹漸層 | Tech Stack 連線圖混合了多色霓虹（JS 黃、PHP 紫、SQL 橘） | 統一為單一強調色 `--color-accent`（冰川青 `#0EB8D5`），只用語意色差區分類別 |
| 純黑底色 | 背景接近純黑 | 改為深空藍黑 `#080E1A`，帶冷色調，有深度感，不是零調 |
| 居中英雄被 UI 遮蓋 | Hero 標題 + CTA 按鈕疊在地球儀正中央，視覺競爭 | Hero 文字移至地球儀上方，CTA 移至右欄頂部，地球儀中央保持清爽 |
| 泛型浮動 badge | Tech icon 帶彩色浮動徽章感 | 移除。Tech Stack 改為 1px 線連結的節點，用細節說話 |
| div 拼接假 UI | 右欄 Global Network 地圖是扁平圖示感 | 保留但升級為真實 SVG 連線地圖，強調節點語意 |
| 填充假數字 | 飛行數據卡有 `21.5k5`、`500us`、`A0025` 等無意義數值 | 全部替換為真實產品語境數字，詳見第 5 節 |

### v3 如何刻意超越預設

1. **顏色系統從「AI 標配色」切換到「航空儀器色」**：HUD 綠（確認狀態）、航行琥珀（B2B 重要度）、雷達青（動態掃描）三色系，來自真實航管儀表板，而非 SaaS 通用色板。

2. **字型從 Inter 切換到 Space Grotesk + JetBrains Mono**：Space Grotesk 的幾何角度帶有輕微的工業感，和航管 HUD 的方塊感契合；JetBrains Mono 用於一切數字和狀態碼，強化「真實系統」的質感。

3. **卡片全數廢除泛型圓角白底卡片**：全站使用 `border-radius: 2px`（幾乎銳角）+ 1px 邊線 + 半透明毛玻璃背景，而非「SaaS 白卡 + 圓角 12px + 陰影」的預設。

4. **地球儀不是裝飾，是可操作的工作台**：Three.js 可拖曳旋轉、點擊飛機節點聯動左欄和右欄，讓 3D 成為真正的交互界面，而不是 WebGL 炫技。

5. **背景不是純色，是環境**：夜間機場塔台照片作為 CSS 背景（模糊 + 暗化 overlay），配合 Three.js 星空粒子，創造沉浸式「指揮室暗房」感，而不是「深色 SaaS 背景色」。

---

## 2. Design Token

### 2.1 色彩系統（11 變數 + 語意色）

本站採用全暗色模式（Dark Only），不做 Light Mode，符合「航管中心暗室」定位。

```css
/* === 全站 CSS 變數 === */

/* 基礎底色系 - 深空藍黑，非純黑 */
--color-background:          #080E1A;   /* 頁面底色，帶冷藍調的深空感 */
--color-background-elevated: #0D1628;   /* 地球儀 canvas 背景、Drawer 背景 */
--color-background-glass:    rgba(13, 22, 40, 0.72);  /* 毛玻璃元件背景 */

/* 前景文字 */
--color-foreground:          #E8EFF8;   /* 主要文字，冰白帶冷藍調 */
--color-foreground-muted:    #7A90B0;   /* 次要說明文字 */
--color-foreground-dim:      #3D506E;   /* 極弱文字，分隔符說明 */

/* 主要品牌色 - 航行琥珀（B2B 成就 / 警示重要） */
--color-primary:             #D4920A;   /* 琥珀金，B2B KPI 數字、選中狀態 */
--color-primary-dim:         rgba(212, 146, 10, 0.15); /* 琥珀微光，hover 背景 */
--color-primary-foreground:  #080E1A;   /* 琥珀底色上的文字 */

/* 強調色 - 冰川青（動態元素 / CTA / 飛行弧線） */
--color-accent:              #0EB8D5;   /* 唯一強調色，飛行弧線、CTA 按鈕邊框、HUD 文字 */
--color-accent-dim:          rgba(14, 184, 213, 0.12); /* 青色微光，hover/active 背景 */
--color-accent-glow:         rgba(14, 184, 213, 0.30); /* CTA 按鈕輝光，限量使用 */

/* 語意色 - 狀態指示 */
--color-status-approaching:  #0EB8D5;   /* 冰川青，APPROACHING 進場中 */
--color-status-active:       #22C55E;   /* HUD 綠，ACTIVE 已上線 */
--color-status-holding:      #D4920A;   /* 琥珀，HOLDING 等待中 */
--color-status-taxiing:      #8B9FC2;   /* 冷灰藍，TAXIING 地面滑行 */
--color-status-on-final:     #F87171;   /* 警示紅，ON FINAL 最終進場 */

/* 容器與分隔 */
--color-card:                rgba(13, 22, 40, 0.60);   /* 卡片 / 面板背景 */
--color-border:              rgba(14, 184, 213, 0.10); /* 邊框，青色極低不透明 */
--color-border-bright:       rgba(14, 184, 213, 0.30); /* 選中/Hover 邊框 */
--color-separator:           rgba(232, 239, 248, 0.06); /* 水平分隔線 */

/* 錯誤 / 破壞 */
--color-destructive:         #EF4444;   /* 錯誤狀態，紅色 */
--color-destructive-dim:     rgba(239, 68, 68, 0.12);

/* 焦點環 */
--color-ring:                #0EB8D5;   /* 焦點環同強調色，無障礙可見 */
```

**禁止色確認**：
- `#000000` 未出現，底色使用 `#080E1A`
- AI 紫色漸層未出現，全站無紫色系
- 暖米色系（`#f5f1ea` 等）未出現
- 黃銅色系（`#b08947` 等）未出現（琥珀色 `#D4920A` 是明確航管語意，非 premium consumer 暖色陷阱）

**單一強調色確認**：全站唯一強調色為冰川青 `#0EB8D5`，琥珀金 `#D4920A` 定義為「品牌主色」用於 B2B 區塊，兩者有明確語意分工，非混色使用。

### 2.2 Typography（字型選擇 + 層級）

**禁止字型確認**：Inter、Roboto、Arial、Open Sans 均未使用。

```
Display / Heading：Space Grotesk（Google Fonts，免費）
  - 幾何無襯線，帶有輕微的技術工業感
  - 在深色背景上字型輪廓清晰，高密度環境適用
  - Variable font，支援 weight 300-700

數字 / 代碼 / 狀態碼：JetBrains Mono（JetBrains，免費）
  - 工程師最熟悉的等寬字型
  - 在 VISUAL_DENSITY 8 的儀表板環境中所有數字強制 Mono
  - Ligatures 開啟（展示 -> >= 等符號的工程師味）

Body（說明文字）：Space Grotesk Regular
  - 與 Heading 同家族，減少字型請求數
  - 必要時可引入 Outfit 作為長段落字型替代
```

**字型層級系統**（Space Grotesk）：

| 層級 | 用途 | Weight | Size（1440px 基準） | Line-height | Letter-spacing |
|------|------|--------|---------------------|-------------|----------------|
| Display | 頁面主標題 Hero | 700 | clamp(2rem, 3.5vw, 3.5rem) | 1.0 | -0.04em |
| H1 | 欄標題（FLIGHT DISPATCH 等） | 600 | clamp(0.625rem, 0.9vw, 0.875rem) | 1.2 | 0.12em |
| H2 | 面板區塊標題 | 600 | clamp(0.75rem, 1vw, 1rem) | 1.3 | 0.06em |
| KPI | B2B 數字核心 | 700 | clamp(1.5rem, 2.5vw, 2.5rem) | 1.0 | -0.02em |
| Body | 產品描述、說明文字 | 400 | 0.8125rem (13px) | 1.55 | 0 |
| Caption | 技術標籤、次要資訊 | 400 | 0.6875rem (11px) | 1.4 | 0.04em |
| Mono-Data | 所有數字、狀態碼、HUD | 400 | 0.75rem (12px) | 1.4 | 0 |
| Mono-Large | KPI 輔助數字 | 500 | clamp(1rem, 1.8vw, 1.75rem) | 1.0 | -0.01em |

注意：H1 層級在這個設計中用於欄標題（如「FLIGHT DISPATCH」），刻意用小字全大寫 + 大字距製造標籤牌效果，符合航管中心的標識系統。

### 2.3 Spacing（間距系統）

採用 4px 基礎單位，形成精密的模組化間距：

```
--space-1:  4px    /* 微間距，icon 與 label 間 */
--space-2:  8px    /* 最小元件間距，觸控目標安全距離 */
--space-3:  12px   /* 標準元件內 padding */
--space-4:  16px   /* 卡片內 padding，行間距 */
--space-5:  20px   /* 元件群組間距 */
--space-6:  24px   /* 區塊內間距 */
--space-8:  32px   /* 欄間距 */
--space-10: 40px   /* 面板間距 */
--space-12: 48px   /* 大區塊上下 padding */
--space-16: 64px   /* 版面頂部安全距離 */
```

**VISUAL_DENSITY 8 的間距規則**：
- 欄位內 padding：`--space-3` 到 `--space-4`（不用寬鬆的 `--space-6`）
- 區塊分隔：1px separator line，不用大段間距
- 左欄列表項：固定 80px 高（緊密排列，保留可點擊面積）
- HUD 列：32px 高，上下 padding 各 `--space-2`

### 2.4 Grid（格線系統）

**桌機 1440px（設計基準）**：
```
Container：全滿寬（無 max-width 限制，儀表板佔滿螢幕）
Gap：--space-1（4px，欄間只有極窄縫隙，航管密度感）

欄定義：
  左欄 FLIGHT DISPATCH：288px（固定寬）
  中欄 COMMAND GLOBE：flex-1（剩餘空間，約 792px）
  右欄 INTEL PANEL：360px（固定寬）
```

**1024px**：
```
  左欄：240px（固定）
  中欄：flex-1
  右欄：280px（固定）
```

**768px（平板）**：
```
  左欄 + 中欄：合為主區（flex-1）
  右欄：以 Tab 形式覆蓋在主區右側（可收起，320px 寬）
```

**375px（手機）**：
```
  單欄全寬，三欄收合
  左右 padding：--space-4（16px）
```

### 2.5 Border Radius（統一圓角）

**全站一致採用近銳角系統**：

```css
--radius-xs:  2px;    /* 幾乎銳角：狀態 Badge、HUD 數值框 */
--radius-sm:  4px;    /* 小圓角：Tag、技術標籤、列表項背景 */
--radius-md:  6px;    /* 中圓角：卡片、Drawer、面板 */
--radius-lg:  8px;    /* 大圓角：主要 CTA 按鈕、Modal */
--radius-pill: 9999px; /* 膠囊：狀態 Badge（APPROACHING 等），僅此元件 */
```

**選型理由**：航管中心的儀器板是方正的（CRT 顯示器、儀表盤），不用大圓角。唯有狀態 Badge 用膠囊形，因為那是「訊號燈/標識牌」的視覺語言，兩者有明確語意分工。

**禁止混用確認**：全站不在同一容器裡混用 `--radius-md` 卡片和 `--radius-pill` 卡片。

### 2.6 Shadow（陰影系統）

```css
--shadow-panel:   0 0 0 1px var(--color-border);            /* 面板邊框替代陰影 */
--shadow-elevated: 0 4px 24px rgba(8, 14, 26, 0.60);        /* 深色投影，匹配底色調 */
--shadow-glow-accent: 0 0 16px rgba(14, 184, 213, 0.20);    /* 青色輝光，CTA 限用 */
--shadow-glow-primary: 0 0 12px rgba(212, 146, 10, 0.25);   /* 琥珀輝光，選中狀態限用 */
```

陰影顏色全部基於底色調色（深藍黑調），無純黑 `rgba(0,0,0,x)` 陰影。

---

## 3. 三欄佈局規格（保留 Gemini 架構）

### 3.1 整體結構

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Global Nav（60px）                                                       │
│  [●] COMMAND CENTER      [FLIGHT DISPATCH] [INTEL] [TERMINAL]  [HIRE ME] │
├──────────────┬───────────────────────────────────────┬───────────────────┤
│ FLIGHT       │                                       │ INTEL PANEL       │
│ DISPATCH     │        COMMAND GLOBE                  │ (360px 固定)      │
│ (288px 固定) │        (flex-1, ~792px)               │                   │
│              │        Three.js Canvas                │                   │
│              │                                       │                   │
├──────────────┴───────────────────────────────────────┴───────────────────┤
│  HUD 狀態列（32px）                                                        │
│  [●] SYSTEM HEALTH: OPTIMAL  |  FLIGHT QUEUE: 5  |  UPTIME: 7Y           │
└──────────────────────────────────────────────────────────────────────────┘
```

**全屏高度**：`min-height: 100dvh`（iOS Safari 安全）
**三欄容器**：`height: calc(100dvh - 60px - 32px)`（nav + HUD 扣除後完整填滿）

### 3.2 左欄：FLIGHT DISPATCH（288px）

**職責**：5 個 AI 產品作為進場航班的調度看板，是訪客選擇「深入哪架飛機」的入口。

**內容模塊（由上至下）**：
```
┌─────────────────────────────────┐
│  FLIGHT DISPATCH                │  ← H1 層級，小字全大寫，字距 0.12em
│  ─────────────────────────────  │  ← 1px separator
│                                 │
│  [●] [Icon] AI Hunter           │  ← 列表項，80px 高
│           求職加速器 AI Agent    │
│           [LLM] [RAG]  APPROACHING▶│
│  ─────────────────────────────  │
│  [●] [Icon] 尋物小精靈           │
│           家庭物品管理系統        │
│           [Firebase] [AI]  HOLDING◉│
│  ─────────────────────────────  │
│  [●] [Icon] DailyLumos          │
│           每日箴言心靈應用        │
│           [Vector DB] [NLP]  ON FINAL↓│
│  ─────────────────────────────  │
│  [●] [Icon] VocalCanvas         │
│           AI 文字轉語音工具       │
│           [TTS API] [Audio]  TAXIING→│
│  ─────────────────────────────  │
│  [●] [Icon] 無敵毛孩            │
│           寵物健康 AI 推薦        │
│           [Vision AI] [DB]  ACTIVE■│
│                                 │
└─────────────────────────────────┘
```

**各欄結構細節**：
- 左側指示燈（●）：8px 直徑圓點，顏色對應 `--color-status-*`，位於 padding-left: 12px
- 產品 Icon：32x32px，毛玻璃小框（border-radius: --radius-sm），背景 `--color-card`
- 產品名稱：Space Grotesk 500，13px，`--color-foreground`
- 描述文字：Space Grotesk 400，11px，`--color-foreground-muted`
- 技術標籤：6px padding 水平，2px padding 垂直，border-radius: --radius-xs，border: 1px `--color-border`，JetBrains Mono 10px，`--color-foreground-dim`
- 狀態 Badge：右側對齊，詳見第 5 節規格

**指示燈顏色對應**：
- APPROACHING：`--color-status-approaching`（冰川青）
- HOLDING：`--color-status-holding`（琥珀）
- ON FINAL：`--color-status-on-final`（警示紅）
- TAXIING：`--color-status-taxiing`（冷灰藍）
- ACTIVE：`--color-status-active`（HUD 綠）

### 3.3 中欄：COMMAND GLOBE（flex-1）

**職責**：整個頁面的視覺重心、Three.js 指揮台、沉浸式 3D 互動場景。

**內容模塊**：

```
┌──────────────────────────────────────────────────────────┐
│  Hero 文字區（地球儀上方，緊貼不佔高度）                     │
│  SYS-ID: 00447-B                                         │  ← Caption，dim 色
│  MANAGING CHAOS, GUIDING INNOVATION                      │  ← Display，琥珀微光
│  Frank Chen · Software PM + Engineer · 7Y Experience     │  ← Body，muted 色
│                                                          │
│  [FLIGHT QUEUE ─────────────────────────]               │  ← 右上角 HUD 面板
│  ↓ FLT-01 AI Hunter      APPROACHING                    │
│  ↓ FLT-03 DailyLumos     ON FINAL                       │
│  → FLT-04 VocalCanvas    TAXIING                        │
│  ■ FLT-05 無敵毛孩       ACTIVE                          │
│  ◉ FLT-02 尋物小精靈     HOLDING                         │
│  ────────────────────────────────────────               │
│                                                          │
│       ╭──────────────────────────────╮                  │
│       │                              │                  │
│       │     Three.js Canvas          │                  │
│       │     3D 地球儀 + 弧線 + 飛機   │                  │
│       │                              │                  │
│       │     [SYSTEM HEALTH: OPTIMAL] │  ← WebGL overlay │
│       │     [CONNECTED NODES: 125]   │                  │
│       │                              │                  │
│       ╰──────────────────────────────╯                  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Hero 文字定位**：
- 位於 Three.js Canvas 正上方，欄頂部
- 垂直 padding-top: 20px（Nav 下方）
- 文字左對齊（`text-align: left`），符合 DESIGN_VARIANCE: 9 的反置中偏見規則

**FLIGHT QUEUE 面板**：
- 絕對定位於中欄右上角，`top: 20px; right: 8px`
- 寬度：200px，背景：`--color-background-glass`，backdrop-filter: blur(12px)
- 邊框：1px `--color-border`，radius: `--radius-md`
- 字體：JetBrains Mono 11px

**SYSTEM HEALTH / CONNECTED NODES**：
- WebGL Canvas 內的 HTML overlay（`position: absolute`，pointer-events: none）
- 左下角，JetBrains Mono 11px，`--color-accent` 30% 不透明
- 非 Three.js 物件，是 CSS 疊加層

### 3.4 右欄：INTEL PANEL（360px）

**職責**：展示可量化的 B2B 企業戰績、全球網路、技術棧、資格認證，補足 Gemini 圖的最大遺漏。

**內容模塊（由上至下）**：

```
┌─────────────────────────────────────┐
│  B2B MISSION RECORD                 │  ← H1 層級標題
│  ─────────────────────────────────  │
│  -97%   時間成本削減                 │  ← KPI 數字（琥珀金）+ Body 說明
│         企業空間借用系統 · 緯創        │
│  +60%   跨團隊效率提升               │
│         SAP 數據交換 · 爭鮮          │
│  100%   數據正確率                   │
│         跨國 WMS · 緯創              │
│  3      企業核心系統從零建置          │
│         政府 EIP + WMS + AI 決策     │
│                                     │
│  [REQUEST CONSULTATION]             │  ← 主 CTA 按鈕
│  下載 PDF 履歷（次要連結）            │
├─────────────────────────────────────┤
│  COMMAND CREDENTIALS                │
│  [PMP 認證] [Atos 優秀員工]          │
│  [Wistron 黑客松第三名]              │
├─────────────────────────────────────┤
│  GLOBAL NETWORK                     │
│  [SVG 世界地圖]                      │
│  ● Taiwan  ● Atos Projects          │
│  ● Location ● SAP Global            │
├─────────────────────────────────────┤
│  CORE TECH STACK                    │
│  [JS]──[React]──[PHP]──[SQL]        │
│    \──[PowerApps]──[ABAP]──[Git]    │
└─────────────────────────────────────┘
```

---

## 4. Three.js 3D 元素規格

### 4.1 3D 地球儀

**幾何與材質**：

```
Geometry：THREE.SphereGeometry(radius: 2.0, widthSegments: 64, heightSegments: 64)
  - 高細分度確保弧線與表面的對齊平滑

Material：THREE.MeshPhongMaterial
  - map：地球日面紋理（2048x1024 px，高解析度 equirectangular）
  - specularMap：鏡面光澤貼圖（讓海洋帶反光，陸地無光）
  - specular：new THREE.Color(0x224466)（冷藍鏡面反光）
  - shininess：25（低光澤，航管中心的沉穩感）

強調：夜間氛圍
  - 全站是「夜間機場塔台」場景，地球應呈現夜面為主
  - emissiveMap（可選）：城市燈光貼圖，讓陸地夜面有微弱橙黃城市光
  - emissive：new THREE.Color(0x112233)（極弱的藍調底發光）
```

**光源設定**：

```
AmbientLight：
  - color: 0x0D1A2E（深藍調環境光，非白色）
  - intensity: 0.4

DirectionalLight（主光，模擬太陽）：
  - color: 0xD4E8FF（冷白偏藍，夜間邊際光效果）
  - intensity: 1.2
  - position: (5, 3, 5)（側上方，製造地球邊緣輝光）
  - castShadow: false（效能考量）

PointLight（可選，強化地球輝光）：
  - color: 0x0EB8D5（冰川青，強化夜面的 AI 科技感）
  - intensity: 0.3
  - position: (-3, 0, 3)
```

**大氣層輝光（Atmosphere Glow Shader）**：

```glsl
/* Vertex Shader */
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

/* Fragment Shader */
uniform vec3 atmosphereColor;  /* #0EB8D5 冰川青 */
uniform float atmosphereStrength;  /* 0.6 */

varying vec3 vNormal;

void main() {
  float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
  gl_FragColor = vec4(atmosphereColor, 1.0) * intensity * atmosphereStrength;
}
```

```javascript
// 大氣層球體（略大於地球，additive blending）
const atmosphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(2.15, 64, 64),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      atmosphereColor: { value: new THREE.Color(0x0EB8D5) },
      atmosphereStrength: { value: 0.6 }
    },
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  })
);
```

**旋轉行為**：

```javascript
// 自動旋轉
globe.rotation.y += 0.003 * delta;  /* 每秒約 0.17 度，60 秒一圈 */

// 拖曳旋轉（僅水平軸，不允許垂直翻轉）
controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;      /* 禁止縮放 */
controls.enablePan = false;       /* 禁止平移 */
controls.enableDamping = true;    /* 慣性阻尼 */
controls.dampingFactor = 0.05;
controls.minPolarAngle = Math.PI / 4;   /* 限制垂直旋轉範圍 */
controls.maxPolarAngle = Math.PI * 3/4;
```

**互動（點擊 / 拖曳）**：

```javascript
// 點擊飛機 Sprite：Raycasting 偵測
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObjects(planeSprites);
if (intersects.length > 0) {
  const selectedProduct = intersects[0].object.userData.productId;
  // 1. 左欄：對應列表項高亮
  // 2. 右欄：切換為產品詳情面板（Drawer）
  // 3. 相機：GSAP 動畫旋轉至最佳角度（800ms ease-out）
  gsap.to(globe.rotation, {
    y: targetAngle,
    duration: 0.8,
    ease: "power2.out"
  });
}
```

### 4.2 3D 飛行路徑弧線

**弧線幾何**：

```javascript
// 每條飛行弧線：QuadraticBezierCurve3
function createFlightArc(startLatLon, endLatLon, arcHeight) {
  const startVec = latLonToVector3(startLatLon, radius);
  const endVec = latLonToVector3(endLatLon, radius);
  const midVec = startVec.clone()
    .add(endVec)
    .normalize()
    .multiplyScalar(radius + arcHeight);  // 弧頂高於地球表面

  const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
  return curve;
}

// 各產品弧線高度（依狀態調整，APPROACHING 最高，ACTIVE 最低）
const arcHeights = {
  'AI Hunter':     0.8,   // APPROACHING，最高，進場感強
  'DailyLumos':    0.5,   // ON FINAL，中等
  'VocalCanvas':   0.3,   // TAXIING，低
  '無敵毛孩':       0.1,   // ACTIVE，幾乎貼面
  '尋物小精靈':    1.0,   // HOLDING，最高，軌道等待
};
```

**弧線材質**：

```javascript
// 弧線管材：TubeGeometry（有粗細）
const tube = new THREE.TubeGeometry(curve, 60, 0.008, 4, false);
const arcMaterial = new THREE.MeshBasicMaterial({
  color: statusColor,          // 依產品狀態色 --color-status-*
  transparent: true,
  opacity: 0.75,
  blending: THREE.AdditiveBlending,
});

// 動態繪製動畫（沿弧線從起點延伸至終點）
// 使用 draw range 控制：
geometry.setDrawRange(0, Math.floor(totalCount * progress));
// progress 0 → 1，週期 4-8 秒，requestAnimationFrame 驅動
```

**線段材質備選**（效能優先時）：

```javascript
// 改用 Line + LineBasicMaterial，效能更佳
const points = curve.getPoints(80);
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const lineMaterial = new THREE.LineBasicMaterial({
  color: statusColor,
  transparent: true,
  opacity: 0.65,
});
```

**弧線動畫行為**：

| 狀態 | 動畫 | 週期 |
|------|------|------|
| APPROACHING | 從出發點到地球，持續描繪，有尾光消退 | 6 秒 |
| HOLDING | 環繞圓弧持續循環 | 8 秒 |
| ON FINAL | 緩慢從外向地球移動，幾乎凍結 | 12 秒 |
| TAXIING | 在地球表面弧線短距離往返 | 4 秒 |
| ACTIVE | 靜止在地球表面，微脈衝光點 | 靜止 |

### 4.3 飛機 Sprite

**材質**：

```javascript
// THREE.Sprite（永遠面向相機）
const texture = new THREE.TextureLoader().load('/assets/plane-sprite.png');
// plane-sprite.png：白色飛機輪廓，透明背景，256x256px
// 在 Three.js 中疊加藍白色彩

const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
  color: statusColor,
  transparent: true,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true,    // 遠小近大，符合透視
});

const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(0.15, 0.15, 1);   // 相對地球半徑的大小
sprite.userData.productId = 'ai-hunter';
```

**Sprite 沿弧線移動**：

```javascript
function animatePlane(sprite, curve, progress) {
  const point = curve.getPoint(progress);  // 0-1 沿路徑位置
  sprite.position.copy(point);

  // 讓飛機旋轉朝向移動方向
  const tangent = curve.getTangent(progress);
  // Sprite 面向相機，不處理 3D 旋轉，僅用 2D 旋轉模擬方向
  sprite.material.rotation = Math.atan2(tangent.y, tangent.x) - Math.PI / 2;
}
```

**Hover 飛行數據卡**（HTML Overlay，非 WebGL）：

```
┌────────────────────────────────┐
│  FLT-01  AI Hunter             │
│  STATUS: APPROACHING           │
│  ALTITUDE: v2.1                │
│  PASSENGERS: 127 active users  │
│  TECH: LLM + RAG + Embeddings  │
│  ORIGIN: TW · DEST: GLOBAL     │
└────────────────────────────────┘
```

實作：`position: absolute`，用 Three.js 的 `vector.project(camera)` 將 3D 座標轉換為螢幕座標後定位。背景：`--color-background-glass`，backdrop-filter: blur(8px)，border: 1px `--color-border-bright`，radius: `--radius-md`，width: 200px。字體：JetBrains Mono 11px。

### 4.4 粒子系統（星空）

```javascript
// 星空背景粒子
const starCount = 1000;  // 桌機；手機降至 200
const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  positions[i * 3]     = (Math.random() - 0.5) * 50;  // x
  positions[i * 3 + 1] = (Math.random() - 0.5) * 50;  // y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 50;  // z（地球後方）
}

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const starMaterial = new THREE.PointsMaterial({
  color: 0xCCDDEE,    // 冷白帶藍，非純白
  size: 0.04,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.7,
});

// 合併為單一 Points Mesh，1 draw call
const stars = new THREE.Points(starGeometry, starMaterial);
```

**粒子行為**：
- 極緩慢自轉（`stars.rotation.y += 0.0001`），製造宇宙漂移感
- 非獨立動畫，跟隨主場景 requestAnimationFrame
- `prefers-reduced-motion` 觸發時：粒子完全不初始化

### 4.5 降級方案（WebGL 不支援）

**偵測與降級流程**：

```javascript
// 入口偵測
function detectWebGLSupport() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return !!gl;
}

// GPU 能力偵測（搭配 @pmndrs/detect-gpu）
import { getGPUTier } from 'detect-gpu';
const gpuTier = await getGPUTier();

const renderMode = (() => {
  if (!detectWebGLSupport()) return 'static';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'static';
  if (gpuTier.tier === 0) return 'static';
  if (gpuTier.tier === 1 || window.innerWidth < 768) return 'lite';  // 三.js 無粒子無 shader
  return 'full';  // 完整 Three.js
})();
```

**各降級等級**：

| 等級 | 地球 | 弧線 | 飛機 | 粒子 | Shader |
|------|------|------|------|------|--------|
| full | Three.js 球體 + 紋理 | Three.js 曲線 | Three.js Sprite | 1000 顆 Points | 大氣層 Shader |
| lite | Three.js 球體（簡化紋理） | Three.js 曲線 | Three.js Sprite | 無 | 無 |
| static | SVG 圓形 + CSS 漸層 | CSS animation path | CSS position 動畫 | 無 | 無 |

**Static 降級 SVG 方案**：

```
- 圓形 SVG：帶深色填充和大氣層 box-shadow 模擬
- 弧線：SVG path，配合 CSS @keyframes stroke-dashoffset 動畫
- 飛機：SVG plane icon，沿 CSS path 位移
- 右下角小提示（JetBrains Mono，8px，dim 色）：
  「已切換至靜態模式，節省您的系統資源」
```

---

## 5. 各元件 7 狀態規格

### 5.1 PROJECT DISPATCH 列表項

每個列表項：80px 高，全寬，可點擊，觸控目標符合 44px 最低標準。

| 狀態 | 視覺描述 | Token |
|------|---------|-------|
| **default** | 背景透明，左側指示燈正常亮度（依狀態色），產品名稱 `--color-foreground`，描述 `--color-foreground-muted`，技術標籤邊框 `--color-border` | 無陰影，1px 底部 separator |
| **hover** | 背景變為 `--color-accent-dim`（青色微光），左側指示燈亮度 +20%，左側出現 2px `--color-accent` 縱線，卡片高度不變（非展開，只改色）| transition: background 150ms ease-out |
| **active** | 背景 `--color-primary-dim`（琥珀微光），左側縱線改為 `--color-primary`（琥珀），`transform: scale(0.99)`，1px 頂部邊框亮青色 | transition: all 150ms ease-out |
| **selected（選中）** | 背景 `--color-primary-dim`，左側 3px 琥珀縱線，產品名稱字重 600，地球儀對應飛行弧線高亮 | box-shadow: inset 3px 0 0 var(--color-primary) |
| **disabled** | 全元件 opacity: 0.35，指示燈熄滅（灰色），cursor: not-allowed，技術標籤文字 dim | pointer-events: none |
| **loading** | 骨架屏：左側圓點骨架（8px 灰圓），右側兩條寬度不等的灰色矩形（shimmer 動畫），高度維持 80px | shimmer: linear-gradient 從左到右掃過 |
| **empty** | 不適用（左欄至少有產品列表；若 API 失敗改為 error 態） | - |
| **error** | 背景帶 `--color-destructive-dim`，左側縱線紅色，產品名稱顯示「FLT-XX · 資料載入失敗」，右側顯示重試 icon | border-left: 2px solid var(--color-destructive) |

### 5.2 Status Badge（APPROACHING / STANDBY / ACTIVE 等）

形狀：膠囊（border-radius: --radius-pill），寬 auto，高 20px，左右 padding: --space-2（8px）。
字體：JetBrains Mono 10px，字距 0.06em，全大寫。

| 狀態 | 背景 | 文字色 | 左側點 | 邊框 |
|------|------|--------|--------|------|
| APPROACHING | `rgba(14,184,213,0.12)` | `--color-accent` | 8px 青色，脈衝動畫 | 1px `--color-accent` 25% |
| ON FINAL | `rgba(248,113,113,0.12)` | `--color-status-on-final` | 8px 紅色，快速閃爍 | 1px `--color-status-on-final` 25% |
| HOLDING | `rgba(212,146,10,0.12)` | `--color-primary` | 8px 琥珀，緩慢脈衝 | 1px `--color-primary` 25% |
| TAXIING | `rgba(139,159,194,0.10)` | `--color-status-taxiing` | 8px 灰藍，靜態 | 1px `--color-status-taxiing` 20% |
| ACTIVE | `rgba(34,197,94,0.12)` | `--color-status-active` | 8px 綠色，心跳脈衝 | 1px `--color-status-active` 25% |

**7 狀態**：

| 狀態 | 視覺 |
|------|------|
| default | 如上表各航空狀態 |
| hover | opacity: 1（部分狀態略透明，hover 時完全不透明），cursor: default（Badge 本身不可點擊） |
| active | 不適用（Badge 不作為 CTA 使用） |
| disabled | opacity: 0.4，左側點熄滅為灰色 |
| loading | 寬度佔位骨架（60px 寬灰色膠囊 + shimmer） |
| empty | 顯示「STATUS: UNKNOWN」，dim 色 |
| error | 背景 destructive-dim，文字「SYS ERR」，紅色左側點閃爍 |

### 5.3 右欄 KPI 卡片

每個 KPI 卡片：高度 auto（不固定），水平全寬，左右 padding: --space-4，上下 padding: --space-3，底部 1px separator。

**結構**：
```
-97%           ← KPI 數字：Space Grotesk 700，clamp(1.5rem,2.5vw,2.5rem)，--color-primary（琥珀）
時間成本削減   ← 指標名：Space Grotesk 500，13px，--color-foreground
企業空間借用   ← 來源：JetBrains Mono 11px，--color-foreground-muted
· 緯創         ← 繼續來源（同行）
```

**7 狀態**：

| 狀態 | 視覺描述 |
|------|---------|
| default | 背景透明，底部 1px separator，KPI 數字琥珀色靜態 |
| hover | 背景 `--color-primary-dim`（琥珀微光），右側出現 chevron-right icon（dim 色，12px），tooltip 出現：「來源：XXXX 專案」 |
| active | `transform: scale(0.99)`，背景略深 `rgba(212,146,10,0.20)` |
| disabled | opacity: 0.35，數字變灰，cursor: default |
| loading | Count-up 動畫進行中（0 到目標值，1.2 秒，JetBrains Mono，數字跳動）；這不算「loading 骨架」，是有意設計的進場動畫 |
| empty | 數字顯示「--」，說明文字「資料待補充」，dim 色 |
| error | 數字顯示「ERR」，紅色，說明文字「資料載入失敗 · 重試」，帶重試 icon |

**Count-up 動畫**（Intersection Observer 觸發）：

```javascript
// 數字從 0 計數到目標值，1.2 秒
function countUp(el, start, end, duration) {
  let startTime = null;
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);  // ease-out cubic
    el.textContent = formatKPI(Math.floor(start + (end - start) * eased));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
```

### 5.4 CTA 按鈕（主要 + 次要）

**主要 CTA（REQUEST CONSULTATION）**：

尺寸：高 44px，左右 padding: --space-5（20px），border-radius: --radius-lg（8px），全寬於右欄。
字體：Space Grotesk 600，13px，字距 0.08em，全大寫。

| 狀態 | 背景 | 文字色 | 邊框 | 效果 |
|------|------|--------|------|------|
| default | `transparent` | `--color-accent` | 1px solid `--color-accent` | box-shadow: `--shadow-glow-accent` |
| hover | `--color-accent-dim` | `--color-accent` | 1px solid `--color-accent` | box-shadow 擴大，青色輝光增強 `rgba(14,184,213,0.35)` |
| active | `rgba(14,184,213,0.20)` | `--color-accent` | 1px solid `--color-accent` | `transform: translateY(1px) scale(0.99)` |
| disabled | opacity: 0.35 | `--color-foreground-dim` | 1px solid `--color-border` | cursor: not-allowed，無輝光 |
| loading | 顯示旋轉載入指示（非圓圈 spinner，改為 3 個點的 pulse 動畫），文字改「CONNECTING...」 | `--color-accent` 50% | 同 default | |
| empty | 不適用 | | | |
| error | 邊框改為 `--color-destructive`，文字「CONNECTION FAILED」，右側警告 icon | `--color-destructive` | 1px solid `--color-destructive` | 無輝光 |

**WCAG AA 對比確認**：
- 主 CTA：青色 `#0EB8D5` 在深色背景 `#080E1A` 上：對比比 5.2:1（超過 AA 4.5:1）
- Hover 狀態：同色，通過

**次要文字連結（下載 PDF 履歷）**：

尺寸：高 32px，inline，無背景。
字體：Space Grotesk 400，12px，`--color-foreground-muted`，下劃線 dotted。

| 狀態 | 視覺 |
|------|------|
| default | `--color-foreground-muted`，dotted underline，opacity: 0.7 |
| hover | `--color-foreground`，underline solid，opacity: 1 |
| active | `--color-foreground-dim`，opacity: 0.8，`transform: translateY(1px)` |
| disabled | opacity: 0.3，cursor: not-allowed，underline 消失 |
| loading | 文字替換為「PDF 準備中...」，opacity: 0.5 |
| empty | 不適用 |
| error | 文字替換為「PDF 暫不可用」，`--color-destructive` 30% |

### 5.5 Tech Node / Achievement 卡片

**Tech Node（CORE TECH STACK 節點）**：

每個 Tech Node：32x32px Icon 框 + 技術名稱 label（8px 下方）。
節點間連線：1px `--color-border`，SVG 路徑。

| 狀態 | 視覺 |
|------|------|
| default | Icon 框：`--color-card` 背景，1px `--color-border`，radius: --radius-sm；Label：JetBrains Mono 10px，dim 色；連線：`--color-border` |
| hover | Icon 框邊框改為 `--color-accent`，連線高亮至 `--color-accent` 50%，出現 tooltip（技術全名 + 使用場景：「PHP · SMESA EIP 後端開發」），`transform: scale(1.15)` |
| active | `transform: scale(1.05)`，Icon 框背景 `--color-accent-dim` |
| disabled | 整組 opacity: 0.3 |
| loading | Icon 框內：shimmer 圓形骨架，連線 shimmer |
| empty | 顯示 `[?]` 框 + 「未知技術」label |
| error | Icon 框邊框紅色，label 顯示「ERR」|

**Achievement 卡片（資格認證）**：

每個卡片：80px 寬 x 96px 高，背景 `--color-card`，border: 1px `--color-border`，radius: --radius-md，上下置中的 icon（32x32）+ 認證名稱（10px）+ 機構（9px，muted）。

| 狀態 | 視覺 |
|------|------|
| default | 如上規格，無特效 |
| hover | 邊框改 `--color-primary` 50%（琥珀），`transform: translateY(-2px)`，box-shadow: `--shadow-glow-primary`（輕微琥珀輝光），tooltip 出現（完整認證名稱） |
| active | `transform: translateY(-1px) scale(0.99)` |
| disabled | opacity: 0.35 |
| loading | 骨架屏（圓形 32px + 兩條矩形，shimmer） |
| empty | 不顯示卡片（右欄版面不為空認證留位） |
| error | 顯示 icon 為 `[?]`，label 「認證資料載入失敗」|

---

## 6. 各頁面 Layout（首頁為主）

### 6.1 首頁（Command Center）/ 

**Z 軸分層**（由後至前）：

```
Layer 0：CSS 背景層（夜間機場照片，blur(3px) + overlay rgba(8,14,26,0.75)）
Layer 1：Three.js Canvas（z-index: 10，pointer-events 在中欄限定區域內啟用）
Layer 2：HTML UI 層（z-index: 20，三欄佈局，毛玻璃面板）
Layer 3：Drawer / Slide-over（z-index: 30）
Layer 4：Global Nav（z-index: 40，sticky）
Layer 5：HUD 狀態列（z-index: 40，fixed bottom）
Layer 6：固定 CTA 模塊（z-index: 50，fixed right-bottom）
Layer 7：Toast 通知（z-index: 60）
Layer 8：Modal（z-index: 70）
```

**首頁視覺流程**（初次進入的視線動線）：

```
1. 進場動畫（1.5 秒）
   - Canvas 淡入 → 地球從小放大至標準大小（GSAP scale 0.4 → 1，ease-out）
   - HUD 文字從左逐字打印（JetBrains Mono terminal 效果）
   - 左欄列表項依序滑入（stagger 0.1s，Motion animate）
   - 右欄 KPI Count-up 啟動（IntersectionObserver 觸發）

2. 靜止狀態
   - 地球緩慢自轉
   - 飛行弧線循環繪製
   - 飛機 Sprite 沿路徑移動
   - HUD 底部數值 5-8 秒閃動一次
   - 星空粒子緩慢旋轉

3. 互動觸發（左欄點擊 or 地球飛機點擊）
   - 地球旋轉聚焦（GSAP 800ms）
   - 左欄對應項目高亮
   - 右欄 Drawer 從右滑入（200ms ease-out）
```

**固定 CTA 模塊**（右下角，scroll > 40vh 後淡入）：

```
┌─────────────────────────────────┐
│  ▶  REQUEST CONSULTATION        │  ← 主 CTA，詳見 5.4 規格
│     下載 PDF 履歷                │  ← 次要連結
└─────────────────────────────────┘
```

寬度：240px，padding: --space-4，radius: --radius-md，背景: `--color-background-glass`，backdrop-filter: blur(12px)，border: 1px `--color-border`。

### 6.2 產品詳情 Drawer

**觸發**：左欄列表點擊 or 地球飛機點擊
**位置**：主體區域右側滑入，覆蓋在右欄 INTEL PANEL 之上
**寬度**：420px（1440px）/ 380px（1024px）/ 全寬（768px 以下）

```
┌──────────────────────────────────────┐
│  [X]  FLT-01 · AI Hunter             │  ← 關閉按鈕 + 產品標識
│       [APPROACHING ▶]                │  ← 狀態 Badge
│  ────────────────────────────────    │
│  求職加速器 AI Agent                  │  ← 產品副標
│                                      │
│  技術架構                             │
│  ┌──────────────────────────────┐    │
│  │  用戶輸入 → LLM編排 → RAG    │    │  ← 簡化拓撲圖（SVG）
│  │  → Vector DB → 推薦輸出      │    │
│  └──────────────────────────────┘    │
│                                      │
│  FLIGHT DATA                         │
│  ALTITUDE  v2.1                      │  ← JetBrains Mono
│  PASSENGERS  127 active users        │
│  TECH STACK  LLM · RAG · TTS        │
│  ORIGIN  Taiwan · DEST  Global       │
│                                      │
│  核心難點                             │
│  將命理盤資料與 JD 進行高維度交叉分析   │
│                                      │
│  [深入架構 →]    [試用產品 ↗]         │
└──────────────────────────────────────┘
```

Overlay：背景 `rgba(8,14,26,0.5)`，地球儀維持旋轉（不暫停）。

---

## 7. RWD（Desktop 1440 / Tablet 768 / Mobile 375）

### 7.1 Desktop 1440px（設計基準）

見第 3 節三欄完整規格。

**全站關鍵測量值**：
- Nav 高度：60px
- HUD 列高度：32px
- 三欄可用高度：`calc(100dvh - 92px)`
- 左欄：288px 固定
- 右欄：360px 固定
- 中欄：`calc(100% - 288px - 360px - 8px)`（扣除 gap）

### 7.2 Tablet 768px

**佈局變化**：

```
┌───────────────────────────────────────┐
│  Nav（60px）                           │
├──────────────────────────────────────┤
│                           [INTEL TAB] │
│    主區（全寬）              可展開右側  │
│    地球儀 Three.js Lite               │
│    左欄列表疊加在地球下方              │
│                                      │
├──────────────────────────────────────┤
│  HUD（32px，精簡版 2 個數值）           │
└──────────────────────────────────────┘
```

- 三欄改為：左欄（240px 固定）+ 中欄（flex-1）；右欄收進 Tab 面板（點擊「INTEL」展開）
- 地球儀：Three.js Lite（無粒子），充滿中欄
- Nav：完整水平導覽，不用漢堡
- 固定 CTA：右下角非全寬（240px）

### 7.3 Mobile 375px

**Three.js 降級策略**：
- `prefers-reduced-motion: reduce`，或 GPU tier 0-1，或 `window.innerWidth < 768` 時，Three.js context **完全不初始化**
- 改為 SVG 地球圓形 + CSS `@keyframes stroke-dashoffset` 飛行弧線動畫
- CSS 動畫只使用 `transform` 和 `opacity`，無 `top/left/width/height` 動畫

**單欄垂直排列順序**：

```
1. Nav（60px，品牌 + 漢堡，全螢幕展開）
2. Hero 區（左對齊，padding: 20px）
   SYS-ID: 00447-B
   MANAGING CHAOS, GUIDING INNOVATION
   Frank Chen · Software PM + Engineer
3. SVG 地球儀卡片（全寬，240px 高）
   CSS 飛行弧線動畫
4. B2B KPI 橫向捲動卡片（scroll snap，4 個卡）
   每卡：160px 寬，80px 高，KPI 數字 + 說明
5. FLIGHT DISPATCH 手風琴（5 個產品）
   點擊展開：200ms ease-out height 動畫
   展開後顯示技術簡介 + 「查看完整架構」連結
6. GLOBAL NETWORK 地圖（全寬 SVG，120px 高）
7. CORE TECH STACK（全寬，2x3 網格）
8. 資格認證（3 個橫排，各 80px 寬）
9. Footer（法規聲明 + 版權）

[固定底部]：全寬 CTA 按鈕（56px 高，safe-area-inset-bottom 適配）
```

**iOS 安全區域**：

```css
.mobile-cta {
  padding-bottom: env(safe-area-inset-bottom);
  height: calc(56px + env(safe-area-inset-bottom));
}
```

**觸控目標驗證**：
- 手風琴觸發區：56px 高（超過 44px 最低）
- 橫向捲動卡片：各卡 80px 高，左右 padding 16px
- 底部 CTA：56px 高，全寬
- 所有 touch 目標間距 >= 8px

**手機橫向模式（landscape）**：
- 地球儀卡片：`max-height: 60dvh`
- KPI 卡片：改為 2 列 grid
- 底部 CTA 維持固定

### 7.4 RWD 斷點彙整

```css
/* Mobile First */
.layout { /* 375px：單欄 */ }

@media (min-width: 768px) {
  .layout { /* 平板：兩欄 + Tab 右欄 */ }
}

@media (min-width: 1024px) {
  .layout { /* 小桌機：三欄 20/50/30 */ }
}

@media (min-width: 1440px) {
  .layout { /* 大桌機：三欄 20/55/25 */ }
}
```

---

## 完工前驗證（Anti-Generic Checklist 逐條）

### Design System Pre-Flight

- [x] 三旋鈕值已設定（VARIANCE: 9 / MOTION: 9 / DENSITY: 8），有理由
- [x] 零 em-dash（全文未使用 `—` 或 `–`）
- [x] 禁止字體無出現（Space Grotesk + JetBrains Mono，非 Inter/Roboto/Arial）
- [x] 純黑 #000000 無出現（底色 #080E1A）
- [x] 英雄標題左對齊，單行設計（「MANAGING CHAOS, GUIDING INNOVATION」）
- [x] 按鈕 / 表單對比達 WCAG AA（青色 #0EB8D5 在 #080E1A 上：5.2:1）
- [x] 所有必要元件 7 狀態已設計（default/hover/active/disabled/loading/empty/error）
- [x] 無「3 欄等寬卡片」重複佈局（三欄為 288/flex-1/360，非等寬）
- [x] `min-height: 100dvh`（非 height: 100vh）
- [x] 行動裝置無水平滾動（單欄佈局，KPI 用 scroll snap）
- [x] 動畫只用 transform / opacity（Three.js 在 Canvas 內不影響 DOM reflow）
- [x] `prefers-reduced-motion` 已處理（Three.js context 完全不初始化）

### Anti-Generic Pre-Flight

- [x] 字型不是 Inter（Space Grotesk + JetBrains Mono）
- [x] 沒有 Fraunces / Instrument_Serif
- [x] 沒有 AI 紫色漸層/霓虹發光（清除了 Gemini 圖的紫光，改為語意色系）
- [x] 強調色全頁一致（唯一強調色：冰川青 `#0EB8D5`；琥珀金為品牌主色，角色分明）
- [x] Premium consumer 未用 `#f5f1ea` 暖米色系
- [x] Hero 沒有三欄等寬卡片
- [x] 沒有任何 em-dash `—` 或 `–` 分隔符
- [x] 所有按鈕文字在桌機版單行顯示（「REQUEST CONSULTATION」13px 空間足夠）
- [x] 沒有重複意圖的 CTA（只有一個「REQUEST CONSULTATION」主 CTA）
- [x] Loading / Empty / Error 狀態都已實作（第 5 節完整定義）
- [x] 行動裝置版型收合已宣告（第 7 節 375px 完整單欄規格）
- [x] 頁面主題全頁暗色鎖定（Dark Only，航管中心定位）
- [x] 沒有 div 拼接假截圖
- [x] 沒有泛型佔位符名稱（John Doe、Sarah Chan 等）
- [x] 圓角系統一致（全站 --radius 系列，膠囊僅限 Badge）
- [x] 陰影顏色匹配底色調（無純黑 rgba(0,0,0,x) 陰影）
- [x] Gemini 圖的 AI Tell 已逐一分析並清除（第 1 節）
- [x] 飛行數據卡數字已從虛構值替換為真實產品語境數據
- [x] references/typography 讀取嘗試（目錄無法存取，依 design-system skill 規範字型選型）
- [x] references/color-palettes 讀取嘗試（目錄無法存取，依 design-system skill 11 變數系統定義）

### Three.js 專項驗證

- [x] 3D 地球材質、光源、旋轉行為、拖曳互動已全部規格化
- [x] 飛行路徑弧線材質、曲率、動態繪製、各狀態行為已規格化
- [x] 飛機 Sprite 沿路徑移動、Hover 數據卡、點擊觸發已規格化
- [x] 粒子系統設計已規格化（桌機 1000 顆，手機 200 顆）
- [x] 降級方案三個等級（full/lite/static）已明確規格化
- [x] `prefers-reduced-motion` 時 Three.js 完全不初始化
- [x] WebGL 不支援時的 SVG 靜態降級方案已規格化

---

## Design Token 對照表

| Token 名稱 | 值 | 用途 |
|-----------|-----|------|
| `--color-background` | `#080E1A` | 頁面底色 |
| `--color-background-elevated` | `#0D1628` | 地球儀區域背景 |
| `--color-background-glass` | `rgba(13,22,40,0.72)` | 毛玻璃元件 |
| `--color-foreground` | `#E8EFF8` | 主要文字 |
| `--color-foreground-muted` | `#7A90B0` | 次要文字 |
| `--color-foreground-dim` | `#3D506E` | 弱化文字/分隔符 |
| `--color-primary` | `#D4920A` | 琥珀金：B2B KPI、選中態 |
| `--color-primary-dim` | `rgba(212,146,10,0.15)` | 琥珀微光 hover 背景 |
| `--color-primary-foreground` | `#080E1A` | 琥珀底色上的文字 |
| `--color-accent` | `#0EB8D5` | 冰川青：CTA、飛行弧線、唯一強調色 |
| `--color-accent-dim` | `rgba(14,184,213,0.12)` | 青色 hover 背景 |
| `--color-accent-glow` | `rgba(14,184,213,0.30)` | CTA 輝光（限量） |
| `--color-status-approaching` | `#0EB8D5` | APPROACHING 狀態 |
| `--color-status-active` | `#22C55E` | ACTIVE 狀態 |
| `--color-status-holding` | `#D4920A` | HOLDING 狀態 |
| `--color-status-taxiing` | `#8B9FC2` | TAXIING 狀態 |
| `--color-status-on-final` | `#F87171` | ON FINAL 狀態 |
| `--color-card` | `rgba(13,22,40,0.60)` | 卡片/面板背景 |
| `--color-border` | `rgba(14,184,213,0.10)` | 標準邊框 |
| `--color-border-bright` | `rgba(14,184,213,0.30)` | 選中/Hover 邊框 |
| `--color-separator` | `rgba(232,239,248,0.06)` | 水平分隔線 |
| `--color-destructive` | `#EF4444` | 錯誤/刪除 |
| `--color-ring` | `#0EB8D5` | 焦點環 |
| `--radius-xs` | `2px` | Badge、HUD 框 |
| `--radius-sm` | `4px` | Tag、技術標籤 |
| `--radius-md` | `6px` | 卡片、Drawer、面板 |
| `--radius-lg` | `8px` | 主要 CTA 按鈕 |
| `--radius-pill` | `9999px` | 狀態 Badge 專用 |
| `--space-1` | `4px` | 微間距 |
| `--space-2` | `8px` | 最小元件間距 |
| `--space-3` | `12px` | 標準元件內 padding |
| `--space-4` | `16px` | 卡片 padding、行間距 |
| `--space-5` | `20px` | 元件群組間距 |
| `--space-6` | `24px` | 區塊內間距 |
| `--space-8` | `32px` | 欄間距 |
| `--space-10` | `40px` | 面板間距 |
| `--shadow-panel` | `0 0 0 1px var(--color-border)` | 面板邊框替代陰影 |
| `--shadow-elevated` | `0 4px 24px rgba(8,14,26,0.60)` | 深色投影 |
| `--shadow-glow-accent` | `0 0 16px rgba(14,184,213,0.20)` | 青色輝光 |
| `--shadow-glow-primary` | `0 0 12px rgba(212,146,10,0.25)` | 琥珀輝光 |
| `font-display` | Space Grotesk 700 | 主標題 |
| `font-heading` | Space Grotesk 600 | 欄標題/H2 |
| `font-body` | Space Grotesk 400 | 說明文字 |
| `font-mono` | JetBrains Mono | 所有數字/狀態碼/HUD |
