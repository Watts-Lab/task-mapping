import React from "react";
import { Button, Submit } from "./components/Button";
import { Centered } from "./components/Layouts";
import { TaskLayout } from "./TaskLayout";
import { calculatePaymentIntroOutroPractice } from "../../customTasks/helper";

const StepsContext = React.createContext("steps");

export class Steps extends React.Component {
  state = { valid: false, submitted: false };

  constructor(props) {
    super(props);

    const { player, steps, stage, game } = props;
    game.players.forEach((curPlayer) => {
      curPlayer.set("approved", false);
      calculatePaymentIntroOutroPractice(curPlayer, stage)
    });

    if (steps.length === 0) {
      player.stage.submit();

      console.warn("<Steps> should have at least 1 step defined.");

      return;
    }
  }
  approve() {
    const { game, player } = props;
    if (player.stage.get("correct") === true) {
      player.set("approved", true);
      if (
        game.players.reduce(
          (prev, curPlayer) => prev && (curPlayer.get("approved") || curPlayer.exitStatus || !curPlayer.online)
        )
      ) {
        game.players.forEach((curPlayer) => curPlayer.stage.submit());
      }
    }
  }

  render() {
    const { steps, player, game } = this.props;
    if (
      game.players.forEach((player) => {
        player.get("approved")
      })
    ) {
      return (
        <div className="flex h-full items-center justify-center">
          <div>Waiting for the other Players...</div>
        </div>
      );
    } 

    const current = player.stage.get("step") || 0;
    const Step = steps[current];
    const hasNextStep = Boolean(steps[current + 1]);

    if (!Step) {
      return;
    }

    const res = (
      <StepsContext.Provider value={steps}>
        <TaskLayout {...this.props} nextForm={stepFormContext}>
          <Centered>
            <div className="mt-8">
              <Step
                {...this.props}
                onValid={(valid) => {
                  this.setState({ valid, submitted: false });
                }}
                type="submit"
                submitted={this.state.submitted}
                onClick={this.approve.bind(this)}
                disabled={player.get("approved")}
              />
            </div>
          </Centered>
        </TaskLayout>
      </StepsContext.Provider>
    );

    if (!hasNextStep) {
      const handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });

        if (this.state.valid) {
          player.stage.submit();
        }
      };

      return (
        <form className="h-full" onSubmit={handleSubmit}>
          {res}
        </form>
      );
    }

    return res;
  }
}

// This little dance with context to pass down steps is necessary because on
// rerender, the button click callback is somehow lost. This happens if there is
// any rerender after mousedown on buttons with the StepForm. (☉_☉)
export function stepFormContext(props) {
  return (
    <StepsContext.Consumer>
      {(steps) => <StepForm steps={steps} {...props}></StepForm>}
    </StepsContext.Consumer>
  );
}

export function StepForm(props) {
  const { steps, player } = props;
  const current = player.stage.get("step") || 0;
  if (player.stage.get("directionsCompleted") !== undefined) {
    directionsCompleted = player.stage.get("directionsCompleted")
  } else {
    directionsCompleted = false
  }

  const handleNext = (event) => {
    player.stage.set("step", current + 1);
  };

  const handlePrevious = (event) => {
    player.stage.set("step", current - 1);
  };

  const hasNextStep = Boolean(steps[current + 1]);

  function approve() {
    const { game, player } = props;
    if (player.stage.get("correct") === true) {
      player.set("approved", true);
      if (
        game.players.reduce(
          (prev, curPlayer) => prev && (curPlayer.get("approved") || curPlayer.exitStatus || !curPlayer.online)
        )
      ) {
        game.players.forEach((curPlayer) => curPlayer.stage.submit());
      }
    } 
  }

  return (
    <div className="grid h-full grid-cols-3 items-center justify-center space-x-4 px-6">
      <div className="justify-self-end">
        {steps.length > 1 ? (
          <div className="font-mono">
            Step {current + 1} of {steps.length}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Button
          icon="arrow-left"
          wide
          secondary
          disabled={current <= 0}
          onClick={handlePrevious}
        >
          Previous
        </Button>

        {hasNextStep ? (
          <Button 
            rightIcon="arrow-right" 
            wide 
            onClick={handleNext}
            disabled={!directionsCompleted}>
            Next
          </Button>
        ) : (
          <Submit 
            rightIcon="arrow-right" 
            wide
            type="submit"
            onClick={approve}
            disabled={!directionsCompleted}>
            Submit
          </Submit>
        )}
      </div>
      <div></div>
    </div>
  );
}