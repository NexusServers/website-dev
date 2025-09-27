- Shockbyte DDoS Protection cell updated to `17 Tbps` (was previously a red `?`).

### 2025-09-27 — DDoS correction

- Fixed DDoS values in `src/index.html` so Pyro shows `20 Tbps` and Shockbyte shows `17 Tbps` (previously swapped during edits).
### 2025-09-27 — Lagless & Nitrado updates

- Lagless (`prov-lagless` column) updates in `src/index.html`:
	- Pricing: set to `$2/GB`.
	- Memory Type: set to `DDR5`.
	- CPU Type: set to `9950X`.
	- DDoS Protection: set to `10 Tbps`.

- Nitrado (`prov-nitrado` column) updates in `src/index.html`:
	- Pricing: set to `~$1.20/Slot`.
	- Memory Type: set to `DDR4 / Optane Memory`.
	- CPU Type: set to `Intel Xeon`.
	- DDoS Protection: question mark styled red for emphasis (inline style applied).

If you'd like the `~` removed from the slot pricing or prefer a different currency format, tell me and I'll update it. I can also centralize red emphasis into a CSS utility class instead of inline styles.

### 2025-09-27 — Provider logo updates

- Removed `onerror` fallback handlers from the `<img>` tags for WiseHosting, Lagless, and Nitrado in `src/index.html` so newly added logo files placed under `src/assets/images/` will display directly. If any of the images are missing or invalid, they'll show the `alt` text instead.

If you'd like me to add conservative fallback behavior (e.g., replace with a default placeholder image when missing), I can implement that too.

### 2025-09-27 — Logo path fixes & Shockbyte DDoS

- Fixed logo paths in `src/index.html` to match newly added files in `src/assets/images/`:
	- `wisehosting.jpg` (updated `<img>` src for `prov-wisehosting`).
	- `nitrado.webp` (updated `<img>` src for `prov-nitrado`).
- Shockbyte DDoS Protection cell updated to `17 Tbps` (was a red `?`).

### 2025-09-27 — Testimonial added

- Added a new testimonial to `src/index.html` (second testimonial bubble) with author set to `My testimony` and content provided by the user. This replaces the previous empty placeholder bubble.

### 2025-09-27 — Testimonial shortened

- Shortened the user-submitted testimonial in `src/index.html` to a concise one-line summary for improved layout and readability on smaller screens.

### 2025-09-27 — Testimonial alignment

- Centered the first testimonial quote in `src/index.html` for improved visual balance: applied inline `style="text-align:center"` to the paragraph in the first `.testimonial-bubble`.

### 2025-09-27 — Centralize testimonial styling

- Moved testimonial centering to CSS by adding `.testimonial-bubble { text-align: center; }` in `src/styles.css` and removed the inline `style` from the paragraph in `src/index.html` so styles are centralized and easier to maintain.

### 2025-09-27 — Testimonial quote reposition

- Repositioned the decorative large quote mark in `.testimonial-bubble::before` back to the left (`left: 20px`) to preserve the classic testimonial look while keeping the text centered. Logged the change in `src/index.html`.

### 2025-09-27 — Quote mark aligned to top-left

- Adjusted `.testimonial-bubble::before` so the decorative quote mark is aligned to the top-left of the bubble (`top:0; left:20px`) and increased its size/opacity to match the original aesthetic.

### 2025-09-27 — Quote mark flush-left

- Nudged the decorative quote mark inside `.testimonial-bubble::before` to `left:8px` so the quotes sit closer to the left edge of the bubble for a stronger visual anchor.

### 2025-09-27 — Quote overhang adjustment

- Moved the decorative quote mark further left (`left: -12px`) so it overhangs the bubble slightly for stronger visual emphasis.
# Site Instructions (auto-maintained)

This file documents the current structure, styles, components, and other resources for the site. Keep this file in sync with any edits to `src/`.

## Pages

- `src/index.html` — Home / landing page.
- `src/plans.html` — Plans and pricing page.
- `src/about.html` — About page.
`src/new-content-sections.html` — Additional content / layout examples.

Note: On `src/plans.html`, the 3-step configurator headers ("Choose CPU", "Choose Game", "Pick a plan") are implemented as non-interactive visual boxes (`.step-box`) instead of plain numbered headings.

New: `src/plans.html` now includes a locations tab above the configurator. Locations:
- `Reno, NV` — default; all listed games and plans available.
- `Warsaw, Poland` — currently only `minecraft` is available; other games are marked as coming soon (disabled chips). Warsaw plans now render correctly under the "Pick a plan" step and use the imported EU plan list.

