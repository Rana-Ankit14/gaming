import React, {useEffect} from 'react';
const apis = require('../../apis/apis')

export const Index = ({setIsDailyLimit,isDailyLimit,setGameStart}) => {

    // submiting scores
    const submitScore = async (points) => {
        setGameStart(false)
        setIsDailyLimit({status: true, message: 'Loading', count : isDailyLimit.count})
        const data = await apis.postApiCall('/game/saveResult',{points})
        // console.log({data})
    }


    var myGameArea;
    var myGamePiece;
    var myObstacles = [];
    var myscore;
    function restartGame() {
        document.getElementById("myfilter").style.display = "none";
        document.getElementById("myrestartbutton").style.display = "none";
        myGameArea.stop();
        myGameArea.clear();
        myGameArea = {};
        myGamePiece = {};
        myObstacles = [];
        myscore = {};
        document.getElementById("canvascontainer").innerHTML = "";
        startGame();
    }

    function startGame() {
        myGameArea = new gamearea();
        myGamePiece = new component(30, 30, "red", 10, 75);
        myscore = new component("15px", "Consolas", "black", 220, 25, "text");
        myGameArea.start();
    }

    function gamearea() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 320;
        this.canvas.height = 180;
        document.getElementById("canvascontainer").appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.pause = false;
        this.frameNo = 0;
        this.start = function () {
            this.interval = setInterval(updateGameArea, 20);
        };
        this.stop = function () {
            clearInterval(this.interval);
            this.pause = true;
        };
        this.clear = function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        };
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if (type == "text") {
            this.text = color;
        }
        this.score = 0;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.update = function () {
            let ctx = myGameArea.context;
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };
        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + this.width;
            var mytop = this.y;
            var mybottom = this.y + this.height;
            var otherleft = otherobj.x;
            var otherright = otherobj.x + otherobj.width;
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + otherobj.height;
            var crash = true;
            if (
                mybottom < othertop ||
                mytop > otherbottom ||
                myright < otherleft ||
                myleft > otherright
            ) {
                crash = false;
            }
            return crash;
        };
    }

    function updateGameArea() {
        var x, y, min, max, height, gap;
        for (let i = 0; i < myObstacles.length; i += 1) {
            if (myGamePiece.crashWith(myObstacles[i])) {
                myGameArea.stop();
                console.log('**************** crash ********************');
                // console.log('myscore',myscore.score)
                submitScore(myscore.score);
                document.getElementById("myfilter").style.display = "block";
                document.getElementById("myrestartbutton").style.display = "block";
                return;
            }
        }
        if (myGameArea.pause == false) {
            myGameArea.clear();
            myGameArea.frameNo += 1;
            myscore.score += 1;
            if (myGameArea.frameNo == 1 || everyinterval(150)) {
                x = myGameArea.canvas.width;
                y = myGameArea.canvas.height - 100;
                min = 20;
                max = 100;
                height = Math.floor(Math.random() * (max - min + 1) + min);
                min = 50;
                max = 100;
                gap = Math.floor(Math.random() * (max - min + 1) + min);
                myObstacles.push(new component(10, height, "green", x, 0));
                myObstacles.push(
                    new component(10, x - height - gap, "green", x, height + gap)
                );
            }
            for (let i = 0; i < myObstacles.length; i += 1) {
                myObstacles[i].x += -1;
                myObstacles[i].update();
            }
            myscore.text = "SCORE: " + myscore.score;
            myscore.update();
            myGamePiece.x += myGamePiece.speedX;
            myGamePiece.y += myGamePiece.speedY;
            myGamePiece.update();
        }
    }

    function everyinterval(n) {
        if ((myGameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }

    function moveup(e) {
        myGamePiece.speedY = -1;
    }

    function movedown() {
        myGamePiece.speedY = 1;
    }

    function moveleft() {
        myGamePiece.speedX = -1;
    }

    function moveright() {
        myGamePiece.speedX = 1;
    }

    function clearmove(e) {
        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
    }

    const handleKeyDown = (e) => {
        const keyPressed = e.code;
        if(keyPressed === 'ArrowUp'){
            console.log('up key')
            moveup();
        }
        if(keyPressed === 'ArrowDown'){
            console.log('down key')
            movedown();
        }
        if(keyPressed === 'ArrowRight'){
            console.log('Right key')
            moveright();
        }
        if(keyPressed === 'ArrowLeft'){
            console.log('Left key')
            moveleft();
        }
    };

    const handleKeyUp = (e) =>{
        clearmove();
    }
useEffect( ()=>{
    startGame();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // cleanup this component
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
},[])







    return (
        //start
        <div>


            <p>Click the buttons to move the red square:</p>
            <div
                id="myfilter"
                style={{
                    position: 'absolute',
                    backgroundcolor: '#000000',
                    opacity: 0.3,
                    width: '322px',
                    height: '182px',
                    display: 'none',
                }}
            ></div>
            <div
                id="myrestartbutton"
                style={{
                    position: 'absolute',
                    paddingTop: '75px',
                    paddingLeft: '120px',
                    display: 'none'
                }}
            >
                <button onClick={restartGame}>Restart</button>
            </div>
            <div id="canvascontainer"></div>
            <br/>

            <div style={{textAlign: 'center', width: '320px'}}>
                <button
                    onTouchStart={moveup}
                    onMouseDown={moveup}
                    onMouseUp={clearmove}
                >
                    UP
                </button
                >
                <br/><br/>
                <button
                    onTouchStart={moveleft}
                    onMouseDown={moveleft}
                    onMouseUp={clearmove}
                >
                    LEFT
                </button>
                <button
                    onTouchStart={moveright}
                    onMouseDown={moveright}
                    onMouseUp={clearmove}
                >
                    RIGHT
                </button
                >
                <br/><br/>
                <button
                    onTouchStart={movedown}
                    onMouseDown={movedown}
                    onMouseUp={clearmove}
                >
                    DOWN
                </button>
            </div>


        </div>
        //end
    );
};

