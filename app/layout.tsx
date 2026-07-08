import type { Metadata } from "next";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Momentum Events | Eventová agentúra",
  description:
    "Organizujeme športové podujatia, teambuildingy a súkromné oslavy. Od konceptu po posledného hosťa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&f[]=general-sans@700,600,500,400&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
