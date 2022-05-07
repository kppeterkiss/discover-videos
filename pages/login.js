import Head from "next/head"
import styles from "../styles/Login.module.css"
import Image from "next/image"
import { useState } from "react";
import { useRouter } from "next/router";
import {magic} from '../lib/magic-client'
import { useEffect } from "react/cjs/react.development";

const Login = () => {
    const router = useRouter()
    const [userMsg, setUserMsg] = useState('')
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

     
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

    const handleLoginWithEmail = async (e) => {
        e.preventDefault()
        if (email) {
  
                //route to dashboard
                //console.log('route to dashboard')
                // log in a user by their email

                try {
                    setIsLoading(true)

                    const didToken = await magic.auth.loginWithMagicLink({ email });
                    if (didToken){
                        const response = await fetch('/api/login',{
                            method: 'POST',
                            headers:{
                                'Authorization': `Bearer ${didToken}`,
                                'Content-type': 'application/json',

                            }
                        })
                        const loggedInResponse = await response.json()
                        if(loggedInResponse.done){
                            router.push("/")
                        }
                        else{
                            setIsLoading(false)
                            setUserMsg("something went wrong logging in")
                        }
                    }
                } catch (error) {
                    console.log('Something went wrong logging in',error)
                    setIsLoading(false)

                    // Handle errors if required!
                
                }
        } else {
            setIsLoading(false)
 
            setUserMsg('Enter a valid email address')
        }
    }
    const handleOnChangeEmail = (e) => {
        setUserMsg('')
        const email = e.target.value
        setEmail(email)
    }


    return (<div className={styles.container}><Head>
        <title>Netflix SignIn</title>
    </Head>
        <header className={styles.header}>
            <div className={styles.headerWrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        <Image src="/static/netflix.svg" alt="Netflix logo" width="128px" height="34px" />
                    </div>
                </a>
            </div>
        </header>

        <main className={styles.main}>
            <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In</h1>
                <input type="text" placeholer="Email address" className={styles.emailInput} onChange={handleOnChangeEmail}></input>
                <p className={styles.userMsg}>{userMsg}</p>
                <button onClick={handleLoginWithEmail} className={styles.loginBtn}>{isLoading?'Loading..':'Sign In'}</button>
            </div>
        </main>
    </div>)
}

export default Login