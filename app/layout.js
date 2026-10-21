import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import FloatingMobileCart from "@/components/FloatingMobileCart";
import BackgroundFireworks from "@/components/BackgroundFireworks";
import Toast from "@/components/Toast";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Atharva Fireworks | Diwali Crackers Collection 2026",
  description: "Atharva Fireworks – Colorful Diwali crackers collection 2026. Sparklers, flower pots, ground chakkers, aerial multi-shots & fancy fireworks. Order directly on WhatsApp.",
  keywords: "Atharva Fireworks, Diwali Crackers 2026, Sivakasi Crackers, Sparklers, Flower Pots, WhatsApp Crackers Order",
  authors: [{ name: "Atharva Fireworks" }],
  openGraph: {
    title: "Atharva Fireworks | Diwali Crackers Collection 2026",
    description: "Premium Sivakasi Diwali crackers collection 2026. 10 categories, 50+ items, instant WhatsApp order.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport = {
  themeColor: "#070712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
          <BackgroundFireworks />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingMobileCart />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
