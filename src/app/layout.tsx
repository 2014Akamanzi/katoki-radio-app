import "./globals.css";

export const metadata = {
  title: "Katoki Radio",
  description: "Katoki Radio — A Touch of Ubuntu",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
