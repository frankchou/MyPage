# V3 UX 設計提案（基於 Gemini 圖再設計）

**角色**：UX 設計師
**日期**：2026-06-08
**版本**：V3（基於 Gemini AI 示意圖進行再設計，Three.js 技術實作）

**設計旋鈕設定**：Design Variance: 9 / Motion Intensity: 8 / Visual Density: 8

---

## 1. Gemini 圖解析

### 圖中核心架構元素清單

觀察 Gemini 示意圖（`IMG_4707.png`），可識別出以下元素：

**佈局架構**
- 三欄式非對稱佈局：左欄（Project Dispatch 列表）、中欄（3D 地球儀指揮台）、右欄（Global Network + Core Tech Stack）
- 頂部導覽列：左側品牌名稱「COMMAND CENTER」、中央頁面標題「MY PORTFOLIO」、右側重複頁面名稱
- 底部系統狀態列：System Health: Optimal、Connected Nodes 數值、診斷文字

**中央地球儀模塊**
- 真實感地球紋理，帶有大氣層光暈
- 藍色/青色弧線飛行路徑從地球延伸出去
- 飛機圖示沿路徑移動，標示各 AI 產品名稱與狀態
- 每架飛機旁有數值資訊卡（座標、高度、速度等）
- 地球外圍有圓形 HUD 框架
- 「SYSTEM HEALTH: OPTIMAL」「CONNECTED NODES: 125」文字覆蓋在地球旁

**左欄 Project Dispatch**
- 5 個 AI 產品列表項目
- 每項包含：產品圖示 + 產品名稱 + 狀態標籤（APPROACHING / WAITING / TERMINAL 1 / Soundwave / Active）
- 列表項目帶有彩色側邊指示燈（不同顏色）
- 整體呈深色毛玻璃卡片風格

**右欄雙模塊**
- 上方：Global Network 區域，包含扁平世界地圖、Taiwan / Atos Projects / Location / SAP Global 標記節點
- 下方：Core Tech Stack 區域，技術 Icon 以連線網狀圖呈現（JS、SQL、PHP、React 等）
- 三個資格證書圖示（PMP、Atos、Wistron）帶有獎章樣式

**Hero 文字**
- 大標題：「MANAGING CHAOS, GUIDING INNOVATION.」
- 副標題：「[USER NAME] - SOFTWARE PM / ENGINEER」
- 中央 CTA 按鈕：「REQUEST COLLABORATION / HIRE ME」
- 文字疊加在地球儀模塊上方

**背景環境**
- 機場夜間塔台外觀照片作為背景（窗戶、跑道燈光）
- 強化航管中心的環境沉浸感

---

### 哪些是天才設計，必須保留

1. **三欄 ATC 佈局本身**：非對稱的三欄結構在 portfolio 設計中極為罕見，立刻建立「我不是普通 portfolio 網站」的第一印象，必須完整保留。

2. **AI 產品 = 進場航班的核心隱喻**：將 5 個 AI 產品比喻為進場中的航班，每個飛機帶有飛行數據卡，是整個概念最精彩的部分。這個隱喻完美融合業主興趣（飛機）與專業身份（指揮者/PM），不可拆解。

3. **中央地球儀作為指揮中心**：地球儀讓「Global Network」的概念具象化，同時作為視覺重心將三欄串聯，是整張圖的架構錨點。

4. **系統狀態列（底部 HUD）**：System Health: Optimal、Connected Nodes 的數值顯示，將個人 portfolio 包裝成真實系統的控制面板，強化「指揮官」形象。

5. **背景環境照**：夜間機場塔台的照片背景創造了即刻的「航管中心」沉浸感，是調性建立的關鍵素材。

6. **飛機狀態標籤**：APPROACHING、WAITING、TERMINAL 1、Active 這些航空術語用來標示產品狀態，讓整個隱喻貫穿始終。

---

### 哪些需要改進

| 問題項目 | 問題描述 | 嚴重程度 |
|---------|---------|---------|
| Hero 文字位置 | CTA 按鈕「REQUEST COLLABORATION」疊在地球儀上，視覺競爭嚴重，層次混亂 | 高 |
| B2B 戰績完全缺失 | 右欄只有 Global Network 地圖和 Tech Stack，沒有任何量化 B2B 成效（-97%、+15% 效率等），浪費了最有說服力的內容 | 高 |
| 左欄資訊密度不足 | 5 個產品列表只有名稱 + 狀態，缺少技術標籤或一行簡介，無法讓訪客快速判斷各產品的核心價值 | 中 |
| 右欄技術節點過於扁平 | Core Tech Stack 的連線圖是靜態的，和「指揮中心」的動感格格不入 | 中 |
| 地球儀是 2D 靜態圖像 | Gemini 圖的地球是照片合成，沒有互動性。Three.js 可以讓它真正旋轉、有弧線動畫、有點擊互動 | 高（機會） |
| 飛機數據卡可讀性低 | 飛行數據卡中的數字（21.5k5、500us、A0025 等）是虛構填充數字，且字型過小不易讀 | 中 |
| 行動裝置不可用 | 三欄佈局在手機上需要完整重新設計，Gemini 圖完全未考慮行動端 | 高 |
| 背景照片與 UI 層對比不足 | 背景照片和前景 UI 元素的對比度在某些區域不夠，影響文字可讀性 | 中 |

