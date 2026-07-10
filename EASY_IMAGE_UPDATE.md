# Easy image update

Run in VS Code:

```bash
npm install
npm run dev
```

Replace images only in these folders and keep the same file names:

- `src/assets/logo/signshow-logo-black.png`
- `src/assets/logo/logo-3d.png`
- `src/assets/hero/hero-banner.jpg`
- `src/assets/carousel/carousel-1.jpg` to `carousel-10.jpg`
- `src/assets/work/work-1.jpg` to `work-6.jpg`

To change titles or years, edit `src/config/images.ts`.

Important: keep the exact extension and file name, then restart `npm run dev` if the browser does not refresh.
