import { Hero } from "@/components/Hero";
import Nav from "@/components/Nav";
export const runtime = "edge";
export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <Nav />
      <Hero />
    </main>
  );
}
