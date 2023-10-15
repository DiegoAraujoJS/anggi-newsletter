import { Toaster } from 'react-hot-toast'
import '../styles/global.css'

export default function App ({Component, pageProps}) {
  return (
    <>
      <Component {...pageProps}/>
      <Toaster/>
    </>
  )
}
