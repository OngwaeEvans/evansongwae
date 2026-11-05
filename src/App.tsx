import { useCallback, useState } from 'react';
import { sections, type SectionId } from './data/content';
import { useActiveSection } from './lib/hooks';
import { CommandBar, MobileNavigation, NavigationRail } from './components/layout';
import { HeroSection } from './components/Hero';
import { IntroductionSection, ManifestoSection, PhilosophySection } from './components/Identity';
import { DivisionExplorer } from './components/Divisions';
import { ProjectDetailDrawer, ProjectRegistry } from './components/Projects';
import { MediaSection } from './components/Media';
import { AchievementTimeline, ContactHub, Footer, PartnershipPortal, VisionSection } from './components/Closing';
import { ConsoleDrawer } from './components/ConsoleDrawer';
import { Boundary, ScrollProgress } from './components/shared';

const ids = sections.map((s) => s.id);

export default function App() {
  const active = useActiveSection(ids) as SectionId;
  const [project, setProject] = useState<string | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const openConsole = useCallback(() => setConsoleOpen(true), []);
  const closeProject = useCallback(() => setProject(null), []);
  const closeConsole = useCallback(() => setConsoleOpen(false), []);
  return (
    <>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-16 focus:z-[100] focus:bg-cobalt focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <ScrollProgress />
      <CommandBar active={active} onConsole={openConsole} />
      <NavigationRail active={active} />
      <MobileNavigation active={active} onConsole={openConsole} />
      <main className="lg:pl-[212px]">
        <HeroSection />
        <Boundary name="Introduction"><IntroductionSection /></Boundary>
        <Boundary name="Philosophy"><PhilosophySection /><ManifestoSection /></Boundary>
        <Boundary name="Hevloys Group"><DivisionExplorer onOpenProject={setProject} /></Boundary>
        <Boundary name="Projects"><ProjectRegistry onOpen={setProject} /></Boundary>
        <Boundary name="Media"><MediaSection /></Boundary>
        <Boundary name="Vision"><VisionSection /></Boundary>
        <Boundary name="Achievements"><AchievementTimeline /></Boundary>
        <section aria-label="Console mode" className="mx-auto max-w-app px-5 md:px-10">
          <button onClick={openConsole} className="group flex w-full items-center justify-between border hairline bg-panel p-6 text-left hover:border-cobalt md:p-10">
            <span><span className="label text-cobalt">Console mode</span><span className="mt-2 block font-display text-3xl md:text-5xl font-extrabold uppercase">Open the engineering environment</span><span className="mt-2 block text-sm text-mute">The hardware, tools and constraints behind every experiment.</span></span>
            <span className="font-display text-4xl transition-transform group-hover:translate-x-2">→</span>
          </button>
        </section>
        <Boundary name="Partnerships"><PartnershipPortal /></Boundary>
        <ContactHub />
        <Footer />
      </main>
      <ProjectDetailDrawer id={project} onClose={closeProject} onOpen={setProject} />
      <ConsoleDrawer open={consoleOpen} onClose={closeConsole} />
    </>
  );
}
