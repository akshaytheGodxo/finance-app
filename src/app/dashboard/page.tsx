import { Calculator, Calendar, ChartArea, Home, Inbox, Newspaper, Search, Settings, UserRoundPen, Gamepad, Star } from "lucide-react"
import { auth } from "~/server/auth"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "~/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  
  {
    title: "Trends",
    url: "/trends",
    icon: ChartArea,
  },

  {
    title: "News",
    url: "/news",
    icon: Newspaper,
  },
  {
    title: "Take Quiz",
    url: "/games",
    icon: Gamepad,
  }
  ,{
    title: "Calculate Returns",
    url: "returns-calculator",
    icon: Calculator,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Star
  }
]

export default async function AppSidebar() {
  const session = await auth();
  const userName = session?.user.name;
  return (
    <div className="">
    <Sidebar>
      <SidebarContent className="bg-[#1a1a1a]">
        <SidebarGroup className="mt-2 ">
          <SidebarGroupLabel className="text-white font-poppins text-2xl mb-8">Pookie Wallet</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-white font-poppins">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto bg-[#121212]">

          <SidebarGroupLabel className=" flex flex-row gap-4">
            <label><UserRoundPen color="white"/></label>
            <h2 className="text-white font-poppins inline">{userName?.toUpperCase()}</h2></SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  

    </div>
  )
}
