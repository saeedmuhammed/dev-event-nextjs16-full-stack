import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import LightRays from "@/components/LightRays";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Event",
  description:
    "Your Ultimate Dev Event Hub - Discover Hackathons, Meetups, and Conferences All in One Place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div
          style={{
            width: "100%",
            height: "800px",
            position: "absolute",
            zIndex: -1,
          }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={3}
            rayLength={3}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.01}
            distortion={0}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1}
            saturation={1}
          />
        </div>
        <Nav />
        <section className="site-shell">{children}</section>
      </body>
    </html>
  );
}
