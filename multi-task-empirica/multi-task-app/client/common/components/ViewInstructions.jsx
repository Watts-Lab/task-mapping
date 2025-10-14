import React from "react";
import ReactModal from "react-modal";
import { Button } from "./Button";

export default class ViewInstructions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
    }
  }

  handleOpenModal() {
    this.setState({ showModal: true })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  render() {
    return (
    <>
      <ReactModal
        style={{ zIndex: "50" }}
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
        <this.props.instruction inside = {true}></this.props.instruction>
        <Button secondary onClick={this.handleCloseModal.bind(this)}>
          Close Instructions
        </Button>
      </ReactModal>
      <Button secondary onClick={this.handleOpenModal.bind(this)}>
        View Instructions
      </Button>
    </>
  )}
}
