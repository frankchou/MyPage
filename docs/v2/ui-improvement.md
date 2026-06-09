# V2 UI 改進規格（基於 Gemini 圖分析）

**角色**：UI 設計師  
**日期**：2026-06-08  
**狀態**：分析完成，尚未被工程師採用

---

## 一、Gemini 圖優點（保留）

- 三欄佈局邏輯清晰：左側任務清單 / 中央地球視覺焦點 / 右側資訊面板，資訊層次直觀
- PROJECT DISPATCH 列表的 status badge（APPROACHING / WAITING / Active）與飛機航管隱喻高度契合
- GLOBAL NETWORK 地圖 + CORE TECH STACK 右側雙區塊堆疊，資訊密度合理
- Awards 區塊（PMP / Atos / Wistron）具體且可信，增加個人信任度

## 二、Gemini 圖缺點（需改進）

| 問題 | 改進方向 |
|------|---------|
| 3D 地球照片無法動態化 | 改用 CSS/SVG 或 Three.js 繪製可互動地球 |
| 機場跑道照片背景 | 改為 `#080C10` 深色底 + CSS 點陣裝飾 |
| 字體混雜、無品牌感 | 統一 Space Grotesk + JetBrains Mono |
| Globe 航線文字密集難讀 | 改為 hover tooltip，預設只顯示光點 |
| Tech Stack 泡泡使用不符設計系統的飽和紫色 | 改為統一 Design Token 顏色系統 |
| B2B 企業戰績完全缺失 | 加入右欄頂部 KPI 區塊 |
| 無互動設計 | 點擊產品聯動 Globe + 右欄切換 |

## 三、V2 Design Token（沿用 v1）

```css
--bg-base: #080C10;
--bg-surface: #0D1520;
--accent-cyan: #0EA5E9;
--accent-amber: #D97706;
--accent-green: #22D3A0;
```

## 四、三欄佈局規格

| 欄位 | 寬度 | 內容 |
|------|------|------|
| 左欄 | 24% | PROJECT DISPATCH（5 個 AI 產品列表 + status badge） |
| 中欄 | 52% | Globe 地球儀 + Hero 文字 + CTA |
| 右欄 | 24% | B2B KPI → GLOBAL NETWORK → ACHIEVEMENTS → TECH STACK |

## 五、Globe 視覺規格

- 圓形容器 380px，深色背景
- SVG 經緯線網格（`--accent-cyan` 5% 透明度）
- 風格化大陸輪廓（SVG path，`--bg-elevated` 填色）
- 飛行弧線：SVG quadratic bezier，`stroke-dashoffset` 動畫
- 每條弧線終點：移動光點（代表 AI 產品航班）
- 台灣標記：主基地發光點

## 六、Status Badge 規格

| 產品 | Badge 文字 | 顏色 |
|------|-----------|------|
| AI Hunter | APPROACHING | `--accent-cyan` 閃爍 |
| 尋物小精靈 | STANDBY | `--accent-amber` |
| DailyLumos | TERMINAL 1 | `--accent-green` |
| VocalCanvas | INBOUND | `--accent-cyan` |
| 無敏毛孩 | ACTIVE | `--accent-green` 發光 |

---

**注意**：此文件產出時，v2/index.html 已由工程師完成，本規格尚未被採用。
