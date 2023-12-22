import 'dotenv/config';

export default ({ config }) => {
    return {
        ...config,
        extra: {
            baseUrl: process.env.BASE_URL,
        },
    };
};
