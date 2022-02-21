import jwt from "jsonwebtoken";
import config from "config";

export function signJWT(object: Object,options?: jwt.SignOptions | undefined) {
    const privateKey = (config.get('jwt.privateKey') as string[]).join("\n");

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    });
}

export function verifyJWT(token: string) {
    const publicKey = (config.get('jwt.publicKey') as string[]).join("\n");

    try{
        const decoded = jwt.verify(token, publicKey);
        return { 
            valid: true,
            expired: false,
            decoded
        }
    } catch(e: any) {
        return { 
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}
