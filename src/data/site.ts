export const site = {
  name: 'Loong Yi\'s Domain',
  // Replace these empty fields with your personal details.
  author: 'Loong Yi Lee',
  role: 'Senior Research Fellow',
  affiliation: 'Monash University Malaysia',
  description: 'Research in compliant mechanisms, manipulation, and dynamic robotic systems.',
  bio: 'I am interested in how robots of the future might look and behave quite differently from the robots of today.  Starting in soft robotics, my goal is to develop robots that have intelligence in both their brains and their bodies. This will mean novel robot systems that can robustly manage unstructured tasks and environments; including navigating the most uncertain interactions of them all, working with living beings.',
};

// Dates use YYYY-MM-DD. The homepage shows the five most recent updates.
export const news: { date: string; text: string; href?: string; linkLabel?: string }[] = [];

// Add your own profile URLs. Empty entries are hidden from the website.
export const profiles = [
  { label: 'Email', short: '📬', href: 'mailto:loongyi1995@gmail.com' }, // mailto:your@email.com
  { label: 'Google Scholar', short: '🎓', href: 'https://scholar.google.com/citations?user=8ur6-qIAAAAJ&hl=en' },
  { label: 'CV', short: '📄', href: '/CV.pdf' }, // Add public/cv.pdf, then set href to '/cv.pdf'.
  { label: 'GitHub', short: '</>', href: 'https://github.com/loongyi' },
  { label: 'LinkedIn', short: 'in', href: 'https://www.linkedin.com/in/leeloongyi/' },
  { label: 'Youtube', short: '▶️', href: 'https://www.youtube.com/@loongyi48' },
];

export interface ProjectVideo {
  /** Display width / height; defaults to 16 / 9. Match the source video. */
  aspectRatio?: string;
  src: string;
  title: string;
  caption: string;
  poster?: string;
}

export interface Project {
  id: string;
  title: string;
  topic: string;
  description: string;
  videos: [ProjectVideo, ...ProjectVideo[]];
}

// Array order controls the overview. The first video is the project preview.
// See docs/projects.md for adding projects, videos, and related publications.
export const projects: Project[] = [
  {
    id: 'aerial-soft-grippers',
    title: 'Co-design of Aerial Soft Grippers',
    topic: 'Aerial manipulation',
    description: 'Designing soft grippers together with the aerial platforms that carry them. This research explores how compliant mechanisms, fingertip morphology, and adaptable grasping can help flying robots make contact with objects and interact with their surroundings.',
    videos: [{ src: '/videos/dronegripper1.mp4', poster: '/images/posters/dronegripper1.jpg', title: 'Aerial soft gripping', caption: 'A soft-gripper demonstration for aerial manipulation.' }],
  },
  {
    id: 'manipulation-under-uncertainty',
    title: 'Robot Manipulation under Uncertainty',
    topic: 'Adaptive manipulation',
    description: 'Exploring how robots can handle objects whose shape, compliance, and contact conditions are not fully known in advance. Manipulating irregular biological objects such as broccoli brings these challenges into focus, motivating adaptable interactions with the physical world.',
    videos: [{ src: '/videos/broccoli.mp4', poster: '/images/posters/broccoli.jpg', title: 'Manipulating broccoli', caption: 'Robot manipulation with an irregular biological object.' }],
  },
  {
    id: 'tactile-fine-manipulation',
    title: 'Tactile Sensing for Fine Manipulation',
    topic: 'Tactile sensing',
    description: 'Investigating how a sense of touch can guide delicate interactions with deformable objects. Connecting soft tactile sensing with manipulation, this research explores how contact information can inform precise adjustments when vision alone cannot fully describe the interaction.',
    videos: [{ src: '/videos/elasticbandservo.mp4', poster: '/images/posters/elasticbandservo.jpg', title: 'Elastic-band manipulation', caption: 'Fine manipulation of an elastic band in a tactile-sensing experiment.' }],
  },
  {
    id: 'morphologically-intelligent-grippers',
    title: 'Morphologically Intelligent Soft Grippers',
    topic: 'Morphological intelligence',
    description: 'Embedding adaptability into the structure of a soft gripper. Through Fin Ray-inspired geometries and arrays of flexible elements, this research investigates how mechanical design can shape deformation and distribute contact, allowing the body itself to contribute to grasping.',
    videos: [{ src: '/videos/finaraysim-web.mp4', aspectRatio: '1324 / 638', poster: '/images/posters/finaraysim-web.jpg', title: 'Fin Ray structural simulation', caption: 'Simulation exploring deformation in a compliant Fin Ray-inspired structure.' }],
  },
];
