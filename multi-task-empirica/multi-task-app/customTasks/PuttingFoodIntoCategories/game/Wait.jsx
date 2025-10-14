import React from "react";
import Button from "./Button";
import ConfirmBox from "./CofirmBox";
import Toast from "./Toast";

export default class Wait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmShow: false,
      alertShow: false,
      copyLink: "",
      visible: false,
    };

    this.timer = null;

    this.handleQuit = this._handleQuit.bind(this);
    this.handleYes = this._handleYes.bind(this);
    this.handleCancel = this._handleCancel.bind(this);
    this.handleCopy = this._handleCopy.bind(this);
    this.renderMessage = this._renderMessage.bind(this);
  }

  _handleQuit() {
    this.setState({
      confirmShow: true,
    });
  }
  _handleYes() {
    const { player } = this.props;
    this.setState({
      confirmShow: false,
    });
    player.exit("playerQuit");
  }
  _handleCancel() {
    this.setState({
      confirmShow: false,
    });
  }
  _handleCopy() {
    const copyLink = window.location.href;
    // Doing copy from DOM
    const input = document.createElement("input");
    input.value = copyLink;
    document.body.appendChild(input);
    // Select and copy
    input.select();
    document.execCommand("copy");
    // Remove the temporary input
    document.body.removeChild(input);
    this.setState({
      alertShow: true,
      copyLink,
    });
  }

  _renderMessage() {
    const {
      treatment: { quitEarly, longTermEngagement },
    } = this.props.game;
    return (
      <div>
        Press CONTINUE when you are ready to go to the next round
        {longTermEngagement &&
          `. If you want to leave, you can press the COPY LINK button`}
        {quitEarly && ` (should not press QUIT)`}
        {quitEarly &&
          `, or press QUIT if you've had enough and want to exit the experiment`}
        {longTermEngagement &&
          `. You can come back with the copied link, that link will send you back here`}
        .
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.alertShow !== prevState.alertShow) {
      if (this.state.alertShow) {
        this.timer = setTimeout(() => {
          this.setState({
            alertShow: false,
          });
        }, 3000);
      }
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  render() {
    const { player, game } = this.props;
    const {
      treatment: { quitEarly, longTermEngagement },
    } = game;
    const { confirmShow, alertShow, copyLink } = this.state;

    return (
      <>
        <div className="flex h-full items-center justify-center text-gray-800">
          <div className="w-10/12 max-w-3xl">
            {this.renderMessage()}
            <div className="mt-8 flex">
              <Button
                tick
                onClick={() => player.stage.submit()}
                text="CONTINUE"
                disabled={player.stage.submitted}
              />
              {longTermEngagement && (
                <div className="ml-4">
                  <Button
                    tick
                    onClick={this.handleCopy}
                    text="COPY LINK"
                    disabled={player.stage.submitted}
                  />
                </div>
              )}
              {quitEarly && (
                <div className="ml-4">
                  <Button
                    tick
                    onClick={this.handleQuit}
                    text="QUIT"
                    disabled={player.stage.submitted}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {confirmShow && (
          <ConfirmBox
            onYes={this.handleYes}
            onCancel={this.handleCancel}
            isWarn
          >
            <p>Are you sure?</p>
            <p>
              It will end the experiment, cannot come back, whether this limits
              your pay.
            </p>
          </ConfirmBox>
        )}
        {alertShow && <Toast>Copied the link: {copyLink}</Toast>}
      </>
    );
  }
}
