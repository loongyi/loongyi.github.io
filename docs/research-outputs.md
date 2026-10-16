# Maintaining research outputs

The website reads one Markdoc (`.mdoc`) file per output from
[src/content/outputs](../src/content/outputs). You never need to edit the page HTML.

## Add an output

1. Copy [template.mdoc](../src/content/outputs/template.mdoc) to a descriptive filename in the same folder, for example `2026-my-paper.mdoc`.
2. Replace the title, authors, year, type, and venue in the fields between `---`.
3. Write an optional abstract beneath the second `---`. Markdown paragraphs, links, emphasis, and lists work here.
4. Set `status` to the publication stage, then set `draft: false` when ready to display the entry. Website drafts are excluded from both the output page and homepage, including during development.
5. Preview locally, then commit and deploy using your usual workflow. The public static site updates on its next build/deployment, not just when a file is saved locally.

```yaml
---
title: "Your paper title"
authors:
  - "Loong Yi Lee"
  - "Coauthor Name"
year: 2026
type: "Journal article"
status: "Published"
venue: "Journal name, volume, pages"
draft: true
links:
  - label: "PDF"
    url: "/papers/my-paper.pdf"
  - label: "Code"
    url: "https://github.com/your-account/your-project"
---
Write your abstract here.
```

The example is instructional, not a real publication. Replace every sample value before publishing.

## Fields and ordering

- Required: `title`, `authors` (a list), `year` (a number), and `type`.
- Types: `Journal article`, `Conference paper`, `Patent`, `Workshop`, `Invited talk`, `Preprint`, `Dataset`, `Method`, `Tutorial`, `Exhibit`, `Software`, `Thesis`, or `Talk`.
- Optional: `status` (defaults to `Published`), `venue`, `doi`, `links`, `authorNote`, `image`, `tags`, `projects`, and body text.
- `doi` takes only the identifier, for example `10.1234/example`; omit the field when unavailable.
- `links` is a list of labels and URLs. Omit it or use `links: []` for no resources.
- `draft` defaults to `true` if omitted. Set it explicitly to `false` to display the entry on the website, regardless of its publication status.
- Newest years appear first, with alphabetical titles within each year. The homepage shows the first three visible outputs, including their status labels.
- Missing required fields, invalid types, malformed DOIs, and unsafe link schemes fail the build with a validation error.

For downloadable PDFs, create `public/papers/`, place the file there, and use `/papers/filename.pdf` in the entry.

## Categories and navigation

The directory uses one **Output category** dropdown so adding types does not add more buttons. Only types with visible entries appear. Category links can use `/publications/?type=Invited%20talk`.

For a talk, use `type: "Invited talk"` or `type: "Talk"` and `status: "Presented"`. For resources, use `type: "Dataset"`, `type: "Method"`, or `type: "Tutorial"` with `status: "Published"` when released. For an exhibit, use `type: "Exhibit"` and `status: "Exhibited"` once shown. Values are case-sensitive; `Invited Talk` is not the same as `Invited talk`.

To add another category later, add its exact singular value to `outputTypes` and its display label to `outputTypeLabels` in [output-types.ts](../src/data/output-types.ts). Then use that value in an output's `type` field. The schema and dropdown pick it up automatically. Add a new lifecycle status separately in [output-statuses.ts](../src/data/output-statuses.ts) only if needed.

Resource links must be objects, not bare URLs:

```yaml
type: "Tutorial"
status: "Published"
links:
  - label: "Read tutorial"
    url: "https://example.com/tutorial"
```

You choose exactly one category per output using its `type` field. The site does not infer categories from a title, venue, DOI, or number of entries.

| Entry field | Category option |
| --- | --- |
| `type: "Journal article"` | Journals |
| `type: "Conference paper"` | Conferences |
| `type: "Patent"` | Patents |
| `type: "Workshop"` | Workshops |
| `type: "Invited talk"` | Invited talks |
| `type: "Preprint"` | Preprints |
| `type: "Dataset"` | Datasets |
| `type: "Software"` | Software |
| `type: "Thesis"` | Theses |
| `type: "Talk"` | Other talks |

The page generates dropdown options and counts from visible entries (`draft: false`), including work awaiting publication. A category appears when its first entry is visible; empty categories and website drafts are excluded. Counts show total visible entries per category, even during a search or status filter.

Click a category to show its outputs, grouped by year. Search and the publication status dropdown narrow the selected category. **All outputs** clears only the category selection; clear the search box and choose **All statuses** too to see everything. With JavaScript disabled, all visible outputs remain readable.

Use the exact singular `type` values above in entries. For example, use `Invited talk`, not `Invited talks`. This prevents spelling variations from creating accidental duplicate categories.

