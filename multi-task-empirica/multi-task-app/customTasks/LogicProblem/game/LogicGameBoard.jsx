import React, { Component } from 'react';
import Etherpad from '../../Etherpad';
import './Grid.css'

import { logAction } from '/client/common/helper/logger';

export default class GameBoard extends Component {
    constructor(props) {
        super(props);
        const {stage} = this.props
        this.taskConstants = stage.get("constants");
    };

    changeGridElem(key, i, j, player) {
        const { game, stage } = this.props;
        let gridArray = stage.get("grid")
        if (gridArray[key - 1] == "X") {
            this.switchCrossVals("✓", "X", key, i, j)
        } else if (gridArray[key - 1] == "✓") {
            this.switchCrossVals(" ", " ", key, i, j)
        } else {
            gridArray[key - 1] = "X"
        }
        stage.set("grid", gridArray)
        game.players.forEach((curPlayer) => curPlayer.set("approved", false));
        this.calculateScore();

        logAction(player, "changing element at index: ", [i, j]);
    }

    switchCrossVals(newVal, crossVal, key, i, j) {
        const { stage } = this.props; 
        let gridArray = stage.get("grid")
        for (let row = 1; row < 5; row += 1) {
            let newKey = j + (row - 1) * 8
            gridArray[newKey - 1] = crossVal
        }
        if (j < 5) {
            for (let col = 1; col < 5; col += 1) {
                let newKey = col + (i - 1) * 8
                gridArray[newKey - 1] = crossVal
            }
        } else {
            for (let col = 5; col < 9; col += 1) {
                let newKey = col + (i - 1) * 8
                gridArray[newKey - 1] = crossVal
            }
        }
        gridArray[key - 1] = newVal
    }

    calculateScore() {
        const { player, stage } = this.props;
        const answerBoard = stage.get("answers")
        const currentBoard = stage.get("grid")
        
        let currScore = 0; 
        for (let i = 0; i < 48; i += 1) {
            if (answerBoard[i] == currentBoard[i]) {
                currScore += 1; 
            }
        }
        player.stage.set("score", Math.floor((currScore / 48) * 100));
    }

    handleHover(i, j) {
        const { player } = this.props;
        const hoveredGrid = { i, j };
        player.stage.set("hoveredGrid", hoveredGrid);
      };
    
    getColor(i, j) {
        const player = this.props.game.players.find(
          (player) =>
            player.stage.get("hoveredGrid")?.i === i &&
            player.stage.get("hoveredGrid")?.j === j
        );
        if (!player || player.id === this.props.player.id) return null;
        return player.get("avatar").color;
    };

