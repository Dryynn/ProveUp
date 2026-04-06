import { Header } from "./components/layout/Header"
import { Hero } from "./components/sections/Hero"

function App() {
  return (

    <div className="min-h-screen bg-proveup-dark text-white font-sans overflow-x-hidden">
      <main className="">

     <Header />
     <Hero />
      </main>
    </div>
  )
}

export default App