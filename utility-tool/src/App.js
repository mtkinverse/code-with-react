import AddValues from './components/AddValues';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className='clear-both'></div>
      <section id='home'>
        <Home />
        <AddValues />
      </section>
    </>
  );
}

export default App;
