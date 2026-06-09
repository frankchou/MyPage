# 實作規格範本（中文版）
**來源：** Prisma landing page prompt 翻譯
**用途：** 未來寫「工程師可直接執行」的規格時的參考範本
**核心洞察：** 這種 prompt 有效，是因為所有設計決策都已做完——工程師只需把規格翻成程式碼，零詮釋空間。

---

建立一個 React + Vite + TypeScript + Tailwind CSS 的 Landing Page，品牌名稱為「Prisma」，頁面包含 3 個區塊：Hero、About、Features。使用 framer-motion 處理動畫，lucide-react 處理圖示。設計風格為暗色、電影感、帶溫暖奶油色調。

## 字型

在 index.html 載入兩款 Google Fonts：

- **Almarai**（字重：300、400、700、800）— 作為全域預設字型
- **Instrument Serif**（僅斜體）— 用於 About 區塊的斜體強調文字

在 index.css 設定全域字型：

```css
* { font-family: 'Almarai', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; }
```

在 tailwind.config.js 擴充：
- `colors.primary: #DEDBC8`（溫暖奶油色，用於所有主要文字與強調色）
- `fontFamily.serif: ['"Instrument Serif"', 'serif']`

## 色彩系統

- 背景色：全域 `black (#000000)`，About 卡片 `#101010`，Features 卡片 `#212121`
- 主要文字色：`#E1E0CC`（用 inline style 套用，與 Tailwind primary 略有不同）
- Tailwind primary：`#DEDBC8`（用於 `text-primary`、`text-primary/70` 等 utility class）
- 灰色文字：`text-gray-400`、`text-gray-500`
- 導覽列連結色：`rgba(225, 224, 204, 0.8)`，hover 時變 `#E1E0CC`

## 自訂 CSS 工具類（index.css）

兩個 SVG 雜訊紋理工具類：

- `.noise-overlay`：分形雜訊（baseFrequency: 0.85，numOctaves: 3），疊加在 Hero 影片上
- `.bg-noise`：分形雜訊（baseFrequency: 0.9，numOctaves: 4），作為 Features 區塊的細緻背景

兩者均使用內嵌 SVG data URI 搭配 feTurbulence filter。

## 區塊一：HERO

全視窗高度（`h-screen`）。整個區塊有 `p-4 md:p-6` 的內縮效果。內部容器使用 `rounded-2xl md:rounded-[2rem]` 和 `overflow-hidden`。

**背景影片：**
- URL：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4`
- `autoPlay loop muted playsInline`，`object-cover`，填滿整個容器
- 上方疊加 `.noise-overlay`，`opacity-[0.7] mix-blend-overlay pointer-events-none`
- 漸層疊加：`bg-gradient-to-b from-black/30 via-transparent to-black/60`

**導覽列：**
- 絕對定位於頂部中央
- 黑色背景藥丸從頂部懸下：`bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8`
- 5 個導覽項目：「Our story」、「Collective」、「Workshops」、「Programs」、「Inquiries」
- 文字大小：`text-[10px] sm:text-xs md:text-sm`
- 項目間距：`gap-3 sm:gap-6 md:gap-12 lg:gap-14`
- 連結色：`rgba(225, 224, 204, 0.8)`，hover：`#E1E0CC`（inline style）

**Hero 內容（底部對齊）：**
- 絕對定位於底部：`absolute bottom-0 left-0 right-0`
- 12 欄格線：左 8 欄放標題，右 4 欄放文字 + 按鈕
- 巨型標題「Prisma」使用 WordsPullUp 元件：
  - 響應式尺寸：`text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]`
  - `font-medium leading-[0.85] tracking-[-0.07em]`
  - 顏色：`#E1E0CC`
  - 最後一個字「Prisma」的「a」上方有上標星號「*」：`absolute top-[0.65em] -right-[0.3em] text-[0.31em]`
  - 拉起動畫：每個字從 `y:20` 滑上，錯開延遲 `0.08s`，由 `useInView` 觸發
- 說明段落（右欄）：
  - 文字：「Prisma is a worldwide network of visual artists...」
  - `text-primary/70 text-xs sm:text-sm md:text-base`，`line-height: 1.2`
  - Framer Motion：從 `y:20` 淡入，`delay: 0.5s`，`ease: [0.16, 1, 0.3, 1]`
- CTA 按鈕「Join the lab」：
  - 藥丸形狀：`bg-primary rounded-full`
  - 黑色文字，`font-medium`，`text-sm sm:text-base`
  - 右側黑色圓形（`bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10`）內含 ArrowRight 圖示
  - Hover：間距增大（`hover:gap-3`），圓形放大（`group-hover:scale-110`）
  - Framer Motion：從 `y:20` 淡入，`delay: 0.7s`，相同 ease

## 區塊二：ABOUT

`bg-black`，有內縮的區塊，內容置中
內部卡片：`bg-[#101010]`，文字置中，`max-w-6xl`
頂部：小標籤「Visual arts」，`text-primary text-[10px] sm:text-xs`

