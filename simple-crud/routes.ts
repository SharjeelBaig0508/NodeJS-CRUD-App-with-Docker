import {Express, Request, Response} from 'express';
import { createUserSessionHandler, getUserSessionHandler, deleteSessionHandler } from './controller/session.controller';
import { createProductHandler, getProductHandler, updateProductHandler, deleteProductHandler } from './controller/product.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createProductSchema, updateProductSchema, deleteProductSchema, getProductSchema } from './schema/product.schema';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

const routes = (app: Express) => {
    // Base
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    // Users
    app.post('/api/users', validate(createUserSchema), createUserHandler);

    // Sessions
    app.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

    app.get('/api/sessions', requireUser, getUserSessionHandler);

    app.delete('/api/sessions', requireUser, deleteSessionHandler);

    // Products
    app.post('/api/products', [requireUser, validate(createProductSchema)], createProductHandler);

    app.put('/api/products/:productId', [requireUser, validate(updateProductSchema)], updateProductHandler);

    app.get('/api/products/:productId', [requireUser, validate(getProductSchema)], getProductHandler);

    app.delete('/api/products/:productId', [requireUser, validate(deleteProductSchema)], deleteProductHandler);

    // 404 handler
    app.all("*", (req: Request, res: Response) => res.sendStatus(404));
}

export default routes;