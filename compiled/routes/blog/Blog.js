'use strict';

var index = require('../../index-73048756.js');

/* src/routes/blog/Blog.svelte generated by Svelte v3.38.3 */

const css = {
	code: "h1.svelte-1sp2bm8{margin-bottom:10px}.title.svelte-1sp2bm8{margin-top:1rem;margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid #ddd}h2{margin-top:2rem}pre{background:#eee;padding:1rem;border-radius:1rem}blockquote{margin:0;background:#ddd;padding:3px 1.5rem 3px 3rem;position:relative;border-radius:1rem}blockquote:after{content:'>';color:#aaa;font-size:30px;position:absolute;top:33%;left:1rem}blockquote p{padding:0}",
	map: "{\"version\":3,\"file\":\"Blog.svelte\",\"sources\":[\"Blog.svelte\"],\"sourcesContent\":[\"<script>\\n  export let data, request, settings; // data is mainly being populated from the @elderjs/plugin-markdown\\n  const { html, frontmatter } = data;\\n</script>\\n\\n<style>\\n  h1 {\\n    margin-bottom: 10px;\\n  }\\n\\n  .title {\\n    margin-top: 1rem;\\n    margin-bottom: 1rem;\\n    padding-bottom: 1rem;\\n    border-bottom: 1px solid #ddd;\\n  }\\n\\n  :global(h2) {\\n    margin-top: 2rem;\\n  }\\n\\n  :global(pre) {\\n    background: #eee;\\n    padding: 1rem;\\n    border-radius: 1rem;\\n  }\\n\\n  :global(blockquote) {\\n    margin: 0;\\n    background: #ddd;\\n    padding: 3px 1.5rem 3px 3rem;\\n    position: relative;\\n    border-radius: 1rem;\\n  }\\n  :global(blockquote:after) {\\n    content: '>';\\n    color: #aaa;\\n    font-size: 30px;\\n    position: absolute;\\n    top: 33%;\\n    left: 1rem;\\n  }\\n\\n  :global(blockquote p) {\\n    padding: 0;\\n  }\\n</style>\\n\\n<svelte:head>\\n  <title>{frontmatter.title}</title>\\n  <meta name=\\\"description\\\" content={frontmatter.excerpt} />\\n  <link href=\\\"{settings.origin}{request.permalink}\\\" rel=\\\"canonical\\\" />\\n</svelte:head>\\n<a href=\\\"/\\\">&LeftArrow; Home</a>\\n\\n<div class=\\\"title\\\">\\n  <h1>{frontmatter.title}</h1>\\n  {#if frontmatter.author}<small>By {frontmatter.author}</small>{/if}\\n</div>\\n\\n{#if html}\\n  {@html html}\\n{:else}\\n  <h1>Oops!! Markdown not found!</h1>\\n{/if}\\n\"],\"names\":[],\"mappings\":\"AAME,EAAE,eAAC,CAAC,AACF,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,cAAc,CAAE,IAAI,CACpB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,AAC/B,CAAC,AAEO,EAAE,AAAE,CAAC,AACX,UAAU,CAAE,IAAI,AAClB,CAAC,AAEO,GAAG,AAAE,CAAC,AACZ,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,AACrB,CAAC,AAEO,UAAU,AAAE,CAAC,AACnB,MAAM,CAAE,CAAC,CACT,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CAAC,MAAM,CAAC,GAAG,CAAC,IAAI,CAC5B,QAAQ,CAAE,QAAQ,CAClB,aAAa,CAAE,IAAI,AACrB,CAAC,AACO,gBAAgB,AAAE,CAAC,AACzB,OAAO,CAAE,GAAG,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,IAAI,AACZ,CAAC,AAEO,YAAY,AAAE,CAAC,AACrB,OAAO,CAAE,CAAC,AACZ,CAAC\"}"
};

const Blog = index.create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props, { request } = $$props, { settings } = $$props; // data is mainly being populated from the @elderjs/plugin-markdown
	const { html, frontmatter } = data;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.request === void 0 && $$bindings.request && request !== void 0) $$bindings.request(request);
	if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0) $$bindings.settings(settings);
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>${index.escape(frontmatter.title)}</title>`, "")}<meta name="${"description"}"${index.add_attribute("content", frontmatter.excerpt, 0)} data-svelte="svelte-1dene28"><link href="${index.escape(settings.origin) + index.escape(request.permalink)}" rel="${"canonical"}" data-svelte="svelte-1dene28">`, "")}
<a href="${"/"}">← Home</a>

