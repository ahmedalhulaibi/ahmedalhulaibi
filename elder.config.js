require('dotenv').config();
module.exports = {
  origin: 'https://ahmedalhulaibi.com', // TODO: update this. The URL of your site's root, without a trailing slash
  lang: 'en',
  srcDir: 'src',
  distDir: 'public',
  rootDir: process.cwd(),
  build: {},
  prefix: '', // If you want your site to be built within a sub folder within your `distDir` you can use this.
  server: {},
  props: {
    hydration: 'hybrid',
    compress: false,
  },
  debug: {
    stacks: false, // output details of the stack consolidation process.
    hooks: false, // outputs the details of each hook as they are run.
    performance: false, // outputs a full performance report of how long it took to run each page.
    build: false, // gives additional details about the build process.
    automagic: false,
  },
  hooks: {
    // disable: ['elderWriteHtmlFileToPublic'], // this is used to disable internal hooks. Uncomment this hook to disabled writing your files during build.
  },
  plugins: {
    '@elderjs/plugin-markdown': {
      routes: ['blog', 'guide'],
      useSyntaxHighlighting: {
      theme: 'nord' // available themes: https://github.com/shikijs/shiki/blob/main/docs/themes.md - try dark-plus or github-light
      // theme is the only option available - for now.
    },
    },
    '@elderjs/plugin-browser-reload': {
      // this reloads your browser when nodemon restarts your server.
      port: 8080,
      reload: false, // if you are having issues with reloading not working, change to true.
    },
    '@elderjs/plugin-seo-check': {
      display: ['errors', 'warnings'], // If the errors are too verbose remove 'warnings'
      //writeLocation: './report.json', // if you want to write a report of errors
    },
  },
  shortcodes: { closePattern: '}}', openPattern: '{{' },
};
