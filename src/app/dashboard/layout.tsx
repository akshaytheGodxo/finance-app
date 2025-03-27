import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "./page"
import MainDashboard from "./main-dash"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#1a1a1a]">
      <AppSidebar />
      <main className="w-full">
        <MainDashboard />
        {children}
      </main>
    </SidebarProvider>
  )
}