<div class="${"title svelte-1sp2bm8"}"><h1 class="${"svelte-1sp2bm8"}">${index.escape(frontmatter.title)}</h1>
  ${frontmatter.author
	? `<small>By ${index.escape(frontmatter.author)}</small>`
	: ``}</div>

${html
	? `<!-- HTML_TAG_START -->${html}<!-- HTML_TAG_END -->`
	: `<h1 class="${"svelte-1sp2bm8"}">Oops!! Markdown not found!</h1>`}`;
});

module.exports = Blog;
module.exports._css = "h1.svelte-1sp2bm8{margin-bottom:10px}.title.svelte-1sp2bm8{margin-top:1rem;margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid #ddd}h2{margin-top:2rem}pre{background:#eee;padding:1rem;border-radius:1rem}blockquote{margin:0;background:#ddd;padding:3px 1.5rem 3px 3rem;position:relative;border-radius:1rem}blockquote:after{content:'\u003E';color:#aaa;font-size:30px;position:absolute;top:33%;left:1rem}blockquote p{padding:0}";
module.exports._cssMap = "\u002F*# sourceMappingURL=data:application\u002Fjson;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMvYmxvZy9CbG9nLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNSSxrQkFBRSxjQUNhLEtBR1gsc0JBQUUsV0FDTSxLQUNaLGNBQWUsS0FDZixlQUFnQixLQUNoQixjQUFlLElBQUksTUFBTSxLQUMxQixHQUVZLFdBQ0MsS0FDYixJQUVhLFdBQ0EsS0FDWixRQUFTLEtBQ1QsY0FBZSxLQUNoQixXQUVvQixPQUNYLEVBQ1IsV0FBWSxLQUNaLFFBQVMsSUFBSSxPQUFPLElBQUksS0FDeEIsU0FBVSxTQUNWLGNBQWUsS0FDaEIsaUJBQzBCLFFBQ2hCLElBQ1QsTUFBTyxLQUNQLFVBQVcsS0FDWCxTQUFVLFNBQ1YsSUFBSyxJQUNMLEtBQU0sS0FDUCxhQUVzQixRQUNaIiwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgZXhwb3J0IGxldCBkYXRhLCByZXF1ZXN0LCBzZXR0aW5nczsgLy8gZGF0YSBpcyBtYWlubHkgYmVpbmcgcG9wdWxhdGVkIGZyb20gdGhlIEBlbGRlcmpzL3BsdWdpbi1tYXJrZG93blxuICBjb25zdCB7IGh0bWwsIGZyb250bWF0dGVyIH0gPSBkYXRhO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgaDEge1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIH1cblxuICAudGl0bGUge1xuICAgIG1hcmdpbi10b3A6IDFyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2RkZDtcbiAgfVxuXG4gIDpnbG9iYWwoaDIpIHtcbiAgICBtYXJnaW4tdG9wOiAycmVtO1xuICB9XG5cbiAgOmdsb2JhbChwcmUpIHtcbiAgICBiYWNrZ3JvdW5kOiAjZWVlO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgfVxuXG4gIDpnbG9iYWwoYmxvY2txdW90ZSkge1xuICAgIG1hcmdpbjogMDtcbiAgICBiYWNrZ3JvdW5kOiAjZGRkO1xuICAgIHBhZGRpbmc6IDNweCAxLjVyZW0gM3B4IDNyZW07XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIH1cbiAgOmdsb2JhbChibG9ja3F1b3RlOmFmdGVyKSB7XG4gICAgY29udGVudDogJz4nO1xuICAgIGNvbG9yOiAjYWFhO1xuICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAzMyU7XG4gICAgbGVmdDogMXJlbTtcbiAgfVxuXG4gIDpnbG9iYWwoYmxvY2txdW90ZSBwKSB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuPC9zdHlsZT5cblxuPHN2ZWx0ZTpoZWFkPlxuICA8dGl0bGU+e2Zyb250bWF0dGVyLnRpdGxlfTwvdGl0bGU+XG4gIDxtZXRhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGNvbnRlbnQ9e2Zyb250bWF0dGVyLmV4Y2VycHR9IC8+XG4gIDxsaW5rIGhyZWY9XCJ7c2V0dGluZ3Mub3JpZ2lufXtyZXF1ZXN0LnBlcm1hbGlua31cIiByZWw9XCJjYW5vbmljYWxcIiAvPlxuPC9zdmVsdGU6aGVhZD5cbjxhIGhyZWY9XCIvXCI+JkxlZnRBcnJvdzsgSG9tZTwvYT5cblxuPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gIDxoMT57ZnJvbnRtYXR0ZXIudGl0bGV9PC9oMT5cbiAgeyNpZiBmcm9udG1hdHRlci5hdXRob3J9PHNtYWxsPkJ5IHtmcm9udG1hdHRlci5hdXRob3J9PC9zbWFsbD57L2lmfVxuPC9kaXY+XG5cbnsjaWYgaHRtbH1cbiAge0BodG1sIGh0bWx9XG57OmVsc2V9XG4gIDxoMT5Pb3BzISEgTWFya2Rvd24gbm90IGZvdW5kITwvaDE+XG57L2lmfVxuIl19 *\u002F";
module.exports._cssIncluded = ["src/routes/blog/Blog.svelte"]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmxvZy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JvdXRlcy9ibG9nL0Jsb2cuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGV4cG9ydCBsZXQgZGF0YSwgcmVxdWVzdCwgc2V0dGluZ3M7IC8vIGRhdGEgaXMgbWFpbmx5IGJlaW5nIHBvcHVsYXRlZCBmcm9tIHRoZSBAZWxkZXJqcy9wbHVnaW4tbWFya2Rvd25cbiAgY29uc3QgeyBodG1sLCBmcm9udG1hdHRlciB9ID0gZGF0YTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG4gIGgxIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG5cbiAgLnRpdGxlIHtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgcGFkZGluZy1ib3R0b206IDFyZW07XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZGQ7XG4gIH1cblxuICA6Z2xvYmFsKGgyKSB7XG4gICAgbWFyZ2luLXRvcDogMnJlbTtcbiAgfVxuXG4gIDpnbG9iYWwocHJlKSB7XG4gICAgYmFja2dyb3VuZDogI2VlZTtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIGJvcmRlci1yYWRpdXM6IDFyZW07XG4gIH1cblxuICA6Z2xvYmFsKGJsb2NrcXVvdGUpIHtcbiAgICBtYXJnaW46IDA7XG4gICAgYmFja2dyb3VuZDogI2RkZDtcbiAgICBwYWRkaW5nOiAzcHggMS41cmVtIDNweCAzcmVtO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICB9XG4gIDpnbG9iYWwoYmxvY2txdW90ZTphZnRlcikge1xuICAgIGNvbnRlbnQ6ICc+JztcbiAgICBjb2xvcjogI2FhYTtcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMzMlO1xuICAgIGxlZnQ6IDFyZW07XG4gIH1cblxuICA6Z2xvYmFsKGJsb2NrcXVvdGUgcCkge1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPntmcm9udG1hdHRlci50aXRsZX08L3RpdGxlPlxuICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PXtmcm9udG1hdHRlci5leGNlcnB0fSAvPlxuICA8bGluayBocmVmPVwie3NldHRpbmdzLm9yaWdpbn17cmVxdWVzdC5wZXJtYWxpbmt9XCIgcmVsPVwiY2Fub25pY2FsXCIgLz5cbjwvc3ZlbHRlOmhlYWQ+XG48YSBocmVmPVwiL1wiPiZMZWZ0QXJyb3c7IEhvbWU8L2E+XG5cbjxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICA8aDE+e2Zyb250bWF0dGVyLnRpdGxlfTwvaDE+XG4gIHsjaWYgZnJvbnRtYXR0ZXIuYXV0aG9yfTxzbWFsbD5CeSB7ZnJvbnRtYXR0ZXIuYXV0aG9yfTwvc21hbGw+ey9pZn1cbjwvZGl2PlxuXG57I2lmIGh0bWx9XG4gIHtAaHRtbCBodG1sfVxuezplbHNlfVxuICA8aDE+T29wcyEhIE1hcmtkb3duIG5vdCBmb3VuZCE8L2gxPlxuey9pZn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7T0FDYSxJQUFJLGdCQUFFLE9BQU8sZ0JBQUUsUUFBUTtTQUMxQixJQUFJLEVBQUUsV0FBVyxLQUFLLElBQUk7Ozs7Ozt5RUErQzFCLFdBQVcsQ0FBQyxLQUFLLCtFQUNTLFdBQVcsQ0FBQyxPQUFPLDhEQUN4QyxRQUFRLENBQUMsTUFBTSxpQkFBRSxPQUFPLENBQUMsU0FBUzs7O3NGQUsxQyxXQUFXLENBQUMsS0FBSztJQUNqQixXQUFXLENBQUMsTUFBTTs2QkFBWSxXQUFXLENBQUMsTUFBTTs7O0VBR2xELElBQUk7NkJBQ0EsSUFBSTs7Ozs7OyJ9
