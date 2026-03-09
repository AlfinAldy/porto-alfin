import { useState } from 'react';
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
import {Loading} from './components/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Loading onLoadingComplete={handleLoadingComplete} />
      <div className={`transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Background />
        <ScrollSmoother speed={1.2}>
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
      </div>
    </>
  )
}

export default App;

