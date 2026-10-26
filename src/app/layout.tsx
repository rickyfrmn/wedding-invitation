import type { Metadata } from "next";
import "./globals.css";
import "./ornaments.css";
export const metadata: Metadata = {
  title: "The Wedding of Nazzil & Tiara",
  description: "Undangan pernikahan Nazzil Romadhoni dan Tiara Faikha Suci",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
