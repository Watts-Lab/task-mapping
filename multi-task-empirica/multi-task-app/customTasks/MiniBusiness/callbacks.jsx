import { startDurations, endDurations, calculatePaymentIntroOutroPractice, calculatePaymentStage } from "../helper";

export const OnRoundStart = (game, round) => {
    const scoredTasks = game.get("scored");
    scoredTasks.push(round.get("name"));
    game.set("scored", scoredTasks);
};

export const OnStageStart = (game, round, stage) => {
    game.players.forEach((player) => {
        player.stage.set("approved", false);
        player.stage.set("scoreArr", []);
    });

    stage.set("changeTime", stage.get('constants').changeTime)
    stage.set("prices", stage.get('constants').priceArrays.slice(0, 
                                                          (stage.durationInSeconds * 1000) / stage.get('constants').changeTime))
    stage.set("priceArray", stage.get("prices")[0])
    stage.set("prices", stage.get("prices").slice(1))

    stage.set("changingPrices", false)
    
    stage.set("items", [
        {name:"Dowel", category:"part"},
        {name:"Wheel", category:"part"},
        {name:"String", category:"part"},
        {name:"Clay", category:"part"},
        {name:"Wood", category:"part"},
        {name:"Glue", category:"part"},
        {name:"Paper", category:"part"},
        {name:"Wire", category:"part"},
    ])
    stage.set("currentItem", null);
    stage.set("scoreFeedback", 0);

    game.players.forEach((player) => {
        player.stage.set("scoreArr", []);
    });

    startDurations(stage);

    Meteor.setInterval(function() {
        stage.set("changingPrices", true); 
        Meteor.setTimeout(function() {
            stage.set("changingPrices", false)
        }, 3000)
        stage.set("priceArray", stage.get("prices")[0]);
        stage.set("prices", stage.get("prices").slice(1));
    }, stage.get("changeTime"))
};

export const OnStageEnd = (game, round, stage) => {
    endDurations(stage);

    if (stage.get('constants').calculateScore) {
        const finalScore = stage.get("scoreFeedback");
        game.players.forEach((player) => {
            player.set("score", player.get("score") + finalScore);
            player.stage.set("score", finalScore);
            // need to calculate max score before calculating payment 
            calculatePaymentStage(game, player, stage, round);
        });
    } else {
        game.players.forEach((player) => {
          calculatePaymentIntroOutroPractice(player, stage);
        });
    }
};

export const OnRoundEnd = (game, round) => {};