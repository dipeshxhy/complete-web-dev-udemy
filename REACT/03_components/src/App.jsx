import Card from './components/Card';
import CTA from './components/CTA';
import Header from './components/Header';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-black text-white p-4 min-h-screen  ">
      <Navbar />
      <Header />
      <Hero />
      <div className="flex flex-wrap gap-4 max-w-7xl mx-auto bg-black">
        <Card />
        <Card title="Buy python Course" buttonLabel="Buy now" />
        <Card title="Buy JavaScript Course" buttonLabel="Join now" />
      </div>
      <CTA />
    </div>
  );
}

export default App;
