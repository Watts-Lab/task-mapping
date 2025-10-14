import React, { Component } from "react";
import DragDrop from "./DragDrop";

export default class DisplayTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            canvas: false, 
            currentElem: null,
        }
        this.displayCanvas = this.displayCanvas.bind(this)
    }

    timer; 

    displayCanvas(item) {
        const { stage } = this.props
        this.setState({
                canvas: true, 
        })
        stage.set("currentItem", item)
    }

    render() {
        const { stage, game } = this.props;
        return (
        <div style={{ margin: "1rem 0.5rem 0rem 0.5rem" }}>
            <div style={{ display: "flex" }}>
                <div className={"bp3-card bp3-elevation-1"} 
                    style={{ margin: "0.5rem", 
                            minHeight: "3rem", 
                            minWidth: "99%", }}>
                    {stage.get("changingPrices") ? 
                        <h3 style={{ marginLeft: "0.5rem", fontSize: "20px", color: "red", fontWeight: "bold"}}> <strong>Prices Changed </strong></h3> : 
                        <h3 style={{ marginLeft: "0.5rem", fontSize: "20px"}}> <strong>Display Table </strong></h3>
                    }
                    <p style={{ marginLeft: "0.5rem", fontSize: "14px", marginBottom: "0"}}> Select the item that you want to create </p>
                    <div style={{ display: 'flex',
                            alignItems: 'center', 
                            }}> 
                        <div className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.5rem", 
                                    minHeight: "3rem", 
                                    minWidth: "18.6%"}} onClick={() => this.displayCanvas("TOP")}>
                            <h4 className="bp3-heading"> Top </h4>
                            <p> Cost: ${stage.get("priceArray") !== null ? stage.get("priceArray")[0] : ""}</p>
                            <p> Selling Price: ${stage.get("priceArray") !== null ? stage.get("priceArray")[1] : ""}</p>
                        </div> 
                        <div className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.5rem", 
                                    minHeight: "3rem", 
                                    minWidth: "18.6%"}} onClick={() => this.displayCanvas("MAN")}>
                            <h4 className="bp3-heading"> Man </h4>
                            <p> Cost: ${stage.get("priceArray") !== null ? stage.get("priceArray")[2] : ""}</p>
                            <p> Selling Price: ${stage.get("priceArray") !== null ? stage.get("priceArray")[3] : ""}</p>
                        </div> 
                        <div className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.5rem", 
                                    minHeight: "3rem", 
                                    minWidth: "18.6%"}} onClick={() => this.displayCanvas("AIRPLANE")}>
                            <h4 className="bp3-heading"> Airplane </h4>
                            <p> Cost: ${stage.get("priceArray") !== null ? stage.get("priceArray")[4] : ""}</p>
                            <p> Selling Price: ${stage.get("priceArray") !== null ? stage.get("priceArray")[5] : ""}</p>
                        </div> 
                        <div className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.5rem", 
                                    minHeight: "3rem", 
                                    minWidth: "18.6%"}} onClick={() => this.displayCanvas("WAGON")}>
                            <h4 className="bp3-heading"> Wagon </h4>
                            <p> Cost: ${stage.get("priceArray") !== null ? stage.get("priceArray")[6] : ""}</p>
                            <p> Selling Price: ${stage.get("priceArray") !== null ? stage.get("priceArray")[7] : ""}</p>
                        </div> 
                        <div className={"bp3-card bp3-elevation-1"} 
                            style={{ margin: "0.5rem", 
                                    minHeight: "3rem", 
                                    minWidth: "18.6%"}} onClick={() => this.displayCanvas("LADDER")}>
                            <h4 className="bp3-heading"> Ladder </h4>
                            <p> Cost: ${stage.get("priceArray") !== null ? stage.get("priceArray")[8] : ""}</p>
                            <p> Selling Price: ${stage.get("priceArray") !== null ? stage.get("priceArray")[9] : ""}</p>
                        </div> 
                    </div>
                </div>
            </div>
            <DragDrop {...this.props} item={stage.get("currentItem")}/>
      </div>
    );
    }
}