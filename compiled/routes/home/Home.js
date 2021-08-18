'use strict';

var index = require('../../index-73048756.js');
var components_BlogTeaser = require('../../components/BlogTeaser.js');

/* src/routes/home/Home.svelte generated by Svelte v3.38.3 */

const css = {
	code: ".banner.svelte-1u3q7ys{padding:1rem 2rem;background:#eee;border-radius:2rem;margin-bottom:1rem}.entries.svelte-1u3q7ys{display:grid;grid-template-columns:1fr;margin:3rem 0}@media(min-width: 768px){.entries.svelte-1u3q7ys{display:grid;grid-template-columns:1fr 1fr 1fr;margin:3rem 0}.entries .entry{margin-right:1rem}}.entry{padding:1rem;border:1px solid #ddd;border-radius:1rem;margin-bottom:1rem;background:white}@media(min-width: 768px){}@media(min-width: 768px){}",
	map: "{\"version\":3,\"file\":\"Home.svelte\",\"sources\":[\"Home.svelte\"],\"sourcesContent\":[\"<script>\\n  import BlogTeaser from '../../components/BlogTeaser.svelte';\\n  export let data, helpers, settings;\\n\\n  // add permalinks to the hook list so we can link to the posts.\\n</script>\\n\\n<style>\\n  .banner {\\n    padding: 1rem 2rem;\\n    background: #eee;\\n    border-radius: 2rem;\\n    margin-bottom: 1rem;\\n  }\\n  .entries {\\n    display: grid;\\n    grid-template-columns: 1fr;\\n    margin: 3rem 0;\\n  }\\n\\n  @media (min-width: 768px) {\\n    .entries {\\n      display: grid;\\n      grid-template-columns: 1fr 1fr 1fr;\\n      margin: 3rem 0;\\n    }\\n    :global(.entries .entry) {\\n      margin-right: 1rem;\\n    }\\n  }\\n\\n  :global(.entry) {\\n    padding: 1rem;\\n    border: 1px solid #ddd;\\n    border-radius: 1rem;\\n    margin-bottom: 1rem;\\n    background: white;\\n  }\\n  .about {\\n    margin-bottom: 2rem;\\n  }\\n\\n  @media (min-width: 768px) {\\n    .hydrate {\\n      display: grid;\\n      grid-template-columns: 80% 20%;\\n    }\\n  }\\n\\n  .hooks {\\n    display: grid;\\n    grid-template-columns: 100%;\\n  }\\n\\n  @media (min-width: 768px) {\\n    .hooks {\\n      grid-template-columns: 50% 50%;\\n    }\\n  }\\n</style>\\n\\n<svelte:head>\\n  <title>Don't Get It Twisted: Ahmed Al-Hulaibi</title>\\n  <meta name=\\\"description\\\" content=\\\"Ahmed Al-Hulaibi's Personal Blog!\\\" />\\n  <link href=\\\"{settings.origin}/\\\" rel=\\\"canonical\\\" />\\n</svelte:head>\\n\\n<div class=\\\"banner\\\">\\n  <h1>Welcome to my personal blog, \\\"Don't Get It Twisted.\\\"</h1>\\n\\n  <p>I'm Ahmed Al-Hulaibi, a web developer working primarily in Go.</p>\\n\\n  <p>\\n    I am just a regular guy, but when you put a keyboard in my hands I become a regular guy with a keyboard.\\n  </p>\\n\\n  <p>\\n    On this blog, I write about what I am working on, what I am learning and how I work.\\n    Please reach out to me when you have feedback, comments, or questions. You can find me on Twitter: <a href=\\\"https://twitter.com/ahmedhulaibi\\\">@ahmedhulaibi</a>\\n  </p>\\n</div>\\n\\n<div class=\\\"blog\\\">\\n  <div class=\\\"entries\\\">\\n    {#each data.markdown.blog as blog}\\n      <BlogTeaser {blog} {helpers} />\\n    {/each}\\n  </div>\\n</div>\"],\"names\":[],\"mappings\":\"AAQE,OAAO,eAAC,CAAC,AACP,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,aAAa,CAAE,IAAI,AACrB,CAAC,AACD,QAAQ,eAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,MAAM,CAAE,IAAI,CAAC,CAAC,AAChB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,QAAQ,eAAC,CAAC,AACR,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,GAAG,CAAC,GAAG,CAClC,MAAM,CAAE,IAAI,CAAC,CAAC,AAChB,CAAC,AACO,eAAe,AAAE,CAAC,AACxB,YAAY,CAAE,IAAI,AACpB,CAAC,AACH,CAAC,AAEO,MAAM,AAAE,CAAC,AACf,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,aAAa,CAAE,IAAI,CACnB,aAAa,CAAE,IAAI,CACnB,UAAU,CAAE,KAAK,AACnB,CAAC,AAKD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAK3B,CAAC,AAOD,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAI3B,CAAC\"}"
};

