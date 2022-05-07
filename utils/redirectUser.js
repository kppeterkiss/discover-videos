
import { verifyToken } from '../lib/util'

const useRedirectUser= async (context)=>{
const token = context.req ? context.req?.cookies.token : null
  const userId = await verifyToken(token)
  
  return {userId,token}
}
export default useRedirectUser