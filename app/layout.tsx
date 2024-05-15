import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/AuthContext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Furnded Home',
  description: 'Best Way To Save',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Script
            id="smartsupp-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var _smartsupp = _smartsupp || {};
                _smartsupp.key = 'a175b9f43a51b985cbd38d27c91dec83677a5d10';
                window.smartsupp||(function(d) {
                  var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
                  s=d.getElementsByTagName('script')[0];c=d.createElement('script');
                  c.type='text/javascript';c.charset='utf-8';c.async=true;
                  c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
                })(document);
              `,
            }}
          />
        </body>
      </html>
    </AuthProvider>
  )
}
