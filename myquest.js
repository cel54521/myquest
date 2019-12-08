'use strict';

// 通常クエスト
var normalGroup = new Group("normal");

// クエストの読み込み
function readQuest() {
    /* TODO:仮実装 */
    
    normalGroup.quest.push(new Quest("クエスト機能の実装",null,null));
    normalGroup.quest.push(new Quest("デッドラインの実装",null,null));
    normalGroup.quest.push(new Quest("デイリークエストの実装",null,null));
    normalGroup.quest.push(new Quest("優先度の実装",null,null));

}

function main() {
    var doc = document.getElementById("Questmaster");

    // クエストの読み込み
    readQuest();

    // クエストの表示
    for(var i = 0;i < normalGroup.quest.length;i++){
        doc.innerHTML += "<div class=\"quest\"><p>" + normalGroup.quest[i].questName + "</p></div>";
    }
}

onload = function() {
    main();
};