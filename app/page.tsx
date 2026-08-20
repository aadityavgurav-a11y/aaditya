import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";

const WorkList = dynamic(() => import("@/components/WorkList"), { 
  ssr: true, // Needs SSR for SEO of titles/links
});

export default function Home() {
  return (
    <main>
      <Hero />
      <WorkList />
      <About />
      <Footer />
    </main>
  );
}
