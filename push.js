let webPush = require('web-push');

const vapidKeys = {
    "publicKey":"BAJNoj2PDrWGxOFQErQ0luwtpJgHlbU-CNhG65v0baO0YHFsOVm9kQkE69KCGDgR9qYL7EgEM7F-u5kxj_m6Uek",
    "privateKey":"21KesEFgQk4oFNds-ysbGwTe-hCzcsPQ3dSTFBzlz9E"
}

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c0uxjPRFnC4:APA91bG7nwKsnONV1dppROE2zrPvkeQ9_7li9sB5jaj9jBY7gMW_xaAVCryY7d8M9NukRMC3GdfTCbEMd0wxXO-4bQ5y6wBLlafBgLdG2elTDxwdJILOq6L-CP3W3Uf7JYfdF5Tb0ucs",
    "keys":{
        "p256dh": "BLq39SUpC06shRKmjk56s/IR+iyr3bKc5PgTlfv2P8UQ3PY/e+qCzmQNflB07eiZmy+AV3ofAAWZ348eKFssMX4=",
        "auth": "Nlp6UWHDe8HNyajuMWBosw=="
    }
}

let payload = "Stay tuned for our soccer app updates! You can always look at our new features by looking at notification like this!";

let options = {
    gcmAPIKey: "849975024899",
    TTL: 60
}

webPush.sendNotification(pushSubscription, payload, options);