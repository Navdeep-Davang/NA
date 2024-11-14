import type { Metadata } from "next";
import "../styles/globals.css"; // Import the globals.css
import { ThemeProvider } from "@/lib/components/ThemeProvider/ThemeProvider";


export const metadata: Metadata = {
    title: "Quick Note",
    description: "Take quick Notes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased">
                {/* Wrap children with the ThemeProvider */}
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
