import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "../dashboard/page";
import QuizGame from "./page";
export default function Layout({children} : {children : React.ReactNode}) {
    return (
        <SidebarProvider className="bg-[#2b2b2b]">
            <AppSidebar />
            <main className="">
                <QuizGame />
                {children}
            </main>
        </SidebarProvider>
    )
}