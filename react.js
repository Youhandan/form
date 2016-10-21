/**
 * Created by hyou on 2016/10/21.
 */
var EventUtil={
    addHandle: function (element,type,handler) {
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }  else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }  else{
            element["on"+type]=handler
        }
    },
    removeHandler:function (element,type,handler) {
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        } else if(element.detachEvent){
            element.detachEvent("on"+type, handler);
        } else{
            element["on"+type]=null;
        }
    }
};






var inputRecord=[];
var inputText=document.getElementById("inputText");

EventUtil.addHandle(inputText,"focus",showNumTag);
EventUtil.addHandle(inputText,"blur",hiddenNumTag);
EventUtil.addHandle(inputText,"input",isChinese);
EventUtil.addHandle(inputText,"input",wordCount);

function showNumTag() {
    var numTag=document.getElementById("numTag");
    numTag.style.visibility="visible";

}

function hiddenNumTag() {
    var numTag=document.getElementById("numTag");
    numTag.style.visibility="hidden";
}



function isChinese() {
    var reg = /^[\u4e00-\u9fa5]+$/;
    var textNodeFail = document.createTextNode("标题中含有特殊字符，请修改~");
    var textNodeSuccess = document.createTextNode("真棒！这个标题可以使用~");
    var textNodeRepeat= document.createTextNode("这个标题已存在，请修改~");
    var child = document.getElementById("alert");
    var str = inputText.value;
    if (str) {
        if (reg.test(str)) {
            if(inputRecord.indexOf(str)==-1){
                inputRecord.push(str);
                addReminder(textNodeSuccess,"inputAreaNormal","alertSuccess",child);
            }
            else{
                addReminder(textNodeRepeat,"inputAreaWrong","alertFail",child)
            }
        }
        else {
            addReminder(textNodeFail,"inputAreaWrong","alertFail",child);
        }
    }
    else {
        if (child !== null) {
            child.parentNode.removeChild(child);
            document.getElementById("inputText").setAttribute("class", "inputAreaNormal");
        }
    }
}


/**提示标签**/
function addReminder(text,inputAreaStyle,alertStyle,node) {
    var p = document.createElement("p");
    p.setAttribute("class", alertStyle);
    p.setAttribute("id", "alert");
    if (node !== null) {
        node.parentNode.removeChild(node);
        document.getElementById("inputText").setAttribute("class", inputAreaStyle);
        p.appendChild(text);
        document.getElementById("inputItem").appendChild(p);
        if(alertStyle=="alertSuccess"){
            setTimeout(function () {
                p.parentNode.removeChild(p);
            },3000)
        }
    }
    else {
        document.getElementById("inputText").setAttribute("class", inputAreaStyle);
        p.appendChild(text);
        document.getElementById("inputItem").appendChild(p);
        if(alertStyle=="alertSuccess"){
            setTimeout(function () {
                p.parentNode.removeChild(p);
            },3000)
        }
    }
}

function wordCount() {
    var str=inputText.value;
    var len=str.length;
    var num=document.getElementById("inputNum");
    num.innerHTML=len;
    if (len>20){
        num.setAttribute("class","num");
        var childNode=document.getElementById("alert");
        var overWord=document.createTextNode("标题字数已超过20个字，请修改~");
        addReminder(overWord,"inputAreaWrong","alertFail",childNode)

    }
    else{
        num.removeAttribute("class");
    }


}