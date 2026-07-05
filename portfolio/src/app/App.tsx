import './App.css'
import ProjectList from '../pages/projectList'
import Hero from '../pages/header'
import About from '../pages/about'
import Footer from '../pages/footer'
import TopProjects from '../pages/TopProjects';

function App() {
  return (
    <>
      <Hero></Hero>
      <TopProjects></TopProjects>
      <About></About>
      <ProjectList></ProjectList>
      <Footer></Footer>
    </>
  )
}

export default App
