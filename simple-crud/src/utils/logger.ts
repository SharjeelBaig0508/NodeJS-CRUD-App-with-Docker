import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    prettyPrint: true,
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`},
    logger.destination({
        dest: './system-logs.log',
        minLength: 4096,
        sync: false
    })
);

export default log;