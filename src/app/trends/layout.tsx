import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"


import AppSidebar from "../dashboard/page"
import TrendsPage from "./page"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#0f172a]">
      <AppSidebar />
      <main className="w-full">
        <TrendsPage />
        {children}
      </main>
    </SidebarProvider>
  )
}
