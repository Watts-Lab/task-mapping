import React, { Component } from "react";

export default class Interface extends Component {
    render() {
        return (
            <div style={{marginLeft: 0, marginRight: 0}}> 
                <div style={{ fontWeight: "bold", fontSize: "24px", marginBottom: "0.5rem" }}>
                    Demo
                </div> 
                <p> This is the interface for the task. By clicking anywhere on the page, a ball (about 2x the size 
                    of the blue ball) will generate. Use this ball to manipulate the other items in is canvas and 
                    fulfill the task. <strong> Only the colored objects can move, the white objects are static.</strong></p>
                <p> In this example, the task is to <strong>create a collision between the green and blue ball.</strong> 
                    {" "}Notice that many principles of physics (gravity, momentum, force, etc.) apply.</p>
                <img src="img/obr.gif" style={{width: "400px"}}/>
                <p> <strong> The large ball will only reappear if you reset the canvas (by pressing the reset button).</strong>
                    {" "}Please reset the canvas before you want to generate the ball again.</p>

                <p> <strong> Each time the ball is generated, your number of attempts increases.</strong>
                    {" "}Your score and the number of attempts you use are inversely related.</p>

                
                <p> Once you have completed a task, press the submit button to finalize your number of attempts. 
                    <strong> After submitting, neither you or your teammates can reset or resubmit. </strong>
                    Once you have submitted, to move on to the next stage, please press the Approve Configuration
                    button that will be at the bottom of your page.</p>
            </div> 
        )
    }
}