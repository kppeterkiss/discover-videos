
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import styles from '../../styles/Video.module.css'
import clsx from 'classnames'
import { getYoutubeVideoById } from '../../lib/videos'
import NavBar from '../../components/nav/navbar'
import Like from '../../components/icons/like-icon'
import DisLike from '../../components/icons/dislike-icon'
import { useState,useEffect } from 'react'

Modal.setAppElement('#__next');



export async function getStaticProps(context) {

    // const video = {
    //     title: 'Hi cute dog',
    //     publishTime: '1990-01-01',
    //     description: 'A big red dog that is super cute, can he get any bigger?',
    //     channelTitle: 'Paramount Pictures',
    //     viewCount: 10000

    // } 
    const videoId = context.params.videoId
    const videoArray = await getYoutubeVideoById(videoId)

    return {
        props: {
            video: videoArray.length > 0 ? videoArray[0] : {},
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}
export async function getStaticPaths() {
    const listOfVideos = ['HxtLlByaYTc', '4zH5iYM4wJo', 'mYfJxlgR2jw']

    // Get the paths we want to pre-render based on posts
    const paths = listOfVideos.map((videoId) => ({
        params: { videoId },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' }
}

const Video = ({ video }) => {

    const [toggleLike, setToggleLike] = useState(false)
    const [toggleDislike, setToggleDislike] = useState(false)
    const router = useRouter()
    const videoId = router.query.videoId

    const { title, description, publishTime, channelTitle, statistics: { viewCount } = { viewCount: 0 } } = video

    const handleToggleLike = async () => {
        console.log('handleToggleLike')

        const val = !toggleLike
        setToggleLike(val)
        setToggleDislike(toggleLike)

        const favourited = val ? 1 : 0
        const response = await runRatingService(favourited)
        console.log("data", await response.json())
    };
    useEffect(async ()=>{ 
        const response = await fetch(`/api/stats?videoId=${videoId}`)
        const data = await response.json()
        console.log({data})
        if(data.length>0){
            const favourited = data[0].favourited
            if(favourited===1){
                setToggleLike(true)
            }else if(favourited===0){
                setToggleDislike(true)
            }
        }
         
    },[])

    const runRatingService = async(favourited)=>{
        const response = await fetch("/api/stats", {
            method: "POST",
            body: JSON.stringify({
                videoId,
                favourited
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        return response

    }
    const handleToggleDislike =  async() => {
        setToggleDislike(!toggleDislike)
        setToggleLike(toggleDislike)

        const val = !toggleDislike
        const favourited = val ? 0 : 1
        const response = await runRatingService(favourited)
        console.log("data", await response.json())

    }



    return (<div className={styles.container}>
        <NavBar />
        <Modal
            isOpen={true}
            onRequestClose={() => { router.back() }}
            overlayClassName={styles.overlay}
            className={styles.modal}
            contentLabel="Watch the video "
        >
            <iframe className={styles.videoPlayer} id="ytplayer" type="text/html" width="100%" height="360"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=0`}
                frameborder="0"></iframe>
            <div className={styles.likeDislikeBtnWrapper}>
                <div className={styles.likeBtnWrapper}>
                    <button onClick={handleToggleLike}>
                        <div className={styles.btnWrapper}>
                            <Like selected={toggleLike} />
                        </div>
                    </button>
                </div>
                <button onClick={handleToggleDislike}>
                    <div className={styles.btnWrapper}>
                        <DisLike selected={toggleDislike} />
                    </div>
                </button>
            </div>

            <div className={styles.modalBody}>
                <div className={styles.modalBodyContent}>
                    <div className={styles.col1}>
                        <p className={styles.publishTime}>{publishTime}</p>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.description}>{description}</p>
                    </div>
                    <div className={styles.col2}>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>Cast: </span>
                            <span className={styles.channelTitle}>{channelTitle}</span>
                        </p>
                        <p className={clsx(styles.subText, styles.subTextWrapper)}>
                            <span className={styles.textColor}>View Count:</span>
                            <span className={styles.channelTitle}>{viewCount}</span>
                        </p>

                    </div>
                </div>
            </div>
        </Modal >
    </div >)
}
export default Video