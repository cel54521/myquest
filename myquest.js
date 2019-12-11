'use strict';

// 通常クエスト
var normalGroup = new Group("normal");

// クエストの読み込み
function readQuest() {
    var storage = localStorage;
    if(storage.length == 0)
    {
        normalGroup.quest = [];
    }
    else
    {
        normalGroup.quest = storage.getItem('quest');
    }
}

// クエストの追加
function addQuest() {
    var questText = document.getElementById("questText");

    normalGroup.quest.push(new Quest(questText.value,null,null));

    var storage = localStorage;
    storage.setItem('quest', normalGroup.quest);

    refresh() ;
}

// クエストの再表示
function refresh() {
    var doc = document.getElementById("Questmaster");

    // クリア
    doc.innerHTML = "" ;

    // クエストの表示
    for(var i = 0;i < normalGroup.quest.length;i++){
        doc.innerHTML += "<div class=\"quest\" draggable=\"true\"><p>" + normalGroup.quest[i].questName + "</p></div>";
    }
}

// クエスト全削除
function clearQuest(){
    normalGroup.quest = [];

    refresh();
}

onload = function() {
    var doc = document.getElementById("Questmaster");

    // クエストの読み込み
    readQuest();

    // クエストの表示
    if( normalGroup.quest != undefined)
    {
        for(var i = 0;i < normalGroup.quest.length;i++){
            doc.innerHTML += "<div class=\"quest\"><p>" + normalGroup.quest[i].questName + "</p></div>";
        }
    }
};