To add an entirely new category, add its value and display label once in [output-types.ts](../src/data/output-types.ts). Validation and navigation both read that file; no page HTML changes are needed. Topic tags such as soft robotics are separate from output types.

## Paper images, topic tags, and project links

Add these fields to an output's frontmatter:

```yaml
image:
  src: "/images/outputs/my-paper.jpg"
  alt: "A compliant gripper wrapping around an irregular object"
tags: ["soft robotics", "grasping"]
projects: ["morphologically-intelligent-grippers"]
```

This is an example, not an assigned relationship for the imported publications.

**Images:** create `public/images/outputs/` and place your image there. The browser path omits `public`. HTTP(S) image URLs also work. Alternative text is required. Images appear beside citations on wide screens and above them on small screens; the full image is contained without cropping. These public images are served as supplied, so resize/compress large files before adding them. Omit `image` entirely when not needed.

**Topic tags:** choose any descriptive labels. Leading/trailing spaces are removed, case is normalized to lowercase, and duplicates are removed. A tag links to the output page filtered by that topic. Search includes tags, and the topic selector is generated from visible entries. Choose consistent wording: `soft robotics` and `soft-robotics` are distinct tags.

**Project references:** list one or more exact project IDs from [site.ts](../src/data/site.ts): see the current list and editing instructions in [projects.md](./projects.md). Unknown IDs fail validation. These references explicitly assign outputs to projects; a shared topic alone does not imply project membership.

Each project now has a page at `/projects/PROJECT-ID/`. That page automatically lists all its visible outputs and collects their topic tags. Project cards show the first three linked output titles. Output cards link back to the corresponding project pages. Add a project reference only on the output; you do not maintain a second publication list on the project.

All category, status, topic, project, and search filters combine. **Clear all filters** resets them together. Links such as `/publications/?tag=soft%20robotics` and `/publications/?project=morphologically-intelligent-grippers` open a filtered view when JavaScript is enabled; without JavaScript all visible outputs remain readable.

Selected papers are linked to the aerial, tactile, and morphological-intelligence research themes. Add further project assignments when the relationship is established.

## Publication status versus website visibility

Type answers **what kind of output is this?** Status answers **what stage is it at?** A journal article stays in Journals as it moves through review to publication.

```yaml
type: "Journal article"
status: "Under review"
draft: false
```

This displays the paper with an **Under review** badge; it does not claim the paper has been accepted. `draft: true` would hide the entry entirely.

Supported statuses are `Published`, `Accepted`, `In press`, `Under review`, `In revision`, and `Granted` (for patents), `Presented` (for talks), and `Exhibited` (for exhibits). Set status explicitly on new entries. The default `Published` preserves compatibility with older entries.

When a paper progresses, edit the same file: update its status, year, venue details, and DOI as appropriate. Do not duplicate the entry. `Accepted` and `In press` are distinct; use the stage confirmed by the publisher. Status labels appear on both the output page and homepage. Status dropdown counts cover all visible entries and are not recalculated by category or search.

For work awaiting publication, `year` is the year in your source record, not a claim of publication. Once published, use the publication year. For granted patents, use the grant year and keep filing dates and identifiers in `venue`.

## Imported publication list

On 2026-10-10, 25 entries were transcribed from the supplied **Loong Yi Lee_Publication List (1).pdf**: 20 published outputs, one accepted paper, one under review, one in revision, and two granted patents. All 20 supplied DOI identifiers were preserved; missing DOIs and abstracts were left blank. Publication status follows the supplied document and is not automatically checked against publisher records.

Author order was preserved and initials spacing normalized. The energy-harvesting article retains its co-first-author credit in `authorNote`. Patents are grouped under the 2025 grant year, with the original filing dates retained in their venue text. The Age and Ageing entry retains the source's `116` title prefix and is categorized as a journal article based on its listed journal venue; it can be reclassified if you prefer a separate abstract category.

## Markdoc and Keystatic

Markdoc is the content format; Astro content collections validate and list entries. Both are now wired up. Keystatic is an optional browser editor which can write these same files, but it is not installed or configured yet.

Adding Keystatic involves defining matching form fields, installing its Astro integration, and configuring local editing or GitHub-backed editing and the appropriate deployment adapter. It does not automatically retrieve your papers from Scholar or a DOI database. Existing files can remain the source of truth.

Official guides: [Astro content collections](https://docs.astro.build/en/guides/content-collections/), [Markdoc](https://docs.astro.build/en/guides/integrations-guide/markdoc/), [Keystatic](https://docs.astro.build/en/guides/cms/keystatic/).
