import 'dotenv/config';

export default ({ config }) => {
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

    };
};
