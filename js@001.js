var keyPressCount = 0;
var input;
var code="";
var lastRawInput="";
var i=0;
var flash;
var funcing="Y";
var uL ="";
var hidden =true;

//update callers
function dsp01UpdateBg(file) {//this updates the image to show in the bigger display
    document.getElementById("dsp01").style.backgroundImage = "url(asset/img/" + file + ")";
}
function dsp01UpdateFrame(file) {
    document.getElementById("dsp01Frame").style.backgroundImage = "url(asset/img/" + file + ")";
}
function dsp02UpdateBg(file) {
    document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/" + file + ")";
}
function dsp02UpdateFrame(file) {
    document.getElementById("dsp02Frame").style.backgroundImage = "url(asset/img/" + file + ")";
}
function dsp02UpdateText(text) {
    document.getElementById("dsp02").style.backgroundImage = text;
}

function log1(text) {
    document.getElementById("demo4").innerHTML=text;
}




function system_failure(){
    dsp01showing("terminal_dying.gif");
    setTimeout(unRecommended_Alarm,200);
    setTimeout(contamination_Alarm,4000);
    setTimeout(pneumatic_Alarm,8500);
    setTimeout(link_Alarm,13000);
    setTimeout(evac_Alarm,17000);
    setTimeout(dsp01_dying,17600);
    setTimeout(pneumatic_losing,8400);
    //dim bg, alarm bg 
}

//audio callers
function unRecommended_Alarm(){
    document.getElementById("unrecommended").play();
}
function contamination_Alarm(){
    document.getElementById("contamination").play();
}
function pneumatic_Alarm(){
    document.getElementById("pneumatic").play();
}
function link_Alarm(){
    document.getElementById("link").play();
}
function evac_Alarm(){
    document.getElementById("evac").play();
}
function dsp01_dying(){
    document.getElementById("dsp01death").play();
}
function pneumatic_losing(){
    document.getElementById("hiss").play();
}

//this toggles custom log elements visibility
function toggleLog(){ 
    var op, visi;
    if(Boolean(hidden)){
        visi="visible";
        op = "100";
    }
    else{
        visi ="hidden";
        op="0";
    }
        document.getElementsByTagName("button")[0].style.opacity=op;
        document.getElementById("log").style.visibility=visi;
    hidden =!hidden;
}






//--------------------------under dev----------------------
var clicks = 0;
var display="";
var prev="";
var timer, timeout = 1000; // time between each click
var alpha=['a','b', 'c' , 'd','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var keyNamecheck="";
// click timer
function changeElements_2(keyName) {
    //

    if(keyname!=keyNamecheck){clicks =0;}
    var k = 0;
    log1(display+"");
    clearTimeout(timer);
    clicks++;
    if (clicks>3){clicks = clicks % 3;}
    switch (keyName){
        case "k1" : k = 0; break;
        case "k2" : k = 3; break;
        default : break;
    }
    
    //prev = display+alpha[clicks+k-1];
    log1(display+alpha[clicks+k-1]+"_"+" "+keyNamecheck);
    keyNamecheck = keyName;
    timer = setTimeout(function(){
        log1(display+alpha[clicks+k-1]);
        display=display+alpha[clicks+k-1];
        clicks=0},timeout);
}
//--------------------------under dev----------------------





function changeElement(keyName) {
    keyPressCount++ ;
    if(!Boolean(uL)){
        if(keyPressCount<9 && Boolean(funcing)) {
            document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOn.png)";
            document.getElementById(keyName).src="asset/img/key_Red.png";
            document.getElementById("demo1").innerHTML=keyName;
            keystrokecheck(keyName);
            code = code + input
            document.getElementById("dsp02").innerHTML=code;
             //document.getElementById("demo4").innerHTML=code;
            if (keyPressCount == 8){
            setTimeout(checkCode,1000);
            //document.getElementById("demo4").innerHTML=code;        
            }
        }

        else if (keyPressCount >= 9){
            //setTimeout(checkCode,1000);
        keystrokecheck(keyName);
            //document.getElementById("dsp02").innerHTML=code;
            //document.getElementById("demo4").innerHTML=code;        
        }
    }
    else if(Boolean(uL)){
        waitingInput(keyName);
        document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOn.png)";
        document.getElementById(keyName).src="asset/img/key_Red.png";
    }    
    document.getElementById("demo3").innerHTML=keyPressCount + " "+funcing;
    
}

function checkCode() {
    if (code != "00000000"){
        document.getElementById("dsp01").style.backgroundImage="url(asset/gif/terminal_error.gif)";
        code= "Err:Input invalid! Please [RESET]";
        funcing="";
        if(!Boolean(flash)){flash = setInterval(flashing,1000);}
        document.getElementById("dsp02").innerHTML=code;        
    }
            
    else{
        unlocked();
    }
}

