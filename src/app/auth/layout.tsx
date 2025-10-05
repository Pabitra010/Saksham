import SupabaseProvider from "@/components/providers/SupabaseProvider";
import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <SupabaseProvider>
                    <div className="min-h-screen bg-gray-100 flex flex-col  z-60">
                        {children}
                    </div>
                </SupabaseProvider>
            </body>
        </html>
    );
}