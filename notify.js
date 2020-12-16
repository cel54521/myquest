'use strict';


function notifyMe(func) {
    Notification.requestPermission();
    
    // ブラウザが通知をサポートしているか確認する
    if (!("Notification" in window)) {
        alert("このブラウザはシステム通知をサポートしていません");
    } else if (Notification.permission === "granted") {
        func();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                func();
            }
        });
    }
}