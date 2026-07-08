import { headers } from "next/headers";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "sk";

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,600,500,400&f[]=general-sans@700,600,500,400&display=swap"
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
