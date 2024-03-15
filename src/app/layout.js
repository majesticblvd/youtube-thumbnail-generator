import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { GoogleTagManager} from '@next/third-parties/google'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Thumbnail Generator",
  description: "Custom thumbnail generator for your YouTube videos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Analytics />
      <body className={inter.className}>{children}</body>
      <GoogleTagManager gaId='G-66L5NS52KX' />
    </html>
  );
}
