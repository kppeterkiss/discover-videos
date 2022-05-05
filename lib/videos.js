import videoTestData from '../data/videos.json'


const fetchVideos = async()=>{
        const YOUTUBE_API_KEY=process.env.YOUTUBE_API_KEY

        const BASE_URL = "youtube.googleapis.com/youtube/v3"
        const req = `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
        const response = await fetch(req)
        return await response.json()
}

 export const getCommonVideos = async (url) =>{ 


    //https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=disney%20trailer&key=[YOUR_API_KEY] 
    //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=HU&key=[YOUR_API_KEY]
    //https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=[YOUR_API_KEY] HTTP/1.1

    try{
        const isDev = process.env.DEVELOPMENT
        const data = isDev? videoTestData : await fetchVideos(url)

        if(data?.error){
            console.error('YOUTUBE API error', data.error)
            return []
        }

    //console.log({response})
    return data.items.map((item) => {
        const id = item.id?.videoId || item.id;
        const snippet = item.snippet
        //console.log(snippet)
        return {
             title: snippet?.title,
             imgUrl: snippet.thumbnails.high.url,
             id,
             description : snippet.description,
             publishTime: snippet.publishedAt,
             channelTitle: snippet.channelTitle,
             statistics: item.statistics? item.statistics: {viewCount :0},
             }
     })
    }catch(error){
        console.error('something went wrong with video library',error)
        return []
    }
};

export const getVideos = (searchQuery) => {
    const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`
    return getCommonVideos(URL)
};

export const getPopularVideos = ()=>{
    //videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=HU
    const URL = "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=HU"
    //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
    return getCommonVideos(URL)
}

export const getYoutubeVideoById = (videoId)=>{
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`
    //videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc
    return getCommonVideos(URL)   
}