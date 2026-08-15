import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "TEKSUM — VTU & Digital Services",
  description:
    "Buy airtime, data, education services, pay bills and access digital services with TEKSUM.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}