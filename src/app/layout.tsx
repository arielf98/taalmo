import type { Metadata } from "next";
import "./globals.css";
import "@xyflow/react/dist/style.css";
export const metadata: Metadata = {
  title: {
    default: "Taalmo — Make learning come alive.",
    template: "%s · Taalmo",
  },
  description:
    "Learn software engineering by experimenting. Break systems, inspect what happened, and build a deeper understanding.",
};
const themeScript = `try{const t=localStorage.getItem('taalmo.theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
