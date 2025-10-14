import React, {PureComponent} from 'react';
import fetch from 'node-fetch';

/**
 * This React PureComponent embeds an Etherpad instance via an iframe.
 * Text entered into the Etherpad instance is synced with the Empirica server
 * during the component unmounting process.
 */
export default class Etherpad extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      padUrl: this.buildPadUrl(),
      focusIntervalID: '',
    };
  }

  buildPadUrl() {
    const {player, padId} = this.props;

    const baseUrl = 'https://collab.csslabdev.com';
    const defaultOptions = {
      showLineNumbers: false,
      showControls: false,
      showChat: false,
      useMonospaceFont: false,
      noColors: false,
      alwaysShowChat: false,
      lang: 'en',
      rtl: false,
      focusOnLine: 0,
    };

    const userParams = buildUserParams(player);
    const optionsParams = buildOptionsParams(defaultOptions);

    return `${baseUrl}/p/${padId + userParams + optionsParams}`;
  }

  componentDidMount() {
    const {padId, player} = this.props;
    this.setState({
      focusIntervalID: setInterval(checkFocus, 100),
    });

    function checkFocus() {
      if (
        document.activeElement == document.getElementById(padId) &&
        player.stage.get('clicked') !== padId
      ) {
        player.stage.set('clicked', padId);
      } else if (
        document.activeElement != document.getElementById(padId) &&
        player.stage.get('clicked') === padId
      ) {
        player.stage.set('clicked', null);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.focusIntervalID);
  }

  render() {
    const {padId} = this.props;

    return (
      <iframe
        id={padId}
        title='etherpad editor'
        width='100%'
        height='100%'
        style={{border: '2px solid'}}
        sandbox='allow-scripts allow-same-origin'
        src={this.state.padUrl}
      />
    );
  }
}

function buildUserParams(player) {
  return `?userName=${player.id}&userColor=${player.get('avatar').color}`.replace(/#/g, '%23');
}

function buildOptionsParams(options) {
  return options
    ? Object.entries(options).reduce((acc, [query, value]) => `${acc}&${query}=${value}`, '')
    : '';
}

export function buildPadId(gameId, displayName, uid) {
  return `${gameId}-${displayName}-${uid}`.replace(/ /g, '_');
}

export async function saveEtherpadStage(stage) {
  const etherpadData = stage.get('etherpadData');

  for (const padId in etherpadData) {
    etherpadData[padId]['text'] = await getEtherpadText(padId);
    etherpadData[padId]['lastEdited'] = await getEtherpadLastEditTime(padId);
  }

  stage.set('etherpadData', etherpadData);
  // console.log(stage.get('etherpadData'));

  return stage;
}

async function getEtherpadText(padId) {
  const baseUrl = 'https://collab.csslabdev.com/api/1.3.0/getText';

  const data = new URLSearchParams();
  data.append('apikey', 'dc7f31dd34aff72519a368c4f90a319cf68377772617211575ab4ca457ed46a0');
  data.append('padID', padId);

  const options = {
    method: 'POST',
  };

  const result = await fetch(`${baseUrl}?${data.toString()}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Etherpad network response was not ok.');
      }
    })
    .then(responseJson => {
      return responseJson.data?.text;
    })
    .catch(error => {
      console.error(error);
      return error;
    });

  return result;
}

async function getEtherpadLastEditTime(padId) {
  const baseUrl = 'https://collab.csslabdev.com/api/1.3.0/getLastEdited';

  const data = new URLSearchParams();
  data.append('apikey', 'dc7f31dd34aff72519a368c4f90a319cf68377772617211575ab4ca457ed46a0');
  data.append('padID', padId);

  const options = {
    method: 'POST',
  };

  const result = await fetch(`${baseUrl}?${data.toString()}`, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Etherpad network response was not ok.');
      }
    })
    .then(responseJson => {
      const lastEditedTimestamp = responseJson.data?.lastEdited
      return lastEditedTimestamp;
    })
    .catch(error => {
      console.error(error);
      return error;
    });

  return result;
}
