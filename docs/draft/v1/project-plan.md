# 專案計劃 — Portfolio V1（團隊獨立版）

> 功能代號：v1
> 日期：2026-06-08
> 撰寫角色：Project Manager

---

## 1. 任務分解（WBS）

### Phase 1：設計研究與規格（並行啟動）

| 子任務 ID | 子任務名稱 | 負責角色 | 工作量 | 輸出物 |
|-----------|-----------|---------|--------|--------|
| P1-1 | UX 流程設計（4 頁：首頁 / AI 機庫 / 企業神經中樞 / Terminal） | ux-designer | 中 | `docs/v1/ux-flow.md` |
| P1-2 | UI 視覺規格（Glassmorphism 設計語彙、色票、字型、元件庫） | ui-designer | 大 | `docs/v1/ui-spec.md` |
| P1-3 | 美術定調（深曜黑 x 琥珀金 x 霓虹青 x WebGL 節點視覺） | art-designer | 中 | `docs/v1/art-direction.md` |
| P1-4 | 文案策略（所有頁面標題、節點文案、CTA、免責聲明） | copywriter | 中 | `docs/v1/copy-strategy.md` |
| P1-5 | SEO / AIO 關鍵字架構（Schema.org、meta、AI 搜尋優化） | seo-specialist | 小 | `docs/v1/seo-spec.md` |

P1-1 至 P1-5 全部**並行**執行。

---

### Phase 2：架構設計（接力 P1）

| 子任務 ID | 子任務名稱 | 負責角色 | 工作量 | 輸出物 |
|-----------|-----------|---------|--------|--------|
| P2-1 | 技術架構設計（框架選型、WebGL 方案、效能預算規劃、漸進降級策略） | architect | 大 | `docs/v1/architecture.md` |
| P2-2 | 遙測架構設計（Event 命名、資料層規劃） | architect | 小 | 併入 `architecture.md` |

相依：需 P1-1、P1-2 完成後才能確認技術邊界。

---

### Phase 3：分頁實作（接力 P2，各頁面可 git worktree 並行）

| 子任務 ID | 子任務名稱 | 負責角色 | 工作量 | Branch |
|-----------|-----------|---------|--------|--------|
| P3-1 | 首頁（Command Center）— 雷達動畫、Count-up、B2B/B2C 雙模組 | fullstack-engineer | 大 | `feat/page-home` |
| P3-2 | AI 機庫頁（Skunkworks）— WebGL 節點圖、側邊欄展開 | fullstack-engineer | 大 | `feat/page-skunkworks` |
| P3-3 | 企業神經中樞頁（Enterprise Core）— 決策時間軸、雷達圖 | fullstack-engineer | 大 | `feat/page-enterprise` |
| P3-4 | 終端機洞察頁（Terminal）— 終端機搜尋介面、文章卡片 | fullstack-engineer | 中 | `feat/page-terminal` |
| P3-5 | 全域元件（Nav、CTA 懸浮按鈕、Footer 免責聲明） | fullstack-engineer | 中 | `feat/global-components` |
| P3-6 | Calendly 整合（滑出預約表單）與 Email 訂閱 API | fullstack-engineer | 小 | 併入 P3-5 |
| P3-7 | 效能降級機制（WebGL → SVG fallback、FPS 偵測） | fullstack-engineer | 小 | 各頁 branch 內實作 |

P3-1 至 P3-4 可在 git worktree 隔離後**並行**；P3-5 需先於各頁完成，以免全域元件衝突。

---

### Phase 4：整合與測試（接力 P3）

| 子任務 ID | 子任務名稱 | 負責角色 | 工作量 |
|-----------|-----------|---------|--------|
| P4-1 | 程式碼審查（各 branch PR review） | code-reviewer | 中 |
| P4-2 | 功能測試（Happy Path、Edge Cases、RWD） | qa-tester | 中 |
| P4-3 | 遙測事件驗證（Event 觸發正確性） | qa-tester | 小 |

P4-1 與 P4-2 **並行**。

---

### Phase 5：效能 / 無障礙審查（接力 P4）

| 子任務 ID | 子任務名稱 | 負責角色 | 工作量 |
|-----------|-----------|---------|--------|
| P5-1 | 效能審查（LCP < 1.5s 首頁、< 1.2s 機庫頁，WebGL 成本） | performance-engineer | 中 |
| P5-2 | 無障礙審查（WCAG AAA 深色對比、費茲定律 Mobile 觸及區） | accessibility-reviewer | 中 |
| P5-3 | 技術文件更新（三份系統文件） | tech-writer | 小 |

P5-1 與 P5-2 **並行**；P5-3 等 P5-1、P5-2 完成後接力。

---

## 2. 相依關係（接力 vs 並行）

