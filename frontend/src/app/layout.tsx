import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "GoldGym Минск — фитнес-оборудование",
    template: "%s · GoldGym Минск",
  },
  description:
    "Поставка и комплектация профессионального фитнес-оборудования в Минске: каталог, проектирование залов, сервис и гарантия.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
