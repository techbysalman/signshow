# Local image assets guide

## Populated image folders
- `public/assets/hero/hero-desktop.jpg` — first-page desktop/laptop hero image.
- `public/assets/hero/hero-mobile.jpg` — first-page mobile hero image.
- `public/assets/works/work-01.jpg` through `work-06.jpg` — individual portfolio images cropped from the supplied portfolio contact sheet. The page's ten-item carousel reuses these six available images.
- `public/assets/team/team-01.jpg` through `team-12.jpg` — individual portraits cropped from the supplied team contact sheet.
- `public/assets/branding/signshow-mark.png` — supplied favicon/brand mark.

## Responsive hero behavior
The homepage uses a `<picture>` element. Screens up to 767px load `hero-mobile.jpg`; larger screens load `hero-desktop.jpg`. Replace either file using the same filename to update that device layout.

## Client logos and full wordmark/tagline
The original client logo, wordmark, and tagline binaries were not present in the export. To prevent broken image links, editable text-based temporary PNGs are included at the expected paths. Replace these with the official brand artwork when available, keeping the same filenames.

## Run locally
From the project root:
1. `npm install`
2. `npm run dev`
3. Open the localhost URL printed by the terminal.

Images in `public/` are served from root paths such as `/assets/works/work-01.jpg`. Keep filenames and extensions unchanged when replacing images.
