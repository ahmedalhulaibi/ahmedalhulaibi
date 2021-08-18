<script>
  import BlogTeaser from '../../components/BlogTeaser.svelte';
  export let data, helpers, settings;

  // add permalinks to the hook list so we can link to the posts.
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
    background: white;
  }
  .about {
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .hydrate {
      display: grid;
      grid-template-columns: 80% 20%;
    }
  }

  .hooks {
    display: grid;
    grid-template-columns: 100%;
  }

  @media (min-width: 768px) {
    .hooks {
      grid-template-columns: 50% 50%;
    }
  }
</style>

<svelte:head>
  <title>Don't Get It Twisted: Ahmed Al-Hulaibi</title>
  <meta name="description" content="Ahmed Al-Hulaibi's Personal Blog!" />
  <link href="{settings.origin}/" rel="canonical" />
</svelte:head>

<div class="banner">
  <h1>Welcome to my personal blog, "Don't Get It Twisted."</h1>

  <p>I'm Ahmed Al-Hulaibi, a web developer working primarily in Go.</p>

  <p>
    I am just a regular guy, but when you put a keyboard in my hands I become a regular guy with a keyboard.
  </p>

  <p>
    On this blog, I write about what I am working on, what I am learning and how I work.
    Please reach out to me when you have feedback, comments, or questions. You can find me on Twitter: <a href="https://twitter.com/ahmedhulaibi">@ahmedhulaibi</a>
  </p>
</div>

<div class="blog">
  <div class="entries">
    {#each data.markdown.blog as blog}
      <BlogTeaser {blog} {helpers} />
    {/each}
  </div>
</div>