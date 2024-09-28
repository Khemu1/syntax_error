import { Hero } from "@/components/coursePage/Hero";
export const runtime = "edge";
export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <Hero />
    </main>
  );
}
