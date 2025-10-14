import React from "react"
import { FormLabel, FormSection } from "./components/Form"
import ReactModal from "react-modal"
import { RadioGroup, Textarea } from "./components/Input"
import { Button } from "./components/Button"

export default class FeedbackForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      valid: false,
      showModal: false,
    }
  }

  componentDidMount() {
    const { player, round } = this.props
    player.round.set("task-name", round.get("name"))
    player.stage.set("correct", true)
  }

  componentDidUpdate() {
    const { valid: prevValid } = this.state
    const valid = true

    if (prevValid !== valid) {
      this.setState({ valid })
      this.props.onValid(valid)
    }
  }

  handleChange = (event) => {
    const el = event.currentTarget
    const { player, stage } = this.props
    player.round.set(`${el.name}`, el.value)
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    const { valid } = this.state
    const { player, submitted, instructions } = this.props

    return (
      <div>
        {instructions && (
          <>
            <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
              {instructions}
              <Button secondary onClick={this.handleCloseModal.bind(this)}>
                Close Instructions
              </Button>
            </ReactModal>
            <div className="mb-3">
              <Button secondary onClick={this.handleOpenModal.bind(this)}>
                View Instructions
              </Button>
            </div>
          </>
        )}
        <FormSection title="Feedback">
          <FormLabel id="feedback-instructions-multiple-choice" name="Were the instructions you received helpful in preparing you to play? You can review them by clicking the button above. ">
            <RadioGroup
              name="feedback-instructions-multiple-choice"
              onChange={this.handleChange}
              value={player.round.get(`feedback-instructions-multiple-choice`)}
              options={[
                {
                  label: "Very helpful",
                  value: "Very helpful",
                },
                {
                  label: "Somewhat helpful",
                  value: "Somewhat helpful",
                },
                {
                  label: "Not helpful",
                  value: "Not helpful",
                },
                {
                  label: "Unclear",
                  value: "Unclear",
                },
              ]}
            />
          </FormLabel>
          <FormLabel id="feedback-instructions-open-ended" name="How can we make the instructions more clear for future players?">
            <Textarea name="feedback-instructions-open-ended" value={player.round.get(`feedback-instructions-open-ended`)} onChange={this.handleChange} />
          </FormLabel>
          <FormLabel id="feedback-issues" name="What went wrong, if anything, when playing this game?">
            <Textarea name="feedback-issues" value={player.round.get(`feedback-issues`)} onChange={this.handleChange} />
          </FormLabel>
        </FormSection>

        {/* {submitted && !valid ? (
          <div className="my-8">
            <Callout title={"Incomplete"}>
              Please fill out the feedback fields! We appreciate the help in
              improving our experiment for future users
            </Callout>
          </div>
        ) : (
          <div className="mt-8"></div>
        )} */}
      </div>
    )
  }
}
