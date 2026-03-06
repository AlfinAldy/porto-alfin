import {Navbar} from './layout/Navbar';
import {Hero} from './section/Hero';
import {Contact} from './section/Contact';
import {Experience} from './section/Experience';
import {Project} from './section/Project';
import {About} from './section/About';
import {Skill} from './section/Skill';
import {Footer} from './layout/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
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
  )
}

export default App;
