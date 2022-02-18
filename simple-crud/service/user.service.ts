import { DocumentDefinition } from 'mongoose';
import pkg from 'lodash';
const { omit } = pkg;
import UserModel, { UserDocument, UserInput } from '../models/user.model';

export async function createUser(input: UserInput) {
    try{
        const user = await UserModel.create(input);

        return omit(user.toJSON(), "password");
    } catch(e: any) {
        throw new Error(e);
    }
}