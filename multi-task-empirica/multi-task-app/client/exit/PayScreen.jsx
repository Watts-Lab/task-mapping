import React from "react";
import { Form, FormLabel, FormSection } from "../common/components/Form";
import { Input, RadioGroup, Textarea } from "../common/components/Input";
import { IntroExitStep } from "../intro/IntroExitStep";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    {label}
  </label>
);

export default class PayScreen extends React.Component {
  static stepName = "PayScreen";
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
    const { age, gender, strengthInGame, payFair, feedbackMultipleChoice, feedbackOpenEnded, education, synergyPreference, teamViability, enjoyedTask } =
      this.state;
    const listItems = game.get("unscored").map(element =>
      <li>{element}</li>
    );
    let otherPlayers = _.reject(game.players, (p) => p._id === player._id);
    return (
      <Form onSubmit={this.handleSubmit}>
        <IntroExitStep {...this.props} prose={false} form>
          <div className="prose my-8">
            <h2>End of game</h2>
            <p>
              You will be compensated by a bonus to your workerID.
            </p>
            <p>
              Total potential bonus = ${player.get("totalPayment").toFixed(2)}+${player.get("unscoredTasksMaxPayment").toFixed(2)} = <strong>${(parseFloat(player.get("unscoredTasksMaxPayment")) + parseFloat(player.get("totalPayment"))).toFixed(2)}</strong>
              <br></br>Current bonus =  <strong>${player.get("totalPayment").toFixed(2)}</strong>
              <br></br>Potential additional bonus = <strong>${(player.get("unscoredTasksMaxPayment")).toFixed(2)} </strong>{" "}
            </p>
            {(parseFloat(player.get("unscoredTasksMaxPayment")) > 0.0) ? (
              <div>
                <p>The list of offline tasks that still need to be evaluated for the potential additional bonus are:</p>
                {game.get("unscored") && (
                  <div>
                    <ul> {listItems} </ul>
                  </div>
                )} </div>) : (
              <></>
            )}
          </div>

          <div className="mb-8">
            <FormSection
              title="Feedback"
              desc="Please answer the following questions to help us improve our experiment for the future."
            >
              <FormLabel id="age" name="Age" cols={3}>
                <Input name="age" onChange={this.handleChange} value={age} />
              </FormLabel>

              <FormLabel id="gender" name="Gender" cols={3}>
                <Input
                  name="gender"
                  onChange={this.handleChange}
                  value={gender}
                />
              </FormLabel>

              <FormLabel id="education" name="Highest Education Qualification">
                <RadioGroup
                  name="education"
                  onChange={this.handleChange}
                  value={education}
                  options={[
                    {
                      label: "High School",
                      value: "high-school",
                    },
                    {
                      label: "US Bachelor's Degree",
                      value: "bachelor",
                    },
                    {
                      label: "Master's or higher",
                      value: "master",
                    },
                    {
                      label: "Other",
                      value: "other",
                    },
                  ]}
                />
              </FormLabel>

              <FormLabel
                id="strengthInGame"
                name="How would you describe your strength in the game?"
                cols={2}
              >
                <Textarea
                  name="strengthInGame"
                  onChange={this.handleChange}
                  value={strengthInGame}
                />
              </FormLabel>

              {/* Using non-breaking spaces in the name to align the labels on the textarea... */}
              <FormLabel
                id="payFair"
                name="Do you feel the pay was fair?                       "
                cols={2}
              >
                <Textarea
                  name="payFair"
                  onChange={this.handleChange}
                  value={payFair}
                />
              </FormLabel>
            </FormSection>
            </div>
        </IntroExitStep>
      </Form>
    );
  }
}
