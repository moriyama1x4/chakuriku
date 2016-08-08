var defPosition = [128,8]; //初期位置
var defVelo = 1; //初速度
var velo = defVelo; //速度
var accel = 0.25; //加速度
var brake = 1; //減速度
var winLose = 2; //勝敗判定値

//ボールを座標指定
function setPosition(id, x, y) {
    document.getElementById(id).style.left = x;
    document.getElementById(id).style.top  = y;		  
}

//ボールのX座標取得
function getX(id){
    return parseInt(document.getElementById(id).style.left) ;
}

//ボールのY座標取得
function getY(id){
    return parseInt(document.getElementById(id).style.top);
}

//ボールを動かす
function moveBall(x, y){
    var ballX = getX("blueBall");
    var ballY = getY("blueBall");

    ballX += x;
    ballY += y;
    setPosition("blueBall", ballX, ballY);
}

function gameBody() {
    moveBall(0,velo);
    if(getY("blueBall") < 400){
        velo += accel;
        gameStart();
    }
    else{
        if(velo < winLose){
            alert("着陸成功！(時速" + velo + "km)");
        }
        else{
            alert("着陸失敗・・・(時速" + velo + "km)");
        }
    }
}

//開始
function gameStart(){
    timerID = setTimeout("gameBody()", 50);
}

//停止
function gameStop(){
    clearTimeout(timerID);
}

//減速
function braking(){
    velo -= brake;
}

//リセット
function reset(){
    clearTimeout(timerID);
    setPosition("blueBall", defPosition[0], defPosition[1]);
    velo = defVelo;
}
