# V2_1 Engineer 完工報告

- **任務**：v2 → v2_1 設計師優化版
- **日期**：2026-06-08
- **基底**：v2/index.html
- **輸出**：v2_1/index.html

---

## 落實的改進清單（逐項對應 UI + Art 提案）

### UI 設計師（ui-improvement.md）

| # | 項目 | 狀態 | 實作說明 |
|---|------|------|---------|
| 1 | 背景移除照片，改為 `#080C10` + CSS 點陣網格 | 完成 | body 背景改為 `#0a0a0f`，加入 48px 點陣網格（2.5% 透明度）+ radial 環境光暈 |
| 2 | Design Token 統一（8 個 token） | 完成 | `:root` 完整宣告，另加入 art-direction 的 `--color-*` 高亮變體 |
| 3 | 字體確認：Space Grotesk + JetBrains Mono，Google Fonts 引入 | 完成 | `<link>` 已存在於 v2，v2_1 沿用，全站無 Arial/Roboto/Inter |
| 4 | Globe 文字密度改為 hover tooltip | 完成 | 弧線上無常駐文字（僅保留 TW 位置錨點標記），hover 觸發 `.arc-tooltip` |
| 5 | 右欄加入 B2B KPI 區塊（首屏最上方） | 完成 | `.kpi-block` 放在 `#right-default` 最頂部，4 張 KPI 卡片，IntersectionObserver 觸發 count-up |
| 6 | KPI 數字 JetBrains Mono + `--accent-amber` | 完成 | `.kpi-val` 使用 `var(--color-amber)`，`text-shadow` 模擬金融終端機發光 |
| 7 | Count-up 動畫 | 完成 | `animateCountUp()` easeOutQuart 實作，`prefers-reduced-motion` 跳過動畫 |
| 8 | Tech Stack 移除紫色，統一 Design Token | 完成 | 所有 `.pill-dot` 改用 `var(--color-cyan)`、`var(--color-amber)`、`var(--color-green)` 三色輪替 |

### 美術設計師（art-direction.md）

| # | 項目 | 狀態 | 實作說明 |
|---|------|------|---------|
| 1 | 背景三層：`#0a0a0f` + 點陣網格 + radial 環境光暈 | 完成 | `background-image` 多層疊加，無圖片依賴 |
| 2 | Globe 升格為雷達任務空間：網格線極低透明度 | 完成 | 緯線 `opacity: 0.05`，赤道 `opacity: 0.10`，大陸填色 `rgba(14,165,233,0.06)` |
| 3 | 飛行弧線：`stroke-dasharray: 8 4`，`stroke-dashoffset` 流動動畫 3s loop | 完成 | 所有弧線改用 `arc-flow` keyframe（dashoffset 48→0），各弧線不同 `dur` 與 `begin` 錯開 |
| 4 | 移動光點：`<animateMotion>` 沿弧線行進，依狀態調整大小/顏色/glow | 完成 | 每條弧線配一個 `<circle>` + `<animateMotion>`，大小：3px/4px/5px 依狀態；ACTIVE 使用 `strong-glow` filter |
| 5 | Status Badge 依狀態分色：APPROACHING→cyan 閃爍，STANDBY→amber，TERMINAL 1→green，INBOUND→cyan，ACTIVE→green 發光 | 完成 | `.badge-*` 各自使用 `--color-cyan`/`--color-amber`/`--color-green`，APPROACHING/INBOUND 有 `badge-pulse` 動畫 |
| 6 | 強調色只用三色（cyan/amber/green），移除所有紫色、粉色 | 完成 | VocalCanvas item-dot 與 arc-3 由 `#818CF8` 改為 `--color-cyan`；tech-pill dot 全面換為三色 |

---

## v2 → v2_1 主要差異

| 面向 | v2 | v2_1 |
|------|----|------|
| 背景 | `#080C10` + 單層 radial dot-grid | `#0a0a0f` + 3層：底色 + 48px 網格(2.5%) + radial 環境光暈 |
| 弧線動畫 | `arc-dash` (stroke-dashoffset 600→0) | `arc-flow` (48→0，3s)，符合 art-direction 規格 |
| 弧線虛線 | `stroke-dasharray: 8,5` | `stroke-dasharray: 8,4`（art-direction: 8 dash 4 gap） |
| 移動光點 | 靜態 plane icon（polygon） | `<animateMotion>` 動態光點，按狀態調整大小/glow |
| 弧線顏色 | VocalCanvas 使用紫色 `#818CF8` | 改為 `--color-cyan` `#00f5d4`（三色限制） |
| Status Badge 顏色 | 使用 `--accent-*` token | 改用 `--color-*` 高亮變體（更高對比，符合 art-direction） |
| 右欄結構 | GLOBAL NETWORK → ACHIEVEMENTS → TECH STACK | **B2B KPI** → GLOBAL NETWORK → ACHIEVEMENTS → TECH STACK |
| B2B KPI | 無 | 4 個指標：-97% 時間成本、+60% 對接效率、100% 數據正確性、2國5部門；count-up 動畫 |
| Tech Stack dot | 各技術品牌色（含紫色） | 統一三色 token（cyan/amber/green） |
| Globe 大陸輪廓 | `fill: #1A2535`，`stroke: rgba(14,165,233,0.25)` | `fill: rgba(14,165,233,0.06)`（極低透明），`stroke: rgba(0,245,212,0.15)` |
| Globe glow | `filter: drop-shadow()` 於 keyframe | `.globe-svg` 本身帶雙層 `drop-shadow`，pulse 改為 `opacity` keyframe |
| nav/border 顏色 | `rgba(14,165,233,0.*)` | `rgba(0,245,212,0.*)` 統一使用 art-direction 色彩 |

---

## 品質規範確認

- `min-height: 100dvh` — `.atc-shell` 使用，無 `height: 100vh`
- 動畫只用 `transform` / `opacity` / `stroke-dashoffset` — 已確認，無 `width`/`top`/`left` keyframe
- `prefers-reduced-motion` — CSS `@media` 全停 + JS `prefersReducedMotion` 檢查
- 不用 `#000000` 純黑 — 最深為 `#0a0a0f`
- 不用 Arial/Roboto/Inter — 全站 Space Grotesk + JetBrains Mono
- 圖片 — 無任何圖片依賴，全 CSS/SVG 實作
- 超過 300ms 操作 — KPI count-up 為視覺動畫而非資料載入，不需 spinner；所有 API 呼叫本版無外部請求

---

## 已知限制

1. **Globe 光點行進路徑** 使用 SVG `<animateMotion>`，在部分舊版 Safari（< 15）可能不支援 `mpath href` 語法。可降級為靜態終點圓點（已存在），使用體驗不中斷。
2. **B2B KPI count-up** 使用 `IntersectionObserver`，IE 11 不支援（IE 11 已 EOL，不予支援）。
3. **Globe 大陸輪廓為風格化 SVG path**，非精確地理資料，符合設計規格（風格化隱喻，非地圖工具）。
4. **弧線文字完全移除**（除 TW 錨點標籤）——符合 ui-improvement.md 規格「hover tooltip，預設只顯示光點與弧線」。
5. **粒子背景效果**（art-direction 選配項：30 個隨機閃爍光點）未實作——為選配且需 FPS 偵測，在單一 HTML 靜態頁無 FPS 監控機制下略過，不影響核心規格。
