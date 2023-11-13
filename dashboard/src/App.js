import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Container from "./components/layout/Container";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import NewProject from "./components/pages/NewProject";
function App() {
  return (
      <Router>
          <ul>
              <Link to ="/">Home</Link>
              <Link to ="/contact">Contato</Link>
              <Link to ="/company">Empresa</Link>
              <Link to ="/newProject">Novo Projeto</Link>
          </ul>
              <Container customClass="min-height">
                  <Routes>
                      <Route exact path="/" element={<Home/>}/>
                      <Route path="/company" element={<Company/>}/>
                      <Route path="/contact" element={<Contact/>}/>
                      <Route path="/newProject" element={<NewProject/>}/>
                  </Routes>
              </Container>
          <p>Footer</p>
      </Router>
  );
}

export default App;
