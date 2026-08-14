import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title:
    "TEKSUM Fast. Affordable. Reliable.",
  description:
    "Buy airtime, data, WAEC pins, NECO tokens, NABTEB pins, NBAIS electricity and cable subscriptions instantly with TEKSUM.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <WhatsAppButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}