import { Toaster } from 'react-hot-toast'
import '../styles/global.css'
import {NextUIProvider} from '@nextui-org/react'
import {Playfair_Display} from 'next/font/google'

const playfairDisplay = Playfair_Display({subsets: ['latin']})

export default function App ({Component, pageProps}) {
  return (
    <>
      <NextUIProvider>
        <main className={`bg-background ${playfairDisplay.className}`}>
          <Component {...pageProps}/>
          <Toaster/>
        </main>
      </NextUIProvider>
    </>
  )
}
