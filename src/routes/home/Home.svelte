<script>
  import BlogTeaser from '../../components/BlogTeaser.svelte';
  import GuideTeaser from '../../components/GuideTeaser.svelte';
  export let data, helpers, settings;
</script>

<style>
  .banner {
    padding: 1rem 2rem;
    background: #eee;
    border-radius: 2rem;
    margin-bottom: 1rem;
  }
  .entries {
    display: grid;
    grid-template-columns: 1fr;
    margin: 3rem 0;
  }

  @media (min-width: 768px) {
    .entries {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      margin: 3rem 0;
    }
    :global(.entries .entry) {
      margin-right: 1rem;
    }
  }
  :global(.entry) {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 1rem;
    margin-bottom: 1rem;
    background: #2e3440ff;
  }

  :global(div.entry>a) {
    color: #ceddff;
  }

  :global(div.entry>a:visited) {
    color: rgb(213, 122, 255);
  }

  :global(div.entry>p) {
    color: #fff;
  }

  :global(div.entries>.entry>p.date) {
    font-size: small;
    color: lightslategrey;
  }


  @media (min-width: 768px) {
    .hydrate {
      display: grid;
      grid-template-columns: 80% 20%;
    }
  }

</style>

<svelte:head>
  <title>Hulaibi's Blog</title>
  <meta name="description" content="Ahmed Al-Hulaibi's Personal Blog!" />
  <link href="{settings.origin}/" rel="canonical" />
</svelte:head>

<div class="banner">
  <h1>Hulaibi's Blog</h1>

  <p>Welcome to my personal blog, I'm Ahmed Al-Hulaibi, a web developer working primarily in Go.</p>

  <p>
    I am just a regular guy, but when you put a keyboard in my hands I become a regular guy with a keyboard.
  </p>

  <p>
    On this blog, I write about what I am working on, what I am learning and how I work.
    Please reach out to me when you have feedback, comments, or questions. You can find me on Twitter: <a href="https://twitter.com/ahmedhulaibi">@ahmedhulaibi</a>
  </p>
</div>

<h2>My Posts</h2>
<p>One-off articles</p>
<div class="blog">
  <div class="entries">
    {#each data.markdown.blog as blog}
      <BlogTeaser blog={blog} helpers={helpers} />
    {/each}
  </div>
</div>

<h2>My Guides</h2>
<p>These posts evolve over time</p>
<div class="blog">
  <div class="entries">
    {#each data.markdown.guide as guide}
      <GuideTeaser guide={guide} helpers={helpers} />
    {/each}
  </div>
</div>