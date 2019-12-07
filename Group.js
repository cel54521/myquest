'use strict';

// グループオブジェクト
var Group = function(){
    var _quest= [];

    
    Object.defineProperties(this, {

    });
}
Group.prototype = {
    addQuest:function(quest){
        _quest.push(quest);
    }
};
