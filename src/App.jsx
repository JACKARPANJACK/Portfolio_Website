import { useEffect, useState, useRef } from 'react'
import './App.css'
import genosIdle from './assets/default/genos_idle.gif'
import genosSuperMove from './assets/Animations/genos_super_move.gif'
import genosBlink from './assets/default/genos_blink.gif'
import genosHappy from './assets/default/genos_happy.gif'
import genosAngry from './assets/default/genos_angry.gif'
import genosGoofy from './assets/default/genos_goofy.gif'
import genosDefensive from './assets/default/genos_defensive.gif'
import genosVengeful from './assets/default/genos_vengeful.gif'
import genosSweating from './assets/default/genos_Sweating.gif'
import lockOn from './assets/Target Reticle/lockon.png'
import lockOn2 from './assets/Target Reticle/Lockon2.png'
import lockOn3 from './assets/Target Reticle/Lockon3.png'
import lockOnFr from './assets/Target Reticle/lockon_fr.png'
import trackGenosMain from './assets/Music/genos_main.mp3'
import trackIntensePower from './assets/Music/intense_power.mp3'
import trackIntenseUplift from './assets/Music/intense_uplift.mp3'

const profile = {
  name: 'ARPAN PARAMANIK',
  roles: 'Game Developer | Software Engineer | Full-Stack and Android Developer',
  location: 'Bhubaneswar, Odisha, India',
  phone: '+91 9382287837',
  email: 'aparamanik132@gmail.com',
  linkedin: 'https://www.linkedin.com/in/arpan-paramanik-7163912a0/',
  github: 'https://github.com/JACKARPANJACK',
  artstation: 'https://www.artstation.com/',
  youtube: 'https://www.youtube.com/@incinerate162',
  x: 'https://x.com/miles_mora91146',
  discord: 'mr.demongenoscyborg',
}

