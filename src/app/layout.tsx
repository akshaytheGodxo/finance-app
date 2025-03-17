import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
export const metadata: Metadata = {
  title: "Wallet App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/wallet.webp" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-[#2b2b2b]">
          < >
          <TRPCReactProvider>
            {children}
          </TRPCReactProvider>
          </>
      </body>
    </html>
  );
}
