import React, { Component } from "react";

export default class Constraints extends Component {
    render() {
        return (
            <div style={{marginLeft: 0, marginRight: 0}}> 
                <div style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "0.5rem" }}>
                    Constraints
                </div> 
                <p> The canvas must be reset after each attempt. </p>
                <p> The color of the ball being initialized is attributed to the color of the player who initialized it.</p>
                <p> You can only submit after successfully completing the task. 
                    <strong> You will only receive points if you submit the task. </strong>
                    After submitting, you will not be able to reset the game or play again.</p>
                <p> If you click on the canvas at the same time as another player, your request may not go through. 
                    Please reset the canvas and try again.</p>
                <p> <strong> Refrain from refreshing the page and leaving the page. </strong> 
                Reloading will cause the canvas to reset, and you will not be able to see the 
                current status of the game (until the canvas is reset again).</p>
            </div> 
        )
    }
}
