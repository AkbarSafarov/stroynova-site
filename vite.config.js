import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import nunjucks from 'vite-plugin-nunjucks';
import nunjucksLib from 'nunjucks';

const templatesDir = path.resolve(__dirname, 'src/templates');
const pagesDir = path.resolve(__dirname, 'src/pages');

/**
 * При изменении любого .njk или .html файла шаблонов — полная перезагрузка страницы.
 */
function nunjucksHmrPlugin() {
  return {
    name: 'nunjucks-hmr',
    apply: 'serve',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.njk')) {
        server.moduleGraph.invalidateAll();
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

/**
 * Добавляет WebP-источник в <picture> и оборачивает <img .jpg/.png> в <picture>.
 * Работает на основе уже сконвертированных файлов (npm run images).
 */
function webpPlugin() {
  const processHtml = (html) => {
    // Split by existing <picture> blocks to avoid double-processing
    const parts = html.split(/(<picture[\s\S]*?<\/picture>)/gi);

    return parts.map((part, i) => {
      const isPictureBlock = i % 2 !== 0;

      if (isPictureBlock) {
        // Already a <picture>: inject <source type="image/webp"> if not present
        if (/type="image\/webp"/i.test(part)) return part;
        const m = part.match(/src(?:set)?="([^"]+\.(?:jpg|jpeg|png))"/i);
        if (!m) return part;
        const webp = m[1].replace(/\.(jpg|jpeg|png)$/i, '.webp');
        return part.replace('<picture>', `<picture><source srcset="${webp}" type="image/webp">`);
      }

      // Outside <picture>: wrap standalone <img> with jpg/png src
      return part.replace(
        /<img(\s[^>]*?)src="([^"]+\.(?:jpg|jpeg|png))"([^>]*?)>/gi,
        (match, before, src, after) => {
          const webp = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          return `<picture><source srcset="${webp}" type="image/webp">${match}</picture>`;
        }
      );
    }).join('');
  };

  return {
    name: 'webp-picture',
    apply: 'build',
    transformIndexHtml: processHtml,
  };
}

/**
 * Убирает crossorigin, type="module" и modulepreload — для работы через file://.
 */
function removeCrossOriginPlugin() {
  return {
    name: 'remove-crossorigin',
    apply: 'build',
    transformIndexHtml(html) {
      return html
        .replace(/\s+crossorigin(?:="[^"]*")?/g, '')
        .replace(/\s+type="module"/g, '')
        .replace(/<link[^>]+rel="modulepreload"[^>]*>\s*/g, '');
    },
  };
}

/**
 * Заменяет import.meta в собранном JS — иначе скрипт без type="module" падает с SyntaxError.
 */
function fixImportMetaPlugin() {
  return {
    name: 'fix-import-meta',
    apply: 'build',
    renderChunk(code) {
      if (!code.includes('import.meta')) return null;
      return {
        code: code
          .replace(/\bimport\.meta\.url\b/g, 'location.href')
          .replace(/\bimport\.meta\b/g, '{}'),
        map: null,
      };
    },
  };
}

/**
 * Вставляет SVG-спрайт прямо в <body>, чтобы не делать fetch() на file://.
 */
function inlineSvgSpritePlugin() {
  const spritePath = path.resolve(__dirname, 'src/assets/svg/sprite.svg');
  return {
    name: 'inline-svg-sprite',
    apply: 'build',
    transformIndexHtml(html) {
      if (!fs.existsSync(spritePath)) return html;
      const sprite = fs.readFileSync(spritePath, 'utf8')
        .replace(/<\?xml[^?]*\?>\s*/i, '').trim();
      const inlined = `<div aria-hidden="true" data-svg-sprite style="position:absolute;width:0;height:0;overflow:hidden">\n${sprite}\n</div>`;
      return html.replace('<body>', `<body>\n${inlined}`);
    },
  };
}

export default defineConfig({
  root: pagesDir,
  base: './',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    nunjucksHmrPlugin(),
    nunjucks({
      templatesDir,
      nunjucksEnvironment: new nunjucksLib.Environment(
        new nunjucksLib.FileSystemLoader(templatesDir, { noCache: true }),
        { noCache: true }
      ),
    }),
    webpPlugin(),
    inlineSvgSpritePlugin(),
    fixImportMetaPlugin(),
    removeCrossOriginPlugin(),
  ],
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    modulePreload: false,
    chunkSizeWarningLimit: 700,
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      input: {
        index: path.resolve(pagesDir, 'index.html'),
        projects: path.resolve(pagesDir, 'projects/index.html'),
        catalog: path.resolve(pagesDir, 'catalog/index.html'),
        apartments: path.resolve(pagesDir, 'apartments/index.html'),
        storage: path.resolve(pagesDir, 'storage/index.html'),
        purchase: path.resolve(pagesDir, 'purchase/index.html'),
        promotion: path.resolve(pagesDir, 'promotion/index.html'),
        promotions: path.resolve(pagesDir, 'promotions/index.html'),
        faq: path.resolve(pagesDir, 'faq/index.html'),
        favorites: path.resolve(pagesDir, 'favorites/index.html'),
        documents: path.resolve(pagesDir, 'documents/index.html'),
        news: path.resolve(pagesDir, 'news/index.html'),
        'news-item': path.resolve(pagesDir, 'news-item/index.html'),
        '404': path.resolve(pagesDir, '404/index.html'),
        privacy: path.resolve(pagesDir, 'privacy/index.html'),
        about: path.resolve(pagesDir, 'about/index.html'),
        contacts: path.resolve(pagesDir, 'contacts/index.html'),
        'apt-detail': path.resolve(pagesDir, 'apt-detail/index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      allow: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'public')],
    },
  },
});
