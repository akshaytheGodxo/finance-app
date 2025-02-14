import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import AppSidebar from "./page"
import MainDashboard from "./main-dash"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="bg-[#2b2b2b]">
      <AppSidebar />
      <main className="">
        <MainDashboard />
        {children}
      </main>
    </SidebarProvider>
  )
}
