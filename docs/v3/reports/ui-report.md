# UI 設計師完工報告

**角色**：UI 設計師
**日期**：2026-06-08
**任務**：V3 UI 規格設計（基於 Gemini 示意圖再設計 + Three.js）
**交付件**：`/workspaces/MyPage/docs/v3/ui-spec.md`

---

## 1. 三旋鈕確認

| 旋鈕 | 設定值 | 理由摘要 |
|------|--------|---------|
| DESIGN_VARIANCE | 9 | 三欄 288/flex-1/360 非等寬，刻意壓縮左欄製造指揮台緊張感 |
| MOTION_INTENSITY | 9 | Three.js 地球自轉 + 飛行弧線繪製 + GSAP 相機聚焦，電影級編排 |
| VISUAL_DENSITY | 8 | 駕駛艙密度：等寬字數字、1px 分隔線、無泛型卡片框 |

---

## 2. Anti-Generic 清除清單

從 Gemini IMG_4707.png 識別出 7 項 AI Tell，全數清除：

| Tell | 清除方案 |
|------|---------|
| 紫色霓虹發光節點 | 改為航管語意色系（青/琥珀/綠/紅）|
| 多色霓虹漸層（Tech Stack） | 統一為冰川青 `#0EB8D5` 單一強調色 |
| 接近純黑底色 | 深空藍黑 `#080E1A`，帶冷色調有深度 |
| Hero CTA 疊蓋地球儀中央 | Hero 文字移至地球上方，CTA 移至右欄頂部 |
| 泛型浮動徽章感 | 移除，Tech Stack 改 1px 細線連節點 |
| 飛行數據卡填充假數字 | 全替換為真實產品語境數據 |
| B2B 戰績完全缺失 | 新增右欄 B2B MISSION RECORD 模塊（KPI Count-up） |

---

## 3. 設計 Token 核心摘要

### 色彩

- 底色：`#080E1A`（深空藍黑，非 #000000）
- 唯一強調色：`#0EB8D5`（冰川青，CTA、飛行弧線、焦點環）
- 品牌主色：`#D4920A`（琥珀金，B2B KPI 數字、選中態）
- 5 個航空語意狀態色（青/紅/琥珀/灰藍/綠）
- 全暗色模式，無 Light Mode（航管中心暗室定位）
- 禁止確認：無 #000000、無 AI 紫色漸層、無暖米色系

### 字型

- Heading/Display：Space Grotesk（幾何無襯線，工業感）
- 所有數字/HUD/狀態碼：JetBrains Mono
- 禁止確認：無 Inter、Roboto、Arial、Fraunces、Instrument_Serif

### 圓角

全站近銳角系統（`--radius-xs: 2px` 到 `--radius-lg: 8px`），唯有狀態 Badge 使用 `--radius-pill`，語意分工明確。

### 間距

4px 基礎單位，--space-1（4px）到 --space-10（40px），VISUAL_DENSITY 8 對應 padding 緊密。

---

## 4. Three.js 規格摘要

| 元素 | 規格重點 |
|------|---------|
| 3D 地球儀 | MeshPhongMaterial + 日面紋理 + 大氣層 Fresnel Shader，藍調光源，冰川青輝光 |
| 飛行弧線 | QuadraticBezierCurve3，5 個狀態各有不同弧高（0.1-1.0 地球半徑），動態 draw range 繪製 |
| 飛機 Sprite | THREE.Sprite 沿曲線移動，Raycasting hover 觸發 HTML overlay 數據卡 |
| 星空粒子 | 單一 Points Mesh（1000/200 顆），1 draw call，AdditiveBlending |
| 降級方案 | full/lite/static 三等級，prefers-reduced-motion 時完全不初始化 |

---

## 5. 元件狀態覆蓋確認

以下元件均已完成 7 狀態規格：

| 元件 | 7 狀態 |
|------|--------|
| FLIGHT DISPATCH 列表項 | default/hover/active/selected/disabled/loading/error |
| Status Badge | default/hover/active/disabled/loading/empty/error |
| B2B KPI 卡片 | default/hover/active/disabled/loading（Count-up）/empty/error |
| 主要 CTA 按鈕 | default/hover/active/disabled/loading/empty/error |
| 次要文字連結 | default/hover/active/disabled/loading/empty/error |
| Tech Node | default/hover/active/disabled/loading/empty/error |
| Achievement 卡片 | default/hover/active/disabled/loading/empty/error |

---

## 6. RWD 覆蓋

| 斷點 | Three.js | 佈局 | 特殊處理 |
|------|---------|------|---------|
| 1440px | 完整（full） | 三欄 288/flex-1/360 | 基準設計 |
| 1024px | 完整（full，粒子 60%） | 三欄 240/flex-1/280 | - |
| 768px | 精簡（lite，無粒子） | 兩欄 + Tab 右欄 | - |
| 375px | 靜態 SVG（完全不初始化） | 單欄，手風琴 | safe-area-inset-bottom，scroll snap KPI |

---

## 7. 與 Gemini 示意圖的差異

| 維度 | Gemini 圖 | V3 規格 |
|------|----------|--------|
| 地球儀 | 靜態照片合成 | Three.js 可旋轉、可點擊 |
| 色彩 | AI 紫色霓虹漸層 | 航管語意色系（青/琥珀/綠/紅） |
| B2B 戰績 | 完全缺失 | 右欄 B2B KPI 模塊（最重要的新增） |
| 飛行數據卡 | 虛構填充數字 | 真實產品語境數字 |
| Hero CTA | 疊蓋地球儀中央 | 移至地球上方 + 右欄頂部 |
| 行動裝置 | 未設計 | 完整 375px 降級規格 |
| 元件狀態 | 僅 happy path | 7 狀態完整定義 |
| 字型 | 未明確（看起來近 Roboto/Sans） | Space Grotesk + JetBrains Mono |

---

## 8. 給工程師的注意事項

1. **Three.js bundle 大小**：使用 tree-shaking，只引入必要模組（SphereGeometry、QuadraticBezierCurve3、OrbitControls、ShaderMaterial、Points），目標 gzip 後 180KB 以內。

2. **GSAP 與 Three.js 隔離**：GSAP 控制 DOM 動畫（列表進場、KPI count-up、Drawer 滑入），Three.js 控制 Canvas 內部動畫，兩者不在同一 component tree 中混用。

3. **HTML Overlay 定位**：飛機數據卡用 `vector.project(camera)` 轉換 3D 到螢幕座標，不要試圖在 Three.js 內部做 HTML 渲染。

4. **GPU 偵測**：使用 `@pmndrs/detect-gpu` 在 `DOMContentLoaded` 後立即執行，依 tier 決定渲染模式。

5. **iOS safe-area**：底部 CTA 的 `padding-bottom: env(safe-area-inset-bottom)` 必須，否則 iPhone 上 Home Indicator 會遮蓋按鈕。

6. **所有 CSS 動畫**：只使用 `transform` 和 `opacity`，絕不動畫 `top/left/width/height`。

7. **Z-index scale**：Canvas(10) / HTML UI(20) / Drawer(30) / Nav+HUD(40) / 固定 CTA(50) / Toast(60) / Modal(70)，全專案統一不亂用。
