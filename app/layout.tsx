import "./globals.css";
import "@/styles/portfolio.css";

export const metadata = {
  title: "Paras Rana",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}