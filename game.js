'use strict';
(() => {

  let timer;
  let stage;
  let ball;
  const DEF_LEVEL = 1;
  const MAX_LEVEL = 5;
  const TIME_INTERVAL_MS = 50;

  function start() {
    if (!timer) {
      timer = setInterval(main, TIME_INTERVAL_MS);
    }
  }

  function pause() {
    clearInterval(timer);
    timer = undefined;
  }

  function reset() {
    if (timer) {
      pause();
    }
    ball = new Ball('blueBall');
    changeLevel(DEF_LEVEL);
  }

  function changeLevel(level) {
    ball.moveTo(0, 0);
    ball.velocity(10, 0);
    stage = new Stage(level);
    repaint();
  }

  function repaint() {
    document.getElementById(ball.id).style.left = ball.x;
    document.getElementById(ball.id).style.top = ball.y;
    document.getElementById('land').style.left = stage.land.x;
    document.getElementById('land').style.width = stage.land.width;
    document.getElementById("level-num").innerHTML = stage.level;
  }

  //ゲーム動作
  function main() {
    ball.accelerate(0, stage.gravity);
    ball.move();

    if (ball.x < 0 || 800 < ball.x || ball.y < 0) {
      alert("着陸失敗・・・(壁に衝突)。 またレベル"+ DEF_LEVEL +"からチャレンジ！");
      reset();
    } else if (ball.y > 400) {
      if (ball.x < stage.land.x || stage.land.x + stage.land.width < ball.x) {
        alert("着陸失敗・・・(地面に着地できなかった)。 またレベル"+ DEF_LEVEL +"からチャレンジ！");
      } else if (stage.threshold < ball.vy) {
        alert("着陸失敗・・・(時速" + ball.vy.toFixed(1) + "km)。 またレベル"+ DEF_LEVEL +"からチャレンジ！");
      } else {
        // 成功!!
        if (stage.level < MAX_LEVEL) {
          alert("着陸成功！(時速" + ball.vy.toFixed(1) + "km)。 レベル"　+ (stage.level + 1) + "にチャレンジ！");
          pause();
          changeLevel(stage.level + 1);
          return;
        } else {
          alert("着陸成功！(時速" + ball.vy.toFixed(1) + "km)。 最大レベルクリア！");
        }
      }
      reset();
    }

    repaint();
  }

  //キーボード操作
  document.addEventListener('keydown', e => {
    switch (e.keyCode) {
    case 32:
      // space keyで開始/停止の切り替え
      timer? pause(): start();
      break;
    case 27:
      reset(); // Esc keyでリセット
      break;
    case 39:
      ball.accelerate(5, 0); //「→」でX加速
      break;
    case 37:
      ball.accelerate(-5, 0); //「←」でX減速
      break;
    case 38:
      ball.accelerate(0, -5); //「↑」でY減速
      break;
    }
  });

  //アクセス時初期化
  window.onload = () => reset();

})();
