//import logo from './logo.svg';
/* import './App.css'; */
import './css/CustomCss/CustomCommonCss.css'; //sera accesible desde todos los compoennetes por declararse aqui en la raiz
//la dir de los archivos importados es relativa al dir en el que se encuentra el archivo en el que se escibe

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ListComponent from './components/ListComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import HomePageComponent from './components/HomePageComponent';


function App() {
  return (
    <div>
      <Router>
        <HeaderComponent></HeaderComponent>

        <div className="container">
          <Routes>
            <Route path="/" element={<HomePageComponent />}></Route>
            <Route path="/books" element={<ListComponent />}></Route>
          </Routes>
        
        </div>

        <FooterComponent></FooterComponent>
      </Router>
      
    </div>
  );
}

export default App;
