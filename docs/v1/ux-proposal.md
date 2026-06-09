# UX 設計提案 — Portfolio V1（團隊獨立版）

**角色**：UX 設計師  
**日期**：2026-06-08  
**設計旋鈕設定**：Design Variance: 8 / Motion Intensity: 7 / Visual Density: 7

---

## 一、網站資訊架構（IA）

4 個主要頁面，最多 1 層深度，Drawer 展開不跳頁：

```
Root /
├── Home（首頁）
├── AI Skunkworks              /skunkworks
├── Enterprise Core            /enterprise
└── Terminal                   /terminal
    └── [Article]              /terminal/[slug]
```

> Skunkworks 節點與 Enterprise 專案均採用**頁內 Drawer 展開**，保護探索心流，不跳頁。

---

## 二、三條核心 User Flow

### Flow 1：獵頭 / CTO 快速瀏覽（90 秒轉換路徑）
```
首頁 Hero
  → KPI 儀表板（掃描量化成效）
  → AI 節點預覽（確認技術廣度）
  → 右下角固定 CTA 按鈕
  → Calendly Slide-over 預約
```

### Flow 2：技術驗證深度探索
```
Enterprise Core（危機決策時間軸）
  → AI Skunkworks 節點 Drawer
  → 技術拓撲圖閱讀
  → 白皮書 Lead Capture
```

### Flow 3：預約對談轉換（最多 3 步）
```
任意頁面觸發點
  → Calendly Slide-over
  → 填寫預約
失敗路徑：API 逾時 → 顯示備用 Email 文案
```

---

## 三、各頁面 Wireframe 文字描述

### 首頁（Home）

| Section | 目的 | 內容 | 互動邏輯 |
|---------|------|------|---------|
| Global Nav | 定位品牌、導覽 | Logo + 3 個導航項 | 滾動時毛玻璃加深 |
| Hero | 身份錨定 | 大標題 + 副標題 + 2 個 CTA | 背景點陣網格裝飾 |
| B2B KPI 儀表板 | 量化戰績震撼 | 4 個數據卡片 | 進入畫面觸發 Count-up |
| AI 機庫節點 | 技術廣度展示 | 5 個節點卡片 + 技術標籤 | 點擊開啟 Drawer |
| Footer | 法規合規 | NDA 聲明 + 版權 | 靜態 |

### AI 機庫頁（/skunkworks）

| Section | 目的 | 內容 | 互動邏輯 |
|---------|------|------|---------|
| 麵包屑導航 | 路徑追蹤 | Root > AI_Skunkworks > ... | Hover 終端機游標閃爍 |
| 5 節點網格 | 技術深度展示 | 每個節點：名稱、技術標籤、描述 | Hover 脈衝；點擊開啟側面板 |
| 節點 Drawer | 底層架構解析 | 系統拓撲圖 + 技術難點日誌 + 技術棧 | 滑出動畫，ESC 關閉 |
| Lead Capture | 轉換 | 技術白皮書索取 | 輸入 Email → 編譯動畫 → 成功 |

### 企業核心頁（/enterprise）

| Section | 目的 | 內容 | 互動邏輯 |
|---------|------|------|---------|
| 儀表板切換器 | 3 個專案切換 | SAP 整合 / 跨國 WMS / 政府 EIP | 點擊切換，背景節點重排動畫 |
| 環境雷達圖 | 困難度可視化 | 多邊形雷達（資源/時程/抗拒/模糊） | Hover 頂點彈出說明 |
| 危機決策時間軸 | 故事展示 | Git Commit Log 風格分支時間軸 | 滾動展開節點 |
| Executive CTA | 高管轉換 | 預約架構審查按鈕 | Slide-over Calendly |

### 終端機洞察頁（/terminal）

| Section | 目的 | 內容 | 互動邏輯 |
|---------|------|------|---------|
| 終端機搜尋框 | 精準篩選 | 閃爍游標 + 實時過濾 | 輸入即過濾卡片（0.2s 淡入） |
| 情報卡片網格 | 文章列表 | 分類代碼 + 標題 + 閱讀時間 + 技術標籤 | Hover 邊框微亮 |
| 訂閱模塊 | 私域沉澱 | Email 輸入 + Request Access 按鈕 | 終端機編譯成功動畫 |

---

## 四、互動設計決策

### 應保留
1. Calendly Slide-over（不跳頁，保護心流）
2. 節點 Drawer 展開（頁內體驗，沉浸感）
3. WebGL 降級至靜態 SVG（含 `prefers-reduced-motion` 支援）
4. Count-up 動畫（IntersectionObserver 觸發，非頁面載入觸發）
5. 終端機搜尋介面（強化工程師品牌認知）
6. 麵包屑終端機風格（Hacker Aesthetics）
7. 空狀態 ERR_404 轉換 CTA

### 應調整（與 PRD 不同）

| PRD 原始設計 | 調整方向 | 原因 |
|------------|---------|------|
| 入場 Loading 1.5 秒雷達動畫 | **移除**，直接呈現內容 | 衝突 LCP < 1.5s 目標 |
| 矩陣代碼滑落 Hover | 改為邊框微亮 | 避免 Layout 重繪 |
| 防複製剪貼簿攔截 | **完全移除** | 反使用者行為，違反 UX 原則 |
| 手機端常駐固定 CTA | 捲動超過 50vh 後才淡入 | 避免持續遮蓋內容 |
| 手機雷達圖縮小版 | 改為純文字挑戰清單 | 375px 下 Label 重疊導致可讀性崩潰 |

---

## 五、UX 盲點分析

1. **首屏認知負荷過高**：現有規格在首屏堆疊過多資訊。建議每個 Section 只回答一個問題，建立信任層次。
2. **技術拓撲圖受眾誤判**：純技術架構圖 CEO 看不懂。建議架構圖旁加「商業影響說明」層（例如「此架構使維護成本降低 20%」）。
3. **手機體驗嚴重降格**：需設計功能等效但視覺重組的手機版，而非縮小桌機版。
4. **多個 Lead Capture 稀釋轉換**：不同頁面有 Calendly / 白皮書 / 電子報三個轉換點。建議同一視窗不超過 2 個 CTA，建立清晰漏斗優先序。
5. **WebGL 效能與可及性衝突**：`prefers-reduced-motion: reduce` 時不僅停止動畫，連 WebGL context 都不應初始化（降低耗電與 GPU 佔用）。
6. **法規聲明對比度矛盾**：PRD 要求「低對比但清晰」是矛盾需求。應以小字號 + 符合 WCAG AA 的對比度呈現，而非刻意降低對比。