Warsaw plans added (copied from billing product listing `minecraft-eco-eu`):
- Dirt - EU — $2.00 — CPU: 1 vCore · RAM: 2 GB · Storage: 10 GB NVMe* · Ports: 3 · Backups: 2 · Databases: 3 — checkout: `https://billing.nexuservers.com/products/minecraft-eco-eu/minecraft-dirt-eco-eu/checkout`
- Sand - EU — $4.00 — CPU: 2 vCores · RAM: 4 GB · Storage: 20 GB NVMe* · Ports: 3 · Backups: 3 · Databases: 4 — checkout: `https://billing.nexuservers.com/products/minecraft-eco-eu/minecraft-sand-eco-eu/checkout`
- Cobblestone - EU — $6.00 — CPU: 3 vCores · RAM: 6 GB · Storage: 30 GB NVMe · Ports: 3 · Backups: 3 · Databases: 4 — checkout: `https://billing.nexuservers.com/products/minecraft-eco-eu/minecraft-cobblestone-eco-eu/checkout`
- Wood - EU — $8.00 — CPU: 4 vCores · RAM: 8 GB · Storage: 40 GB NVMe · Ports: 3 · Backups: 3 · Databases: 4 — checkout: `https://billing.nexuservers.com/products/minecraft-eco-eu/minecraft-wood-eco-eu/checkout`
- Stone - EU — $12.00 — CPU: 6 vCores · RAM: 12 GB · Storage: 60 GB NVMe · Ports: 5 · Backups: 4 · Databases: 5 — checkout: `https://billing.nexuservers.com/products/minecraft-eco-eu/minecraft-stone-eco-eu/checkout`
- Netherrack - EU — $16.00 — CPU: 8 vCores · RAM: 16 GB · Storage: 80 GB NVMe · Ports: 5 · Backups: 4 · Databases: 5 — checkout: `https://billing.nexuservers.com/products/minecraft-eco-eu/minecraft-netherrack-eco-eu/checkout`

CPU note: CPU selector cards now follow a structured format: title, subline, price-per-GB, and a short description.

- Example formatting:
	- Eco CPU
	- AMD EPYC 7551P
	- $0.50 / GB
	- Great for lightweight servers and proxies

The Warsaw CPU category is shown using the same format; its subline shows `Intel Core i7 7700k` and the price currently displays as `$1.00 / GB` for the EU CPU. The previous RAM/NVMe detail was removed and replaced with a sample description: "Great for EU Minecraft servers — low-latency locations and economy pricing." The top "Premium" badge was removed to match the other CPU cards.

The location selection is controlled by `.location-tab` buttons and the site script disables games not available in the selected location.

Location-specific CPUs & plans:
- Locations may expose different CPU categories and plan sets. The plans page now selects CPU options and pricing based on the chosen location.
- `Warsaw, Poland` currently exposes a single CPU category: "Minecraft Eco Servers - EU" with CPU: Intel Core i7 7700k, RAM: DDR4 @ 2133MT/s, NVMe storage. The Warsaw EU plans are sourced from the billing product page: https://billing.nexuservers.com/products/minecraft and the pricing/checkout listing used is https://billing.nexuservers.com/products/minecraft-eco-eu

Plan tags:
- Each game now includes a single 'Recommended' badge applied to a mid-tier plan that is reasonable for 20–50 players (e.g., Cobblestone - EU for Minecraft in Warsaw). Badges are represented in the plan objects as `badge: 'Recommended'` and `badgeClass: 'recommended'` so the UI shows the same styling used elsewhere for popular/recommended plans.
- Premium tiers also include a recommended pick (one per game) chosen for server sizes in the 20–50 player range; these premium picks are marked the same way in the plan objects.

## Components

- `src/assets/icons/` — SVG icons used across pages (`discord.svg`, `email.svg`, `home.svg`, `plans.svg`, `status.svg`).
- `src/assets/images/` — Site images and logos used in pages and lists.
- `src/scripts.js` — Primary site JavaScript for interactive behaviors.
- `src/aurora.js` — Theme/visual script included in the site.
- Static HTML fragments: pages are standard HTML files in `src/` (no JS component framework in use).

## Styles

- `src/styles.css` — Primary stylesheet.
- `src/responsive.css` — Responsive layout rules.
- `src/aurora.css` — Theme or visual style rules.
- `src/compact.css` — Compact layout rules.
- `src/compact-cards.css` — Card-specific compact styles.
- `src/bubble-box.css` — Bubble box UI styles.
- `src/low-performance.css` — Reduced-style sheet for low-performance devices. Should be defaulted to in `src/index.html` and other pages.

