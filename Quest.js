'use strict';

// タスクオブジェクト
var Quest = function(questName, date, priority,status,week=0){
    this.questName = questName;
    this.date = date;
    this.priority = priority;
    this.status = status;
    this.week = week;
};
