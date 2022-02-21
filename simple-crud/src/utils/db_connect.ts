import mongoose from 'mongoose';
import config from 'config';
import logger from './logger';

const connect = async () => {
    const dbURI = config.get<string>('database.uri');
    const dbOptions = config.get<{}>('database.options');

    try {
        await mongoose.connect(dbURI, dbOptions);
        logger.info("DB Connected");
    } catch(error) {
        logger.error('Could not connect to DB');
        process.exit(1);
    }
}

export default connect;