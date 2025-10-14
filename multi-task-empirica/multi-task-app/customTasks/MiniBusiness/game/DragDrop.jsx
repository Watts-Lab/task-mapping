import React, { Component } from 'react';
import { Button } from '../../../client/common/components/Button';
import { tools } from "../constants"

export default class DragDrop extends Component {
    constructor(props) {
        super(props);
        const {stage} = this.props
        this.state = {
            items: [
                {name:"Dowel", category:"part"},
                {name:"Wheel", category:"part"},
                {name:"String", category:"part"},
                {name:"Clay", category:"part"},
                {name:"Wood", category:"part"},
                {name:"Glue", category:"part"},
                {name:"Paper", category:"part"},
                {name:"Wire", category:"part"},
            ], 
            correctAnswer: true
        }
    };
        
    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        const { stage, game, player} = this.props
        game.players.forEach((curPlayer) => curPlayer.set("approved", false));
        let id = ev.dataTransfer.getData("id");
        let added = false;
        stage.get("items").filter((item) => {
           if (item.name == id && !added) {
               let newItem = Object.assign({}, item)
               newItem.category="canvas"
               newItem.player=player._id
               const prevItems = stage.get("items"); 
               prevItems.push(newItem)
               stage.set("items", prevItems)
               added = true;
           }
       });
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    onClear(stage, game) {
        game.players.forEach((curPlayer) => 
            curPlayer.set("approved", false));
        let currItems = stage.get("items"); 
        let filteredItems = []
        for (var i = 0; i < currItems.length; i++) {
            if (currItems[i].category === "part") {
                filteredItems.push(currItems[i])
            }
        }
        stage.set("items", filteredItems)
    }

    onSubmit(game, stage, item) {
        game.players.forEach((curPlayer) => curPlayer.set("approved", false));
        let currItems = stage.get("items");
        const itemsDict = {
            dowel: 0, 
            wheel: 0, 
            string: 0, 
            clay: 0, 
            wood: 0, 
            glue: 0, 
            paper: 0, 
            wire: 0,
        }
        for (var i = 0; i < currItems.length; i++) {
            if (currItems[i].category !== "part" && currItems[i].name.toLowerCase() in itemsDict) {
                itemsDict[currItems[i].name.toLowerCase()] = itemsDict[currItems[i].name.toLowerCase()] + 1; 
            }
        }
        if (this.dictionaryEquals(itemsDict, tools[item])) {
            let sellingPrice = 0; 
            let cost = 0; 
            if (item === "TOP") {
                cost = stage.get("priceArray")[0];
                sellingPrice = stage.get("priceArray")[1]; 
            } else if (item === "MAN") {
                cost = stage.get("priceArray")[2];
                sellingPrice = stage.get("priceArray")[3]; 
            } else if (item === "AIRPLANE") {
                cost = stage.get("priceArray")[4];
                sellingPrice = stage.get("priceArray")[5]; 
            } else if (item === "WAGON") {
                cost = stage.get("priceArray")[6];
                sellingPrice = stage.get("priceArray")[7]; 
            } else if (item === "LADDER") {
                cost = stage.get("priceArray")[8];
                sellingPrice = stage.get("priceArray")[9]; 
            }
            const profit = sellingPrice - cost; 
            stage.set("scoreFeedback", stage.get("scoreFeedback") + profit); 
            game.players.forEach((player) => {
                const scoreArray = player.stage.get("scoreArr"); 
                scoreArray.push(profit)
                player.stage.set("scoreArr", scoreArray);
            });
            this.onClear(stage, game)
        } else {
            this.setState({
                correctAnswer: false
            })
            setTimeout(()=> {
                this.setState({
                    correctAnswer: true
                })
            }, 2000);
        }
    }

    // assumes keys are equal 
    dictionaryEquals(dict1, dict2) {
        for (var key in dict1) {
            if (dict1[key] !== dict2[key]) {
                return false
            }
        }
        return true
    }

    calculateSupplies() {
        let string = ""
        const { item } = this.props
        if (item === null) {
            return "Choose an Item to Create"
        }
        const supplies = tools[item]
        const keys = Object.keys(supplies)
        for (var i = 0; i < keys.length; i++) {
            const amount = supplies[keys[i]]
            if (parseInt(amount) > 0) {
                string = string + keys[i] + "(" + amount + ") "
            } 
        }
        return string
    }

