# Adding and editing projects

For this small portfolio, keep projects in the `projects` array in [site.ts](../src/data/site.ts). No page markup needs to change: the homepage, project overview, topic filters, and individual project pages all use this data. Array order is display order.

1. Put your MP4 files in [public/videos](../public/videos). Use web-compatible H.264 video and match filename capitalization exactly.
2. Add an entry to the `projects` array using the example below. Give it a unique, stable, lowercase hyphenated `id`; this becomes `/projects/your-id/`.
3. Add at least one video. The first is the overview preview. Additional videos appear in a captioned two-column gallery on the detail page, stacking on mobile; the overview gains a link to all videos.
4. Link publications using their `projects` field, as described below.
5. Preview the project and run `npm run build` before deploying.

```ts
{
  id: 'your-project-id',
  title: 'Your Project Title',
  topic: 'Tactile sensing',
  description: 'Explain the research question, approach, and significance.',
  videos: [
    {
      src: '/videos/your-main-demo.mp4',
      title: 'Main demonstration',
      caption: 'Explain what the viewer is seeing.',
      // Optional still image shown before playback:
      poster: '/images/your-main-demo.jpg',
      // Match the source dimensions for wider or taller clips:
      aspectRatio: '1920 / 1080',
    },
    {
      src: '/videos/your-second-demo.mp4',
      title: 'A second experiment',
      caption: 'Describe the different setup or behaviour.',
    },
  ],
},
```

Replace example paths with real files; omit `poster` if you have no still image. Keep captions specific to the footage and use the project description for the broader research theme. Reuse topic names to group projects under the same filter.

## Related publications

Project videos use click-to-play with a visible Play video button over the poster in [ProjectVideo.astro](../src/components/ProjectVideo.astro). `preload="none"` avoids preloading the video; native controls remain available, including without JavaScript. Add a `poster` path to each video entry in [site.ts](../src/data/site.ts). Store preview JPGs in [public/images/posters](../public/images/posters); the URL starts with `/images/posters/`. The initial four posters are frames extracted one second into each clip. Replace them with your preferred stills using the same filenames.

In the frontmatter of the relevant file in [src/content/outputs](../src/content/outputs), add one or more exact project IDs:

```yaml
projects: ["tactile-fine-manipulation"]
```

Current IDs, in display order:

- `aerial-soft-grippers`
- `manipulation-under-uncertainty`
- `tactile-fine-manipulation`
- `morphologically-intelligent-grippers`

The project automatically lists linked, non-draft publications. The broccoli demonstration currently has no paper assigned because the supplied publication metadata does not establish an exact match. The other links group papers by research theme, rather than claiming that every paper describes the displayed clip.

The supplied Fin Ray clip is named `finaraysim.mp4`; the site uses an H.264 copy named `finaraysim-web.mp4` for browser compatibility, while preserving the original. Keep IDs stable once published to preserve links. See [research-outputs.md](./research-outputs.md) for publication editing.
