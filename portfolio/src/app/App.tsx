import './App.css'
import Hero from '../pages/header'
import Footer from '../pages/footer'
import Companies from "../pages/companies"
import Projects from "../pages/projects"
import Edu from "../pages/edu"
import Stacks from "../pages/stacks"
import Contacts from "../pages/contacts"
import GameOfLife from '../widgets/gameOfLife'
import SphereProjectionBackground from '../widgets/sphereProjection'
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="snap-container h-screen overflow-y-auto overflow-x-hidden">
        <SphereProjectionBackground></SphereProjectionBackground>
        <Hero></Hero>
        <Companies></Companies>
        <section className='relative'>
          <GameOfLife></GameOfLife>
          <Projects></Projects>
          <Edu></Edu>
          <Stacks></Stacks>
          <Contacts></Contacts>
          <Footer></Footer>
        </section>
      </div>
    </BrowserRouter>
  )
}

export default App
