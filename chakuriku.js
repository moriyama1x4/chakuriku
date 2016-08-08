var defPosition = [128,8]; //初期位置
var defVelo = 1; //デフォルト速度
var velo = defVelo; //速度
var defAccel = 0.1; //デフォルト加速度
var accel = defAccel; //加速度
var brake = 1; //減速度
var defWinLose = 6; //デフォルト勝敗判定値
var winLose = defWinLose; //勝敗判定値
var defLevel = 1; //デフォルトレベル
var maxLevel = 5; //最大レベル
var level = defLevel; //レベル
var timer;　//タイマー

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
    }
    else{
        console.log("level = " + level);
        console.log("accel = " + accel);
        console.log("winLose = " + winLose)
        if(velo < winLose){
            if(level >= maxLevel){
                alert("着陸成功！(時速" + (Math.round(velo * 10) / 10) + "km)。 最大レベルクリア！");
                reset();
            }
            else{
                alert("着陸成功！(時速" + (Math.round(velo * 10) / 10) + "km)。 レベル"　+ (level+1) + "にチャレンジ！");
                level ++;
                accel = defAccel + ((level - defLevel) * 0.05);
                winLose = defWinLose - ((level - defLevel) * 1);
                document.getElementById("level-num").innerHTML=level
            }
        }
        else{
            alert("着陸失敗・・・(時速" + (Math.round(velo * 10) / 10) + "km)。 またレベル1からチャレンジ！");
            reset();
        }
        restart();
    }
}

//開始
function gameStart(){
    timer = setInterval("gameBody()", 50);
}

//停止
function gameStop(){
    clearInterval(timer);
}

//減速
function braking(){
    velo -= brake;
}

//リスタート
function restart(){
    clearInterval(timer);
    setPosition("blueBall", defPosition[0], defPosition[1]);
    velo = defVelo;
}

//リセット
function reset(){
    level = defLevel;
    accel = defAccel;
    winLose = defWinLose;
    document.getElementById("level-num").innerHTML=defLevel;
}
