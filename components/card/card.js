import Image from "next/image"
import styles from "./card.module.css"
import { useState } from "react"
import { motion } from "framer-motion"
import cls from "classnames"

const Card = (props) => {

    const { id=1,
        imgUrl ="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80", 
        size = "medium" ,
        shouldScale = true,
    } = props
    const [imgSrc,setImgSrc] = useState(imgUrl)
    const handleOnError =()=>{
        console.log("error")
        setImgSrc("https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2059&q=80")
    }

    const classMap = {
        "large": styles.lgItem,
        "medium": styles.mdItem,
        "small": styles.smItem
    }
    
    const scale = id === 0 ? {scaleY :1.1}: {scale:1.1}  
    const shouldHover = shouldScale && {
        whileHover : { ...scale}
    }
    return (
        <div className={styles.container}>
            <motion.div className={cls(styles.imgMotionWrapper,
            classMap[size])} 
            {...shouldHover}>
                <Image src={imgSrc} alt="image" width="300px" height="300px" layout="fill" className={styles.cardImg} onError={handleOnError} />
                Card
            </motion.div>
        </div>
    )
}
export default Card