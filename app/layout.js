import { Toaster } from "sonner";
import "./globals.css";

export const metadata = {
  title: "DealDrop",
  description: "Created by Devraj Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
