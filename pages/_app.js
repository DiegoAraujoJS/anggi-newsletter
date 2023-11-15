import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast'
import '../styles/global.css'
import {Playfair_Display} from 'next/font/google'

const playfairDisplay = Playfair_Display({subsets: ['latin']})

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