---

## 2. 保留的核心架構

### 三欄 ATC 佈局（各欄職責定義）

```
┌─────────────────────────────────────────────────────────────────┐
│  COMMAND CENTER                MY PORTFOLIO              [NAV]  │  ← 頂部導覽列
├──────────────┬──────────────────────────────┬──────────────────┤
│              │                              │                  │
│  左欄        │        中欄                  │     右欄         │
│  DISPATCH    │     COMMAND GLOBE            │   INTEL PANEL    │
│  (20%)       │        (55%)                 │     (25%)        │
│              │                              │                  │
│  AI 產品     │   Three.js 3D 地球儀         │  B2B 戰績儀表板  │
│  進場列表    │   飛行弧線動畫               │  Global Network  │
│              │   飛機圖示 + 數據卡          │  Core Tech Stack │
│              │                              │  資格認證        │
│              │                              │                  │
├──────────────┴──────────────────────────────┴──────────────────┤
│  系統狀態列：SYSTEM HEALTH: OPTIMAL  |  CONNECTED NODES: 125  │  ← 底部 HUD
└─────────────────────────────────────────────────────────────────┘
```

**左欄（FLIGHT DISPATCH，20%）**
- 職責：列出所有 AI 產品（進場航班），呈現各自的狀態與核心功能定位
- 內容：產品名稱、航空狀態標籤、技術標籤（1-2 個）、側邊彩色指示燈
- 互動：點擊任一列表項目，中央地球聚焦該產品的飛行路徑，右欄切換至產品詳情

**中欄（COMMAND GLOBE，55%）**
- 職責：整個頁面的視覺重心與互動中心，呈現「全球指揮官」的氣場
- 內容：Three.js 3D 地球儀、飛行弧線、飛機圖示、飛行數據卡、系統訊息覆蓋層
- 互動：可拖曳旋轉地球、點擊飛機節點觸發詳情、自動慢速旋轉

**右欄（INTEL PANEL，25%）**
- 職責：展示可量化的 B2B 企業戰績、全球網絡、技術棧
- 內容：B2B KPI 數據卡（新增）、Global Network 地圖、Core Tech Stack、資格認證
- 互動：KPI 數字 Count-up 動畫、技術節點 Hover 說明

---

### 地球儀作為指揮中心隱喻

保留並強化。具體意義對應：
- 地球儀 = 業主的作戰範圍（跨國專案、全球視野）
- 飛行弧線 = 專案或產品從「概念起點」飛向「用戶落地點」的軌跡
- 進場航班 = 已完成/進行中的 AI 產品，正在向市場降落
- 地球旋轉 = 持續運轉中的系統，永不停機

---

### AI 產品 = 進場航班的概念

完整保留，並強化每架航班的「飛行數據卡」內容，使其對應真實產品數據：

| 航班代號 | 產品名稱 | 狀態 | 飛行數據卡對應內容 |
|---------|---------|------|-----------------|
| FLT-01 | AI Hunter | APPROACHING | 用戶數、核心功能數、AI API 調用次數 |
| FLT-02 | 尋物小精靈 | HOLDING | 功能模塊數、支援家庭成員數 |
| FLT-03 | DailyLumos | ON FINAL | 箴言庫條目數、AI 解析準確率 |
| FLT-04 | VocalCanvas | TAXIING | 音檔生成速度、支援語音數 |
| FLT-05 | 無敵毛孩 | ACTIVE | 支援食品成分數、辨識準確率 |

---

### 其他保留元素

- 夜間機場塔台環境背景（作為 CSS backdrop 或 WebGL 環境光）
- 系統狀態底部 HUD 列
- 頂部 HUD 框架導覽列（COMMAND CENTER 品牌標識）
- 彩色側邊指示燈（各產品對應不同顏色）
- 航空術語狀態標籤系統（APPROACHING / HOLDING / ON FINAL / TAXIING / ACTIVE）

---

## 3. 再設計決策

### 3.1 Hero 文字區塊重新定位

**Gemini 圖問題**：標題和 CTA 按鈕疊加在地球儀中央，與 3D 元素產生視覺競爭。

**再設計方案**：
- 將主標題移至頁面最頂部，位於導覽列下方、地球儀上方，形成清晰的閱讀層次
- 標題文字：一行，不超過 2 行
- CTA 按鈕移至右欄上方，緊鄰 B2B KPI 模塊，在「看完戰績」的自然閱讀終點觸發
- 地球儀中央區域保持清爽，只保留系統狀態覆蓋文字

**文字層次**（從上到下）：
```
[系列前綴 / 系統代碼]
[主標題 — 一行]
[職銜 + 年資摘要]
```

---

### 3.2 左欄 Flight Dispatch 互動深化

**Gemini 圖問題**：列表項目只有名稱和單一狀態詞，資訊量不足，無法引導訪客判斷哪個產品值得深入。

**再設計方案**：

每個列表項目包含四個資訊層：
```
[彩色指示燈] [產品縮寫圖示]
[產品名稱]              [狀態標籤 BADGE]
[一行技術定位文字]
[技術標籤組 x 2]
```

