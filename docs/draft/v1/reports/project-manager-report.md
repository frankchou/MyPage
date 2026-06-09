# Project Manager 完工報告

- 任務：任務拆解與排程
- 日期：2026-06-08
- 功能代號：v1
- 輸出檔案：`docs/v1/project-plan.md`

---

## 核心決策摘要

1. **採用五階段 Phase 結構**
   將整個專案拆為 Design Research（P1）→ Architecture（P2）→ Implementation（P3）→ Integration & Test（P4）→ Quality Review（P5）。各 Phase 邊界清晰，避免角色之間的產出互相覆蓋。

2. **Phase 1 五個設計子任務全數並行**
   UX、UI、Art、Copy、SEO 五個角色彼此輸出互相獨立（各自的 `.md` 規格文件），無需等待，並行執行可節省最大時間成本。唯一的同步點是 Phase 1 結束後須對齊規格，再進入 Phase 2。

3. **Phase 3 以 git worktree 隔離四個分頁並行開發**
   首頁、AI 機庫、企業神經中樞、終端機洞察四頁彼此無共用狀態，採 worktree 策略各自開發。關鍵前提：全域元件（`feat/global-components`）必須先完成並 merge 進 main，其餘四個 branch 才能從此點 fork，避免後期 merge 衝突。

4. **識別出三類資訊不完整風險並列入風險清單**
   包括：5 個 AI App 的後端技術細節尚未文件化（影響架構圖製作）、Calendly 連結與履歷 PDF 尚未提供（影響 CTA 實作）、Terminal 頁面文章內容尚未撰寫（影響 Phase 3 完整度）。這三項需業主在 Sprint 1 期間提供，否則將成為 Sprint 2 的阻礙。

5. **三個 Sprint 對應三個里程碑**
   Sprint 1 = 規格與架構（所有實作的前置條件）；Sprint 2 = 實作（並行開發最大化）；Sprint 3 = 審查與收尾（效能、無障礙、文件一次解決）。此排列確保每個 Sprint 結束都有可檢視的具體產出，符合敏捷可視化原則。

---

## 阻礙與風險上報（給總指揮）

| 阻礙項目 | 影響 Phase | 建議行動 |
|---------|-----------|---------|
| 5 個 AI App 技術細節未文件化 | P2（架構師）、P3-2（AI 機庫實作） | 請業主於 Sprint 1 提供技術筆記或系統示意圖 |
| Calendly 帳號連結未提供 | P3-6 | Sprint 2 開始前需業主確認並提供 embed code |
| Terminal 文章內容尚未規劃 | P3-4 | copywriter 需在 P1-4 文案策略中一併規劃首批文章主題 |
| WebGL 效能不確定性 | P5-1 | 架構師在 P2 需明確訂定效能預算與降級門檻，作為工程師的硬性約束 |

---

## 子任務總覽（角色分配）

| Phase | 子任務數 | 參與角色 |
|-------|---------|---------|
| Phase 1 | 5 | ux-designer、ui-designer、art-designer、copywriter、seo-specialist |
| Phase 2 | 2 | architect |
| Phase 3 | 7 | fullstack-engineer |
| Phase 4 | 3 | code-reviewer、qa-tester |
| Phase 5 | 3 | performance-engineer、accessibility-reviewer、tech-writer |
| **合計** | **20** | **10 個角色** |
