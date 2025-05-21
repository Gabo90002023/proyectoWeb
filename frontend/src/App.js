import logo from './logo.svg';
import './App.css';
import Header from './Navegadores/Header/Header';
import Footer from './Navegadores/Footer/Footer';
function App() {
  return (
    <>
      <div className="Header"><Header /></div>
      {/* <div className="Footer"><Footer /></div> */}
    </>
    
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Editar <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  );
}

export default App;