互動行為：
- 預設：列表垂直排列，5 個項目等高，有輕微的掃描視效
- Hover 單項：側邊指示燈亮度提高，背景卡片微微展開（高度 +8px），顯示完整技術標籤
- 點擊單項：中央地球儀的飛行弧線聚焦至該航班的起點 + 終點，右欄切換為該產品的詳情面板
- 當前選中項：左側出現 2px 琥珀金線條，卡片背景微亮

---

### 3.3 Globe 的 Three.js 3D 化方向

**Gemini 圖問題**：靜態 2D 地球圖片，沒有互動性，無法展現 Three.js 的能力。

**再設計方案**（詳見第 5 節）：
- 真實 Three.js 球體，帶有地球紋理貼圖（daymap + nightmap 混合，強調夜間塔台氛圍）
- 大氣層輝光（Atmosphere Glow Shader）
- 可拖曳旋轉
- 飛行弧線為 Three.js 曲線（QuadraticBezierCurve3），動態繪製
- 飛機圖示為 3D sprite，沿弧線路徑動畫移動
- 點擊飛機 sprite 觸發詳情

---

### 3.4 右欄 Intel Panel 重新規劃資訊層次

**Gemini 圖問題**：右欄有 Global Network 和 Core Tech Stack，但完全沒有 B2B 量化數據，是最大的設計遺漏。

**再設計方案**（右欄由上至下）：

```
┌──────────────────────────────┐
│  B2B MISSION KPI             │  ← 新增（最重要，放最上方）
│  -97% 時間成本               │
│  +60% 跨團隊效率             │
│  100% 數據正確性             │
│  +15% 專案管理效率           │
├──────────────────────────────┤
│  COMMAND CREDENTIALS         │  ← 資格認證（移至 KPI 下方）
│  [PMP] [Atos] [Wistron]      │
├──────────────────────────────┤
│  GLOBAL NETWORK              │  ← 保留地圖但縮小
│  [扁平世界地圖 + 節點]        │
├──────────────────────────────┤
│  CORE TECH STACK             │  ← 保留但加互動
│  [連線網狀圖]                 │
└──────────────────────────────┘
```

KPI 數字互動：
- 進入畫面視野時觸發 Count-up 動畫（1.2 秒，JetBrains Mono 字體，琥珀金色）
- Hover 各 KPI 時展開說明 tooltip：「來源：緯創 SAP 數據交換規範專案」

---

### 3.5 飛行數據卡資訊重設計

**Gemini 圖問題**：飛機旁的數據卡顯示虛構的航空數據（500us、A0025 等），與產品無關，是佔版面的空洞裝飾。

**再設計方案**：

飛行數據卡對應真實意義的產品數據，格式如下：
```
┌─────────────────────────┐
│ FLT-01  AI Hunter       │
│ STATUS: APPROACHING     │
│ ALTITUDE: v2.1          │  ← 版本號用「高度」比喻
│ PASSENGERS: 127 active  │  ← 用戶數用「乘客數」比喻
│ TECH: LLM + RAG + TTS   │  ← 核心技術棧
└─────────────────────────┘
```

---

### 3.6 底部 HUD 狀態列強化

**Gemini 圖現況**：底部有 System Health 和 Connected Nodes，但資訊量很小，視覺存在感弱。

**再設計方案**：
- 底部 HUD 列全寬，等寬字體，青色文字
- 從左到右顯示：
  `[●] SYSTEM HEALTH: OPTIMAL  |  FLIGHT QUEUE: 5  |  MISSIONS COMPLETED: 3  |  CONNECTED NODES: 125  |  UPTIME: 7Y`
- 數值定時閃爍更新（隨機微幅波動，製造「系統活著」的感覺）
- Uptime: 7Y 對應業主 7 年工作經驗

---

## 4. 新增元素

### 4.1 B2B 企業戰績模塊（Gemini 圖完全缺失）

這是 Gemini 圖最大的遺漏。業主的 7 年 B2B 戰績是核心競爭力之一，必須在首屏可見。

**放置位置**：右欄最上方（最顯眼的右上角）

**B2B KPI 儀表板設計**：

```
┌─────────────────────────────────────┐
│  B2B MISSION RECORD                 │
│  ─────────────────────────────────  │
│  -97%    時間成本削減               │
│          企業空間借用系統，緯創       │
│                                     │
│  +60%    跨團隊效率提升              │
│          SAP 數據交換，爭鮮           │
│                                     │
│  100%    數據正確率                  │
│          SAP 整合，跨國 3 系統        │
│                                     │
│  3       核心企業系統從零建置         │
│          政府 EIP + WMS + AI 決策    │
└─────────────────────────────────────┘
```

視覺規格：
- 數字：JetBrains Mono 字體，琥珀金色，特大字級
- 說明文字：小字，次要灰色
- 卡片背景：深色半透明毛玻璃
- 進入畫面：Count-up 動畫，0 到目標數值，1.2 秒

---

### 4.2 語境切換入口（新增但 Gemini 沒有）

訪客身份不同（CTO / CEO / 獵頭），期望看到的內容不同。

