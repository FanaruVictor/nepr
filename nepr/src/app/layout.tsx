import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import Header from "./components/header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <ClerkProvider>
      <html lang="en">
        <body>
          {/* The fixed header */}
          <Header />
          
          {/* Main content starts below the header */}
          <div className="max-w-4xl w-full mx-auto pb-4 pt-20" >{children}</div>

        </body>
      </html>
    </ClerkProvider>
  );
}
