import styles from "./navbar.module.css"
import { useRouter } from 'next/router'
import Link from "next/link"
import { useState,useEffect } from "react"
import Image from "next/image"
import {magic} from "../../lib/magic-client"



const NavBar =  ()=>{
    const router = useRouter()
    useEffect(async ()=>{
        try {
            const { email, publicAddress } = await magic.user.getMetadata();
            const didToken = await magic.user.getIdToken()
            console.log({email})
            console.log({didToken})
            if (email){
                setUsername(email)
            }
          } catch (error){
            // Handle errors if required!
            console.log('error retrieving email',error)
          }
    },[])
   
    const [showDrpdown,setShowDropdown] = useState(false)
    const [username,setUsername] = useState('')

    const handleOnClickHome=(e)=>{
        e.preventDefault()
        router.push("/")


    }
    const handleOnClickMyList=(e)=>{
        e.preventDefault()
        router.push("/browse/my-list")


    }

    const handleShowDropdown=(e)=>{
        e.preventDefault()
        setShowDropdown(!showDrpdown)
    }


    const handleSignOut= async (e)=>{
        e.preventDefault()
        try {
            await magic.user.logout();
            console.log(await magic.user.isLoggedIn()); // => `false`
            router.push('/login')
        } catch (error){
            // Handle errors if required!
            console.log('error logging out',error)
            router.push('/login')

          }
    }
    return (<div className={styles.container}>
        <div className={styles.wrapper}>
            <a className={styles.logoLink} href="/">
                <div className={styles.logoWrapper}>
                    <Image src="/static/netflix.svg" alt="Netflix logo" width="128px" height="34px"/>
                </div>
            </a>           
        <ul className={styles.navItems}>
            <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
            <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
        </ul>
        <nav className={styles.navContainer}>
            <div>
                
                <button className={styles.usernameBtn} onClick={handleShowDropdown}><p className={styles.username}>{username}</p> <Image src="/static/expand_more.svg" alt="Expand dropdown" width="24px" height="24px"/></button>
                {showDrpdown && (<div className={styles.navDropdown}>
                    <div>
                        
                            <a className={styles.linkName} onClick={handleSignOut}>Sign out</a>

                        
                    <div className={styles.lineWrapper}></div>

                    </div>
                </div>)}
            </div>
        </nav>
        </div>
    
    </div>
    )

}

export default NavBar