import 'dotenv/config';

export default ({ config }) => {
    let envFile = '.env';
    if (process.env.ENV_VAR) {
        envFile = `.env.${process.env.ENV_VAR}`;
    }
    require('dotenv').config({ path: envFile });
    return {
        ...config,
        extra: {
            baseUrl: process.env.BASE_URL,
            "eas": {
                "projectId": "cf160903-6cba-4c0a-a53f-691251525a88"
            }
        },
        android: {
            package: "com.nnikif.gptclient",
            // ... other android specific settings
        },
        ios:{
            bundleIdentifier: "com.nnikif.gptclient",
        }

    };
};
