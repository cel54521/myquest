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
    var questDeadLine = document.getElementById("questDeadline");
    var weekChkBox = document.getElementById("weekChkBox");

    if(questType.value == "normal")
    {
        questGroups[questType.value].push(new Quest(questText.value,questDeadLine.value,null,"todo"));
    }
    else
    {
        questGroups[questType.value].push(new Quest(questText.value,questDeadLine.value,null,"todo",getDaily()));
    }

    // ローカルストレージに保存
    saveLocal();

    refresh() ;
}

// デイリーの日付を取得
function getDaily(){
    const dailyChkBox = document.getElementsByName("dailyChkBox");
    var ret;

    ret = 0;
    for(var i = 0;i < dailyChkBox.length; i++){
        if(dailyChkBox[i].checked == true){
            ret |= parseInt(dailyChkBox[i].value, 10);
        }
    }
    
    return ret;
}

// html追加
function htmlOutput(type){
    var doc = document.getElementById(type);
    var week = (1 << new Date().getDay());
    // クリア
    doc.innerHTML = "" ;

    var buf = "";
    // クエストの表示
    for(var i = 0;i < questGroups[type].length;i++){
        if(type == "daily")
        {
            // 表示非表示チェック
            if((questGroups[type][i].week & week) == 0)
            {
                continue;
            }

            if(questGroups[type][i].finishWeek != week)
            {
                changeStatus(type,i,"todo");
            }
        }
        buf += "<div class=\"quest\" draggable=\"true\">";
        buf += "<div class=\"delete\" onclick=\"deleteQuest(&quot;"+ type + "&quot;,"+i+")\">×</div>";

        // 状態の表示
        if(questGroups[type][i].status == "todo")
        {
            //buf += "<img src=\"img/todo.png\" onclick=\"changeStatus(&quot;"+ type + "&quot;,"+i+",&quot;do&quot;)\"/>   ";
            buf += "<div class=\"todo\" onclick=\"changeStatus(&quot;"+ type + "&quot;,"+i+",&quot;do&quot;)\"/>TODO:</div>";
        }
        else if(questGroups[type][i].status == "do")
        {
            //buf += "<img src=\"img/do.png\" onclick=\"changeStatus(&quot;"+ type + "&quot;,"+i+",&quot;done&quot;)\"/>   ";
            buf += "<div class=\"do\" onclick=\"changeStatus(&quot;"+ type + "&quot;,"+i+",&quot;done&quot;)\"/>DO:</div>";
        }
        else
        {
            //buf += "<img src=\"img/done.png\" onclick=\"changeStatus(&quot;"+ type + "&quot;,"+i+",&quot;todo&quot;)\"/>   ";
            buf += "<div class=\"done\" onclick=\"changeStatus(&quot;"+ type + "&quot;,"+i+",&quot;todo&quot;)\"/>DONE:</div>";
        }

        buf += "<div class=\"contents\" contenteditable=\"false\" id=\"c" + i + "\" ondblclick=\"enableContentEdittable(" + i + ")\">" + questGroups[type][i].questName;
        //buf += "<div class=\"contents\" contenteditable=\"false\" id=\"c" + i + "\">" + questGroups[type][i].questName;
        
        // デッドラインの表示
        if(questGroups[type][i].date != null && questGroups[type][i].date != "")
        {
            var deadLine = new Date(questGroups[type][i].date.replace(/-/g,"/")).getTime();
            
            if(Date.now() >= deadLine)
            {
                // 期限を超えていたら赤
                buf +=  " <div class=\"dead\">(" + questGroups[type][i].date + ")</div>";
            }
            else
            {
                // 期限を超えていたら赤
                buf +=  " <div class=\"safe\">(" + questGroups[type][i].date + ")</div>";    
            }
        }

        buf += "</div>";
        buf += "</div>";
    }
    doc.innerHTML = buf;

}

// クエストの再表示
function refresh() {
    htmlOutput("normal");
    htmlOutput("daily");
    var doc = document.getElementById("json");
    doc.innerHTML = JSON.stringify(questGroups);
}

// クエスト全削除
function clearQuest(){
    initQuest();

    // ローカルストレージに保存
    saveLocal();

    refresh();
}

// クエスト削除
function deleteQuest(group, id)
{
    questGroups[group].splice(id,1);
    
    // ローカルストレージに保存
    saveLocal();

    refresh();
}

// ローカルストレージに保存
function saveLocal()
{
   var storage = localStorage;
   storage.setItem('quest', JSON.stringify(questGroups));
    
}

// statusの切り替え
function changeStatus(group, no, status)
{
    var finishWeek = (1 << new Date().getDay());
    questGroups[group][no].status = status;
    questGroups[group][no].finishWeek = finishWeek;

    // ローカルストレージに保存
    saveLocal();

    refresh();
}

// questTypeの切り替え
function changeQuestType()
{
    var questType = document.getElementById("questType");
    var weekChkBox = document.getElementById("weekChkBox");

    if(questType.value == "daily")
    {
        weekChkBox.hidden = false;
    }
    else
    {
        weekChkBox.hidden = true;
    }
}

function enableContentEdittable(id)
{
    var doc = document.getElementById("c" + id.toString());

    doc.contentEditable = true;
}

onload = function() {
    var doc = document.getElementById("Questmaster");
    
    //questTypeの切り替え
    changeQuestType();
    
    // クエストの読み込み
    readQuest();

    // クエストの表示
    refresh();

    //通知
    notifyMe(noftyQuest);
    
};

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
        if(i++ == questGroups['normal'].length){
            window.clearInterval(interval);
        }
    },200);
}