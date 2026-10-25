import type { Metadata } from "next";
import "./globals.css";
import "./ornaments.css";
export const metadata: Metadata = {
  title: "The Wedding of Nazil & Tiara",
  description: "Undangan pernikahan Nazil Romadhoni dan Tiara Faika Suci",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
