import { StaticPage } from '../Shared/StaticPage';
import { Ico } from '../Shared/SiteChrome';

const STATS = [
  { value: '2018', label: 'Founded' },
  { value: '40k+', label: 'Pieces shipped' },
  { value: '4.7★', label: 'Average rating' },
  { value: '120+', label: 'Verified artisans' },
];

const VALUES = [
  { icon: 'shield', title: 'Verified provenance', text: 'Every studio we work with is visited and vetted before its craft joins the atelier.' },
  { icon: 'returns', title: 'Small-batch, on purpose', text: 'We keep runs limited so every piece gets real attention, not assembly-line output.' },
  { icon: 'star', title: 'Built to keep', text: 'Materials and construction are chosen for decades of wear, not a single season.' },
  { icon: 'check', title: 'Fair to the maker', text: 'Direct partnerships mean the people who make each piece are paid fairly for it.' },
];

function AboutUs() {
  return (
    <StaticPage active="about" title="About Amihive" subtitle="An artisanal emporium curated with horological precision.">
      <div className="sp-section">
        <p>
          Amihive started as a small workshop with one idea: heritage craft — mechanical watches, full-grain
          leather, handmade ceramics — made to be worn and used every day, not saved for occasions. Today we work
          with verified studios across India, celebrating master leatherwork and bespoke creations while keeping
          every run small enough that each piece gets the attention it deserves.
        </p>
        <p>
          From the first sketch to the object in your hands, our team checks materials, construction and finish
          before anything carries the Amihive name.
        </p>
      </div>

      <div className="sp-stats">
        {STATS.map((s) => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="sp-section">
        <h2>What we stand for</h2>
      </div>

      <div className="sp-grid">
        {VALUES.map((v) => (
          <div className="sp-card" key={v.title}>
            <span className="sp-card__icon">
              <Ico name={v.icon} size={20} />
            </span>
            <strong>{v.title}</strong>
            <p>{v.text}</p>
          </div>
        ))}
      </div>
    </StaticPage>
  );
}

export default AboutUs;