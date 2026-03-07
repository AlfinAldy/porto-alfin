import {Navbar} from './layout/Navbar';
import {Hero} from './section/Hero';
import {Contact} from './section/Contact';
import {Experience} from './section/Experience';
import {Project} from './section/Project';
import {About} from './section/About';
import {Skill} from './section/Skill';
import {Footer} from './layout/Footer';
import {Background} from './components/Background';
import {ScrollSmoother} from './components/ScrollSmoother';

function App() {
  return (
    <>
      <Navbar />
      <ScrollSmoother speed={1}>
        <Background />
        <div className="min-h-screen">
          <main>
            <Hero />
            <About />
            <Skill />
            <Project />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </ScrollSmoother>
    </>
  )
}

export default App;

