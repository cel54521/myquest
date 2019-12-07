'use strict';

// タスクオブジェクト
var Quest = function(questName, date, priority){
    var _questName = questName;
    var _date = date;
    var _priority = priority;

    Object.defineProperties(this, {
        // タスク
        questName: {
            get: function() {
                return _questName;
            },
            set: function(questName) {
                _questName = questName;
            }
        }
    });
};
