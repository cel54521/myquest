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
        normalGroup.quest = JSON.parse(storage.getItem('quest'));
    }
}

// クエストの追加
function addQuest() {
    var questText = document.getElementById("questText");

    normalGroup.quest.push(new Quest(questText.value,null,null));

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
    for(var i = 0;i < normalGroup.quest.length;i++){
        doc.innerHTML += "<div class=\"quest\" draggable=\"true\"><p>" + normalGroup.quest[i].questName + "</p></div>";
    }

    doc = document.getElementById("json");
    doc.innerHTML = JSON.stringify(normalGroup.quest);
}

// クエスト全削除
function clearQuest(){
    normalGroup.quest = [];

    // ローカルストレージに保存
    saveLocal();
    
    refresh();
}

// ローカルストレージに保存
function saveLocal(){
   var storage = localStorage;
   storage.setItem('quest', JSON.stringify(normalGroup.quest));
    
}

onload = function() {
    var doc = document.getElementById("Questmaster");

    // クエストの読み込み
    readQuest();

    // クエストの表示
    refresh();
};