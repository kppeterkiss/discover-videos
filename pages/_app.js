import '../styles/globals.css'
import {useEffect,useState} from 'react'
import {magic } from '../lib/magic-client'
import {useRouter} from 'next/router'
import Loading from '../components/loading/loading';

 function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)

  //for code that we want ot run once befoere any of the other codes
  useEffect( async ()=>{
    // const isLoggedIn = await magic.user.isLoggedIn()
    // if(isLoggedIn){
    //   router.push('/')
    // }else{
    //   router.push('/login')

    // }
  },[] ) 

  useEffect(()=>{

    const handleRouteChangeComplete = ()=>{
        setIsLoading(false)
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeComplete)

    return ()=>{
        router.events.off('routeChangeComplete', handleRouteChangeComplete)
        router.events.off('routeChangeError', handleRouteChangeComplete)
    }
},
[])
  return isLoading?<Loading/>:<Component {...pageProps} />
}

export default MyApp
