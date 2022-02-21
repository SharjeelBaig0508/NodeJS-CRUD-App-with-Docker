import { Request, Response } from "express";
import config from "config";
import pkg from 'lodash';
const { omit } = pkg;
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJWT } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response) {
    
    // Validate the user's password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
    
    // Create an access token

    const accessToken = signJWT(
        {...user, session: session._id}, 
        {expiresIn: config.get('jwt.accessTokenTTL')}
    );

    // create a refresh token

    const refreshToken = signJWT(
        {...user, session: session._id}, 
        {expiresIn: config.get('jwt.refreshTokenTTL')}
    );

    // return access & refresh tokens
    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
    
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {

    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
        accessToken: null,
        refreshToken: null
    });
}
