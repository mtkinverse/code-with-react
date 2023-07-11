import Comp from "./components/Comp";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <Navbar/>
      <div className='container my-2'>
        <h1>Heello worlds</h1>
      </div>
      <Comp />
    </>
  );
}

export default App;
