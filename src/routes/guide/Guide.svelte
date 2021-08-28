<script>
  export let data, request, settings; // data is mainly being populated from the @elderjs/plugin-markdown
  const { html, frontmatter } = data;
</script>

<style>
  h1 {
    margin-bottom: 10px;
  }

  .title {
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ddd;
  }

  :global(h2) {
    margin-top: 2rem;
  }

  :global(pre) {
    padding: 1rem;
    border-radius: 1rem;
    overflow-x: auto;
  }

  :global(blockquote) {
    margin: 0;
    background: #2e3440ff;
    padding: 3px 1.5rem 3px 3rem;
    position: relative;
    border-radius: 1rem;
  }
  :global(blockquote:after) {
    content: '>';
    color: #aaa;
    font-size: 30px;
    position: absolute;
    top: 33%;
    left: 1rem;
  }
  :global(blockquote h3) {
    padding: 0;
    color: #dad7d7;
  }

  :global(blockquote p) {
    padding: 0;
    color: #dad7d7;
  }
  :global(blockquote p code) {
    padding: 0;
    background-color: #eeeeee2e;
  }
  :global(blockquote p a) {
    color: #ceddff;
  }

  :global(blockquote p a:visited) {
    color: rgb(213, 122, 255);
  }
</style>

<svelte:head>
  <title>{frontmatter.title}</title>
  <meta name="description" content={frontmatter.excerpt} />
  <link href="{settings.origin}{request.permalink}" rel="canonical" />
</svelte:head>
<a href="/">&LeftArrow; Home</a>

<div class="title">
  <h1>{frontmatter.title}</h1>
  {#if frontmatter.author}<small>By {frontmatter.author}</small>{/if}
</div>

{#if frontmatter.status === 'draft'}
  <h1>working on it...</h1>
{:else if html}
  {@html html}
{:else}
  <h1>Oops!! Markdown not found!</h1>
{/if}
