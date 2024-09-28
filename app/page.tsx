import { Hero } from "@/components/landingPage/Hero";
export const runtime = "edge";
export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <Hero />
    </main>
  );
}