```
[Phase 1] P1-1 ∥ P1-2 ∥ P1-3 ∥ P1-4 ∥ P1-5
                          |
                    (P1-1, P1-2 完成)
                          |
              [Phase 2] P2-1 → P2-2
                          |
                    (P2-1 完成)
                          |
          [Phase 3] P3-5 先行 → P3-1 ∥ P3-2 ∥ P3-3 ∥ P3-4
                               (git worktree 並行)
                          |
                    (P3 所有 branch merge)
                          |
            [Phase 4] P4-1 ∥ P4-2 ∥ P4-3
                          |
                    (P4 完成)
                          |
           [Phase 5] P5-1 ∥ P5-2 → P5-3
```

無循環相依。

---

## 3. 每個 Phase 的輸出物（Deliverables）

| Phase | 輸出物清單 |
|-------|-----------|
| Phase 1 | `docs/v1/ux-flow.md`、`docs/v1/ui-spec.md`、`docs/v1/art-direction.md`、`docs/v1/copy-strategy.md`、`docs/v1/seo-spec.md` |
| Phase 2 | `docs/v1/architecture.md`（含技術選型、效能策略、降級策略、遙測設計） |
| Phase 3 | 四個分頁 + 全域元件的可執行程式碼，Calendly 整合完畢 |
| Phase 4 | PR review 報告、QA 測試報告（含 Edge Cases 驗證清單） |
| Phase 5 | 效能審查報告、無障礙審查報告、更新後的三份系統文件 |

---

## 4. 風險清單

### 技術風險

| 風險 | 嚴重度 | 緩解策略 |
|------|-------|---------|
| WebGL 在老舊裝置或 Safari 上渲染異常 | 高 | Phase 2 設計降級策略（SVG fallback），Phase 3 P3-7 實作 FPS 偵測 |
| Glassmorphism + WebGL 同時啟用導致 LCP > 1.5s | 高 | Phase 2 訂定效能預算；Phase 5 P5-1 強制壓力測試 |
| Calendly API 整合失敗（第三方服務不可控） | 中 | P3-6 實作 Graceful Degradation 備用 Email 方案 |
| 剪貼簿攔截事件在部分瀏覽器無效 | 低 | 降級為靜態警告文字，不阻擋使用者 |

### 時程風險

| 風險 | 緩解策略 |
|------|---------|
| Phase 1 設計角色產出不一致（UI/UX/Art 三份規格互相矛盾） | 設計層在 Phase 1 完成後舉行 1 次同步對齊，再進 Phase 2 |
| Phase 3 四個頁面 worktree 各自改全域樣式導致 merge 衝突 | P3-5（全域元件）必須先完成並 merge 進 main，各頁 branch 再 fork |

### 資訊不完整風險

| 風險 | 需補充資料 |
|------|-----------|
| 5 個 AI App 的技術架構細節（API 串接、資料流）尚未有程式碼文件 | 工程師需向業主索取或自行整理技術筆記，供架構圖製作使用 |
| Calendly 連結 / Email 地址 / 履歷 PDF 尚未提供 | 需業主提供後才能完成 CTA 整合 |
| 部落格文章內容（Terminal Insights）尚未撰寫 | copywriter 與業主確認第一批 3-5 篇文章主題 |

---

## 5. git worktree 策略

### 可並行開發的頁面

Phase 3 中四個分頁彼此無共用狀態，適合 git worktree 隔離並行：

```
main
 └── feat/global-components    (先完成，提供 NavBar、CTA、Footer 基礎)
      ├── feat/page-home        (首頁)
      ├── feat/page-skunkworks  (AI 機庫)
      ├── feat/page-enterprise  (企業神經中樞)
      └── feat/page-terminal    (終端機洞察)
```

### 使用方式（範例）

```bash
# 建立 worktree（在已有 branch 的情況下）
git worktree add ../portfolio-home feat/page-home
git worktree add ../portfolio-skunkworks feat/page-skunkworks
git worktree add ../portfolio-enterprise feat/page-enterprise
git worktree add ../portfolio-terminal feat/page-terminal
```

### Branch 命名規範

| 類型 | 格式 | 範例 |
|------|------|------|
| 分頁開發 | `feat/page-<name>` | `feat/page-home` |
| 全域元件 | `feat/global-<name>` | `feat/global-components` |
| 修復 | `fix/<desc>` | `fix/webgl-safari-fallback` |
| 效能 | `perf/<desc>` | `perf/lcp-optimization` |

### 合併順序

1. `feat/global-components` → `main`（Phase 3 開始時，其他 branch 從此點 fork）
2. 各頁 branch 完成後 → PR → Phase 4 審查 → merge `main`
3. Phase 5 審查完成後 → 最終 `main` 進行部署

---

## 6. 建議執行順序（Sprint 規劃）

| Sprint | 包含 Phase | 主要里程碑 |
|--------|-----------|-----------|
| Sprint 1 | Phase 1 + Phase 2 | 完成設計規格與架構文件，對齊後進入實作 |
| Sprint 2 | Phase 3（P3-5 先行，P3-1~P3-4 並行） | 四個分頁骨架完成、整合 Calendly |
| Sprint 3 | Phase 4 + Phase 5 | 審查、修正、效能壓測、無障礙驗證、文件更新 |
