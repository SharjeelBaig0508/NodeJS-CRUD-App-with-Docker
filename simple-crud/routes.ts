import {Express, Request, Response} from 'express';
import { createUserSessionHandler, getUserSessionHandler, deleteSessionHandler } from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

const routes = (app: Express) => {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    app.post('/api/users', validate(createUserSchema), createUserHandler);

    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    app.all("*", (req: Request, res: Response) => res.sendStatus(404));
}

export default routes;