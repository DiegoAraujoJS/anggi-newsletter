import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast'
import '../styles/global.css'
import {Playfair_Display, Cormorant_Garamond} from 'next/font/google'

const playfairDisplay = Cormorant_Garamond({subsets: ['latin'], weight: "500"})

export default function App ({Component, pageProps}) {
  return (
    <>
      <div className={`${playfairDisplay.className}`}>
        <Component {...pageProps}/>
        <Toaster/>
        <Analytics/>
      </div>
    </>
  )
}