const Home = index.create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { data } = $$props, { helpers } = $$props, { settings } = $$props;
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.helpers === void 0 && $$bindings.helpers && helpers !== void 0) $$bindings.helpers(helpers);
	if ($$props.settings === void 0 && $$bindings.settings && settings !== void 0) $$bindings.settings(settings);
	$$result.css.add(css);

	return `${($$result.head += `${($$result.title = `<title>Don&#39;t Get It Twisted: Ahmed Al-Hulaibi</title>`, "")}<meta name="${"description"}" content="${"Ahmed Al-Hulaibi's Personal Blog!"}" data-svelte="svelte-i6b39i"><link href="${index.escape(settings.origin) + "/"}" rel="${"canonical"}" data-svelte="svelte-i6b39i">`, "")}

<div class="${"banner svelte-1u3q7ys"}"><h1>Welcome to my personal blog, &quot;Don&#39;t Get It Twisted.&quot;</h1>

  <p>I&#39;m Ahmed Al-Hulaibi, a web developer working primarily in Go.</p>

  <p>I am just a regular guy, but when you put a keyboard in my hands I become a regular guy with a keyboard.
  </p>

  <p>On this blog, I write about what I am working on, what I am learning and how I work.
    Please reach out to me when you have feedback, comments, or questions. You can find me on Twitter: <a href="${"https://twitter.com/ahmedhulaibi"}">@ahmedhulaibi</a></p></div>

