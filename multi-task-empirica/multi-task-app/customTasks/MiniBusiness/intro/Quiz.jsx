import React from "react";
import { Callout } from "../../../client/common/components/Callout";
import {
  Form,
  FormLabel,
  FormSection,
} from "../../../client/common/components/Form";
import { Input, RadioGroup } from "../../../client/common/components/Input";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: false,
    };
  }

  handleChange = () => {
    this.setState({ valid: true });
    this.props.onValid(true);
  };

  componentDidMount() {
    const { player } = this.props
    player.stage.set("correct", false)
  }

  render() {
    const { valid } = this.state;
    const { submitted, player } = this.props;

    if (valid && player.stage.get("correct") !== true) {
      player.stage.set("correct", true)
    } else if (!valid && player.stage.get("correct") == true) {
      player.stage.set("correct", false)
    }
    
    return (
      <div>
        <FormSection title="Comprehension Check">
          <FormLabel id="comprehension" name="">
            <RadioGroup
              name="comprehension"
              onChange={this.handleChange}
              value={valid}
              options={[
                {
                  label: "I have read and understood everything.",
                  value: true,
                },
              ]}
            />
          </FormLabel>
        </FormSection>

        {submitted && !valid ? (
          <div className="my-8">
            <Callout title={"You have one or more mistake(s)"}>
              Please ensure that you answer the questions correctly, or go back
              to the instructions.
            </Callout>
          </div>
        ) : (
          <div className="mt-8"></div>
        )}
      </div>
    );
  }
}
