import Hero from './hero/Hero';
import Intro from './intro/Intro';
import Lesson from './lesson/Lesson';
import Mindsets from './mindsets/Mindsets';
import Founder from './founder/Founder';
import Faq from './faq/Faq';
import Join from './join/Join';
import SiteFooter from './footer/SiteFooter';
import useReveal from './shared/useReveal';

// Order follows the logo: the student meets the problem, tries a lesson, then walks the four petals to the waitlist.
export default function Site() {
  useReveal();
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <Lesson />
        <Mindsets />
        <Founder />
        <Faq />
        <Join />
      </main>
      <SiteFooter />
    </>
  );
}