主標題使用 WordsPullUpMultiStyle 元件，3 個段落：
- 「I am Marcus Chen,」— `font-normal`（Almarai）
- 「a self-taught director.」— `italic font-serif`（Instrument Serif 斜體）
- 「I have skills in color grading, visual effects, and narrative design.」— `font-normal`
- 容器：`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]`
- 每個字以拉起效果進場（`y:20` → `y:0`），錯開 `0.08s` 延遲

內文段落使用 scroll 連動的字元透明度動畫：
- 文字：「Over the last seven years, I have worked with Parallax...」
- `text-[#DEDBC8] text-xs sm:text-sm md:text-base`
- 每個字元個別包裹在 AnimatedLetter 元件中
- 使用 `useScroll`，target offset `['start 0.8', 'end 0.2']`
- 每個字元透明度從 `0.2` 過渡到 `1`，根據 scroll 進度依序亮起
- 字元錯開：`charProgress = index / totalChars`，範圍 `[charProgress - 0.1, charProgress + 0.05]`

## 區塊三：FEATURES

`min-h-screen bg-black`，帶有 `.bg-noise` overlay，`opacity-[0.15]`

標題使用 WordsPullUpMultiStyle：
- 第一行：「Studio-grade workflows for visionary creators.」奶油色
- 第二行：「Built for pure vision. Powered by art.」`text-gray-500`
- 兩行：`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal`

**4 欄卡片格線**（`lg:h-[480px]`，`gap-3 sm:gap-2 md:gap-1`）：

每張卡片有錯開的進場動畫：從 `scale: 0.95` + 淡入，由 `useInView`（once，margin "-100px"）觸發，每張錯開 `0.15s`，`ease: [0.22, 1, 0.36, 1]`。

- **卡片 1 — 影片卡**：全螢幕影片背景，底部文字「Your creative canvas.」`#E1E0CC`
- **卡片 2 — 「Project Storyboard.」(01)**：`bg-[#212121]`，頂部小圖示，標題 + 編號，4 個打勾清單項目，「Learn more」連結帶旋轉 -45° 箭頭
- **卡片 3 — 「Smart Critiques.」(02)**：同上版型，3 個清單項目（AI 分析、創意筆記、工具整合）
- **卡片 4 — 「Immersion Capsule.」(03)**：同上版型，3 個清單項目（通知靜音、環境音效、行程同步）

所有清單項目使用 lucide-react 的 `Check` 圖示（`text-primary` 色），說明文字 `text-gray-400`。

## 共用動畫元件

**WordsPullUp：** 以空格分割文字，每個字是 `motion.span`，從 `y:20` 滑上，錯開延遲。使用 `useInView (once: true)`。支援 `showAsterisk` prop，在最後一個字的「a」後加上標星號。

**WordsPullUpMultiStyle：** 接受 `{text, className}` 陣列，將所有文字分割成個別字並保留各字的 className。相同拉起動畫。字詞包裹在 `inline-flex flex-wrap justify-center` 中。

## 響應式斷點

頁面完全響應式，涵蓋手機、平板、桌機。Features 卡片從 1 欄（手機）→ 2 欄（md）→ 4 欄（lg）。Hero 標題從 `26vw` 縮到 `19vw`。導覽列項目在手機上壓縮間距。所有間距、字型大小使用 Tailwind 響應式前綴（sm/md/lg/xl/2xl）。

## 技術棧

- Vite + React 18 + TypeScript
- Tailwind CSS 3
- framer-motion（所有動畫：文字拉起、淡入、scroll 連動透明度、卡片進場）
- lucide-react（ArrowRight、Check 圖示）

---

## 為什麼這種 Prompt 有效

每個元素描述的是**機制**，不是感覺：
- 動畫：確切的 easing `[0.16, 1, 0.3, 1]`、確切的延遲 `0.5s`、確切的偏移 `y: 20`
- 字型排版：確切的 vw 值、確切的 tracking、確切的 line-height
- 顏色：確切的 hex code、確切的透明度值
- 版面：確切的欄數、確切的響應式斷點
- 素材：直接的 URL，零詮釋空間

工程師只需把規格翻成程式碼，不需要做任何設計決策。

---

## 使用這個範本的方法

1. 找到你喜歡的網站 → 請我做技術逆向工程（DevTools 挖數值）
2. 用這份文件的結構填入你的數值
3. 把填好的規格直接給工程師

**關鍵問題清單（每個設計決策都要有答案才能給工程師）：**
- [ ] 字型是什麼？字重？在哪裡用？
- [ ] 背景色？卡片色？文字色？（每個 hex code）
- [ ] 版面幾欄？比例多少？斷點行為？
- [ ] 動畫：哪種類型？timing function？duration？delay？trigger 條件？
- [ ] 每個互動元件的 hover / active 狀態長什麼樣？
- [ ] 素材在哪裡？（影片、圖片的 URL 或本地路徑）
