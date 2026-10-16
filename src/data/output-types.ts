// Add a type here and its navigation label below to introduce a new category.
export const outputTypes = [
  'Journal article', 'Conference paper', 'Patent', 'Workshop', 'Invited talk',
  'Preprint', 'Dataset', 'Method', 'Tutorial', 'Exhibit', 'Software', 'Thesis', 'Talk',
] as const;

export const outputTypeLabels: Record<(typeof outputTypes)[number], string> = {
  'Journal article': 'Journals',
  'Conference paper': 'Conferences',
  Patent: 'Patents',
  Workshop: 'Workshops',
  'Invited talk': 'Invited talks',
  Preprint: 'Preprints',
  Dataset: 'Datasets',
  Method: 'Methods',
  Tutorial: 'Tutorials',
  Exhibit: 'Exhibits',
  Software: 'Software',
  Thesis: 'Theses',
  Talk: 'Other talks',
};
