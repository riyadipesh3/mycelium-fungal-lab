import { useEffect, useRef, useState, type ReactNode } from 'react'

/* IntersectionObserver reveal. No scroll listeners anywhere on this page. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const STRANDS = [
  {
    tag: 'Transect work',
    title: 'Fruiting-body transects',
    body: 'Fixed belt walks every fortnight through the birch and pine stands, counting every fruiting body inside a five metre corridor and flagging anything new since the last pass.',
    line: '47 plots, 13 woods',
  },
  {
    tag: 'Below ground',
    title: 'Ectomycorrhizal pairing',
    body: 'Soil cores and fine root tips taken at the same point as the fruiting body, so a Boletus under Scots pine can be paired with the exchange it is running rather than guessed at.',
    line: 'Pairing runs since 2016',
  },
  {
    tag: 'In the lab',
    title: 'Isolation and spore prints',
    body: 'Caps laid on glass, left for twelve hours, then read under the compound. Isolates go onto birch and spruce blocks in the growth room and are logged by block.',
    line: '4,100 isolates catalogued',
  },
]

const GENERA = [
  {
    name: 'Boletus',
    latin: 'Boletus edulis',
    line: 'Pinus sylvestris, plot 47b, three fruiting bodies',
    body: 'The anchor species of the pinewood survey. Where it fruits the soil reads strongly ectomycorrhizal for two metres either side of the stump line.',
    record: [
      ['Substrate', 'Pinus sylvestris, root plate'],
      ['Spore print', 'Olive brown, 11.4 by 6.8 um'],
      ['Fruiting', 'Late August to early October'],
    ],
    img: 'https://picsum.photos/seed/myc-log7zz/1200/900',
    alt: 'A fallen trunk coated in moss and lichen under a dark conifer canopy',
    w: 1200,
    h: 900,
    span: 'md:col-span-2 md:row-span-2',
    tall: true,
  },
  {
    name: 'Amanita',
    latin: 'Amanita muscaria',
    line: 'Betula pendula, Glen Affric, two records',
    body: 'Consistent under birch across every plot we hold, and never far from a young Betula.',
    img: 'https://picsum.photos/seed/myc-moss29zz/800/600',
    alt: 'Green grass blades standing in low sunlight against a blurred woodland edge',
    w: 800,
    h: 600,
    span: '',
    tall: false,
  },
  {
    name: 'Russula',
    latin: 'Russula paludosa',
    line: 'Betula pendula, Culbin, spore print held',
    body: 'Brittle, easily bruised, and the reason every cap is printed the same night it is collected.',
    img: 'https://picsum.photos/seed/myc-log19zz/800/600',
    alt: 'A dense mat of pale grey-green lichen rosettes covering shaded ground',
    w: 800,
    h: 600,
    span: '',
    tall: false,
  },
  {
    name: 'Cantharellus',
    latin: 'Cantharellus cibarius',
    line: 'Picea abies, Abernethy, ectomycorrhizal',
    body: 'Blunt false gills and a fruity smell. Recorded more often after a wet August than at any other time.',
    img: 'https://picsum.photos/seed/myc-leaf18zz/800/600',
    alt: 'Rain beading on the broad green leaf of a woodland plant',
    w: 800,
    h: 600,
    span: '',
    tall: false,
  },
  {
    name: 'Lactarius',
    latin: 'Lactarius quietus',
    line: 'Quercus petraea, Rothiemurchus, oak plot',
    body: 'Oak partner, small and easily walked past. The latex turns lilac in the minute after the cap is cut.',
    img: 'https://picsum.photos/seed/myc-log9zz/800/600',
    alt: 'Golden moss covering a bank under low branches in a shaded wood',
    w: 800,
    h: 600,
    span: '',
    tall: false,
  },
]

const LOG = [
  {
    id: 'lf-1',
    title: 'Fruiting-body transects',
    body: 'Fixed five metre corridors walked fortnightly. Every cap above ground is counted, tagged and returned to the litter with the soil undisturbed beneath it.',
    line: 'Plot 47b, Ref MF-24-0731',
  },
  {
    id: 'lf-2',
    title: 'Spore prints on glass',
    body: 'Caps set gill down on clean glass overnight and left until the deposit is dry enough to lift. Print colour, reaction and density all go on the record sheet.',
    line: 'Print tray 12, Ref MF-24-0732',
  },
  {
    id: 'lf-3',
    title: 'Fine root and soil cores',
    body: 'A 4 cm core beside each fruiting body, washed through a 2 mm sieve to recover root tips. Tips are cleared, mounted and scored for ectomycorrhizal structure.',
    line: 'Core set C, Ref MF-24-0740',
  },
  {
    id: 'lf-4',
    title: 'Mycoheterotroph plots',
    body: 'Fixed plots for Monotropa uniflora and Corallorhiza, both of which draw carbon from a fungus rather than from the light. We monitor them where beech and pine meet.',
    line: 'Plot 9, Ref MF-24-0748',
  },
  {
    id: 'lf-5',
    title: 'Isolation and growth room',
    body: 'Fruiting tissue is cut from the cap margin, plated, and grown on birch and spruce blocks in the growth room. Pleurotus isolates run here as a teaching line.',
    line: 'Block rack B, Ref MF-24-0755',
  },
]

const WOODS = [
  { v: 'glen-affric', label: 'Glen Affric, native pinewood' },
  { v: 'abernethy', label: 'Abernethy Forest, Cairngorms' },
  { v: 'rothiemurchus', label: 'Rothiemurchus, oak and birch' },
  { v: 'culbin', label: 'Culbin Sands and links' },
  { v: 'beinn-eighe', label: 'Beinn Eighe, montane scrub' },
]

function QuoteMark() {
  return (
    <svg width="34" height="26" viewBox="0 0 34 26" fill="none" aria-hidden="true">
      <path
        d="M0 26V14.6C0 6.2 4.4 1 12.4 0l1.4 4.2c-4.4 1.2-6.6 3.8-6.8 7.6h6.4V26H0zm20.2 0V14.6C20.2 6.2 24.6 1 32.6 0L34 4.2c-4.4 1.2-6.6 3.8-6.8 7.6h6.4V26H20.2z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M2 11L11 2M11 2H4.2M11 2v6.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function App() {
  const [name, setName] = useState('')
  const [wood, setWood] = useState('')
  const [contact, setContact] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [open, setOpen] = useState<string | null>(LOG[0].id)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim().length < 2) {
      setError('Add the name the survey record should sit under.')
      return
    }
    if (!wood) {
      setError('Choose the wood you want walked.')
      return
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact)) {
      setError('Add an email address we can send the plot sheet to.')
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <>
      <header className="hyphae-soft sticky top-0 z-30 border-b border-spore/12">
        <div className="shell flex h-18 max-h-20 items-center justify-between py-3">
          <a href="#top" className="flex items-baseline gap-2.5">
            <span className="font-display text-[1.35rem] font-medium tracking-[-0.03em]">
              Mycelium
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <a href="#survey" className="link-underline text-sm text-veil-dim hover:text-veil">
              Survey
            </a>
            <a href="#genera" className="link-underline text-sm text-veil-dim hover:text-veil">
              Genera
            </a>
            <a href="#log" className="link-underline text-sm text-veil-dim hover:text-veil">
              Field log
            </a>
          </nav>
          <a href="#request" className="btn btn-primary !py-2 !text-sm">
            Request a survey
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero: split, copy left, a breathing blob plate holding one image. */}
        <section className="shell flex min-h-[100dvh] items-center pt-24 pb-16">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <p className="micro mb-6">Fungal ecology field lab, Glen Affric</p>
              <h1 className="text-[clamp(2.3rem,4.4vw,3.7rem)] leading-[1.02] text-veil">
                Everything under the litter is connected.
              </h1>
              <p className="mt-7 max-w-[46ch] text-[1.0625rem] leading-[1.65] text-veil-dim">
                We map fungal networks through upland birch and pine woodland, then log every
                substrate we cut.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <a href="#request" className="btn btn-primary">
                  Request a survey
                  <span className="btn-icon">
                    <ArrowGlyph />
                  </span>
                </a>
                <a href="#log" className="btn btn-ghost">
                  Field log
                </a>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative">
                <img
                  src="https://picsum.photos/seed/myc-moss25zz/900/1120"
                  alt="A narrow trodden path running through green woodland floor between bare trunks"
                  width={900}
                  height={1120}
                  className="substrate blob-media morph-drift panel-edge block h-72 w-full object-cover sm:h-[24rem] lg:h-[27rem]"
                  loading="eager"
                />
                <span
                  aria-hidden="true"
                  className="blob-orb spore-field absolute -bottom-3 -left-3 h-20 w-20 border border-spore/25"
                />
                <span
                  aria-hidden="true"
                  className="blob-tile absolute -right-2 -top-2 h-12 w-12 border border-spore/20"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Survey: 2+1 asymmetric grid. Three cards, two over one. */}
        <section id="survey" className="shell py-24 md:py-32">
          <Reveal>
            <h2 className="max-w-[15ch] text-[clamp(2rem,3.9vw,3.1rem)] text-veil">
              Three strands of work, one set of plots.
            </h2>
            <p className="mt-5 max-w-[58ch] text-veil-dim">
              We keep a small number of sites under continuous survey rather than many sites under
              occasional ones, so the same ground can be read year after year.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-4 md:grid-cols-6">
            {STRANDS.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 80}
                className={i < 2 ? 'md:col-span-3' : 'md:col-span-6'}
              >
                <article className="blob-panel morph-panel hyphae panel-edge spore-field flex h-full flex-col gap-5 p-7 md:p-8">
                  <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-spore">
                    {s.tag}
                  </p>
                  <h3 className="text-xl text-veil">{s.title}</h3>
                  <p className="flex-1 text-[0.9375rem] leading-[1.65] text-veil-dim">{s.body}</p>
                  <p className="border-t border-spore/15 pt-4 font-mono text-xs text-veil-dim">
                    {s.line}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Genera: bento, exactly 5 items filling all 8 cells of a 4x2 grid.
            The lead cell spans 2x2 and its image takes the slack, so no cell
            can end up with a void. */}
        <section id="genera" className="shell py-24 md:py-32">
          <Reveal>
            <h2 className="max-w-[13ch] text-[clamp(2rem,3.9vw,3.1rem)] text-veil">
              What keeps coming back.
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[0.8125rem] text-veil-dim">
            <span>1,842 records logged</span>
            <span>13 woods</span>
            <span>Est. 2016, Glen Affric</span>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4 md:auto-rows-fr">
            {GENERA.map((g, i) => (
              <Reveal key={g.name} delay={i * 70} className={g.span}>
                <article className="blob-panel hyphae panel-edge spore-field flex h-full min-w-0 flex-col p-4">
                  <img
                    src={g.img}
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    loading="lazy"
                    className={`substrate ${i % 2 === 0 ? 'blob-media' : 'blob-tile'} morph-on-hover w-full shrink-0 object-cover ${
                      g.tall
                        ? 'h-56 md:h-[22rem]'
                        : 'h-28 md:h-36'
                    }`}
                  />
                  <div className="mt-4 flex flex-1 flex-col gap-3 px-3 pb-1 pt-1">
                    <div>
                      <h3 className="text-xl text-veil">{g.name}</h3>
                      <p className="mt-1.5 font-mono text-[0.8125rem] italic text-spore">
                        {g.latin}
                      </p>
                    </div>
                    <p className="flex-1 text-[0.9375rem] leading-[1.65] text-veil-dim">
                      {g.body}
                    </p>
                    {g.record && (
                      <dl className="mt-2 grid gap-x-8 gap-y-4 border-t border-spore/15 pt-5 sm:grid-cols-3 md:grid-cols-1">
                        {g.record.map(([k, v]) => (
                          <div key={k}>
                            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-veil-dim">
                              {k}
                            </dt>
                            <dd className="mt-1.5 text-[0.8125rem] leading-[1.5] text-veil">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <p className="mt-auto border-t border-spore/15 pt-3.5 font-mono text-xs leading-[1.5] text-veil-dim">
                      {g.line}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Quote: full-width band, single family used once. */}
        <section className="shell py-24 md:py-32">
          <Reveal>
            <figure className="blob-slab morph-slab hyphae spore-field px-8 py-14 md:px-16 md:py-20">
              <QuoteMark />
              <blockquote className="mt-8 max-w-[52ch] text-[clamp(1.5rem,2.7vw,2.15rem)] leading-[1.28] tracking-[-0.02em] text-veil">
                A needle under a birch two hundred metres off the path has taken more carbon out of
                that soil than the tree above it ever will.
              </blockquote>
              <figcaption className="mt-9 text-sm text-veil-dim">
                Dr Elspeth Kerr, principal investigator, Glen Affric
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* Field log: accordion, one row open at a time, no long list. */}
        <section id="log" className="shell py-24 md:py-32">
          <Reveal>
            <div className="blob-panel morph-panel hyphae-soft spore-field px-6 py-12 md:px-12 md:py-16">
              <p className="micro">Field log, 2024 season</p>
              <h2 className="mt-5 max-w-[16ch] text-[clamp(2rem,3.9vw,3.1rem)] text-veil">
                How a record is made.
              </h2>

              <div className="mt-10">
                {LOG.map((row) => {
                  const isOpen = open === row.id
                  return (
                    <div key={row.id} className="border-t border-spore/14 last:border-b">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : row.id)}
                          aria-expanded={isOpen}
                          aria-controls={`panel-${row.id}`}
                          className="flex w-full items-baseline gap-5 py-5 text-left transition-colors hover:text-spore"
                        >
                          <span className="flex-1 text-lg text-veil">{row.title}</span>
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 shrink-0 self-center border border-veil-dim transition-transform duration-300"
                            style={{
                              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                              borderRadius: '56% 44% 51% 49% / 53% 47% 45% 47%',
                            }}
                          />
                        </button>
                      </h3>
                      <div
                        id={`panel-${row.id}`}
                        role="region"
                        hidden={!isOpen}
                        className="grid gap-2 pb-6 pl-[3.1rem] pr-6 md:grid-cols-[1.6fr_1fr] md:gap-8"
                      >
                        <p className="max-w-[58ch] text-[0.9375rem] leading-[1.65] text-veil-dim">
                          {row.body}
                        </p>
                        <p className="font-mono text-[0.8125rem] text-spore md:text-right">
                          {row.line}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Request: split, copy left, blob-slab form right. */}
        <section id="request" className="shell pb-24 md:pb-32">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <h2 className="max-w-[13ch] text-[clamp(2rem,3.9vw,3.1rem)] text-veil">
                Ask us to walk a wood.
              </h2>
              <p className="mt-6 max-w-[48ch] leading-[1.7] text-veil-dim">
                We take on a small number of new sites each year. Woodland, heath and dune systems
                all, so long as there is somebody who wants the records kept.
              </p>
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
                {[
                  ['Field base', 'Invercauld, Glen Affric'],
                  ['Telephone', '01479 772 418'],
                  ['Season', 'Walks run March to October'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-veil-dim">
                      {k}
                    </dt>
                    <dd className="mt-2 text-sm text-spore">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={120}>
              <form
                className="blob-slab morph-slab hyphae panel-edge flex flex-col gap-5 p-7 md:p-10"
                onSubmit={submit}
                noValidate
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm text-veil">
                    Name on the record
                  </label>
                  <input
                    id="name"
                    name="name"
                    className={`field ${error && name.trim().length < 2 ? 'field-invalid' : ''}`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Callum Bain"
                    aria-describedby="name-hint"
                  />
                  <p id="name-hint" className="font-mono text-[0.6875rem] text-veil-dim">
                    Used for the site register only
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="wood" className="text-sm text-veil">
                    Wood to survey
                  </label>
                  <select
                    id="wood"
                    name="wood"
                    className={`field appearance-none ${error && !wood ? 'field-invalid' : ''}`}
                    value={wood}
                    onChange={(e) => setWood(e.target.value)}
                    aria-describedby="wood-hint"
                  >
                    <option value="">Select a site</option>
                    {WOODS.map((w) => (
                      <option key={w.v} value={w.v}>
                        {w.label}
                      </option>
                    ))}
                  </select>
                  <p id="wood-hint" className="font-mono text-[0.6875rem] text-veil-dim">
                    One site per season, woodland preferred
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact" className="text-sm text-veil">
                    Email
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="email"
                    className={`field ${error && contact !== '' ? 'field-invalid' : ''}`}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="c.bain@myceliumfield.scot"
                    aria-describedby="contact-hint"
                  />
                  <p id="contact-hint" className="font-mono text-[0.6875rem] text-veil-dim">
                    Plot sheets go out from here
                  </p>
                </div>

                {error && (
                  <p role="alert" className="text-sm text-[#e0a184]">
                    {error}
                  </p>
                )}

                {sent ? (
                  <div className="spore-field px-5 py-4 text-sm text-spore" role="status">
                    Logged for {name.trim()}. {wood} is on the list for a first walk, and the plot
                    sheet is on its way.
                  </div>
                ) : (
                  <button type="submit" className="btn btn-primary self-start">
                    Request a survey
                    <span className="btn-icon">
                      <ArrowGlyph />
                    </span>
                  </button>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="hyphae-soft border-t border-spore/12">
        <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
          <div>
            <p className="font-display text-lg text-veil">Mycelium Field Lab</p>
            <p className="mt-3 max-w-[40ch] text-sm leading-[1.65] text-veil-dim">
              A small group working out of Glen Affric, keeping continuous plots in birch, pine and
              oak woodland, and counting what comes up.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-3 text-sm">
            <a href="#survey" className="link-underline text-veil-dim hover:text-veil">
              Survey
            </a>
            <a href="#genera" className="link-underline text-veil-dim hover:text-veil">
              Genera
            </a>
            <a href="#log" className="link-underline text-veil-dim hover:text-veil">
              Field log
            </a>
          </nav>
          <div className="text-sm text-veil-dim">
            <p>Invercauld, Glen Affric</p>
            <p className="mt-1">IV4 7AX</p>
            <a href="#request" className="link-underline mt-4 inline-block hover:text-veil">
              Request a survey
            </a>
          </div>
        </div>
        <div className="shell border-t border-spore/12 py-7">
          <p className="font-mono text-[0.6875rem] text-veil-dim">
            Developed by{' '}
            <a href="https://thediyadevelopers.com" className="link-underline text-veil">
              Diya Developers
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
