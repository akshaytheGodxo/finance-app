import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Navbar from "./_components/ui/navbar";
import Header from "./_components/ui/hero";
export default async function Home() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="">
        <Navbar />
        <Header />
      </main>
    </HydrateClient>
  );
}
