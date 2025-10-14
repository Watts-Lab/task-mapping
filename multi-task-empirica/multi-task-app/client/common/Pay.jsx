import { ConsentButton } from "meteor/empirica:core";
import React, { Component } from "react";
import { Centered } from "../common/components/Layouts";

export default class Pay extends Component {
    render() {
        const { game, player, stage } = this.props
        const otherPlayers = _.reject(game.players, (p) => p._id === player._id);
        return (
            <Centered>
                <div className="prose mt-8">
                    <h2>Pay</h2>{" "}
                    <div>
                        <p>
                            You will earn up to $2 based on your performance for this specific task and your total
                            earnings will be calculated as follows: your score / maximum possible score * $2.
                        </p>
                        <b>{otherPlayers.length != 0 ? <div>
                            <p>
                                Since
                                you will be working in a team for this task, you will recieve an additional fixed bonus
                                at the end of the task that will be calculated as follows: $0.5 * team size.
                            </p>
                        </div> : <div></div>}</b>
                    </div>
                    <br />
                </div>
            </Centered>
        );
    }
}
