import  NavBar  from "../components/NavBar";
import Hero from "../components/Hero"
import { Features } from "@/components/Features";
import Manual from "../components/Manual"

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <Features />
      <Manual />
    </>
  );
}
