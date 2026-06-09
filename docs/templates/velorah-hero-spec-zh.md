# Velorah Hero 規格（中文版）
**來源：** 電影感全屏影片 Hero + 毛玻璃導覽列
**風格：** 暗色、電影感、極簡——影片提供所有視覺深度

---

建立一個單頁 Hero 區塊，包含全屏循環背景影片、毛玻璃（glassmorphic）導覽列、以及電影級排版。使用 React + Vite + Tailwind CSS + TypeScript 搭配 shadcn/ui。

## 影片背景

- 全屏 `<video>` 元素，屬性：`autoPlay loop muted playsInline`
- 來源 URL：`https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`
- 定位：`absolute inset-0 w-full h-full object-cover z-0`

## 字型

- 從 Google Fonts 載入：**Instrument Serif**（標題用）和 **Inter** 字重 400/500（內文用）
- CSS 變數：`--font-display: 'Instrument Serif', serif` 和 `--font-body: 'Inter', sans-serif`
- `body` 使用 `var(--font-body)`，標題用 inline `fontFamily: "'Instrument Serif', serif"`

## 色彩主題（暗色，HSL 值作為 CSS 變數）

| 變數 | HSL 值 | 說明 |
|------|--------|------|
| `--background` | `201 100% 13%` | 深海軍藍 |
| `--foreground` | `0 0% 100%` | 白色 |
| `--muted-foreground` | `240 4% 66%` | 柔灰 |
| `--primary` | `0 0% 100%` | 白色 |
| `--primary-foreground` | `0 0% 4%` | 近黑 |
| `--secondary` | `0 0% 10%` | 深灰 |
| `--muted` | `0 0% 10%` | 深灰 |
| `--accent` | `0 0% 10%` | 深灰 |
| `--border` | `0 0% 18%` | 邊框灰 |
| `--input` | `0 0% 18%` | 輸入框灰 |

## 導覽列

- `relative z-10`，flex 橫排，`justify-between`，`px-8 py-6`，`max-w-7xl mx-auto`
- Logo：「Velorah®」（® 用 `<sup className="text-xs">`），`text-3xl tracking-tight`，Instrument Serif 字型，`text-foreground`
- 導覽連結（手機隱藏，`md:flex`）：Home（active，`text-foreground`）、Studio、About、Journal、Reach Us — 全部 `text-sm text-muted-foreground`，hover 時 `text-foreground`，`transition-colors`
- CTA 按鈕：「Begin Journey」，`liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground`，hover 時 `scale-[1.03]`

## Hero 區塊

- `relative z-10`，flex 縱排，置中，文字置中，`px-6 pt-32 pb-40 py-[90px]`
- **H1**：「Where dreams rise through the silence.」
  - `text-5xl sm:text-7xl md:text-8xl`，`leading-[0.95]`，`tracking-[-2.46px]`，`max-w-7xl`，`font-normal`，Instrument Serif
  - 「dreams」和「through the silence.」包裹在 `<em className="not-italic text-muted-foreground">` 中，產生顏色對比
- **副文字**：`text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed`
  - 「We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.」
- **CTA 按鈕**：「Begin Journey」，`liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12`，hover 時 `scale-[1.03]`，`cursor-pointer`

## 毛玻璃效果（CSS class `.liquid-glass`）

```css
.liquid-glass {
  background: rgba(255, 255, 255, 0.01);
  background-blend-mode: luminosity;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: none;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}
.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1.4px;
  background: linear-gradient(180deg,
    rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
    rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
    rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

## 動畫（CSS keyframes + 工具類）

```css
@keyframes fade-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-rise { animation: fade-rise 0.8s ease-out both; }
.animate-fade-rise-delay { animation: fade-rise 0.8s ease-out 0.2s both; }
.animate-fade-rise-delay-2 { animation: fade-rise 0.8s ease-out 0.4s both; }
```

| 元素 | 動畫 class |
|------|-----------|
| H1 | `animate-fade-rise` |
| 副文字 | `animate-fade-rise-delay` |
| Hero CTA 按鈕 | `animate-fade-rise-delay-2` |

## 版面原則

無裝飾性光球、無放射漸層、無疊加層。極簡、電影感、垂直置中 Hero。影片提供所有視覺深度。
