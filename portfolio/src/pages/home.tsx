import Hero from '../widgets/hero'
import Footer from '../widgets/footer'
import Companies from "../widgets/companies"
import Projects from "../widgets/projects"
import Edu from "../widgets/edu"
import Stacks from "../widgets/stacks"
import Contacts from "../widgets/contacts"
import GameOfLife from '../widgets/gameOfLife'
import SphereProjection from '../widgets/sphereProjection'

const Home = () => 
    <div className="snap-container h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky w-screen h-screen overflow-hidden inset-0 z-[-1]">
            <SphereProjection/>
        </div>
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

export default Home;