    render() {
        const { item, stage, game, player } = this.props
        const supplies = tools[item]
        var items = {
            part: [],
            canvas: []
        }
        stage.get("items").forEach((t) => {
            const otherPlayers = _.reject(game.players, (p) => p._id === t.player);
            const currPlayer = game.players.find((p) => p._id === t.player);
            if (t.category === "part") {
                items[t.category].push(
                    <div 
                        onDragStart = {(e) => this.onDragStart(e, t.name)} 
                        draggable
                        className={"bp3-card bp3-elevation-1"} 
                        style={{ margin: "0.2rem", height: "4rem"}}>
                        {t.name}
                    </div>
                );
            } else {
                if (otherPlayers.length === 0) {
                    items[t.category].push(
                        <div 
                            className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.2rem", height: "4rem" }}>
                            {t.name}
                        </div>
                    )
                } else {
                    items[t.category].push(
                        <div 
                            className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.2rem", height: "4rem", color: currPlayer.get("avatar").color}}>
                            {t.name}
                        </div>
                    );
                }
                
            }
        });
        return (
            <div> 
                <div style={{ display: 'flex', alignItems: 'center' }}> 
                    <div className={"bp3-card bp3-elevation-1"} 
                        style={{ margin: "0.5rem", 
                                minHeight: "3rem", 
                                minWidth: "81%", }}>
                        <h3 style={{ marginLeft: "0.5rem", fontSize: "20px"}}><strong>Item: {item}</strong></h3>
                        <p style={{ marginLeft: "0.5rem", fontSize: "14px", marginBottom: "0.5rem"}}> {this.calculateSupplies()} </p>
                    </div>
                    <div className={"bp3-card bp3-elevation-1"} 
                        style={{ margin: "0.5rem", 
                                minHeight: "3rem", 
                                minWidth: "16.5%", }}>
                        <p style={{ marginLeft: "0.5rem", fontSize: "14px", marginBottom: "0.5rem"}}> Profit: </p>
                        <h3 style={{ marginLeft: "0.5rem", fontSize: "20px"}}><strong>${stage.get("scoreFeedback")} </strong></h3>
                    </div>
                </div> 
            <div style={{ display: 'flex', alignItems: 'center', width: "99%", minHeight: "20rem" }}>
                <div>
                    <div className={"bp3-card bp3-elevation-1"} 
                        style={{ margin: "0.5rem", height: "20rem", width: "100%"}}>
                            <h3 style={{ marginLeft: "0.5rem", fontSize: "20px"}}> <strong>Parts</strong> </h3>
                            <p style={{ marginLeft: "0.5rem", fontSize: "14px", marginBottom: "0.5rem"}}> Drag parts onto the worktable to begin building </p>
                            <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                {items.part}
                            </div>
                            
                    </div>
                </div>
                <div 
                    onDrop={(e)=>this.onDrop(e)}
                    onDragOver={(ev)=>this.onDragOver(ev)}>
                    <div className={"bp3-card bp3-elevation-1"} 
                        style={{ margin: "0.5rem", height: "20rem", marginLeft: "2vw", marginRight: "-0.4vw", width: "40vw"}}>
                            <h3 style={{ marginLeft: "0.5rem", fontSize: "20px"}}><strong>Work Table</strong></h3>
                            <p style={{ marginLeft: "0.5rem", fontSize: "14px", marginBottom: "0"}}> Assemble the item by dragging and dropping into this box </p>
                            {!this.state.correctAnswer ? <p style={{ marginLeft: "0.5rem", fontSize: "14px", marginBottom: "0", color: "red"}}> 
                                The item you have created does not exist - please try again </p> : null}
                            <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                <div style={{ margin: "0.5rem"}}> 
                                    <Button style={{fontSize: "20px"}} onClick={() => this.onClear(stage, game)}>Clear</Button>
                                </div> 
                                <div style={{ marginTop: "0.5rem", marginRight: "0.5rem", marginBottom: "0.5rem"}}> 
                                    <Button style={{fontSize: "20px"}} onClick={() => this.onSubmit(game, stage, item)}>Submit</Button>
                                </div> 
                            </div>
                            <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                {items.canvas}
                            </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}