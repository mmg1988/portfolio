'use client'

import { useEffect, useRef } from 'react';
import styles from "./page.module.scss";
import jobs from './jobs';
import skills from './skills';
import Image from 'next/image';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection);
    if (containerRef.current)
      containerRef.current.querySelectorAll(`.${styles.animate}`).forEach(elem => observer.observe(elem));

    return () => {
      observer.disconnect();
    }
  }, [containerRef]);

  const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.enter);
        observer.unobserve(entry.target);
      }
    })
  };

  return (
    <div ref={containerRef} className={styles.page}>
      <section className={`${styles.section} ${styles.animate}`}>
        <div className={`${styles.hello_section_wrapper} box`}>
          <nav className={styles.nav}>
            <ul>
              <li><a href={'#work'}>Work</a></li>
              <li><a href={'#samples'}>Samples</a></li>
              <li><a href={'#about'}>About</a></li>
              <li><a href={'#contact'}>Contact</a></li>
            </ul>
          </nav>
          <div className={`${styles.hello_section}`}>
            <div className={styles.bubble_picture}>
              <Image src="/profile.png" alt="Mariano Gonzalez" width={256} height={256} priority />
            </div>
            <main>
              <div>
                <h1 className={styles.title_1}>Hi</h1>
                <h1 className={styles.title_2}>I'm <span className={styles.gradient_name}>Mariano Gonzalez</span></h1>
                <h2 className={styles.title_4}>
                  <span className={styles.text}>Software </span>
                  <span className={`${styles.text} ${styles.nowrap}`}>Engineer <span className={styles.cursor}></span></span>
                </h2>
              </div>
              <p className={styles.text}>
                Passionate self-taught <span className={'highlight'}>Full Stack</span> Developer with extensive experience on .NET technologies, <span className={'highlight'}>Frontend</span> frameworks (such as <span className={'highlight'}>Angular</span> and <span className={'highlight'}>React</span>), <span className={'highlight'}>UI/UX</span> skills and cloud environments.
              </p>
              <div className={'flex gap-4 flex-wrap align-center justify-end'}>
                <a className={styles.contact_link} href={'mailto:mmg1988@gmail.com'}>
                  <Image src={'https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg'} alt={'Gmail'} width={64} height={64} />
                </a>
                <a className={styles.contact_link} href={'https://www.linkedin.com/in/mariano-gonzalez-576b8650/'} target={'_blank'}>
                  <Image src={'https://www.vectorlogo.zone/logos/linkedin/linkedin-tile.svg'} alt={'LinkedIn'} width={64} height={64} />
                </a>
                <a className={styles.contact_link} href={'https://github.com/mmg1988/'} target={'_blank'}>
                  <Image src={'https://www.vectorlogo.zone/logos/github/github-tile.svg'} alt={'GitHub'} width={64} height={64} />
                </a>
                <div className={'flex-item'}></div>
                <a className={styles.button} href={'/resume - Mariano Gonzalez.pdf'} target="_blank">Resume</a>
              </div>
            </main>
          </div>
        </div>
      </section>
      <section id={'work'} className={styles.section}>
        <header className={`text-center ${styles.animate}`}>
          <h1 className={styles.subtitle}>Follow me through my</h1>
          <h1 className={styles.title_3}>
            <span className={styles.neon_title}>Professional journey</span>
          </h1>
        </header>
        <main>
          {jobs.map((job, i) => (
            <div key={i} className={`${styles.job_card} ${styles.animate}`}>
              <header>
                <div className={styles.title_1}>{job.company}</div>
                <div className={'body-1'}>{job.date}</div>
              </header>
              <main className={'box'}>
                <h2 className={styles.title_2}>{job.title}</h2>
                <p>{job.description}</p>
                <ul>
                  {job.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <div className={'flex gap-1 flex-wrap'}>
                  {job.stack.map(tag => (
                    <div key={tag} className={styles.tag}>{tag}</div>
                  ))}
                </div>
              </main>
            </div>
          ))}
        </main>
      </section>
      <section id={'samples'} className={`${styles.section} ${styles.animate}`}>
        <header className={`text-center ${styles.animate}`}>
          <h1 className={styles.subtitle}>Play together on the</h1>
          <h1 className={styles.title_3}>
            <span className={styles.neon_title}>Playground</span>
          </h1>
        </header>
        <main>
          <p className={`text-center`}>
            Some cool components and stuff I worked for learning and sharing.
          </p>
          <div className={'flex gap-2 justify-center'}>
            <a className={`${styles.sample_card} box`} href={'/samples/pokedex'} target={'_blank'}>
              <header className={styles.pokedex}>
                <Image src={'/pokemon-logo.svg'} alt={'pokemon'} width={100} height={100} />
              </header>
              <main>
                <div className={styles.title_1}>Pokedex</div>
                <p>
                  Responsive website for listing all pokemon, look their abilities, stats, etc.<br />
                  It's designed with a glassmorphism style and flip cards as animated effect!
                </p>
              </main>
            </a>
            <a className={`${styles.sample_card} box`} href={'/samples/ai-table'} target={'_blank'}>
              <header className={styles.ai_data_gen}>
                <i className={'material-symbols-outlined'}>network_intelligence</i>
              </header>
              <main>
                <div className={styles.title_1}>AI DataGen</div>
                <p>
                  A data generation tool for random real data based on user prompt.<br />
                  It's using OpenAI api to generate a JSON that then it's converted in a table
                </p>
              </main>
            </a>
          </div>
        </main>
      </section>
      <section id={'about'} className={`${styles.section} ${styles.animate} flex-column gap-4`}>
        <div className={'box'}>
          <header className={`text-center ${styles.animate}`}>
            <h1 className={styles.subtitle}>A little bit more</h1>
            <h1 className={styles.title_3}>
              <span className={styles.neon_title}>About me</span>
            </h1>
          </header>
          <main>
          <p className={styles.text}>
              I'm a <span className={'highlight'}>Full Stack Developer</span> with <span className={'highlight'}>14+ years of experience</span> building <span className={'highlight'}>scalable, high-performance web applications</span>.
              With deep expertise in <span className={'highlight'}>.NET, modern Frontend frameworks, and cloud technologies</span>, I love tackling complex challenges—whether it's optimizing system architecture, enhancing UI/UX, or implementing DevOps best practices.
            </p>
            <p className={styles.text}>
              Over the years, I've led projects, mentored teams, and designed solutions that make an impact.
              I thrive in agile environments, collaborating with cross-functional teams to turn ideas into reality.
            </p>
            <p className={styles.text}>
              I hold a <span className={'highlight'}>Bachelor's degree in Software Engineering</span> from Universidad Tecnológica Nacional FRBA, where I built a strong foundation in software architecture, database management, and system design.
              Always eager to learn and grow, I stay up to date with the latest tech trends to keep delivering <span className={'highlight'}>efficient, maintainable, and innovative solutions</span>.
            </p>
          </main>
        </div>
        <p className={`${styles.subtitle} text-center`}>I'm constantly improving my stack</p>
        <div className={'flex gap-1 flex-wrap justify-center headline-6'}>
          {skills.map(skill => (
            <div key={skill.name} className={styles.tag}>
              {skill.icon && <Image src={skill.icon} alt={skill.name} width={24} height={24} />}
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </section>
      <section id={'contact'} className={`${styles.section} ${styles.animate}`}>
        <main>
          <p className={`${styles.text} text-center`}>
            Feel free to reach out to me for any inquiries or collaboration opportunities.
          </p>
          <div className={'flex gap-4 flex-wrap justify-center'}>
            <a className={styles.contact_link} href={'mailto:mmg1988@gmail.com'}>
              <Image src={'https://www.vectorlogo.zone/logos/gmail/gmail-icon.svg'} alt={'Gmail'} width={64} height={64} />
            </a>
            <a className={styles.contact_link} href={'https://www.linkedin.com/in/mariano-gonzalez-576b8650/'} target={'_blank'}>
              <Image src={'https://www.vectorlogo.zone/logos/linkedin/linkedin-tile.svg'} alt={'LinkedIn'} width={64} height={64} />
            </a>
            <a className={styles.contact_link} href={'https://github.com/mmg1988/'} target={'_blank'}>
              <Image src={'https://www.vectorlogo.zone/logos/github/github-tile.svg'} alt={'GitHub'} width={64} height={64} />
            </a>
          </div>
        </main>
      </section>
    </div>
  );
}
