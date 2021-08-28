<script>
import { format } from "path";

  export let guide;
  export let helpers;

  let dateFormat =  new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

</script>

<div class="entry">
  <a href={helpers.permalinks.guide({ slug: guide.slug })}>{guide.frontmatter.title}</a>
  <p>{guide.frontmatter.excerpt}</p>
  <p class="date">{dateFormat.format(Date.parse(guide.frontmatter.date))}</p>
</div>
