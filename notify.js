'use strict';

// 通知
function noftyQuest() {
    var i = 0;
    var interval = window.setInterval(function () {
        if(questGroups['normal'][i].status != 'done' ){
            var notification = new Notification(
                    'QuestMaster',
                        {
                            body: questGroups['normal'][i].questName,
                        }
                    );
        }
        i++;
        if(i == questGroups['normal'].length){
            window.clearInterval(interval);
        }
    },200);
}

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