import { getCollection } from 'astro:content';

export async function getVisibleOutputs() {
  return (await getCollection('outputs', ({ data }) => !data.draft))
    .sort((a, b) => {
      return b.data.dateAdded.localeCompare(a.data.dateAdded)
        || b.data.year - a.data.year
        || a.data.title.localeCompare(b.data.title);
    });
}

export async function getProjectOutputs(projectId: string) {
  return (await getVisibleOutputs()).filter(({ data }) => data.projects.includes(projectId));
}
