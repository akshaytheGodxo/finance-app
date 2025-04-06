import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "../dashboard/page"
import NewsPage from "./page"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#1a1a1a]">
      <AppSidebar />
      <main className="w-full">
        <NewsPage />
        {children}
      </main>
    </SidebarProvider>
  )
}
