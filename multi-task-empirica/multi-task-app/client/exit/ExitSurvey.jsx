import React from "react";
import { Form, FormLabel, FormSection } from "../common/components/Form";
import { Input, RadioGroup, Textarea } from "../common/components/Input";
import { IntroExitStep } from "../intro/IntroExitStep";

export default class ExitSurvey extends React.Component {
    static stepName = "ExitSurvey";
    state = { synergyPreference: "", teamViability: "", enjoyedTask: "", age: "", gender: "", strengthInGame: "", payFair: "", feedbackOpenEnded: "" };
  
    handleChange = (event) => {
      const el = event.currentTarget;
      this.setState({ [el.name]: el.value });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
    };
  
    render() {
      const { player, game } = this.props;
      const { feedbackMultipleChoice, feedbackOpenEnded, synergyPreference, teamViability, enjoyedTask } =
        this.state;
        let otherPlayers = _.reject(game.players, (p) => p._id === player._id);
        return (
            <Form onSubmit={this.handleSubmit}>
              <IntroExitStep {...this.props} prose={false} form>
                <div className="prose my-8">
                <FormSection
              title="Exit Survey"
              desc="Please answer the following questions, submit, and you will see your bonus displayed."
            >
              <FormLabel
                id="feedbackMultipleChoice"
                name="Would you recommend this task to someone else?"
              >
                <RadioGroup
                  name="feedbackMultipleChoice"
                  onChange={this.handleChange}
                  value={feedbackMultipleChoice}
                  options={[
                    {
                      label: "Yes",
                      value: "Yes",
                    },
                    {
                      label: "No",
                      value: "No",
                    },
                  ]}
                />
              </FormLabel>

              <FormLabel
                id="feedbackOpenEnded"
                name="Do you have feedback on gameplay or any other aspect of this activity including how you were notified about it, waiting room, general experience?"
                cols={4}
              >
                  </FormLabel>
                <Textarea
                  name="feedbackOpenEnded"
                  onChange={this.handleChange}
                  value={feedbackOpenEnded}
                />
              <FormLabel id="synergyPreference" name="In another round of this task, select how you would like to work. (Answer required)">
                <RadioGroup
                  name="synergyPreference"
                  onChange={this.handleChange}
                  value={synergyPreference}
                  options={[
                    {
                      label: "As an individual",
                      value: "individual",
                    },
                    {
                      label: "As a member of a team of 3-6 people",
                      value: "team",
                    },
                  ]}
                  required={true}
                />
              </FormLabel>
              { otherPlayers.length > 0 ?
              <FormLabel id="teamViability" name="In another round of this task, if you had to work with a team, select how you would like to work. (Answer required)">
                <RadioGroup
                  name="teamViability"
                  onChange={this.handleChange}
                  value={teamViability}
                  options={[
                    {
                      label: "With the same team",
                      value: "true",
                    },
                    {
                      label: "With a new team of randomly chosen individuals",
                      value: "false",
                    },
                  ]}
                  required={true}
                />
              </FormLabel>
                : <div></div>
              }

              <FormLabel id="enjoyedTask" name="How much do you agree with the following statement? Overall, I enjoyed working on this task. (Answer required)">
                <RadioGroup
                  name="enjoyedTask"
                  onChange={this.handleChange}
                  value={enjoyedTask}
                  options={[
                    {
                      label: "Strongly disagree",
                      value: "strongly disagree",
                    },
                    {
                      label: "Disagree",
                      value: "disagree",
                    },
                    {
                      label: "Neither agree nor disagree",
                      value: "neither agree nor disagree",
                    },
                    {
                      label: "Agree",
                      value: "agree",
                    },
                    {
                      label: "Strongly agree",
                      value: "strongly agree",
                    },
                  ]}
                  required={true}
                />
              </FormLabel>
              
            </FormSection>
          </div>
        </IntroExitStep>
      </Form>)
    }
}