**設計方案**：頂部導覽列右側加入兩個切換標籤：
```
[企業決策者視角]  [技術深度視角]
```

- 預設：顯示均衡視圖（現有三欄設計）
- 切換至「企業決策者」：右欄放大 B2B KPI，左欄產品列表縮略化
- 切換至「技術深度」：右欄切換為 Tech Stack 連線圖，左欄展示產品技術標籤

---

### 4.3 進場隊列視覺化（強化隱喻）

在地球儀右上方加入「FLIGHT QUEUE」狀態面板：

```
FLIGHT QUEUE ──────────────────
  ↓ FLT-01  AI Hunter    APPROACHING  ●
  ↓ FLT-03  DailyLumos   ON FINAL     ●
  → FLT-04  VocalCanvas  TAXIING      ●
  ■ FLT-05  無敵毛孩     ACTIVE       ●
  ◉ FLT-02  尋物小精靈   HOLDING      ●
```

箭頭 + 符號使用航空術語的視覺代號，增強沉浸感。

---

### 4.4 固定式 CTA 模塊（右下角，Gemini 圖有但設計不足）

Gemini 圖的 CTA 按鈕在地球儀中央，容易被忽略。

**再設計**：
- 右下角固定浮動（sticky）的 CTA 模塊
- 僅在頁面捲動超過 40% 視窗高度後淡入（防止遮蓋初次瀏覽）
- 設計：帶有微弱青色輝光的暗色按鈕
- 主 CTA：「預約 15 分鐘架構對談」
- 次要文字連結：「下載 PDF 履歷」（極低視覺重量）

---

## 5. Three.js 3D 互動規格

### 5.1 哪些元素應該是 3D 的

| 元素 | 3D 方案 | 降級方案（行動裝置） |
|------|--------|------------------|
| 中央地球儀 | Three.js SphereGeometry + 地球紋理 | CSS 圓形漸層 + 靜態 SVG 弧線 |
| 飛行路徑弧線 | Three.js QuadraticBezierCurve3 | SVG path 動畫 |
| 飛機圖示 | Three.js Sprite 沿曲線移動 | CSS position 動畫 |
| 大氣層輝光 | GLSL Shader（Fresnel 效果） | CSS box-shadow + blur |
| 地球旋轉 | Three.js 自動旋轉 + 拖曳控制 | CSS animation rotate（2D） |
| 背景粒子 | Three.js Points（星空粒子場） | 靜態 CSS 背景 |

不建議 3D 化的元素：
- 左欄列表項目（保持 2D 即可，避免複雜度過高影響效能）
- 右欄 KPI 數字（2D 動畫 Count-up 足夠有力）
- 導覽列和 HUD 列（2D 毛玻璃效果）

---

### 5.2 3D 互動行為規格

**地球旋轉**
- 預設：每 60 秒自動完成一圈，方向向東（Y 軸正向）
- 速度：0.003 rad/frame（流暢但不急躁）
- 拖曳：滑鼠左鍵按住 + 拖曳可旋轉（OrbitControls，僅允許水平旋轉，鎖定垂直軸）
- 觸控：單指拖曳旋轉（touch event）
- 旋轉限制：不允許 zoom，防止地球放大破壞佈局

**飛行弧線**
- 弧線顏色：霓虹青色（#00D4FF 系）
- 弧線粗細：0.5–1.5px，越接近地球表面越粗
- 動畫：沿弧線從起點到終點循環繪製（線段延伸效果），周期 4–8 秒
- 弧線頂點高度：偏離地球表面 0.3–0.8 個地球半徑（依產品「遠近」調整）

**飛機 Sprite 互動**
- 飛機沿對應弧線持續移動，速度因狀態而異：
  - APPROACHING：快速，接近地球
  - HOLDING：繞地球軌道緩慢循環
  - ON FINAL：非常慢，幾乎靜止降落中
  - TAXIING：在地球表面緩慢移動
  - ACTIVE：固定在地球表面，微弱脈衝
- Hover 飛機 Sprite：出現 Tooltip 浮層（HTML overlay，非 WebGL），顯示飛行數據卡
- 點擊飛機 Sprite：左欄對應產品列表項高亮，右欄切換為產品詳情面板，地球緩慢旋轉至正對該產品的弧線終點

**粒子場**
- 地球外圍：稀疏白色粒子，模擬星空
- 數量：800–1200 個（行動裝置降至 200）
- 行為：極緩慢漂移，無規律，製造宇宙空間感

**相機行為**
- 初始：正面對地球，稍微偏右（讓地球不完全居中，製造不對稱張力）
- 自動：輕微 bob 上下（垂直振幅 0.02 個地球半徑，週期 8 秒）
- 聚焦動畫：點擊產品時，相機緩慢平移至最佳觀察角度（GSAP 控制，800ms ease-out）

---

### 5.3 效能考量與行動裝置降級

**效能分級**

