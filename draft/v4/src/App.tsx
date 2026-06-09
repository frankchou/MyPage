import './index.css';
import Hero from './sections/Hero';
import About from './sections/About';
import Features from './sections/Features';

function App() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <Features />
    </main>
  );
}

export default App;
