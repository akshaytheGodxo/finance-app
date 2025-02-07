import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Navbar from "./_components/ui/navbar";
import Header from "./_components/ui/hero";
import LogoScroll from "./_components/ui/hero2";
import InfoCards from "./_components/ui/hero3";
import ReviewSection from "./_components/ui/hero4";
import AccordionSection from "./_components/ui/hero5";
export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="" suppressHydrationWarning={true}>
        <Navbar />
        <Header />
        <LogoScroll />
        <InfoCards />
        <ReviewSection />
        <AccordionSection />
      </main>
    </HydrateClient>
  );
}