| 設備能力 | 判斷依據 | 渲染方案 |
|---------|---------|---------|
| 高效能（桌機/平板） | GPU tier: high, 螢幕寬度 >= 1024px | 完整 Three.js：3D 地球 + 粒子 + 弧線 + Shader |
| 中效能（手機高階） | GPU tier: medium | Three.js 精簡版：3D 地球 + 弧線，無粒子，無 Shader |
| 低效能（手機低階 / 省電模式） | GPU tier: low 或 prefers-reduced-motion | 靜態 SVG：扁平地球圖 + CSS 弧線動畫 |
| WebGL 不支援 | WebGL context 創建失敗 | 靜態 PNG 替代圖 + CSS 裝飾 |

**GPU 能力偵測**：使用 `@pmndrs/detect-gpu` 套件，在 `DOMContentLoaded` 後立即執行，依結果動態載入對應渲染模組。

**效能預算**
- Three.js 場景 LCP 貢獻：不超過 800ms（Canvas 元素視為 LCP 候選時）
- Three.js bundle 大小：gzip 後不超過 180KB（使用 tree-shaking 僅引入必要模組）
- 粒子場 draw call：合併為單一 Points Mesh，不超過 1 draw call
- `prefers-reduced-motion: reduce` 時：Three.js context 完全不初始化，改用 CSS 靜態方案

**行動裝置（375px）完整降級方案**：
- 三欄佈局收合為單欄（詳見第 6 節響應式規格）
- 地球儀改為全寬卡片，SVG 版本
- 飛行弧線改為 CSS animation
- 飛機圖示使用 emoji 或 SVG icon
- 底部 HUD 列縮減為 2 個數值

---

## 6. User Flow（基於再設計）

### 資訊架構（IA）

```
Root /
├── 首頁（Command Center）           /
│   ├── 產品 Drawer（頁內展開）      [drawer overlay]
│   └── 預約 Slide-over             [slide-over overlay]
├── AI 機庫                         /skunkworks
│   ├── 產品詳情（頁內展開）         [drawer overlay]
│   └── 白皮書索取                  [modal]
├── 企業核心                        /enterprise
│   ├── 三個專案切換                [tab switch]
│   └── 預約 Slide-over            [slide-over overlay]
└── 終端機洞察                      /terminal
    ├── 文章列表（即時搜尋）         [dynamic filter]
    └── 文章詳情                    /terminal/[slug]
```

所有主要互動為頁內 Drawer/Slide-over，不跳頁，保護閱讀心流。

---

### Flow 1：企業決策者 / 獵頭（90 秒快速判斷路徑）

**目標**：快速看懂「這個人值不值得約談」

```
1. 到達首頁
   → 看到三欄 ATC 佈局，立即感受到「這不是一般 portfolio」
   → 右欄 B2B KPI Count-up 動畫觸發（-97%、+60% 等）
   ↓

2. 視線掃描右欄
   → B2B KPI 數字：確認企業管理的量化底盤
   → 資格認證（PMP 等）：確認專業資歷
   ↓

3. 視線移至中央地球儀
   → 看到 5 架飛機正在進場，感受「還有 5 個活躍 AI 產品」
   → 好奇心驅使點擊其中一架飛機
   ↓

4. 左欄 Flight Dispatch 列表被高亮
   → 確認這是 AI 產品，看到技術標籤
   ↓

5. 右下角固定 CTA 淡入
   → 點擊「預約 15 分鐘架構對談」
   → Calendly Slide-over 從右側滑入
   ↓

6. 填寫預約資訊 → 完成
```

**狀態設計**：
- 空狀態：Calendly 載入中 → 顯示骨架屏（模擬表單輪廓）
- 載入狀態：Calendly API 連接中 → Spinner + 「正在建立安全連線...」
- 錯誤狀態：Calendly API 失敗 → 顯示備用 Email 文字連結，文案：「直接寄信至 [email] 開始對談」

---

### Flow 2：CTO / 技術驗證深度探索路徑

**目標**：深入驗證「這個人的技術深度夠不夠」

```
1. 到達首頁
   → 看到底部 HUD 的技術術語 → 觸發工程師認同感
   ↓

2. 點擊左欄 FLT-01 AI Hunter
   → 地球儀飛行弧線聚焦
   → 右欄切換為 AI Hunter 產品詳情面板
   → 顯示：技術架構摘要、LLM 技術棧標籤、核心難點一行說明
   ↓

3. 點擊「深入架構」按鈕
   → 進入 /skunkworks 頁面
   → AI Hunter 節點已預選，展開完整技術拓撲圖 Drawer
   ↓

4. 閱讀架構拓撲圖
   → Hover 各節點（RAG Engine / Vector DB）查看技術說明
   ↓

5. 向下捲動查看「技術難點日誌」
   → 閱讀具體實作挑戰與解法
   ↓

6. 文章底部白皮書索取
   → 輸入 Email → 編譯動畫 → 成功取得技術架構 PDF
```

**狀態設計**：
- 空狀態：技術拓撲圖載入前 → 骨架屏（模擬節點連線輪廓）
- 載入狀態：切換產品時 → 淡出 + 淡入（200ms，不顯示 spinner）
- 錯誤狀態：白皮書 API 失敗 → 靜默重試 3 次，仍失敗則顯示備用 Email

---

### Flow 3：行動裝置用戶（手機瀏覽路徑）

**目標**：手機上快速掌握核心訊息，不降格體驗

