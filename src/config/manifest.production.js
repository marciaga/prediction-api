const url = process.env.DB_CONNECTION;
export const prodManifest =
{
    "connections": [
        {
            "port": 3000,
            "labels": ["web"]
        }
    ],
    "registrations": [
        {
            "plugin": {
                "register": "good",
                "options": {
                    "ops": false,
                    "reporters": {
                        "console": [{
                            "module": "good-console"
                        }, "stdout"]
                    }
                }
            }
        },
        {
            "plugin": {
                "register": "hapi-mongodb",
                "options": {
                    "url": url,
                    "settings": {
                        "db": {
                            "native_parser": false
                        }
                    }
                }
            }
        },
        { "plugin": "./modules/prediction-results" }
    ]
};
