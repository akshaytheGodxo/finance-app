import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Navbar from "./_components/global/navbar";
import { DotBackgroundDemo } from "./_components/ui/DotBackground";
import { FlipWordsDemo } from "./_components/global/hero-section";
export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="" >
        <Navbar />

        {/* Main Body */}
        <DotBackgroundDemo />
        <FlipWordsDemo />
      </main>
    </HydrateClient>
  );
}