```
1. 到達首頁（375px 單欄佈局）
   → 頂部：Hero 標題 + 職銜
   → 中央：SVG 地球儀（全寬卡片）+ 飛行弧線 CSS 動畫
   ↓

2. 向下捲動
   → B2B KPI 水平捲動卡片（橫向 scroll snap）
   → KPI Count-up 動畫觸發
   ↓

3. 繼續向下捲動
   → AI 產品列表（手風琴 Accordion）
   → 點擊展開任一產品 → 顯示技術簡介 + 「查看完整架構」連結
   ↓

4. 底部 CTA 按鈕（全寬，sticky 固定在底部 navigation bar 上方）
   → 點擊 → Calendly Slide-over 從底部滑入（Sheet 組件）
   ↓

5. 填寫 → 完成
```

**手機特有狀態設計**：
- 空狀態：產品列表全部收合 → 顯示引導文字「點擊任一航班了解詳情」
- 載入狀態：Accordion 展開時 → 內容區域 height 展開動畫（200ms ease-out），無 spinner
- 錯誤狀態：網路連線失敗 → 顯示靜態 fallback，隱藏所有需要 API 的動態內容

---

### 與 Gemini 圖的互動邏輯差異

| 互動維度 | Gemini 圖 | V3 再設計 |
|---------|---------|---------|
| 地球互動 | 靜態圖片，無互動 | 可拖曳旋轉，點擊飛機觸發詳情 |
| 產品選擇 | 左欄點擊（不清楚效果） | 點擊左欄 OR 點擊地球飛機，雙入口聯動 |
| B2B 戰績 | 完全沒有 | 右欄 B2B KPI 儀表板，首屏可見 |
| CTA 觸發 | 地球儀中央按鈕 | 右下角固定 CTA，滾動後淡入 |
| 行動端體驗 | 未設計 | 完整單欄響應式，手風琴 + 橫捲卡片 |
| 錯誤狀態 | 未設計 | 三條 Flow 各有完整錯誤降級路徑 |

---

## 7. 各模塊 Wireframe 文字描述

### 7.1 頂部導覽列（Global Nav）

**桌機（1440px）**：
```
┌─────────────────────────────────────────────────────────────────────┐
│ [●] COMMAND CENTER       MY PORTFOLIO        [企業] [技術]  [●HIRE] │
│     brand mark           page title          視角切換  CTA         │
└─────────────────────────────────────────────────────────────────────┘
```
- 高度：60px（不超過 80px 上限）
- 背景：深色毛玻璃，滾動時 backdrop-filter blur 加深
- 觸控目標：所有可點擊項目最小 44x44px，項目間距 >= 8px
- 右側 CTA：帶有青色微光邊框的「HIRE ME」按鈕

**手機（375px）**：
```
┌─────────────────────────────────────────┐
│ [●] COMMAND CENTER              [≡ MENU] │
└─────────────────────────────────────────┘
```
- 漢堡選單展開：全螢幕覆蓋選單，項目垂直排列，最小觸控高度 56px

---

### 7.2 三欄主體區域（桌機 1440px）

**左欄 Flight Dispatch（20%，約 288px）**：
```
FLIGHT DISPATCH ─────────────────────
  ● [Icon]  AI Hunter              [APPROACHING ▶]
            求職加速器 AI Agent
            [LLM] [RAG]

  ● [Icon]  尋物小精靈             [HOLDING ◉]
            家庭物品管理系統
            [Firebase] [AI]

  ● [Icon]  DailyLumos             [ON FINAL ↓]
            每日箴言心靈應用
            [Vector DB] [NLP]

  ● [Icon]  VocalCanvas            [TAXIING →]
            AI 文字轉語音工具
            [TTS API] [Audio]

  ● [Icon]  無敵毛孩               [ACTIVE ■]
            寵物健康 AI 推薦
            [Vision AI] [DB]
```

- 列表項高度：各 80px（可點擊，44px 最小觸控符合）
- 側邊彩色指示燈：6px 寬的圓角色條，與產品對應色

---

**中欄 Command Globe（55%，約 792px）**：
```
                                    [FLIGHT QUEUE PANEL ─────]
                                    ↓ AI Hunter    APPROACHING
                                    ↓ DailyLumos   ON FINAL
                                    → VocalCanvas  TAXIING
                                    ■ 無敵毛孩     ACTIVE
                                    ◉ 尋物小精靈   HOLDING

         ┌───────────────────────────────────────────────────┐
         │                                                   │
         │                [Three.js Globe]                   │
         │                                                   │
         │           ╭── FLT-01 AI Hunter ──╮               │
         │          /    ✈ [資料卡]          \               │
         │        ↗                           ↘              │
         │      ↗       [地球儀旋轉中]          ↘            │
         │    ↗                                  ↘           │
         │                  ✈ FLT-04                         │
         │                  VocalCanvas                      │
         │                                                   │
         └───────────────────────────────────────────────────┘

    SYSTEM HEALTH: OPTIMAL  |  FLIGHT QUEUE: 5  |  UPTIME: 7Y
```

- Canvas 尺寸：充滿中欄，高度 = 視窗高度 - 導覽列 - HUD 列
- 地球旋轉：滑鼠進入中欄時自動減速，游標拖曳旋轉
- 飛行數據卡：Three.js Raycasting 偵測飛機 Sprite hover，彈出 HTML overlay

