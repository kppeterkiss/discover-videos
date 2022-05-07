import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner/banner'
import NavBar from '../components/nav/navbar'
import SectionCards from "../components/card/section-cards"

import { getVideos, getPopularVideos, getWatchItAgainVideos } from "../lib/videos"
import useRedirectUser from '../utils/redirectUser'

export async function getServerSideProps(context) {
   const {userId,token} = await useRedirectUser(context)
  // if (!userId) {
  //   return {
  //     props: {},
  //     redirect: {
  //       destination: '/login',
  //       permanent: false
  //     }
  //   }
  // }

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
  const disneyVideos = await getVideos("disney trailer")
  const productivityVideos = await getVideos("productivity")
  const travelVideos = await getVideos("travel")
  const popularVideos = await getPopularVideos()
  return { props: { disneyVideos, productivityVideos, travelVideos, popularVideos, watchItAgainVideos } }
}

export default function Home({ disneyVideos, productivityVideos, travelVideos, popularVideos, watchItAgainVideos = [] }) {
  // Assumes a user is already logged in

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username="kp.peter.kiss@gmail.com" />
        <Banner title="cliffort the whatever dog" subTitle="a very cute dog" imgUrl="/static/clifford.webp" videoId="4zH5iYM4wJo" />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Watch it again" videos={watchItAgainVideos} size="small" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
          <SectionCards title="Popular" videos={popularVideos} size="small" />


        </div>
      </div>

    </div>
  )
}
