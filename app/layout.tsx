export const metadata = {
  title: 'V1.0 user-repo smoke',
  description: 'EO MicroSaaS — V1.0 bring-your-own-repo smoke test',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif', background: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
