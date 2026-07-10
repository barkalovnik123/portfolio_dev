import './App.css'
import Hero from '../pages/header'
import Footer from '../pages/footer'
import Companies from "../pages/companies";
import Projects from "../pages/projects";
import Edu from "../pages/edu";
import Stacks from "../pages/stacks";
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Hero></Hero>
      <Companies></Companies>
      <Projects></Projects>
      <Edu></Edu>
      <Stacks></Stacks>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