    render() {
        const { round, stage, player, game } = this.props;
        const startingGrid = [this.taskConstants.top,
                                [this.taskConstants.left[0], 0, 0, 0, 0, 0, 0, 0, 0], 
                                [this.taskConstants.left[1], 0, 0, 0, 0, 0, 0, 0, 0], 
                                [this.taskConstants.left[2], 0, 0, 0, 0, 0, 0, 0, 0], 
                                [this.taskConstants.left[3], 0, 0, 0, 0, 0, 0, 0, 0]]
        return (
            <div>
                <h4
                    style={{
                        fontSize: "18px",
                        color: "dodgerblue",
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginBottom: "0.5rem"
                    }}> 
                        Problem  
                </h4> 
                <p>{this.taskConstants.story}</p>
                <div> 
                    Clues: 
                    {this.taskConstants.clues.map((elem) => {
                        return (<li> {elem} </li>)
                    })}
                    <p> {" "} </p>
                </div>
                <div style={{display: "flex", width: "100%"}}> 
                    <div style={{width: "66%"}}> 
                        <h4
                            style={{
                                fontSize: "18px",
                                color: "dodgerblue",
                                fontWeight: "bold",
                                marginTop: "1rem",
                                marginBottom: "0.5rem"
                            }}> 
                                Game Board  
                        </h4> 
                        <div>
                            <div style={{display: 'inline-block', verticalAlign: "top", marginTop: "1.1rem", float: "left"}}>
                                <div className={`h-40 white`} style={{display: 'inline-block'}}/>
                                <div className={`border-black border`} 
                                    id="sidewaysText"
                                    style={{height: '12rem', 
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            textAlign: 'center', 
                                            borderColor: 'white'}}>
                                    {this.taskConstants.headers[0]}
                                </div>
                            </div>
                            <div style={{display: 'inline-block', width: "90%"}}> 
                                <div className={`w-40 white`} style={{display: 'inline-block'}}/>
                                <div className={`border-black border`} 
                                    style={{display: 'inline-block', 
                                            width: '12rem', 
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            textAlign: 'center', 
                                            borderColor: 'white'}}>
                                    {this.taskConstants.headers[1]}
                                </div>
                                <div className={`border-black border`} 
                                    style={{display: 'inline-block', 
                                            width: '12rem', 
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            textAlign: 'center', 
                                            borderColor: 'white'}}>
                                    {this.taskConstants.headers[2]}
                                </div>
                                <div style={{display: 'inline-block'}}> 
                                    {startingGrid.map((row, i) => (
                                    <div className="flex" key={i}>
                                        {row.map((cell, j) => (
                                            (i == 0 && j == 0) ? 
                                            <div
                                                key={(i + 1) * (j + 1)}
                                                className={`h-40 w-40 white`}
                                            /> : 
                                            (i == 0 && j < 5) ? 
                                            <div
                                                key={(i + 1) * (j + 1)}
                                                className={`h-40 w-12 p-2 border-black border`}
                                                style={{backgroundColor: 'honeydew'}}
                                                id="sidewaysText"
                                                >
                                                    <p className='[writing-mode:vertical-lr]'>
                                                        {startingGrid[i][j]}
                                                    </p>
                                            </div> : 
                                            (i == 0) ? 
                                            <div
                                                key={(i + 1) * (j + 1)}
                                                className={`h-40 w-12 p-2 border-black border`}
                                                style={{backgroundColor: 'moccasin'}}
                                                id="sidewaysText"
                                                >
                                                    <p className='[writing-mode:vertical-lr]'>
                                                        {startingGrid[i][j]}
                                                    </p>
                                            </div> : 
                                            (j == 0 && i < 5) ? 
                                            <div
                                                key={(i + 1) * (j + 1)}
                                                className={`h-12 w-40 p-2 border-black border`}
                                                style={{backgroundColor: 'lavender'}}
                                                >
                                                    <p className='[writing-mode:vertical-lr]'>
                                                        {startingGrid[i][j]}
                                                    </p>
                                            </div> : 
                                            (j == 0) ? 
                                            <div
                                                key={(i + 1) * (j + 1)}
                                                className={`h-12 w-40 p-2 border-black border`}
                                                style={{backgroundColor: 'moccasin'}}
                                                >
                                                    <p className='[writing-mode:vertical-lr]'>
                                                        {startingGrid[i][j]}
                                                    </p>
                                            </div> : 
                                            <div
                                                key={(i + 1) * (j + 1)}
                                                className={`h-12 w-12 border-black white border`}
                                                onMouseEnter={() => this.handleHover(i + 1, j + 1)}
                                                style={{display: 'flex', 
                                                        justifyContent: 'center', 
                                                        alignItems: 'center', 
                                                        cursor: 'pointer', 
                                                        background: this.getColor(i + 1, j + 1),
                                                        color: ((stage.get("grid")[j + (i - 1) * 8 - 1] == "✓") ? "green" : 
                                                                (stage.get("grid")[j + (i - 1) * 8 - 1] == "X") ? "red" : 
                                                                "black"), 
                                                        fontWeight: 'bolder'}}
                                                    
                                                id={j + (i - 1) * 8}
                                                onClick={() => this.changeGridElem(j + (i - 1) * 8, i, j, player)}
                                            >  
                                                {
                                                    stage.get("grid")[j + (i - 1) * 8 - 1]
                                                }
                                            </div>
                                        ))}
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginRight: "1rem"}}>
                        <h4
                        style={{
                            fontSize: "18px",
                            color: "dodgerblue",
                            fontWeight: "bold",
                            marginTop: "1rem",
                            marginBottom: "0.5rem"
                        }}> 
                            Answers 
                        </h4> 
                        <div>
                            <div className='headers'> 
                                <div className={`border-black border`} 
                                    style={{display: 'inline-block', 
                                            width: '7rem', 
                                            height: "2rem",
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            textAlign: 'center', 
                                            borderColor: 'white'}}>
                                    {this.taskConstants.headers[0]}
                                </div>
                                <div className={`border-black border`} 
                                    style={{display: 'inline-block', 
                                            width: '7rem', 
                                            height: "2rem",
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            textAlign: 'center', 
                                            borderColor: 'white'}}>
                                    {this.taskConstants.headers[1]}
                                </div>
                                <div className={`border-black border`} 
                                    style={{display: 'inline-block', 
                                            width: '7rem', 
                                            height: "2rem",
                                            backgroundColor: 'black', 
                                            color: 'white', 
                                            textAlign: 'center', 
                                            borderColor: 'white'}}>
                                    {this.taskConstants.headers[2]}
                                </div>
                            </div>
                            {(() => {
                                let res = [];
                                for (let i = 0; i < 4; i++) {
                                    res.push(
                                        <div className="flex"> 
                                            <div className={`border-black border`} 
                                                style={{display: 'inline-block', 
                                                        width: '7rem', 
                                                        height: "2rem",
                                                        textAlign: 'center'}}>
                                                {this.taskConstants.left[i]}
                                            </div>
                                            <div className={`border-black border`} 
                                                style={{display: 'inline-block', 
                                                        width: '7rem', 
                                                        height: "2rem",
                                                        textAlign: 'center', 
                                                        fontSize: "12px"}}>
                                                {this.taskConstants.top[(stage.get("grid").slice(8 * i, 4 * (2 * i + 1))).indexOf("✓") + 1]}
                                            </div>
                                            <div className={`border-black border`} 
                                                style={{display: 'inline-block', 
                                                        width: '7rem', 
                                                        height: "2rem",
                                                        textAlign: 'center', 
                                                        fontSize: "12px"}}>
                                                {(stage.get("grid").slice(4 * (2 * i + 1), 8 * (i + 1))).indexOf("✓") != -1 ? 
                                                    this.taskConstants.top[(stage.get("grid").slice(4 * (2 * i + 1), 8 * (i + 1))).indexOf("✓") + 5] : 
                                                    " "}
                                            </div>
                                        </div>
                                    )
                                } return res;
                            }) ()}
                        </div>
                    </div>
                </div>
                <div style={{marginBottom: "50px", width: "95%"}}>
                    <h4
                    style={{
                        fontSize: "18px",
                        color: "dodgerblue",
                        fontWeight: "bold",
                        marginTop: "1rem",
                        marginBottom: "0.5rem", 
                    }}> 
                        Notes 
                    </h4> 
                    <Etherpad {...this.props} padId={Object.keys(stage.get('etherpadData'))[0]} />
                </div>
            </div>
        )
    }
}