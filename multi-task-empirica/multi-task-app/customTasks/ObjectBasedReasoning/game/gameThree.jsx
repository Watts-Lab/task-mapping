import React from "react";
import Matter from 'matter-js'
import { Button } from "../../../client/common/components/Button";

export default class Game3 extends React.Component {
    constructor(props) {
        super(props);
        this.simDivObj = React.createRef();
        this.state = {
            engine: null, 
            render: null, 
            collision: null
        }
    }
    
    resetCanvas() {
        var engine1 = Matter.Engine.create({
        });
        //create renderer on screen
        var render1 = Matter.Render.create({
            element: this.simDivObj.current,
            engine: engine1,
            options: {
                width: 400,
                height: 400,
                wireframes: false,
            }
        });
        this.setState({
            engine: engine1, 
            render: render1
        })
        var ground = Matter.Bodies.rectangle(400, 345, 800, 5, 
            { 
                isStatic: true,
                render: {
                    fillStyle: 'white',
                }
             });
        var horizontalBar1 = Matter.Bodies.rectangle(20, 110, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var horizontalBar2 = Matter.Bodies.rectangle(80, 120, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var horizontalBar3 = Matter.Bodies.rectangle(140, 130, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var horizontalBar4 = Matter.Bodies.rectangle(200, 140, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var horizontalBar5 = Matter.Bodies.rectangle(260, 150, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var horizontalBar6 = Matter.Bodies.rectangle(320, 160, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var horizontalBar7 = Matter.Bodies.rectangle(380, 170, 40, 5, 
            {
                isStatic: true, 
                angle: 88,
                friction: 0.4,
                render: {
                    fillStyle: 'white',
                }
            })
        var leftCup = Matter.Bodies.rectangle(67, 310, 70, 5, 
            {
                angle: -30, 
                render: {
                    fillStyle: "coral"
                }
            })
        var rightCup = Matter.Bodies.rectangle(127, 310, 70, 5,
            {
                angle: 30, 
                render: {
                    fillStyle: "coral"
                }
            })
        var bottom = Matter.Bodies.rectangle(97, 340, 60, 5, 
            {
                frictionStatic: 10,
                render: {
                    fillStyle: "cornflowerblue"
                } 
            })
        var cup = Matter.Body.create(
            {
                parts: [leftCup, rightCup, bottom], 
                mass: 5,
                inverseMass: 0.2,
                isStatic: true
            })
        var greenBall = Matter.Bodies.circle(55, 5, 10, 
            {
                friction: 0.4,
                render: {
                    fillStyle: "lightgreen"
                }
            })
        Matter.World.add(engine1.world, [ground, horizontalBar1, horizontalBar2, horizontalBar3, 
            horizontalBar4, horizontalBar5, horizontalBar6, horizontalBar7, cup, greenBall]);
        Matter.Runner.run(engine1);
        Matter.Render.run(render1);

        this.setState({
            collision: Matter.Collision.create(bottom, greenBall)
        })
    }

    componentDidMount() {
        this.resetCanvas()
        document.addEventListener("click", e => {
            this.newAttempt(e.x, e.y)
        });
    }

    newAttempt(x, y) {
        const { stage, player, game } = this.props;
        if (x >= 50 && x <= 450 && y >= 105 && y <= 505 && stage.get("reset") && stage.get("mostRecent") === null) {
            stage.set("mostRecent", [x, y, player.get("avatar").color])
        }
    }

    add(x, y, color) {
        const { stage, game } = this.props;
        if (x >= 50 && x <= 450 && y >= 105 && y <= 505 && stage.get("reset")) {
            var ballA = Matter.Bodies.circle(x - 50, y - 105, 30, 
                {
                    mass: 20, 
                    inverseMass: 0.05, 
                    friction: 0.1,
                    render: {
                        fillStyle: color
                    } 
                });
            Matter.World.add(this.state.engine.world, [ballA]);
            Matter.Engine.run(this.state.engine);
            Matter.Render.run(this.state.render);
            var newScore = stage.get("attempts") + 1
            stage.set("attempts", newScore)
            stage.set("reset", false)
            stage.set("mostRecent", null)
            game.players.forEach((curPlayer) => curPlayer.set("approved", false));
        }
    }

    resetClicked() {
        const { stage, game } = this.props; 
        stage.set("resetClicked", true)
    }

    reset() {
        const { stage, game } = this.props;
        game.players.forEach((curPlayer) => curPlayer.set("approved", false));
        Matter.Engine.clear(this.state.engine);
        Matter.Render.stop(this.state.render);
        Matter.World.clear(this.state.engine.world);
        Matter.Composite.clear(this.state.engine.world); 
        this.state.render.canvas.remove();
        this.resetCanvas()
        stage.set("reset", true)
        stage.set("resetClicked", false)
    }

    submit() {
        const { game, stage } = this.props;
        if (this.state.collision !== null) {
            //console.log(this.state.collision)
            if (this.state.collision.bodyB.position.y >= 325 && this.state.collision.bodyB.position.x >= 80 && 
                this.state.collision.bodyB.position.x <= 130) {
                    stage.set("submittedGame", true)
                }
        }
        game.players.forEach((curPlayer) => curPlayer.set("approved", false));
    }

    render() {
        const { stage } = this.props;
        let recent = stage.get("mostRecent")
        if (recent !== null) {
            this.add(recent[0], recent[1], recent[2])
        }

        if (stage.get("resetClicked")) {
            this.reset()
        }
        return (
            <div style={{marginLeft: "50px", marginTop: "50px"}}>
                <div ref={this.simDivObj} ></div>
                <p> { " " }</p>
                <div style={{ display: 'flex', flex: 2, flexWrap: 'wrap', alignItems: 'center', width: "400px", justifyContent: "space-between", marginBottom: "20px" }}> 
                    <Button
                        type="submit"
                        onClick={this.resetClicked.bind(this)}
                        disabled={stage.get("submittedGame")}
                    >
                        Reset
                    </Button>
                    <p> {"Attempts: " + stage.get("attempts")}</p>
                    <Button
                        type="submit"
                        onClick={this.submit.bind(this)}
                        disabled={stage.get("submittedGame")}
                    >
                        Submit
                    </Button>
                </div>
                <h3
                style={{                
                    fontSize: "25px",
                    color: "dodgerblue", 
                }}> Instructions </h3> 
                <p
                style={{
                    fontSize: "18px",
                    maxWidth: "80rem"
                }}> In this task, your goal is to make the green ball collide touch the blue surface of the cup by adding a larger ball 
                    (about 4x the size of the green ball) to the canvas. To do so, please use your mouse to click on the location where you want the ball to appear.
                </p>
                <h3
                style={{                
                    fontSize: "25px",
                    color: "dodgerblue", 
                }}> Constraints </h3> 
                <li
                style={{
                    fontSize: "18px",
                    maxWidth: "80rem"
                }}> The canvas must be reset after each attempt. 
                </li>
                <li
                style={{
                    fontSize: "18px",
                    maxWidth: "80rem"
                }}> The color of the ball being initialized is attributed to the color of the player who initialized it. 
                </li>
                <li
                style={{
                    fontSize: "18px",
                    maxWidth: "80rem"
                }}> You can only submit after successfully completing the task. You will only receive points if you submit the task. 
                    After submitting, you will not be able to reset the game or play again. 
                </li>
                <li
                style={{
                    fontSize: "18px",
                    maxWidth: "80rem"
                }}> If you click on the canvas at the same time as another player, your request may not go through. Please 
                    reset the canvas and try again. 
                </li>
                <li
                style={{
                    fontSize: "18px",
                    maxWidth: "80rem", 
                    marginBottom: "20px"
                }}> Refrain from refreshing the page and leaving the page. Reloading will cause the canvas to reset, and you 
                    will not be able to see the current status of the game (until the canvas is reset again). 
                </li>
                <p> { " " }</p>
            </div>  
        )
    }
}