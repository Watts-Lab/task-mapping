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
      goal: "",
      numLines: "",
      valid: false,
    };
  }

  componentDidUpdate() {
    const { goal, numLines, valid: prevValid } = this.state;
    const valid = goal === "short" && numLines === "2";

    if (prevValid !== valid) {
      this.setState({ valid });
      this.props.onValid(valid);
    }
  }

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  render() {
    const { goal, protagonist, valid } = this.state;
    const { submitted } = this.props;

    return (
      <div>
        <FormSection title="Comprehension Check">
          <FormLabel id="goal" name="The goal is to">
            <RadioGroup
              name="goal"
              onChange={this.handleChange}
              value={goal}
              options={[
                {
                  label: "Find the shortest path between cities.",
                  value: "short",
                },
                {
                  label: "Draw a fun picture.",
                  value: "pic",
                },
              ]}
            />
          </FormLabel>
          <FormLabel
            id="numPaths"
            name="How many paths must be connected to each city?"
          >
            <Input
              name="numLines"
              placeholder="e.g. 1"
              onChange={this.handleChange}
              value={protagonist}
              required
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
