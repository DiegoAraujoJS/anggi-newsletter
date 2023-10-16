import { Toaster } from 'react-hot-toast'
import '../styles/global.css'
import {Playfair_Display} from 'next/font/google'

const playfairDisplay = Playfair_Display({subsets: ['latin']})

export default function App ({Component, pageProps}) {
  return (
    <>
      <div data-theme="dark" className={`h-screen ${playfairDisplay.className}`}>
        <Component {...pageProps}/>
        <Toaster/>
      </div>
      
    </>
  )
}
