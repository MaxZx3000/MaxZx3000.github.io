let serviceWorkerLocation = "./service-worker.js";
if ("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        if ("serviceWorker" in navigator){
            registerServiceWorker();
        }
        else{
            console.warn("Service worker isn't supported by this browser!");
        }
    })
}
else{
    console.error("Your browser does not support notification!");
}
const registerServiceWorker = () => {
    navigator.serviceWorker.register(serviceWorkerLocation)
    .then(() => {
        console.log("Service worker successfully initialized!");
        requestPermission();
    })
    .catch((err) => {
        console.log("Failed to initialize service worker: " + err);
    })
}
const urlBase64toUint8Array = (base64String) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
                    .replace(/-/g, '+')
                    .replace(/_/g, '/')
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for(let i = 0; i < rawData.length; ++i){
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
const requestPermission = () => {
    if ('Notification' in window){
        Notification.requestPermission()
        .then((result) => {
            if (result === "rejected"){
                console.warn("Notification has been rejected by user!");
                return;
            }
            else if (result === "default"){
                console.warn("User closed the permission");
                return;
            }
            console.log("Notification permission approved by user!");
            navigator.serviceWorker.ready
            .then((registration) => {
                registration.pushManager.subscribe(
                    {
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64toUint8Array("BAJNoj2PDrWGxOFQErQ0luwtpJgHlbU-CNhG65v0baO0YHFsOVm9kQkE69KCGDgR9qYL7EgEM7F-u5kxj_m6Uek")
                    }
                )
                .then((subscribe) => {
                    let endpoint = subscribe.endpoint;
                    let p256dh = btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh'))));
                    let authKey = btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth'))));
                    console.log(`Successfully subscribed with endpoint: ${endpoint}`);
                    console.log(`Successfully subscribed with p256dh key:${p256dh}`);
                    console.log(`Successfully subscribed with auth key:${authKey}`);
                })
                .catch((err) => {
                    console.error(`Couldn't subscribe: ${err}`);
                })
            })
        })
    }
    else{
        console.warn("Notification isn't supported by this browser!");
    }
}