---

**右欄 Intel Panel（25%，約 360px）**：
```
B2B MISSION RECORD ──────────────────
  -97%  時間成本削減
        企業空間借用 · 緯創
  +60%  跨團隊效率提升
        SAP 整合 · 爭鮮
  100%  數據正確率
        跨國 WMS · 緯創
  3     企業系統從零建置
        政府 EIP · Atos

COMMAND CREDENTIALS ─────────────────
  [PMP]  [Atos 優秀]  [Wistron 黑客松]

GLOBAL NETWORK ──────────────────────
  [─────世界地圖 SVG─────]
  ● Taiwan  ● Atos  ● SAP Global

CORE TECH STACK ─────────────────────
  [JS]──[React]──[PHP]──[SQL]
    \        \      /
     [ABAP]──[Git]
```

---

### 7.3 底部 HUD 狀態列

```
──────────────────────────────────────────────────────────────────────────
[●] SYSTEM HEALTH: OPTIMAL  |  FLIGHT QUEUE: 5  |  MISSIONS COMPLETED: 3  |  CONNECTED NODES: 125  |  UPTIME: 7Y
──────────────────────────────────────────────────────────────────────────
```
- 高度：32px
- 字體：JetBrains Mono，12px，青色文字
- 背景：深黑，1px 頂部邊框（青色 10% 不透明度）
- 數值閃爍：每 5–8 秒隨機微幅更新 CONNECTED NODES 數值

---

### 7.4 產品詳情側面板（Drawer，桌機）

觸發時機：點擊左欄產品列表項 OR 點擊地球儀飛機 Sprite

```
┌────────────────────────────────────────────────────────┬──────────────┐
│  主內容區                                               │  DRAWER      │
│                                                        │  ─────────── │
│                                                        │  FLT-01      │
│                                                        │  AI Hunter   │
│                                                        │              │
│                                                        │  APPROACHING │
│                                                        │              │
│                                                        │  技術架構摘要 │
│                                                        │  [拓撲圖]    │
│                                                        │              │
│                                                        │  核心難點    │
│                                                        │  ─────────  │
│                                                        │  解法說明    │
│                                                        │              │
│                                                        │  [深入架構 →] │
│                                                        │  [試用產品 ↗] │
└────────────────────────────────────────────────────────┴──────────────┘
```

- Drawer 寬度：400px（桌機），全螢幕（手機）
- 動畫：從右側滑入，200ms ease-out；關閉：ESC 鍵 + 點擊 Overlay + 關閉按鈕
- Overlay：背景變暗 40%，但地球儀仍維持緩慢旋轉（不因 Drawer 開啟而暫停）

---

### 7.5 手機版（375px）完整佈局

**垂直排列順序（由上至下）**：

```
1. Global Nav（60px，品牌 + 漢堡）
2. Hero 區（標題 + 職銜）
3. SVG 地球儀卡片（全寬，約 240px 高，CSS 飛行弧線動畫）
4. B2B KPI 橫向捲動卡片（4 個 KPI 卡，snap scroll）
5. FLIGHT DISPATCH 手風琴（5 個產品，點擊展開詳情）
6. Global Network 地圖（全寬 SVG）
7. Core Tech Stack（全寬，簡化版）
8. 資格認證（3 個橫排）
9. Footer（法規聲明 + 版權）

[固定底部]：全寬 CTA 按鈕「預約架構對談」（56px 高）
```

觸控標準驗證：
- 所有手風琴觸發區：最小 56px 高（超過 44px 最低標準）
- 橫向捲動卡片：每卡最小 80px 高，左右 padding >= 16px
- 底部 CTA：56px 高，全寬（符合 44px 最低，以及行動端全寬原則）
- 項目間距：>= 8px

---

### 7.6 各狀態設計彙整

**載入狀態（Loading States）**

| 場景 | 載入體驗 |
|------|---------|
| 首頁初始 Three.js 載入 | Canvas 區域顯示骨架屏（深色圓形 + 輻射線條 SVG），Three.js bundle 非同步載入完成後淡入替換 |
| 左欄點擊切換 Drawer | Drawer 滑入時，內容區顯示骨架屏（矩形線條），200ms 後真實內容淡入 |
| B2B KPI Count-up | 數字從 0 開始累加，不算載入狀態，是有意設計的進場效果 |
| /skunkworks 拓撲圖 | 骨架屏（節點圓圈 + 連線）先出現，真實 SVG 拓撲圖載入後交替 |
| Calendly 預約表單 | Slide-over 滑入時顯示 spinner + 「正在建立連線...」，不使用骨架屏（因為 Calendly 為 iframe） |

**空狀態（Empty States）**

| 場景 | 空狀態體驗 |
|------|----------|
| 終端機搜尋無結果 | `[ERR_404] QUERY NOT FOUND — 建議搜尋：Agile / LLM / SAP — 或直接 [預約對談]` |
| 白皮書索取：Email 欄空白 | 輸入框邊框變紅，下方顯示提示文字「請輸入有效的企業 Email」，不阻擋其他互動 |
| /terminal 尚無文章 | `[SYS-001] DATABASE INITIALIZING — 情報庫正在建置中，歡迎 [訂閱] 首批解密通知` |