function flashing(){
    if (i!=1){flashingRed(); i++; document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOn.png)";}
    else{flashingNeut(); i--; document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOff.png)";}
}

function flashingRed (){
        // Get a NodeList of all .demo elements
        const keys = document.querySelectorAll('.key_Neut');
        // Change the text of multiple elements with a loop
        keys.forEach(e => {
        e.src = 'asset/img/key_Red.png';
        });
}

function flashingNeut (){
    const keys = document.querySelectorAll(".key_Neut");
    keys.forEach (e =>{
        e.src = 'asset/img/key_Neut.png';   
    });
}

function keystrokecheck (key2check) {
    document.getElementById("demo1").innerHTML=key2check;
        switch (key2check) {
        case "k1" : input = "1"; break;
        case "k2" : input = "2"; break;
        case "k3" : input = "3"; break;
        case "k4" : input = "4"; break;
        case "k5" : input = "5"; break;
        case "k6" : input = "6"; break;
        case "k7" : input = "7"; break;
        case "k8" : input = "8"; break;
        case "k9" : input = "9"; break;
        case "k0" : input = "0"; break;
        case "kC" : clear(); break;
        case "kR" : reset(); break;
        default: input ="nothing"; break;
        }
}

function clear() {
    if(!Boolean(uL)){
    document.getElementById("demo2").innerHTML="clear called";
    input ="";
    if(keyPressCount>0){keyPressCount--;}
    if(Boolean(funcing) && keyPressCount>0){
        var keyHunt = code;
        code = code.slice(0,keyPressCount-1);
        keyHunt = keyHunt.slice(keyPressCount-1,keyPressCount);
        var hunted = "k" + keyHunt;
        if(keyPressCount>-1){keyPressCount--;}
        document.getElementById(hunted).src="asset/img/key_Neut.png";
        setTimeout(baklitOff,1000);   
    }
    if (Boolean(funcing) && keyPressCount == 0){
        setTimeout(dsp02baklitOff,1000);
        setTimeout(baklitOff,1000);
    }
    document.getElementById("dsp02").innerHTML=code;
    document.getElementById("demo3").innerHTML=keyPressCount;
    document.getElementById("demo4").innerHTML=(keyHunt +" "+ hunted);
    }
}

function baklitOff(){
        document.getElementById("kC").src="asset/img/key_Neut.png";
    }

function dsp02baklitOff(){
    document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOff.png)";
}

function reset() {
    if(!Boolean(uL)){
    funcing = "";
    keyPressCount--;
    document.getElementById("demo2").innerHTML="reset called";
    clearInterval(flash);    
    flash="";
    document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOn.png)";
    code="Resetting...";
    lastRawInput="";
    input="";
    document.getElementById("demo3").innerHTML=keyPressCount;
    document.getElementById("dsp02").innerHTML=code;
    //document.getElementById("demo4").innerHTML=code;
    setTimeout(flashingNeut,1000);
    setTimeout(resF1,1000);
    }  
}

function resF1 (){
    funcing ="Y";
    keyPressCount=0;
    code="";
    document.getElementById("dsp02bg").style.backgroundImage = "url(asset/img/dsp2BgOff.png)";
    document.getElementById("dsp02").innerHTML=code;
    document.getElementById("dsp01").style.backgroundImage="url(asset/gif/terminal_idle.gif)";
}

function unlocked(){
    uL= "y";
    clearInterval(flash);
    document.getElementById("dsp01").style.backgroundImage="url(asset/gif/terminal_doorOpeningFail.gif)";
    document.getElementById("dsp02").innerHTML= "Link input successful";
    const keys = document.querySelectorAll('.key_Neut');
    keys.forEach (e =>{
        e.src = 'asset/img/key_Green.png';
    });
    setTimeout(waitingInput,12000);
    setTimeout(flashingNeut,12000);
}

function waitingInput(y){
    document.getElementById("dsp02").innerHTML ="Override [1.op_Una] [2.op_Rdy] [3.ps_Sys]";
    switch (y){
        case "k1"    :   overriden(); break;
        case "k2"    :   error(); break;
        case "k3"    :   overriden(); break;
    } 

}

function error(){
    document.getElementById("dsp01").style.backgroundImage="url(assest/gif/terminal_error.gif)"
    document.getElementById("dsp02").innerHTML ="Err:Input invalid! Please [RESET]";
    if(!Boolean(flash)){flash = setInterval(flashing,1000);}
    if (keyName=="kR"){unlocked();}
}

function overriden(){
    clearInterval(flash);
    flashingNeut();
    document.getElementById("dsp01").style.backgroundImage="url(asset/gif/terminal_doorOpeningFallBs2.png)";
    document.getElementById("dsp02").innerHTML= "Input Successful!";
} 
