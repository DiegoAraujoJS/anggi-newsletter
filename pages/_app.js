import { Toaster } from 'react-hot-toast'
import '../styles/global.css'
import {Playfair_Display} from 'next/font/google'
import { useEffect } from 'react'
import useStore from '../store/store'

const playfairDisplay = Playfair_Display({subsets: ['latin']})

export default function App ({Component, pageProps}) {
  const {authenticate} = useStore()
  useEffect(() => {
    authenticate(localStorage.getItem('adminPassword'))
  }, [])
  return (
    <>
      <div className={`${playfairDisplay.className}`}>
        <Component {...pageProps}/>
        <Toaster/>
      </div>
    </>
  )
}
