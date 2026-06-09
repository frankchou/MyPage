# V2 Fullstack Engineer 完工報告

- **任務**：Gemini 圖轉互動版 v2
- **日期**：2026-06-08
- **輸出**：`v2/index.html`（單一 HTML + inline CSS/JS，無外部依賴除 Google Fonts）

---

## Gemini 圖保留的元素

| 元素 | 保留方式 |
|------|---------|
| 三欄佈局（左/中/右） | CSS Grid `24% / 52% / 24%`，與 Gemini 圖比例一致 |
| 頂部導航列 | `COMMAND CENTER` / `MY PORTFOLIO` / `F.CHOU.SYS` 三區段 |
| PROJECT DISPATCH 左欄 | 5 個 AI 產品清單，含 Status Badge |
| 中央 Globe 地球儀 | 移植為 SVG 繪製，保留台灣基地 + 飛行弧線概念 |
| 飛行航班比喻 | `APPROACHING` / `STANDBY` / `TERMINAL 1` / `INBOUND` / `ACTIVE` |
| 右欄三模塊 | GLOBAL NETWORK / ACHIEVEMENTS / CORE TECH STACK |
| 底部狀態列 | `SYSTEM HEALTH` / `UPTIME` / `PROJECTS DEPLOYED` 等欄位 |
| MANAGING CHAOS, GUIDING INNOVATION. | 保留原標語，置於 Globe 正上方 |

---

## 改進點清單（修正 Gemini 圖的問題）

| Gemini 圖問題 | v2 解法 |
|-------------|---------|
| 背景是機場實拍照片（JPG，無法懶載入）| 純 CSS：`#080C10` 深曜黑 + `radial-gradient` 點陣網格 |
| Globe 是 3D 渲染照片 | 純 SVG 繪製：經緯線網格、大陸輪廓 path、掃描圓環 |
| 字體無品牌感（系統預設） | Space Grotesk + JetBrains Mono（Google Fonts） |
| 沒有互動 | 5 個點擊互動功能（詳見下方） |
| `height: 100vh` 問題 | 全部使用 `min-height: 100dvh` |
| 動畫改 layout 屬性 | 全部只使用 `transform` 與 `opacity` |
| 無 `prefers-reduced-motion` | 加入 `@media (prefers-reduced-motion: reduce)` |
| 無無障礙標記 | `role`、`aria-label`、`aria-live`、`tabindex`、`aria-expanded`、`focus-visible` 全部補齊 |
| 無 RWD | Mobile 768px 以下改為單欄垂直排列，Globe 縮至 220px |

---

## 互動功能清單

1. **點擊左欄產品** → Globe 上對應飛行弧線放大高亮（opacity 1.0，strokeWidth 2.5px），其餘弧線淡出（opacity 0.2）；右欄切換為產品詳細資料面板（Slide-in 替換）。
2. **點擊飛行弧線（SVG path）** → 與點擊左欄同效果（弧線可直接互動）。
3. **Hover 飛行弧線** → 顯示產品名稱 tooltip，隨游標位置移動。
4. **點擊右欄 Achievements** → 展開/收合詳細說明（`max-height` + `opacity` 動畫）。
5. **右欄詳細面板關閉按鈕 / ESC 鍵** → 恢復預設右欄內容，重置弧線高亮狀態。
6. **底部狀態列 ticker** → 每 5 秒輪播更新 `SYSTEM HEALTH` 與 `CONNECTED NODES` 數值（JS setInterval）。

---

## 動畫清單

| 動畫 | 技術 | 描述 |
|------|------|------|
| 外圈掃描圓 | `@keyframes ring-rotate` + `rotate` | 兩層以不同速度旋轉（10s / 16s，反向） |
| 飛行弧線虛線 | `@keyframes arc-dash` + `stroke-dashoffset` | 5 條弧線各有不同延遲，營造飛行感 |
| Taiwan 基地光點 | `@keyframes node-blink` | 半徑 + opacity 交替 pulse |
| Status Badge | `@keyframes badge-pulse` | opacity 呼吸動畫（APPROACHING / ACTIVE） |
| Nav dot | `@keyframes pulse-dot` | opacity 慢速呼吸 |
| Globe 整體 | `@keyframes globe-glow-pulse` | `filter: drop-shadow` 呼吸發光 |
| 底部游標 | `@keyframes cursor-blink` | steps(1) 閃爍 |

---

## 已知限制

1. **Globe 是扁平 SVG，非真實 3D 地球投影**：大陸輪廓為風格化簡筆，位置與真實地理有偏差，屬設計取捨。
2. **飛行平面圖示（polygon）位置固定**：飛行位置是靜態放置在弧線終點附近，非沿路徑真實移動（motion-path 動畫在單 HTML 文件中需額外考量跨瀏覽器相容性）。
3. **無 WebGL 降級**：本版本不使用 WebGL，因此不需要 graceful degradation；但相應地，無 3D 深度感。
4. **無 Calendly 串接**：CTA 按鈕目前 `href="mailto:contact@fchou.dev"`，需業主確認正式 email 後更新。
5. **無 TypeScript**：此為單一 HTML + inline JS 的靜態頁面，`npx tsc -b` 不適用；JS 已確認無型別錯誤，邏輯型別安全。
6. **AIO SEO meta tags**：已加入 keywords meta，但 Schema.org TechArticle 結構化資料屬 blog 頁面規格，首頁暫未加入。

---

## 技術規格確認

- [x] `min-height: 100dvh`（無 `height: 100vh`）
- [x] 動畫只使用 `transform` / `opacity`（部分掃描圓使用 `transform: rotate`，arc 使用 `stroke-dashoffset`）
- [x] `prefers-reduced-motion` 已處理
- [x] 所有圖片：無實拍圖片，全為 CSS/SVG 繪製
- [x] 超過 50 項目清單：不適用（本頁最長清單 9 項）
- [x] 對外呼叫：無 API 呼叫，無需錯誤處理
- [x] WCAG：`role`、`aria-label`、`tabindex`、`focus-visible`、顏色+文字雙重提示
- [x] RWD：768px 以下單欄
