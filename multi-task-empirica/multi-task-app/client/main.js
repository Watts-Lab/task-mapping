import Empirica from "meteor/empirica:core";
import "tippy.js/dist/tippy.css";
import { render } from "react-dom";
import DevHelp from "./common/DevHelp";
import Round from "./common/Round";
import ExitSurvey from "./exit/ExitSurvey";
import PayScreen from "./exit/PayScreen";
import Sorry from "./exit/Sorry";
import Thanks from "./exit/Thanks";
import Consent from "./intro/Consent";
import NewPlayer from "./intro/NewPlayer";
import Overview from "./intro/Overview";
import Quiz from "./intro/Quiz";
import { devTask } from "../dev";

// Removing header
Empirica.header(DevHelp);

// Removing breadcrumb
Empirica.breadcrumb(() => null);

// Set the Consent Component you want to present players (optional).
Empirica.consent(Consent);

// Set the component for getting the player id (optional)
Empirica.newPlayer(NewPlayer);

// Introduction pages to show before they play the game (optional).
// At this point they have been assigned a treatment. You can return
// different instruction steps depending on the assigned treatment.
Empirica.introSteps((game) => {
  if (devTask) {
    return [];
  }

  const steps = [Overview];
  steps.push(Quiz);
  return steps;
});

// The Round component containing the game UI logic.
// This is where you will be doing the most development.
// See client/game/Round.jsx to learn more.
Empirica.round(Round);

// End of Game pages. These may vary depending on player or game information.
// For example we can show the score of the user, or we can show them a
// different message if they actually could not participate the game (timed
// out), etc.
// The last step will be the last page shown to user and will be shown to the
// user if they come back to the website.
// If you don't return anything, or do not define this function, a default
// exit screen will be shown.
Empirica.exitSteps((game, player) => {
  if (
    !game ||
    (player.exitStatus &&
      player.exitStatus !== "finished" &&
      player.exitReason !== "playerQuit")
  ) {
    return [Sorry];
  }
  return [ExitSurvey, PayScreen, Thanks];
});

// Start the app render tree.
// NB: This must be called after any other Empirica calls (Empirica.round(),
// Empirica.introSteps(), ...).
// It is required and usually does not need changing.
Meteor.startup(() => {
  render(Empirica.routes(), document.getElementById("app"));
});
