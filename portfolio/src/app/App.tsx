import './App.css'
import ProjectList from '../pages/projectList'
import Hero from '../pages/header'
import About from '../pages/about'
import Footer from '../pages/footer'
import TopProjects from '../pages/TopProjects';
import Companies from "../pages/companies";
import Projects from "../pages/projects";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Hero></Hero>
      <Companies></Companies>
      <Projects></Projects>
      <TopProjects></TopProjects>
      <About></About>
      <ProjectList></ProjectList>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
