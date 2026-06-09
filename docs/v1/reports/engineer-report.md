# Fullstack Engineer 完工報告

- **任務**：v1 首頁高互動靜態原型
- **日期**：2026-06-08
- **角色**：Fullstack Engineer
- **輸出**：`v1/index.html`（CSS + JS 全部 inline，1702 行，無外部依賴）

---

## 實作決策摘要

1. **Single-file 策略**：所有 CSS 與 JS 完全 inline，無需 build tool 或 server，瀏覽器直接開啟即可運作。Google Fonts 透過 `<link>` 引入，為唯一外部請求。

2. **Design Token 嚴格對應**：以 art-direction.md 的色票為最終依據（`#00f5d4` 霓虹青、`#f5a623` 琥珀金、`#39ff14` 霓虹綠），覆蓋了 ui-proposal.md 中部分與 art-direction 有微小差異的 hex 值（例如 `--accent-cyan: #0EA5E9` 改為 art-direction 指定的 `#00f5d4`）。

3. **非對稱節點佈局**：AI Skunkworks 採用 3-col CSS Grid，Node 01 置於第二欄（中央）並放大，其餘 4 個節點圍繞，製造視覺張力。手機斷點改為高度動態展開的 Accordion（max-height 過渡），而非桌機版縮小。

4. **Count-up 用 requestAnimationFrame + easeOutQuad**：IntersectionObserver 觸發（threshold 0.25），持續時間 1.2s，確認 `prefers-reduced-motion` 時直接顯示最終值、不執行動畫。

5. **a11y 完整實作**：Slide-over 帶 `role="dialog" aria-modal="true"`，含 focus trap（Tab 循環）與 ESC 關閉；節點卡片帶 `role="button" tabindex="0" aria-expanded`；手機 Hamburger 帶 `aria-controls / aria-expanded`；狀態 dot 用 `aria-hidden` 排除螢幕閱讀器。

---

## 與設計提案的差異點

| 項目 | 設計提案 | 實作版本 | 原因 |
|------|---------|---------|------|
| `--accent-cyan` hex | ui-proposal: `#0EA5E9` | art-direction: `#00f5d4` | art-direction.md 為最終視覺決策文件，art-direction 優先 |
| 固定 CTA（手機） | 常駐顯示 | 捲動超過 50vh 後才淡入 | 遵循 ux-proposal.md 調整說明，避免遮蓋內容 |
| Calendly Slide-over | 完整嵌入 Calendly widget | alert() stub | 靜態原型無 Calendly embed URL，業主確認後替換為真實嵌入碼 |
| PDF 下載 | 連結至實體 PDF | alert() stub | 靜態原型尚無 PDF 檔案，業主提供後替換為 `<a href="...pdf" download>` |
| Terminal / Enterprise 頁 | 獨立 /skunkworks, /enterprise, /terminal 路由 | 本頁為 Teaser section，無跳頁 | 任務範疇為首頁原型；完整多頁版為下一迭代工作 |

---

## 已知限制 / 待業主確認事項

1. **Calendly URL**：`openCalendly()` 函式目前為 `alert()` stub，業主提供 Calendly 帳號連結後替換為官方 embed script。
2. **PDF 履歷檔案**：`downloadResume()` 函式待業主提供 PDF 並上傳後，改為 `<a>` 直連。
3. **多頁路由**：Enterprise Core、AI Skunkworks、Terminal 三個子頁面的完整實作為下一迭代範疇；首頁已加入對應 anchor 連結。
4. **圖片資源**：本版本無圖片（設計提案中 og-cover.webp、favicon.svg 等資產未產出），如需 SEO / 社群分享功能，需另行設計並補充 `<meta og:image>` 標籤。
5. **字型 Preload**：如需進一步優化 LCP，可加入 `<link rel="preload" as="font">` 對 Space Grotesk 主要 weight 做優先載入。