New: Visual refinements inspired by lagless.gg's pricing page were added to `src/styles.css` while strictly keeping Nexus's color tokens and variables.
- Tighter plans grid with elevated glassmorphism cards, left accent rim, larger price typography, and stronger CTA buttons.
- The 'Recommended' badge was restyled to be larger with a halo glow and stronger contrast to match the new card visuals.
- Responsive adjustments were added so the grid collapses from 3 → 2 → 1 columns at smaller breakpoints.

These changes are purely presentational and use the existing CSS custom properties (e.g., `--accent-cyan`, `--accent-pink`, `--white`) so the design remains consistent with the rest of the site.

Update: An alternate darker purple accent palette was added to `:root` as `--accent-purple-dark`, `--accent-purple-mid`, and `--accent-purple-light`. The new Lagless-inspired plan visuals have been updated to use these purple variables for the left accent rim, CTA gradients, and recommended badge so the pricing UI reads richer and more purple while staying on-brand.

Tweaks:
- Warsaw plan names in `LOC_PLAN_DATA` no longer include the "- EU" suffix; the imported plan names were simplified (e.g., `Dirt` instead of `Dirt - EU`).
- The `.plan-badge.recommended` style was reverted to the earlier, simpler gradient look at your request.

Promotions & UI prominence:
- Added three promotional discount bubbles above the location tabs in `src/plans.html`: `5% Quarterly`, `12% Semi-annual`, and `25% Yearly`. Each bubble is currently static markup (`.discount-bubble`) and will be converted to interactive buttons later.
	- Updated: The discount bubbles now explicitly show the negative percent (e.g., `-5%`) and include a small `Discount` label for clarity. Each bubble has an `aria-label` describing the billing interval and discount percentage.
		- Updated: The discount bubbles now explicitly show the negative percent and read as '-5% Off', '-12% Off', '-25% Off' for clarity. Each bubble has an `aria-label` describing the billing interval and discount percentage.
	- Location tab width was reduced so the buttons are shorter horizontally (min-width reduced to 130px) while keeping the more prominent active styling.

	Accent tweak: Updated the purple accent variables to a darker/richer set (`--accent-purple-dark: #27103e`, `--accent-purple-mid: #4f21b7`, `--accent-purple-light: #7a57f0`). The CTA gradient, left card rim, and recommended badge were adjusted to use these darker stops for a deeper visual feel.
- Location tabs were made bigger and more prominent: increased padding, font-weight, min-width, and an elevated active state so users notice the location switcher more easily.

Style notes:
- The plans configurator uses `.step-btn` in `src/styles.css` to present the three step headers as stylized interactive buttons. The active state is controlled with `aria-expanded="true"` on the button.

## APIs

- None — the site is static. There are no internal API endpoints in this repository.

## Other

- `src/robots.txt` — Robots directives.
- `src/sitemap.xml` — Sitemap for search engines.
- `src/additional-schema.txt` — Misc schema or notes (this file is present in `src/`).
- `src/data/` — Data folder for any JSON or site data.
- `LICENSE`, `README.md` — Project-level metadata and license.

---

Notes:
- Keep this file updated whenever files in `src/` are added, removed, or renamed.
- When changing styles or page structure, update the corresponding section above.

## Recent edits (site-wide accents)

	- Added `--accent-gradient` and `--accent-gradient-alt` to `:root` (use `var(--accent-gradient)` for primary gradients and `var(--accent-gradient-alt)` for lighter/variant gradients).
	- Updated global `.btn`, plan badges, CPU badges, nav indicators, comparison highlights, and bubble box accents to use the purple tokens so accents are site-wide and consistent.

## Recent copy updates


	"Start with a CPU (Eco or Premium), pick your game, then choose a plan—simple. Eco pricing begins at $0.50/GB and Premium at $2.00/GB. Reno, NV location with NVMe storage, DDR5 memory, and Papyrus.VIP DDoS protection."

	Social meta descriptions (`og:description` and `twitter:description`) were updated to match the site copy.

	- Removed the lead paragraph from `src/index.html` (the short instructional sentence that previously described the CPU/game/plan flow). It was removed at the user's request to avoid robotic or redundant messaging; meta descriptions were left updated but the on-page paragraph is gone.
	- Adjusted testimonial author styling: reduced `.testimonial-bubble .author` font size and tightened spacing so the author name appears smaller and less visually dominant.

	- UI: Added a "Pick a location" bubble above the location tabs on `src/plans.html` and added country flag icons to the location tab labels. Placeholder `.fi` spans were replaced with inline icons sourced from `assets/icons/us.svg` and `assets/icons/pl.svg`. The bubble now uses `.step-box` visual language. CSS added for `.pick-location` and `.location-tab img.loc-flag` sizing.

	- Updated: `Pick a location` header now uses the same step markup as other configurator steps: moved into a `.step` / `.step-header` wrapper and uses the shared `.step-box` styling. The dedicated `.pick-location` CSS rules were removed so the header matches `Choose CPU`, `Choose Game`, and `Pick a plan` exactly.

