import { Header } from "../components/layout/Header";
import { FeaturesBar } from "../components/sections/featuresBar";
import { Hero } from "../components/sections/hero";


export function LandingPage() {
    return (
        <div className="min-h-screen bg-proveup-dark text-white font-sans overflow-x-hidden">
            <main className="">
                <Header />
                <Hero />
                <FeaturesBar />
            </main>
        </div>
    );
}