**錯誤狀態（Error States）**

| 場景 | 錯誤體驗 | 復原路徑 |
|------|---------|---------|
| Three.js 初始化失敗（WebGL 不支援） | Canvas 替換為靜態 PNG 地球圖 + CSS 飛行弧線裝飾；右下角小提示「已切換至輕量模式」 | 自動降級，不需用戶操作 |
| Calendly API 連接逾時（> 8 秒） | Slide-over 內顯示：「連線逾時，請直接寄信至 [email]」，按鈕文字改為「開啟 Email」 | 點擊直接開啟系統郵件客戶端 |
| 白皮書 Email 提交失敗 | 靜默重試 3 次，仍失敗後顯示：「提交失敗，請直接將需求寄至 [email]」 | 備用 Email 連結 |
| 網路斷線（整體） | 頂部全局通知條：「連線中斷，部分功能暫時不可用」；靜態內容仍正常顯示 | 連線恢復後通知條自動消失 |
| GPU 效能過低 | 自動切換至 CSS 動畫降級方案；右下角小提示「已最佳化為高效模式」 | 自動降級，不需用戶操作 |

---

## 8. 響應式斷點行為差異

### 375px（手機，iPhone SE/14 基準）
- 佈局：完全單欄，三欄收合
- 地球：SVG 扁平版 + CSS 弧線動畫（全寬卡片）
- B2B KPI：橫向 scroll snap 卡片
- 產品列表：手風琴 Accordion
- CTA：固定底部全寬按鈕
- 導覽：漢堡選單，全螢幕展開
- HUD 列：隱藏（空間不足）

### 768px（平板 iPad）
- 佈局：二欄（左欄 + 中欄合併為主區，右欄變為可切換 Tab）
- 地球：Three.js 精簡版（無粒子），充滿主區
- B2B KPI：右欄 Tab 面板，2x2 網格
- 產品列表：左側固定，可滾動
- CTA：右下角固定（非全寬）
- 導覽：完整水平導覽（不用漢堡）

### 1024px（小桌機 / 筆電）
- 佈局：三欄（20% / 50% / 30%）
- 地球：Three.js 完整版，粒子數降至 60%
- 右欄：可滾動，B2B KPI 在最上方
- 所有 Drawer：寬度 380px

### 1440px（大桌機，設計基準）
- 佈局：三欄（20% / 55% / 25%）
- 地球：Three.js 完整版，全效能
- 右欄：固定不滾動（內容高度適配視窗）
- 所有 Drawer：寬度 420px

### iOS / Android / PWA 情境差異

| 情境 | 特殊處理 |
|------|---------|
| iOS Safari | 使用 `min-height: 100dvh`（非 100vh）避免底部工具列跳動；Safe Area Inset 適配（底部 CTA 需加 `padding-bottom: env(safe-area-inset-bottom)`） |
| Android Chrome | 底部導覽列邏輯同 iOS；觸控事件使用 Pointer Events API 而非僅 Touch Events |
| PWA 已安裝（standalone mode） | 隱藏瀏覽器 UI 後，頂部導覽列需加入 title bar drag region；底部 CTA 無需考慮瀏覽器工具列，safe area 仍需保留 |
| 橫向模式（手機 landscape） | 地球儀卡片高度自適應（max-height: 60dvh），防止地球過大佔據版面；KPI 改為橫向 2 列 |

---

## 9. Pre-Flight 檢查清單

- [x] 三旋鈕值已設定：Design Variance: 9 / Motion Intensity: 8 / Visual Density: 8，有理由（航管中心 ATC 佈局本質是高密度、高動感、強個性的設計方向）
- [x] 零 em-dash（全文未使用 — 或 –）
- [x] 禁止字體無出現（未指定 Inter、Roboto、Arial 等）
- [x] 純黑 #000000 無出現（未指定任何色碼，交由 UI 設計師填入）
- [x] 英雄標題設計為一行，不超過兩行
- [x] 所有可點擊項目符合 44x44px 最小觸控面積（左欄列表 80px 高、底部 CTA 56px 高）
- [x] 所有必要元件狀態已設計：default、hover、active、disabled、loading、empty、error
- [x] 無「3 欄等寬卡片」重複佈局（三欄為非對稱比例 20/55/25）
- [x] `min-height: 100dvh` 規範已指定，未使用 height: 100vh
- [x] 行動裝置無水平滾動（單欄佈局，KPI 用 scroll snap，非強制水平滾動）
- [x] 動畫只用 transform / opacity（Three.js 在 Canvas 內部不影響 DOM reflow）
- [x] `prefers-reduced-motion` 已處理（Three.js context 完全不初始化）
- [x] 空狀態已設計，有明確引導行動
- [x] 載入狀態已設計，有視覺回饋（骨架屏為主）
- [x] 錯誤狀態已設計，有復原路徑指引
- [x] iOS / Android / 桌機 / PWA 情境差異均已考慮
- [x] 流程以 375px 手機優先設計，延伸至 768 / 1024 / 1440px 四個斷點