## 2025-09-26 — Comparison table edits

- Updated Apex Hosting column in `src/index.html` comparison table:
	- Pricing: set to "$3/GB" (matches provided pricing tier).
	- Memory Type: set to "DDR5 / DDR4".
	- CPU Type: set to "Intel Xeon? / Ryzen?" (as requested; question mark preserved where uncertain).
	- DDoS Protection: set to "300 Gbps".

All edits performed in `src/index.html`. If further corrections are needed for Apex or other providers, provide the new values and I'll update them and append the change to this file.

### 2025-09-26 — Visual & data tweaks

- Apex Hosting: styled the CPU cell red to match BisectHosting's emphasis (applied inline `style="color:rgba(255,100,100,1)"` to the Apex CPU `<td>` in `src/index.html`).
- Shockbyte: updated the DDoS Protection cell to `17 Tbps` in `src/index.html`.

### 2025-09-27 — Provider table adjustments

- WiseHosting (`prov-wisehosting` column) updates in `src/index.html`:
	- Pricing: set to `$3/GB`.
	- Memory Type: set to `DDR4`.
	- CPU Type: set to `3800X` (explicit, no red emphasis and no question mark).
	- DDoS Protection: left as `?` (unchanged other than context).

- WitherHosting (`prov-wither` column) tweaks:
	- DDoS Protection question mark cell was styled red for emphasis (inline style applied).

If you want these emphasis styles moved to a CSS class instead of inline styles, I can update `src/styles.css` and replace the inline styles across the table.

### 2025-09-27 — Testimonial quote overlay & position

- Updated `src/bubble-box.css` to refine testimonial styling:
	- Converted `.testimonial-bubble` to a centered flex container (align-items:center; justify-content:center;) so the quote text and author vertically and horizontally center.
	- Added `.testimonial-bubble::after` overlay to extend a translucent highlight to the left of the bubble (left:-40px; width:40px) so the decorative quote can overhang while the overlay visually fills the gap.
	- Nudged the decorative quote mark in `.testimonial-bubble::before` rightwards (`left: 4px`) so it visually overlaps the bubble edge while the overlay extends left to fit the box.
	- Fixed a stray `}` that previously caused a CSS parse error.

- Files changed:
	- `src/bubble-box.css` — testimonial flex layout, `::before` and `::after` adjustments.

Notes:
- This entry re-applies the last visual tweak to the testimonial quote and records the change; if you'd like the quote further nudged or the overlay widened/shortened, tell me the desired offset (e.g., `left: 8px` / `::after { left: -50px; width: 50px }`) and I'll update the CSS and append the changelog.

### 2025-09-27 — Premium button visual update

	- Uses a purple gradient (mid → dark), stronger outer glow, inset shadow for depth, and a small decorative radial highlight at the right edge.
	- Hover state increases lift and shadow for emphasis.


	- `src/styles.css` — added `.btn.premium` and hover/decoration rules.
	- `src/index.html` — added `premium` class to Premium anchors for Minecraft, Rust, ARK, and Terraria.

If you'd like an alternate variant (pill-shaped, outline, or with a price badge inside), tell me which direction and I'll implement it and append another changelog entry.

### 2025-09-27 — Eco button visual update

- Added a new `.btn.eco` modifier in `src/styles.css` to style Eco CTAs with a fresh green/teal gradient and subtle flair (radial highlight on the left, soft glow, inset sheen). Hover state adds slight lift and stronger glow.
- Marked Eco CTAs in `src/index.html` with the `eco` class on the four game cards (`<a class="btn buy btn-small eco" ...>`).
- Files changed:
  - `src/styles.css` — added `.btn.eco` rules.
  - `src/index.html` — added `eco` class to Eco anchors for Minecraft, Rust, ARK, and Terraria.

