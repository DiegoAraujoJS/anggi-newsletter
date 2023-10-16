import { Toaster } from 'react-hot-toast'
import '../styles/global.css'
import {NextUIProvider} from '@nextui-org/react'

export default function App ({Component, pageProps}) {
  return (
    <NextUIProvider>
    <>
      <Component {...pageProps}/>
      <Toaster/>
    </>
    </NextUIProvider>
  )
}
