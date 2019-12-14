'use strict';

// クエスト
var questGroups = {
    "normal": []
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
        questGroups = {
            "normal": []
        }
    }
}

// クエストの追加
function addQuest(group) {
    var questText = document.getElementById("questText");

    questGroups[group].push(new Quest(questText.value,null,null));

    // ローカルストレージに保存
    saveLocal();

    refresh() ;
}

// クエストの再表示
function refresh() {
    var doc = document.getElementById("Questmaster");

    // クリア
    doc.innerHTML = "" ;

    // クエストの表示
    for(var i = 0;i < questGroups["normal"].length;i++){
        doc.innerHTML += "<div class=\"quest\" draggable=\"true\"><p>" + questGroups["normal"][i].questName + "</p></div>";
    }

    doc = document.getElementById("json");
    doc.innerHTML = JSON.stringify(questGroups);
}

// クエスト全削除
function clearQuest(){
    questGroups = {
        "normal": []
    }

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