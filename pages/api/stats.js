
import { verifyToken } from '../../lib/util'
import { findVideoIdByUser, updateStats, insertStats } from '../../lib/db/hasura'

export default async function stats(req, res) {
    try {
        const token = req.cookies.token

        if (!token) {
            res.status(403).send({})
        } else {
            const token = req.cookies.token
            const userId = await verifyToken(token)
            //const videoId= req.query.videoId
            const { videoId } = req.method === "POST"? req.body: req.query 
            if (videoId) {
                const findVideo = await findVideoIdByUser(token, userId, videoId)
                const doesStatsExists = findVideo?.length > 0
                if (req.method === 'POST') {
                    const { watched = true, favourited } = req.body

                    if (doesStatsExists) {
                        // update it
                        const response = await updateStats(token, {
                            favourited,
                            userId,
                            watched,
                            videoId
                        })
                        res.send({ data: response })
                    } else {
                        //add
                        const response = await insertStats(token, {
                            favourited,
                            userId,
                            watched,
                            videoId
                        })
                        res.send({ data: response })
                    }
                } else {
                    if (doesStatsExists) {
                        res.send(findVideo)
                    } else {
                        res.status(404)
                        res.send({ user: null, msg: "Video not found" })
                    }
                }
            }

        }

    } catch (error) {
        console.log('error occured /stats', error)
        res.status(500).send({ done: false, error: error?.message })
    }


}  