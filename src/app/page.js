import  NavBar  from "../components/NavBar";
import Hero from "../components/Hero"
import { Features } from "@/components/Features";
import Manual from "../components/Manual"
import WhyUs from "@/components/WhyUs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Manual />
      <WhyUs />
      <Contact />
    </>
  );
}
