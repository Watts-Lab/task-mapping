import React, { Component } from "react";
import { Submit } from "../common/components/Button";
import { Input } from "../common/components/Input";
import { Centered } from "../common/components/Layouts";

export default class NewPlayer extends Component {
  state = { id: "" };

  handleUpdate = (event) => {
    const { value, name } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { handleNewPlayer } = this.props;
    const { id } = this.state;
    handleNewPlayer(id);
  };

  render() {
    const { id } = this.state;

    return (
      <Centered>
        <form className="prose mt-8" onSubmit={this.handleSubmit}>
          <h2>Identification</h2>
          <label className="text-medium mt-8 block text-gray-500" htmlFor="id">
            Please enter your id:
          </label>
          <div className="mt-2 w-72">
            <Input name="id" value={id} onChange={this.handleUpdate} required />
          </div>
          <div className="m-1 text-sm leading-snug text-gray-400">
            Enter your player identification (provided ID, MTurk ID, etc.)
          </div>

          <br />

          <p>
            <Submit>Submit</Submit>
          </p>
        </form>
      </Centered>
    );
  }
}
