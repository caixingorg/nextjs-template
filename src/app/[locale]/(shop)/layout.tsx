export default function LocaleLayout({
    children,
    params: { locale }
  }: {
    children: React.ReactNode;
    params: { locale: string }
  }) {
    return (
      <html lang={locale}>
        <body>
          <main>{children}</main>
        </body>
      </html>
    );
  }