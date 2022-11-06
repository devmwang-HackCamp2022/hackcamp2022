import "@styles/globals.css";

import Navbar from "./navbar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head />

            <body className="dark:bg-background">
                <Navbar />

                {children}
            </body>
        </html>
    );
}
