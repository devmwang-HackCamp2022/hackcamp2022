import "@styles/globals.css";

import { AnalyticsWrapper } from "@app/analytics";
import Navbar from "@app/navbar";

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

                <AnalyticsWrapper />
            </body>
        </html>
    );
}
