//import jwt from 'jsonwebtoken'
import {jwtVerify} from "jose"

export async function verifyToken(token) {
    if (token) {
        const { payload, protectedHeader }= await jwtVerify(token, new TextEncoder("utf-8").encode(process.env.JWT_SECRET))
        const userId = payload?.issuer
        return userId
    }
    return null
}



const decode = (input) => {
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return new Uint8Array(bytes.buffer);
};
