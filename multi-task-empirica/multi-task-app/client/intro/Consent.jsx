import { ConsentButton } from "meteor/empirica:core";
import React from "react";
import { Centered } from "../common/components/Layouts";
import { isMobile } from 'react-device-detect';

export default class Consent extends React.Component {
  render() {
    if (isMobile) {
      return (
        <Centered>
        <div className="prose mt-8">
          <p>
            You seem to be working on a mobile device, which is incompatible with our 
            experiment. Please switch to a desktop device (laptop or desktop computer) 
            to continue. 
          </p>
        </div>
      </Centered>
      )
    }
    return (
      <Centered>
        <div className="prose mt-8">
          <h2>Consent Form</h2>{" "}
          <p>
            This experiment is part of a MIT scientific project. Your decision
            to participate in this experiment is entirely voluntary. There are
            no known or anticipated risks to participating in this experiment.
            There is no way for us to identify you. The only information we will
            have, in addition to your responses, is the timestamps of your
            interactions with our site. The results of our research may be
            presented at scientific meetings or published in scientific
            journals. Clicking on the "AGREE" button indicates that you are at
            least 18 years of age, and agree to participate voluntary.
          </p>
          <br />
          <ConsentButton text="I AGREE" />
        </div>
      </Centered>
    );
  }
}
