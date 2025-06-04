import styles from './About.module.scss'
import Link from 'next/link'

const stackSections = [
  {
    title: 'Frontend',
    items: [
      ['Next.js', 'React framework for server-rendered apps and API routes.'],
      ['React', 'UI library used for building interactive components.'],
      ['SCSS', 'Used for component-based styling.'],
      ['fetch API', 'To communicate with the backend and OMDb API.'],
    ],
  },
  {
    title: 'Backend',
    items: [
      ['Next.js API Routes', 'Server logic handled inside ', <code key="code">app/api/</code>, ' directory.'],
      ['MongoDB Atlas', 'Cloud-hosted NoSQL database service.'],
      [
        'Mongoose',
        'ODM used for defining models like ',
        <code key="code">Movie</code>,
        ' and ',
        <code key="code2">Screening</code>,
        '.',
      ],
      ['OMDb API', 'External API for retrieving movie metadata.'],
      [
        'Environment Variables',
        <code key="code">.env</code>,
        ' used for keys like ',
        <code key="code2">MONGODB_URI</code>,
        ' and ',
        <code key="code3">OMDB_API_KEY</code>,
        '.',
      ],
    ],
  },
  {
    title: 'Testing',
    items: [
      ['Jest', 'JavaScript testing framework for running unit tests.'],
      ['jest.unstable_mockModule', 'For mocking ES module imports during tests.'],
      ['formdata-node', 'Simulates ', <code key="code">formData()</code>, ' in a Node.js environment.'],
    ],
  },
  {
    title: 'Tooling & Configuration',
    items: [
      [
        'ECMAScript Modules (ESM)',
        'Modern syntax using ',
        <code key="code">import/export</code>,
        " and Node's ",
        <code key="code2">--experimental-vm-modules</code>,
        '.',
      ],
      ['cross-env', 'Sets environment variables cross-platform in scripts.'],
      [
        'Alias (@)',
        'Path shortcuts like ',
        <code key="code">@/lib/...</code>,
        ' mapped in ',
        <code key="code2">jest.config.js</code>,
        ' using ',
        <code key="code3">moduleNameMapper</code>,
        '.',
      ],
    ],
  },
]

export default function About() {
  return (
    <main className={styles.container}>
      <h1>KINO-NextJS – Technical Stack</h1>

      {stackSections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <ul>
            {section.items.map(([title, ...desc], i) => (
              <li key={i}>
                <strong>{title}</strong> – {desc}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
