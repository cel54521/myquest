'use strict';

// クエスト
var questGroups = {
    "normal": [],
    "daily": []
}

// クエストの初期化
function initQuest(){
    questGroups = {
        "normal": [],
        "daily": []
    };
}

// クエストの読み込み
function readQuest() {
    var storage = localStorage;

    // サイズが0でなければ
    if(storage.length != 0)
    {
        questGroups = JSON.parse(storage.getItem('quest'));
    }

    // Nullやundefinedでなければ
    if(questGroups == null || questGroups === undefined){
        initQuest();
    }
}

// クエストの追加
function addQuest() {
    var questText = document.getElementById("questText");
    var questType = document.getElementById("questType");

    questGroups[questType.value].push(new Quest(questText.value,null,null));

    // ローカルストレージに保存
    saveLocal();

    refresh() ;
}

// クエストの再表示
function refresh() {
    var doc = document.getElementById("Questmaster");

    // クリア
    doc.innerHTML = "" ;

    var buf = "";
    // クエストの表示
    for(var i = 0;i < questGroups["normal"].length;i++){
        buf += "<div class=\"quest\" draggable=\"true\"><p>";

        // 状態の表示
        buf += "<img src=\"img/todo.png\" />   ";
        
        buf += questGroups["normal"][i].questName + "</p></div>";
    }
    doc.innerHTML = buf;

    doc = document.getElementById("json");
    doc.innerHTML = JSON.stringify(questGroups);
}

// クエスト全削除
function clearQuest(){
    initQuest();

    // ローカルストレージに保存
    saveLocal();

    refresh();
}

// ローカルストレージに保存
function saveLocal(){
   var storage = localStorage;
   storage.setItem('quest', JSON.stringify(questGroups));
    
}

onload = function() {
    var doc = document.getElementById("Questmaster");

    // クエストの読み込み
    readQuest();

    // クエストの表示
    refresh();
};