<div class="${"blog"}"><div class="${"entries svelte-1u3q7ys"}">${index.each(data.markdown.blog, blog => `${index.validate_component(components_BlogTeaser, "BlogTeaser").$$render($$result, { blog, helpers }, {}, {})}`)}</div></div>`;
});

module.exports = Home;
module.exports._css = ".banner.svelte-1u3q7ys{padding:1rem 2rem;background:#eee;border-radius:2rem;margin-bottom:1rem}.entries.svelte-1u3q7ys{display:grid;grid-template-columns:1fr;margin:3rem 0}@media(min-width: 768px){.entries.svelte-1u3q7ys{display:grid;grid-template-columns:1fr 1fr 1fr;margin:3rem 0}.entries .entry{margin-right:1rem}}.entry{padding:1rem;border:1px solid #ddd;border-radius:1rem;margin-bottom:1rem;background:white}@media(min-width: 768px){}@media(min-width: 768px){}";
module.exports._cssMap = "\u002F*# sourceMappingURL=data:application\u002Fjson;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXMvaG9tZS9Ib21lLnN2ZWx0ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRUyx1QkFBRSxRQUNFLEtBQUssS0FDZCxXQUFZLEtBQ1osY0FBZSxLQUNmLGNBQWUsS0FFVCx3QkFBRSxRQUNDLEtBQ1Qsc0JBQXVCLElBQ3ZCLE9BQVEsS0FBSyxFQUdTLHlCQUNkLHdCQUFFLFFBQ0MsS0FDVCxzQkFBdUIsSUFBSSxJQUFJLElBQy9CLE9BQVEsS0FBSyxFQUNkLGdCQUN5QixhQUNWLE1BRWpCLE9BRWdCLFFBQ04sS0FDVCxPQUFRLElBQUksTUFBTSxLQUNsQixjQUFlLEtBQ2YsY0FBZSxLQUNmLFdBQVksTUFNVSwwQkFZQSIsInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCBCbG9nVGVhc2VyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQmxvZ1RlYXNlci5zdmVsdGUnO1xuICBleHBvcnQgbGV0IGRhdGEsIGhlbHBlcnMsIHNldHRpbmdzO1xuXG4gIC8vIGFkZCBwZXJtYWxpbmtzIHRvIHRoZSBob29rIGxpc3Qgc28gd2UgY2FuIGxpbmsgdG8gdGhlIHBvc3RzLlxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLmJhbm5lciB7XG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xuICAgIGJhY2tncm91bmQ6ICNlZWU7XG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB9XG4gIC5lbnRyaWVzIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIG1hcmdpbjogM3JlbSAwO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmVudHJpZXMge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XG4gICAgICBtYXJnaW46IDNyZW0gMDtcbiAgICB9XG4gICAgOmdsb2JhbCguZW50cmllcyAuZW50cnkpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgICB9XG4gIH1cblxuICA6Z2xvYmFsKC5lbnRyeSkge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cbiAgLmFib3V0IHtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmh5ZHJhdGUge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogODAlIDIwJTtcbiAgICB9XG4gIH1cblxuICAuaG9va3Mge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMDAlO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmhvb2tzIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTAlIDUwJTtcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPkRvbid0IEdldCBJdCBUd2lzdGVkOiBBaG1lZCBBbC1IdWxhaWJpPC90aXRsZT5cbiAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkFobWVkIEFsLUh1bGFpYmkncyBQZXJzb25hbCBCbG9nIVwiIC8+XG4gIDxsaW5rIGhyZWY9XCJ7c2V0dGluZ3Mub3JpZ2lufS9cIiByZWw9XCJjYW5vbmljYWxcIiAvPlxuPC9zdmVsdGU6aGVhZD5cblxuPGRpdiBjbGFzcz1cImJhbm5lclwiPlxuICA8aDE+V2VsY29tZSB0byBteSBwZXJzb25hbCBibG9nLCBcIkRvbid0IEdldCBJdCBUd2lzdGVkLlwiPC9oMT5cblxuICA8cD5JJ20gQWhtZWQgQWwtSHVsYWliaSwgYSB3ZWIgZGV2ZWxvcGVyIHdvcmtpbmcgcHJpbWFyaWx5IGluIEdvLjwvcD5cblxuICA8cD5cbiAgICBJIGFtIGp1c3QgYSByZWd1bGFyIGd1eSwgYnV0IHdoZW4geW91IHB1dCBhIGtleWJvYXJkIGluIG15IGhhbmRzIEkgYmVjb21lIGEgcmVndWxhciBndXkgd2l0aCBhIGtleWJvYXJkLlxuICA8L3A+XG5cbiAgPHA+XG4gICAgT24gdGhpcyBibG9nLCBJIHdyaXRlIGFib3V0IHdoYXQgSSBhbSB3b3JraW5nIG9uLCB3aGF0IEkgYW0gbGVhcm5pbmcgYW5kIGhvdyBJIHdvcmsuXG4gICAgUGxlYXNlIHJlYWNoIG91dCB0byBtZSB3aGVuIHlvdSBoYXZlIGZlZWRiYWNrLCBjb21tZW50cywgb3IgcXVlc3Rpb25zLiBZb3UgY2FuIGZpbmQgbWUgb24gVHdpdHRlcjogPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vYWhtZWRodWxhaWJpXCI+QGFobWVkaHVsYWliaTwvYT5cbiAgPC9wPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJibG9nXCI+XG4gIDxkaXYgY2xhc3M9XCJlbnRyaWVzXCI+XG4gICAgeyNlYWNoIGRhdGEubWFya2Rvd24uYmxvZyBhcyBibG9nfVxuICAgICAgPEJsb2dUZWFzZXIge2Jsb2d9IHtoZWxwZXJzfSAvPlxuICAgIHsvZWFjaH1cbiAgPC9kaXY+XG48L2Rpdj4iXX0= *\u002F";
module.exports._cssIncluded = ["src/routes/home/Home.svelte","src/components/BlogTeaser.svelte"]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3JvdXRlcy9ob21lL0hvbWUuc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQ+XG4gIGltcG9ydCBCbG9nVGVhc2VyIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvQmxvZ1RlYXNlci5zdmVsdGUnO1xuICBleHBvcnQgbGV0IGRhdGEsIGhlbHBlcnMsIHNldHRpbmdzO1xuXG4gIC8vIGFkZCBwZXJtYWxpbmtzIHRvIHRoZSBob29rIGxpc3Qgc28gd2UgY2FuIGxpbmsgdG8gdGhlIHBvc3RzLlxuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLmJhbm5lciB7XG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xuICAgIGJhY2tncm91bmQ6ICNlZWU7XG4gICAgYm9yZGVyLXJhZGl1czogMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB9XG4gIC5lbnRyaWVzIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIG1hcmdpbjogM3JlbSAwO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmVudHJpZXMge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XG4gICAgICBtYXJnaW46IDNyZW0gMDtcbiAgICB9XG4gICAgOmdsb2JhbCguZW50cmllcyAuZW50cnkpIHtcbiAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcbiAgICB9XG4gIH1cblxuICA6Z2xvYmFsKC5lbnRyeSkge1xuICAgIHBhZGRpbmc6IDFyZW07XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkZDtcbiAgICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cbiAgLmFib3V0IHtcbiAgICBtYXJnaW4tYm90dG9tOiAycmVtO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmh5ZHJhdGUge1xuICAgICAgZGlzcGxheTogZ3JpZDtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogODAlIDIwJTtcbiAgICB9XG4gIH1cblxuICAuaG9va3Mge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxMDAlO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgLmhvb2tzIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogNTAlIDUwJTtcbiAgICB9XG4gIH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cbiAgPHRpdGxlPkRvbid0IEdldCBJdCBUd2lzdGVkOiBBaG1lZCBBbC1IdWxhaWJpPC90aXRsZT5cbiAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIkFobWVkIEFsLUh1bGFpYmkncyBQZXJzb25hbCBCbG9nIVwiIC8+XG4gIDxsaW5rIGhyZWY9XCJ7c2V0dGluZ3Mub3JpZ2lufS9cIiByZWw9XCJjYW5vbmljYWxcIiAvPlxuPC9zdmVsdGU6aGVhZD5cblxuPGRpdiBjbGFzcz1cImJhbm5lclwiPlxuICA8aDE+V2VsY29tZSB0byBteSBwZXJzb25hbCBibG9nLCBcIkRvbid0IEdldCBJdCBUd2lzdGVkLlwiPC9oMT5cblxuICA8cD5JJ20gQWhtZWQgQWwtSHVsYWliaSwgYSB3ZWIgZGV2ZWxvcGVyIHdvcmtpbmcgcHJpbWFyaWx5IGluIEdvLjwvcD5cblxuICA8cD5cbiAgICBJIGFtIGp1c3QgYSByZWd1bGFyIGd1eSwgYnV0IHdoZW4geW91IHB1dCBhIGtleWJvYXJkIGluIG15IGhhbmRzIEkgYmVjb21lIGEgcmVndWxhciBndXkgd2l0aCBhIGtleWJvYXJkLlxuICA8L3A+XG5cbiAgPHA+XG4gICAgT24gdGhpcyBibG9nLCBJIHdyaXRlIGFib3V0IHdoYXQgSSBhbSB3b3JraW5nIG9uLCB3aGF0IEkgYW0gbGVhcm5pbmcgYW5kIGhvdyBJIHdvcmsuXG4gICAgUGxlYXNlIHJlYWNoIG91dCB0byBtZSB3aGVuIHlvdSBoYXZlIGZlZWRiYWNrLCBjb21tZW50cywgb3IgcXVlc3Rpb25zLiBZb3UgY2FuIGZpbmQgbWUgb24gVHdpdHRlcjogPGEgaHJlZj1cImh0dHBzOi8vdHdpdHRlci5jb20vYWhtZWRodWxhaWJpXCI+QGFobWVkaHVsYWliaTwvYT5cbiAgPC9wPlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJibG9nXCI+XG4gIDxkaXYgY2xhc3M9XCJlbnRyaWVzXCI+XG4gICAgeyNlYWNoIGRhdGEubWFya2Rvd24uYmxvZyBhcyBibG9nfVxuICAgICAgPEJsb2dUZWFzZXIge2Jsb2d9IHtoZWxwZXJzfSAvPlxuICAgIHsvZWFjaH1cbiAgPC9kaXY+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztPQUVhLElBQUksZ0JBQUUsT0FBTyxnQkFBRSxRQUFROzs7Ozs7eVBBOERyQixRQUFRLENBQUMsTUFBTTs7Ozs7Ozs7Ozs7OzZFQW9CbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJOzs7OzsifQ==