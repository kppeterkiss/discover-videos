import styles from "./navbar.module.css"
import { useRouter } from 'next/router'
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"


const NavBar = (props)=>{
    const router = useRouter()

    const {username}=props
    const [showDrpdown,setShowDropdown] = useState(false)

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
                        <Link href="/login">

                            <a className={styles.linkName} onClick='/login'>Sign out</a>
                        </Link>
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