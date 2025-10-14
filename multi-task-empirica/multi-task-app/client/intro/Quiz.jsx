import React from "react";
import { Callout } from "../common/components/Callout";
import { Form, FormLabel, FormSection } from "../common/components/Form";
import { Input, RadioGroup } from "../common/components/Input";
import { IntroExitStep } from "./IntroExitStep";
import { GameConfiguration, idleTimeNoActivity, warningTime, idleTimeDifferentTab } from "../../customTasks/gameConfiguration";
import { showQuiz } from "../../customTasks/gameConfiguration";
import { show } from "@blueprintjs/core/lib/esm/components/context-menu/contextMenu";
import { isRefCallback } from "@blueprintjs/core";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizMistake: false,
      teamCondition: "",
      practiceRounds: "",
      scoringRounds: "",  
      noQuizQuestion: ""
    };
  }

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const teamConditionAnswer = this.props.game.treatment.playerCount > 1 ? "team" : "solo"
    const practiceRoundsAnswer = "1"
    const scoringRoundsAnswer = "not-practice"

    if (showQuiz) {
      if (
        this.state.teamCondition !== teamConditionAnswer ||
        this.state.practiceRounds !== practiceRoundsAnswer ||
        this.state.scoringRounds !== scoringRoundsAnswer
      )
      {
        this.setState({ quizMistake: true });
      } else {
        this.props.onNext();
      }
    } else {
      if (this.state.noQuizQuestion !== "true") {
        this.setState({ quizMistake: true });
      } else {
        this.props.onNext();
      }
    }
    
  };

  render() {
    const { hasPrev, onPrev, player } = this.props;
    const {
      quizMistake,
      teamCondition,
      practiceRounds,
      scoringRounds,  
      noQuizQuestion
    } = this.state;
      

    if (showQuiz) {
      return (
        <Form onSubmit={this.handleSubmit}>
          <IntroExitStep {...this.props} prose={false} form>
            <div className="prose">
              <h2>Comprehension Check</h2>
            </div>
            <FormSection>
              <FormLabel id="teamCondition" name="Will you be playing on a team or solo?">
                <RadioGroup
                  name="teamCondition"
                  onChange={this.handleChange}
                  value={teamCondition}
                  options={[
                    {
                      label: "Team",
                      value: "team",
                    },
                    {
                      label: "Solo",
                      value: "solo",
                    },
                  ]}
                />
              </FormLabel>
            </FormSection>
          <FormSection>
              <FormLabel id="practiceRounds" name="How many rounds of practice do you get for each game?">
                <RadioGroup
                  name="practiceRounds"
                  onChange={this.handleChange}
                  value={practiceRounds}
                  options={[
                    {
                      label: "0",
                      value: "0",
                    },
                    {
                      label: "1",
                      value: "1",
                    },
                    {
                      label: "2",
                      value: "2",
                    },
                  ]}
                />
              </FormLabel>
            </FormSection>
            <FormSection>
              <FormLabel id="scoringRounds" name="Which rounds are scored?">
                <RadioGroup
                  name="scoringRounds"
                  onChange={this.handleChange}
                  value={scoringRounds}
                  options={[
                    {
                      label: "Only rounds with the practice stamp on the screen",
                      value: "practice",
                    },
                    {
                      label: "Only 1 round that is randomly selected",
                      value: "random",
                    },
                    {
                      label: "Every round except practice rounds",
                      value: "not-practice",
                    },
                  ]}
                />
              </FormLabel>
            </FormSection>
            {quizMistake ? (
              <div className="my-8">
                <Callout title={"You have one or more mistake(s)"}>
                  Please ensure that you answer the questions correctly, or go
                  back to the instructions.
                </Callout>
              </div>
              )
              : (
                <div className="mt-8"></div>
            )}
          </IntroExitStep> 
        </Form> 
      );
    } else {
      return (
        <Form onSubmit={this.handleSubmit}>
          <IntroExitStep {...this.props} prose={false} form>
            <div className="prose">
              <h2>Comprehension Check</h2>
            </div>
            <h1> </h1>
            <FormSection> 
              <FormLabel id="noQuizQuestion" name="I understand my role in the game. ">
                <RadioGroup
                  name="noQuizQuestion"
                  onChange={this.handleChange}
                  value={noQuizQuestion}
                  options={[
                    {
                      label: "True",
                      value: "true",
                    },
                    {
                      label: "False",
                      value: "false",
                    },
                  ]}
                />
              </FormLabel> 
            </FormSection>
            {quizMistake ? (
              <div className="my-8">
                <Callout title={"You have one or more mistake(s)"}>
                  Please ensure that you answer the questions correctly, or go
                  back to the instructions.
                </Callout>
              </div>
            ) : (
              <div className="mt-8"></div>
            )}
          </IntroExitStep>
        </Form> 
      )
    }
  }
}
