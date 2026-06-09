# UI 設計提案 — Portfolio V1（團隊獨立版）

**角色**：UI 設計師  
**日期**：2026-06-08  
**設計旋鈕**：Design Variance: 9 / Motion Intensity: 8 / Visual Density: 7

---

## 一、Design System Token

### 色彩系統

| Token | Hex | 用途 |
|-------|-----|------|
| `--bg-base` | `#080C10` | 主背景（深曜黑，非純黑） |
| `--bg-surface` | `#0D1520` | 卡片背景層 |
| `--bg-elevated` | `#1A2535` | Hover 卡片 / Slide-over |
| `--accent-cyan` | `#0EA5E9` | 導覽、CTA、焦點環、霓虹青 |
| `--accent-amber` | `#D97706` | B2B 數字、時間軸、雷達圖（琥珀金） |
| `--accent-green` | `#22D3A0` | AI 節點脈衝、終端機 Prompt（Bio-Green） |
| `--text-primary` | `#F0F4F8` | 主要文字 |
| `--text-secondary` | `#8899AA` | 次要文字、標籤 |
| `--text-dim` | `#445566` | 免責聲明、輔助說明 |
| `--border-subtle` | `rgba(255,255,255,0.08)` | 卡片邊框 |
| `--border-glow-cyan` | `rgba(14,165,233,0.4)` | CTA 發光邊框 |
| `--border-glow-amber` | `rgba(217,119,6,0.4)` | B2B 區塊強調邊框 |

### Typography 系統

| 層級 | 字體 | 字級 | 字重 | 行高 |
|------|------|------|------|------|
| Display | Space Grotesk | 64px / 48px | 700 | 1.1 |
| H1 | Space Grotesk | 40px | 700 | 1.2 |
| H2 | Space Grotesk | 28px | 600 | 1.3 |
| H3 | Space Grotesk | 20px | 600 | 1.4 |
| Body | Space Grotesk | 16px | 400 | 1.6 |
| Caption | Space Grotesk | 13px | 400 | 1.5 |
| Mono/Data | JetBrains Mono | 14px | 400 | 1.5 |
| Mono/Large | JetBrains Mono | 48px | 700 | 1.0 |

### Glassmorphism 規格

| 層級 | blur | background | border |
|------|------|------------|--------|
| Nav（預設） | `blur(16px)` | `rgba(8,12,16,0.6)` | `1px solid rgba(255,255,255,0.06)` |
| Nav（滾動後） | `blur(24px)` | `rgba(8,12,16,0.85)` | 同上 |
| 卡片 | `blur(24px) saturate(160%)` | `rgba(14,22,32,0.72)` | `1px solid rgba(255,255,255,0.08)` |
| Slide-over | `blur(40px)` | `rgba(8,12,16,0.9)` | `1px solid rgba(14,165,233,0.15)` |

### Spacing & Grid

- 基礎單位：`8px`
- Desktop Grid：12 欄，gutter 24px，最大容器 1280px
- Tablet Grid：8 欄，gutter 16px
- Mobile Grid：4 欄，gutter 16px
- Border Radius：卡片 `12px`，按鈕 `8px`，節點 `16px`

---

## 二、核心元件規格

### 1. 全局導覽列（Global Nav）

**尺寸**：高度 64px，全寬固定頂部  
**視覺**：毛玻璃材質（見上表），左側 Logo `F.CHOU.SYS`（JetBrains Mono，`--accent-cyan`）  
**導航項**：Enterprise Core / AI Skunkworks / Terminal  

| 狀態 | 樣式 |
|------|------|
| Default | 文字 `--text-secondary` |
| Hover | 文字 `--text-primary` + 底線從左 `transform: scaleX(0→1)` |
| Active（當前頁） | 文字 `--accent-cyan` + 底線常駐 |
| Scrolled | backdrop-filter 加深至 blur(24px) |

---

### 2. 資料卡片 / 指標卡片（Metric Card）

**尺寸**：Desktop 240x160px，Mobile 全寬  
**視覺**：毛玻璃卡片，頂部 `--accent-amber` 左邊框 `3px`  
**數字**：JetBrains Mono 48px Bold，`--accent-amber`  
**描述**：Space Grotesk 13px，`--text-secondary`  

| 狀態 | 樣式 |
|------|------|
| Default | 毛玻璃卡片 |
| Hover | `--bg-elevated` 背景 + 頂部邊框色加亮 + 浮現 SAP 拓撲線條（`opacity: 0→0.15`） |
| Loading（Count-up） | 數字從 0 動態累加，1.2 秒緩入 |
| Animate-in | `translateY(20px)→0` + `opacity: 0→1` |

---

### 3. 技術節點（Tech Node）

