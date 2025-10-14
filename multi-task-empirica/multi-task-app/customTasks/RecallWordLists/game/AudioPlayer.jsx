import React from "react";
import { Button } from "../../../client/common/components/Button";

export class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      isPlayed: true,
      isAudioDone: this.props.stage.get('needAudioReset') ? false : localStorage.getItem('isAudioDone') || false,
    };
  }

  handlePlay = () => {
    this.audioRef.current.play();
    this.setState({ isPlayed: true });
  };

  handleAudioEnded = () => {
    const { player, game, stage } = this.props;
    this.setState({ isAudioDone: true });
    localStorage.setItem('isAudioDone', 'true');
    stage.set("step", 2);
  };

  componentDidMount() {
    const { audioStartDelay } = this.props;
    const audioElement = this.audioRef.current;
    audioElement.addEventListener('ended', this.handleAudioEnded);
  }

  componentWillUnmount() {
    const audioElement = this.audioRef.current;
    audioElement.removeEventListener('ended', this.handleAudioEnded);
  }

  render() {
    const { audioFilePath } = this.props;
    const { isPlayed, isAudioDone, hasTypedWhileAudio, hasLeftWhileAudio } = this.state;

    return (
      <div >
        <div >
          <h1
            style={{
              fontSize: "25px",
              marginLeft: "-40px",
              fontWeight: "bold", 
              color: "#0ea5e9"}}>
              Listen to the following list of words: &nbsp;
          <audio ref={this.audioRef} src={audioFilePath} autoPlay={!isAudioDone} /> 
          <Button onClick={this.handlePlay} disabled={true} >
            {isAudioDone ? 'Audio Done' : 'Audio Playing'}  
          </Button> 
          </h1>
        </div>
      </div>
    );
  }
}