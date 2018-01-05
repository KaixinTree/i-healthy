//选择项切换
function switchTab(tab,con) {
    $(tab).click(function(){
        $(tab).removeClass("hit");
        $(this).addClass("hit");
        $(con).hide().eq($(this).index()).show();
    })
}


//医生擅长内容显示更多，少于两行时不显示下拉箭头
function swDsArr(){
    var drSkill = $(".dr-skill");
    var drSkillOpt = $(".dr-skill-arr");
    var drSkillArr = $(".dr-skill-arr .arrow-down")
    if(drSkill.height()>40){
        $(".dr-skill-arr").css("opacity","1");
        drSkill.addClass("ui-nowrap-multi");
    }else{
        $(".dr-skill-arr").css("opacity","0");
    }
}