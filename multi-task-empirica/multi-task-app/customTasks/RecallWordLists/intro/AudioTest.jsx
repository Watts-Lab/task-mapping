import React from "react";
import { Button } from "../../../client/common/components/Button";

export class AudioTest extends React.Component {
    constructor(props) {
      super(props);
      this.audioRef = React.createRef();
      this.state = {
        isPlayed: false,
      };
    }
  
    handlePlay = () => {
      this.audioRef.current.play();
      this.setState({ isPlayed: true });
    };
  
    handleAudioEnded = () => {
      this.setState({ isPlayed: false });
    };
  
    componentDidMount() {
      const audioElement = this.audioRef.current;
      audioElement.addEventListener('ended', this.handleAudioEnded);
    }
  
    componentWillUnmount() {
      const audioElement = this.audioRef.current;
      audioElement.removeEventListener('ended', this.handleAudioEnded);
    }
  
    render() {
      const { audioFilePath } = this.props;
      const { isPlayed } = this.state;
  
      return (
        <div >
          <div >
            <audio ref={this.audioRef} src={audioFilePath} /> 
            <Button onClick={this.handlePlay} >
              {isPlayed ? 'Audio Playing' : 'Play Audio'}
            </Button> 
          </div>  
        </div>
      );
    }
  }