**尺寸**：Desktop 220x220px（六邊形裁切），Mobile 全寬卡片  
**視覺**：毛玻璃基底 + `--accent-green` 雙層脈衝圈（`box-shadow` 動畫）  
**內容**：節點編號（Mono）、產品名稱、3 個技術標籤 Pill  

| 狀態 | 樣式 |
|------|------|
| Default | 脈衝圈 6s 無限循環（慢速呼吸） |
| Hover | 脈衝加速至 1.5s + 邊框亮度 +30% |
| Active / Focus | 邊框變為 `--accent-cyan` + 縮放 `scale(1.03)` |
| Expanded | 對應 Slide-over 開啟，節點維持高亮 |

---

### 4. CTA 按鈕

**主要按鈕**（預約諮詢）：  
- 尺寸：padding `14px 28px`，border-radius `8px`  
- 視覺：透明背景 + `2px solid --accent-cyan` + 外側 `box-shadow: 0 0 16px rgba(14,165,233,0.3)`  
- Hover：背景填滿 `--accent-cyan` + 文字變深色  

**次要按鈕**（下載 PDF）：  
- 視覺：純文字 + 底線，`--text-secondary`  
- Hover：`--text-primary`  

---

### 5. 側邊欄展開面板（Slide-over Panel）

**尺寸**：寬度 480px（Desktop）/ 全螢幕（Mobile）  
**進場**：`translateX(100%→0)` + `opacity: 0→1`，0.35s ease-out  
**結構**：  
- 頂部：節點名稱 + 關閉按鈕（ESC 也可關閉）  
- 中部：系統拓撲圖（SVG）+ 資料流說明  
- 底部：技術棧 Pills + 技術難點日誌  

---

### 6. 終端機輸入框（Terminal Input）

**視覺**：全寬深色輸入框，左側 `>_` Prompt（`--accent-green`），游標閃爍方塊  
**字體**：JetBrains Mono 16px  
**互動**：輸入即觸發 Live Search，卡片 0.2s 淡入淡出過濾  

---

## 三、各頁面 UI Layout

### 首頁

```
[Nav 64px]
[Hero: 左40% 文字 | 右60% 雷達動畫裝飾]
  - 雷達：CSS/SVG 同心圓 + 掃描扇形（conic-gradient）
[B2B KPI 區塊: 4欄等寬 Metric Cards]
[AI 機庫區塊: 深色背景 + 5節點非對稱星形佈局]
[Footer: 2欄 免責聲明 | 版權]
```

**Hero 非對稱設計重點**：
- 左側：Display 標題 + 副標題 + 2 個 CTA
- 右側：CSS 雷達動畫（同心圓 + 旋轉扇形 + 隨機光點）
- 右下角常駐懸浮 CTA 按鈕（`position: fixed`，`z-index: 100`）

### AI 機庫頁（/skunkworks）

- 5 個 Tech Node 以**非對稱星形**排列（非等距網格，製造視覺張力）
- Node 01 居中稍大（主力產品），其餘 4 個圍繞
- Slide-over 從右側滑入，覆蓋右半畫面

### 企業核心頁（/enterprise）

- 頂部：3 個專案切換 Tab（琥珀金 active 狀態）
- 左側 40%：多邊形雷達圖（SVG，5 個維度）
- 右側 60%：Git Commit 風格決策時間軸（Fira Code 字體，分支線）

### 終端機洞察頁（/terminal）

- 頂部全寬：終端機搜尋框（深色全寬，綠色游標）
- 下方：Masonry 瀑布流卡片格局（2欄 Desktop / 1欄 Mobile）
- 卡片頂部：分類代碼（如 `SYS-ARCH-001`），Mono 字體，琥珀金

---

## 四、動畫規格

| 動畫 | 規格 |
|------|------|
| 數字 Count-up | 1.2s ease-out，IntersectionObserver 觸發 |
| Tech Node 脈衝 | `box-shadow` 6s infinite，Hover 加速至 1.5s |
| Slide-over 進場 | `translateX(100%→0)` 0.35s ease-out |
| 卡片進場 | `translateY(20px→0)` + `opacity: 0→1` 0.4s stagger |
| Nav 毛玻璃加深 | `blur: 16→24px` scroll 觸發，0.3s transition |
| 雷達掃描 | `conic-gradient` rotate 4s linear infinite |
| 終端機游標 | `opacity: 1→0` 0.7s steps(1) infinite |

**prefers-reduced-motion**：偵測到時，所有 keyframe 動畫停止，WebGL context 不初始化。

---

## 五、RWD 規格

| 斷點 | 佈局變化 |
|------|---------|
| Desktop 1440px | 12欄，Hero 非對稱，Tech Node 星形佈局 |
| Tablet 768px | 8欄，Hero 改為上下版，Tech Node 3+2 排列 |
| Mobile 375px | 4欄，Tech Node 改 Accordion，KPI 單欄，Touch Target ≥ 44px |
