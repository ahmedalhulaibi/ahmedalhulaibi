<script>
import { format } from "path";

  export let blog;
  export let helpers;

  let dateFormat =  new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

</script>

<div class="entry">
  <a href={helpers.permalinks.blog({ slug: blog.slug })}>{blog.frontmatter.title}</a>
  <p>{blog.frontmatter.excerpt}</p>
  <p class="date">{dateFormat.format(Date.parse(blog.frontmatter.date))}</p>
</div>