If you prefer a different color palette for Eco (teal → lime, or soft blue), tell me which palette and I'll implement it and log the change.

### 2025-09-27 — Index CTAs navigate to plans with selection

- Updated `src/index.html` game CTA links to use query parameters (`plans.html?game=<game>&tier=<eco|premium>`) so clicking Eco/Premium opens the Plans page preselected to the requested game and tier.
- Updated `src/plans.html` to read `window.location.search` on load and apply the `game` and `tier` params: it now sets the location (defaults to Reno), selects the requested game chip if available, and pre-selects the requested CPU tier (`eco`, `eco-eu`, or `premium`) before rendering plans.
- Files changed:
	- `src/index.html` — updated CTA hrefs to `?game=...&tier=...`.
	- `src/plans.html` — added param parsing logic to pre-select game and tier on load.

Notes:
- If you want the links to also switch location (e.g., open Warsaw variant), we can accept `loc=<reno|warsaw>` and apply it when present.

### 2025-09-27 — Compact CTA sizing & label tweak

- Reduced compact card CTA sizing in `src/compact-cards.css` so Eco/Premium buttons fit comfortably inside the compact game cells (smaller padding and reduced min-width). Adjusted `.btn-small` padding/ font-size for tighter layout.
- Shortened Premium labels in `src/index.html` from `Premium — $X/mo` to `Prm - $X/mo` and replaced em-dashes with hyphens for a more compact inline appearance.
- Nudged ARK and Terraria CTA rows down slightly so their button rows align visually with Minecraft/Rust (added targeted margin-top tweak for `#ark-hosting` and `#terraria-hosting`).

Files changed:
 - `src/compact-cards.css` — reduced min-width/padding, added alignment tweaks for ARK/Terraria.
 - `src/index.html` — shortened Premium labels and normalized hyphen usage in CTA text.

### 2025-09-27 — Small spacer added for ARK & Terraria

- Added a small (8px) invisible spacer div after the ARK and Terraria game titles in `src/index.html` so the CTA rows align vertically with Minecraft and Rust. This is a minimal visual fix to make button rows line up in the compact grid.

File changed:
 - `src/index.html` — added small spacer divs inside `#ark-hosting` and `#terraria-hosting`.

### 2025-09-27 — Use flex layout to align compact card footers; remove inline spacers

- Updated `src/compact-cards.css` to make `.game-block.compact` use `justify-content: space-between` so the header and footer fill the card vertically and CTA rows align flush to the bottom.
- Removed the inline 8px spacer divs from `#ark-hosting` and `#terraria-hosting` in `src/index.html` in favor of the flexbox-based alignment.

Files changed:
 - `src/compact-cards.css` — added `justify-content: space-between` and removed per-game margin nudges.
 - `src/index.html` — removed previously added spacer divs inside `#ark-hosting` and `#terraria-hosting`.

### 2025-09-27 — Mobile responsive fixes

- Improved the mobile experience with responsive CSS updates:
	- `src/styles.css` — Added mobile media queries (max-width:700px) to:
		- Show the hamburger (.hamburger) and provide a vertical collapsible `.nav-center` when `.nav-open` is set.
		- Remove heavy animated background layers (.aurora-container, .diagonal-lines, .glow-spheres, .noise-pattern) on small screens for better battery/CPU usage.
		- Increase hero CTA tap targets and slightly reduce base font on small screens for balance.
	- `src/compact-cards.css` — Added mobile rules to stack `.game-grid` into one column, make CTA buttons full-width, and increase tap target padding/font-size for easier mobile interaction.

	### 2025-09-27 — Mobile plans, navbar restore, and centered CTAs

	- Force single-column plan listings on small screens so users see one plan per row (no side-by-side two-column layout) across the site and inside the configurator (`.plans-list`, `.plan-configurator .plans-list`, `.plans .plans-grid`). This improves discoverability when many plan cards are present.
	- Restored the navbar links on mobile (disabled the hamburger), returning the original nav-center layout so the navigation is directly accessible on small devices.
	- Centered the stacked Eco/Prm CTA buttons on the homepage in mobile mode so they align centrally rather than left-stacked when the price buttons become full-width.

	Files changed:
	 - `src/styles.css` — mobile grid overrides for plans and navbar behaviour.
	 - `src/compact-cards.css` — centered stacked CTAs and tap-target sizing.

These changes focus on readability, touch targets, and performance for mobile users. If you'd like me to also make the nav open/close behavior controlled purely by CSS (checkbox hack) or wire a small JS toggle for `.nav-open`, I can implement that next and log it.