const toDisplayLabel = (assetPath) => {
  const fileName = assetPath.split('/').pop() || assetPath
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const toYoutubeEmbedUrl = (url) => {
  try {
    const parsed = new URL(url)

    if (parsed.hostname.includes('youtu.be')) {
      const videoId = parsed.pathname.replace('/', '')
      return `https://www.youtube.com/embed/${videoId}`
    }

    if (parsed.hostname.includes('youtube.com')) {
      const videoId = parsed.searchParams.get('v')
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`
      }

      if (parsed.pathname.startsWith('/embed/')) {
        return url
      }
    }

    return url
  } catch {
    return url
  }
}

const animationAssets = Object.entries(
  import.meta.glob('./assets/Animations/*.{gif,mp4,webm}', { eager: true, import: 'default' }),
)
  .map(([assetPath, src]) => ({
    src,
    label: toDisplayLabel(assetPath),
    isVideo: /\.(mp4|webm)$/i.test(assetPath),
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

const twoDArtAssets = Object.entries(
  import.meta.glob('./assets/default/*.{gif,png,jpg,jpeg,webp}', { eager: true, import: 'default' }),
)
  .map(([assetPath, src]) => ({
    src,
    label: toDisplayLabel(assetPath),
  }))
  .sort((a, b) => a.label.localeCompare(b.label))

const threeDArtItems = [
  {
    title: 'ArtStation Portfolio',
    summary: '3D model and concept portfolio hub.',
    link: profile.artstation,
    label: 'View ArtStation',
  },
  {
    title: 'Genos Unity Prototype',
    summary: 'Gameplay with character rig and action presentation.',
    link: 'https://github.com/JACKARPANJACK/Genos_Unity',
    label: 'View Project',
  },
  {
    title: 'Nikke AOG Build',
    summary: 'Stylized character/action production with VFX focus.',
    link: 'https://github.com/JACKARPANJACK/Nikke-Adventure-of-Goddess',
    label: 'View Repository',
  },
]
const musicTracks = [
  {
    title: 'Genos Main',
    src: trackGenosMain,
  },
  {
    title: 'Intense Power',
    src: trackIntensePower,
  },
  {
    title: 'Intense Uplift',
    src: trackIntenseUplift,
  },
]

function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [playerError, setPlayerError] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0

    if (playing) {
      audio.play().catch(() => {
        setPlaying(false)
        setPlayerError('Tap play again to start audio.')
      })
    } else {
      audio.pause()
    }
  }, [playing, trackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.85
    }
  }, [])

  const nextTrack = () => setTrackIndex((i) => (i + 1) % musicTracks.length)
  const prevTrack = () => setTrackIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length)

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      setPlaying(false)
      return
    }

    try {
      await audio.play()
      setPlaying(true)
      setPlayerError('')
    } catch {
      setPlaying(false)
      setPlayerError('Browser blocked autoplay. Click play once more.')
    }
  }

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={musicTracks[trackIndex].src}
        preload="metadata"
        onEnded={nextTrack}
        onCanPlay={() => setPlayerError('')}
        onError={() => setPlayerError('Track failed to load. Try next.')}
      />
      <div className="music-meta">
        <span className="music-title">{musicTracks[trackIndex].title}</span>
        <button className="music-btn" onClick={prevTrack} title="Previous">⏮</button>
        <button className="music-btn" onClick={togglePlay} title={playing ? 'Pause' : 'Play'}>
          {playing ? '⏸' : '▶️'}
        </button>
        <button className="music-btn" onClick={nextTrack} title="Next">⏭</button>
      </div>
      {playerError ? <p className="music-error">{playerError}</p> : null}
    </div>
  )
}


const summary =
  'Passionate software and game developer with hands-on experience in game development, Android applications, full-stack web development, and cybersecurity research. Experienced in building gameplay systems, interactive applications, and scalable software solutions using Unity, React.js, Node.js, Django, Java, and Android frameworks with a strong focus on performance, usability, and polished user experiences.'

const videoSections = [
  {
    title: 'Stickman Animations',
    videos: [
      { url: 'https://youtu.be/Gxf2mpPsZAw?si=f--D_7F6wvTiebSP', label: 'Stickman Animation 1' },
      { url: 'https://youtu.be/bSF-eTux3Vg?si=YjOl0FtsEBkUp-6i', label: 'Stickman Animation 2' },
    ],
  },
  {
    title: 'Genos Mod Footage (GTA SA & MGRR)',
    videos: [
      { url: 'https://youtu.be/CNgFsNHICew?si=sckq1ya_VBjvom-a', label: 'Genos Mod GTA SA' },
      { url: 'https://youtu.be/0aMhqjG9Cds?si=SvUctATeE2FVYj_e', label: 'Genos Mod MGRR 1' },
      { url: 'https://youtu.be/UpMkrlnDjO4?si=cgxf_eTNuO1PAetY', label: 'Genos Mod MGRR 2' },
    ],
  },
  {
    title: 'Blade Mode Footage',
    videos: [
      { url: 'https://youtu.be/bSG6ytBjqVw?si=DMWYZe2CwYDZwghj', label: 'Blade Mode 1' },
      { url: 'https://youtu.be/WcmL2bILgLY?si=Akpu7OCe2v-u7FCd', label: 'Blade Mode 2' },
    ],
  },
  {
    title: 'Resident Evil Mod GTA SA',
    videos: [
      { url: 'https://youtu.be/b2q8nbTxlc4?si=g0bRf_Ph_CxUg89O', label: 'Resident Evil Mod' },
    ],
  },
  {
    title: 'Nikke AOG Footage',
    videos: [
      { url: 'https://youtu.be/PWxPk00_J-M?si=sTbn4jC6gUmcVwBa', label: 'Nikke AOG 1' },
      { url: 'https://youtu.be/TVZwws1nI2I', label: 'Nikke AOG 2' },
    ],
  },
]


const skillGroups = [
  {
    title: 'Game Development',
    items: [
      'Unity, Unreal Engine, Godot',
      'Combat systems, movement mechanics, AI, physics, animation, UI implementation',
      'Prototyping, debugging, optimization, scripting',
    ],
  },
  {
    title: 'Programming and Software Development',
    items: [
      'Java, C#, C++, Python, JavaScript, SQL',
      'Node.js, React.js, Django, Express.js',
      'OOP, REST APIs, Git, software architecture',
    ],
  },
  {
    title: 'Android and Web Development',
    items: [
      'Android application development using Java and Android SDK',
      'Frontend development with React.js',
      'Backend development using Node.js, Express.js, and Django',
      'API, database, authentication integration, and deployment',
    ],
  },
  {
    title: 'Art and Creative Tools',
    items: [
      'Blender, ZBrush, Substance Painter, Photoshop',
      '3D modeling, rigging, texture mapping, VFX',
    ],
  },
  {
    title: 'Additional Areas',
    items: ['Reverse engineering and modding', 'Cybersecurity and penetration testing', 'AR/VR development'],
  },
]

const workExperience = [
  {
    role: 'Game Developer',
    org: 'ThunkPlay | India',
    duration: 'May 2025 - Jan 2026',
    points: [
      'Developed gameplay mechanics and combat systems using Unity and C#.',
      'Collaborated with artists and designers to integrate 3D and 2D assets into playable builds.',
      'Optimized gameplay performance and improved responsiveness across iterations.',
      'Contributed to gameplay polish, animation integration, and player interaction systems.',
    ],
    link: 'https://drive.google.com/file/d/1K5hszYFM1rE6orYOsvuKiOT0pBvkn5bE/view?usp=sharing',
    linkLabel: 'Internship Certificate',
  },
  {
    role: 'Game Developer (Student Developer)',
    org: 'GeeksforGeeks KIIT | Bhubaneswar',
    duration: 'Feb 2024 - Jan 2025',
    points: [
      'Built mini-games and interactive prototypes for educational and entertainment purposes.',
      'Designed gameplay logic, event-driven systems, and UI interactions in Unity.',
      'Created and integrated game assets, animations, and visual effects.',
    ],
  },
  {
    role: 'Cybersecurity Analyst',
    org: 'IoT Lab, KIIT | Bhubaneswar',
    duration: 'Feb 2025 - Apr 2025',
    points: [
      'Performed penetration testing and vulnerability assessments on IoT systems.',
      'Worked with debugging and reverse-engineering workflows to identify software and hardware security issues.',
      'Assisted in technical analysis and reporting for cybersecurity research activities.',
    ],
  },
  {
    role: 'Cybersecurity Team Member',
    org: 'CyberVault KIIT | Bhubaneswar',
    duration: 'Aug 2025 - Present',
    points: [
      'Contributed to exploit testing, threat modeling, and security tooling research.',
      'Supported collaborative cybersecurity and software analysis projects.',
    ],
  },
]

const projects = [
  {
    title: 'Trapped 2.0 - Escape Room Game',
    summary: 'Built in Unity 2022 with a focus on intuitive gameplay and immersive player experience.',
    stack: ['Unity 2022', 'Gameplay Design'],
    live: '',
    repo: 'https://github.com/CricketFan18/Trapped_2.0/tree/Arpan',
  },
  {
    title: 'Overkill - Hackathon Game',
    summary: 'Rapidly prototyped and iterated gameplay systems in a collaborative Unity 6 team setup.',
    stack: ['Unity 6', 'Rapid Prototyping'],
    live: '',
    repo: 'https://github.com/JACKARPANJACK/Overkill',
  },
  {
    title: 'Nikke: Adventure of Goddess',
    summary: 'Action platformer in Godot focused on combat responsiveness, effects, and gameplay feel.',
    stack: ['Godot', 'Combat Systems'],
    live: 'https://youtu.be/PWxPk00_J-M?si=bwQRHaZdzskDc9bk',
    repo: 'https://github.com/JACKARPANJACK/Nikke-Adventure-of-Goddess',
  },
  {
    title: 'GFG 2D Platformer',
    summary: 'Implemented local multiplayer gameplay systems and level interaction mechanics.',
    stack: ['Unity', 'Multiplayer'],
    live: '',
    repo: 'https://github.com/JACKARPANJACK/GFG-2D-Platformer',
  },
  {
    title: 'Genos Unity',
    summary: 'Gameplay prototype emphasizing movement fluidity and high-control player mechanics.',
    stack: ['Unity', 'Movement Tech'],
    live: '',
    repo: 'https://github.com/JACKARPANJACK/Genos_Unity',
  },
  {
    title: 'GENOS BOT (AI Chatbot + Live2D)',
    summary: 'Developed personality-driven conversational features and animated reactions.',
    stack: ['AI', 'Live2D', 'Bot Systems'],
    live: '',
    repo: 'https://github.com/JACKARPANJACK/GENOS_BOT',
  },
  {
    title: 'Sanskrit NLP Bhagavad Gita Explorer',
    summary: 'Collaborative NLP parsing and sentiment analysis system for Sanskrit text exploration.',
    stack: ['NLP', 'Python'],
    live: '',
    repo: 'https://github.com/JACKARPANJACK/Dummy-NLP_Sanskrit_Parser_sentiment_analyser',
  },
]

const mods = [
  {
    title: 'MGRR Genos Moveset',
    summary: 'Custom gameplay mod for Metal Gear Rising: Revengeance.',
    repo: 'https://github.com/JACKARPANJACK/GENOS-MOVESET',
  },
  {
    title: 'Genos Mod - GTA San Andreas',
    summary: 'Character and gameplay modification project.',
    repo: 'https://github.com/JACKARPANJACK/GENOS',
  },
  {
    title: 'Blade Mode Addon - GTA SA',
    summary: 'Ported advanced combat mechanics from MGRR style systems.',
    repo: 'https://github.com/JACKARPANJACK/BLADE-MODE-ADDON-MGRR-FOR-MOD-BY-OCAME',
  },
]

const tacticalReadout = [
  { label: 'Core Temp', value: '67C' },
  { label: 'Frame Sync', value: '98.2%' },
  { label: 'Render Latency', value: '12ms' },
  { label: 'Threat Scan', value: 'Stable' },
]

const commandTags = ['AGILE BUILD', 'COMBAT LOGIC', 'MOBILE DEPLOY', 'API SYSTEMS']

const genosFrames = [
  { label: 'Idle', src: genosIdle },
  { label: 'Blink', src: genosBlink },
  { label: 'Happy', src: genosHappy },
  { label: 'Defensive', src: genosDefensive },
  { label: 'Goofy', src: genosGoofy },
  { label: 'Vengeful', src: genosVengeful },
  { label: 'Sweating', src: genosSweating },
  { label: 'Angry', src: genosAngry },
]

function App() {
  const [pointer, setPointer] = useState({ x: 48, y: 28 })
  const [genosFrameIndex, setGenosFrameIndex] = useState(0)
  const hudTicks = Array.from({ length: 28 })

  const updatePointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    setPointer({ x, y })
  }

  const tiltCard = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y / rect.height) * 2 - 1) * -6
    const rotateY = ((x / rect.width) * 2 - 1) * 6

    event.currentTarget.style.setProperty('--tilt-x', `${rotateX}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${rotateY}deg`)
  }

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  const activeFrame = genosFrames[genosFrameIndex % genosFrames.length]

  useEffect(() => {
    const frameTimer = setInterval(() => {
      setGenosFrameIndex((prev) => (prev + 1) % genosFrames.length)
    }, 3200)

    return () => {
      clearInterval(frameTimer)
    }
  }, [])

  return (
    <div
      className="app-shell"
      style={{ '--pointer-x': `${pointer.x}%`, '--pointer-y': `${pointer.y}%` }}
      onMouseMove={updatePointer}
    >
      <header className="topbar">
        <p className="brand">GENOS // CYBER CORE</p>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#art-2d">2D Art</a>
          <a href="#art-3d">3D Art</a>
          <a href="#animations">Animations</a>
          <a href="#mods">Mods</a>
          <a href="#education">Education</a>
          <a href="#connect">Connect</a>
        </nav>
        <MusicPlayer />
      </header>

      <section className="hero-zone" id="about">
        <div className="opm-hud-overlay" aria-hidden="true">
          <div className="hud-arc hud-arc-top" />
          <div className="hud-arc hud-arc-bottom" />

          <div className="hud-ruler hud-ruler-top">
            {hudTicks.map((_, index) => (
              <span key={`top-tick-${index}`} />
            ))}
          </div>

          <div className="hud-ruler hud-ruler-bottom">
            {hudTicks.map((_, index) => (
              <span key={`bottom-tick-${index}`} />
            ))}
          </div>

          <div className="hud-arrow hud-arrow-down" />
          <div className="hud-arrow hud-arrow-up" />

          <article className="hud-alert-card">
            <p className="hud-alert-label">TACTICAL PHASE</p>
            <h3>TARGET LOST</h3>
            <p>Perception {'>>'} Biological Reaction</p>
          </article>

          <article className="hud-bio-card">
            <p className="hud-alert-label">SAITAMA_SUBRANGE APPROVED</p>
            <h3>Unit: GENOS</h3>
            <p>Status: Combat Ready</p>
            <p>Heat: 67C | Sync: 98.2%</p>
          </article>

          <div className="hud-scope-wrap">
            <div className="hud-scope-ring ring-a" />
            <div className="hud-scope-ring ring-b" />
            <div className="hud-crosshair" />
            <div className="hud-sweep" />
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">SYSTEM ONLINE</p>
          <h1>
            {profile.name}
            <span> Genos-Core Precision</span>
          </h1>
          <p className="role-line">{profile.roles}</p>
          <p className="meta-line">{profile.location}</p>
          <p>
            {summary}
          </p>
          <div className="cta-row" id="connect">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn Profile
            </a>
            <a href={profile.artstation} target="_blank" rel="noreferrer">
              ArtStation
            </a>
            <a href={profile.x} target="_blank" rel="noreferrer">
              Twitter / X
            </a>
          </div>
          <p className="contact-line">
            <span title="Phone">{profile.phone}</span> | <span title="Email">{profile.email}</span>
            <br />
            <span title="Discord" className="discord-id">
              <svg width="18" height="18" viewBox="0 0 20 19" style={{verticalAlign:'middle',marginRight:'0.3em'}}><path fill="#ffce3c" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/></svg>
              {profile.discord}
            </span>
          </p>
        </div>

        <div className="genos-core" aria-hidden="true">
          <p className="core-label">INCINERATION CORE</p>
          <div className="core-ring" />
          <div className="core-ring ring-2" />
          <div className="core-ring ring-3" />
          <div className="core-center" />
        </div>

        <div className="genos-avatar-panel">
          <p className="mode-label">Default Mode</p>

          <div className="genos-avatar-wrap">
            <img src={lockOn2} alt="" className="reticle reticle-back" aria-hidden="true" />
            <img src={lockOn} alt="" className="reticle reticle-mid" aria-hidden="true" />
            <img src={activeFrame.src} alt={`Genos ${activeFrame.label}`} className="genos-avatar" />
            <img src={lockOn3} alt="" className="reticle reticle-front" aria-hidden="true" />
            <img src={lockOnFr} alt="" className="reticle reticle-flash" aria-hidden="true" />
          </div>

          <p className="avatar-status">Expression: {activeFrame.label}</p>
        </div>

        <div className="stats-grid">
          <article>
            <h2>2023</h2>
            <p>Career launch year</p>
          </article>
          <article>
            <h2>10+</h2>
            <p>Public repositories</p>
          </article>
          <article>
            <h2>2 Roles</h2>
            <p>Cybersecurity experience</p>
          </article>
        </div>
      </section>

      <section className="hud-panel" aria-label="Genos tactical panel">
        <div className="hud-grid">
          {tacticalReadout.map((item) => (
            <article key={item.label} className="hud-cell">
              <p>{item.label}</p>
              <h3>{item.value}</h3>
            </article>
          ))}
        </div>
        <div className="command-row">
          {commandTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section id="skills" className="info-board">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="info-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={`${group.title}-${item}`}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="info-board">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {workExperience.map((job) => (
            <article className="timeline-item" key={`${job.role}-${job.duration}`}>
              <p className="timeline-role">{job.role}</p>
              <p className="timeline-org">{job.org}</p>
              <p className="timeline-date">{job.duration}</p>
              <ul>
                {job.points.map((point) => (
                  <li key={`${job.role}-${point}`}>{point}</li>
                ))}
              </ul>
              {job.link ? (
                <a href={job.link} target="_blank" rel="noreferrer" className="mini-link">
                  {job.linkLabel}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="project-grid">
        {projects.map((project) => (
          <article
            className="project-card"
            key={project.title}
            onMouseMove={tiltCard}
            onMouseLeave={resetTilt}
          >
            <p className="card-title">{project.title}</p>
            <p className="card-summary">{project.summary}</p>
            <ul className="stack-list">
              {project.stack.map((tech) => (
                <li key={`${project.title}-${tech}`}>{tech}</li>
              ))}
            </ul>
            <div className="card-actions">
              {project.live ? (
                <a href={project.live} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              ) : (
                <span className="disabled-link">No live demo</span>
              )}
              <a href={project.repo} target="_blank" rel="noreferrer">
                Source Code
              </a>
            </div>
          </article>
        ))}
      </section>

      <section id="mods" className="mod-grid">
        {mods.map((mod) => (
          <article className="mod-card" key={mod.title}>
            <p className="card-title">{mod.title}</p>
            <p className="card-summary">{mod.summary}</p>
            <a href={mod.repo} target="_blank" rel="noreferrer" className="mini-link">
              View Repository
            </a>
          </article>
        ))}
      </section>

      <section id="art-2d" className="info-board media-board">
        <h2 className="section-title">2D Art</h2>
        <div className="asset-grid">
          {twoDArtAssets.map((item) => (
            <article className="asset-card" key={`2d-${item.src}`}>
              <img src={item.src} alt={item.label} className="asset-thumb" loading="lazy" />
              <p className="asset-title">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="art-3d" className="info-board media-board">
        <h2 className="section-title">3D Art</h2>
        <div className="asset-grid asset-grid-3d">
          {threeDArtItems.map((item) => (
            <article className="asset-card" key={item.title}>
              <p className="card-title">{item.title}</p>
              <p className="card-summary">{item.summary}</p>
              <a href={item.link} target="_blank" rel="noreferrer" className="mini-link">
                {item.label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="animations" className="info-board media-board">
        <h2 className="section-title">Animations (From Assets Folder)</h2>
        <div className="asset-grid">
          {animationAssets.map((item) => (
            <article className="asset-card" key={`anim-${item.src}`}>
              {item.isVideo ? (
                <video className="asset-thumb" controls loop muted playsInline preload="metadata">
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img src={item.src} alt={item.label} className="asset-thumb" loading="lazy" />
              )}
              <p className="asset-title">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="education-card">
        <h2 className="section-title">Education</h2>
        <p className="timeline-role">Bachelor of Technology (B.Tech) - Computer Science Engineering</p>
        <p className="timeline-org">Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar</p>
        <p className="timeline-date">Apr 2023 - Apr 2027</p>
      </section>

      <section id="videos" className="video-section">
        <h2 className="section-title">Showcase Videos</h2>
        {videoSections.map((section) => (
          <div className="video-group" key={section.title}>
            <h3>{section.title}</h3>
            <div className="video-list">
              {section.videos.map((vid) => (
                <div key={vid.url} className="video-embed-wrap">
                  <iframe
                    src={toYoutubeEmbedUrl(vid.url)}
                    title={vid.label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    className="video-embed"
                  />
                  <div className="video-embed-label">{vid.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer>
        <p>Ready for your next mission. Reach me at {profile.email}</p>
      </footer>
    </div>
  )
}

export default App
