import React from 'react';
import './TextStyle.css';

function CaseText(props) {
  const text = props.text;

  const handleCopy = (event) => {
    event.preventDefault();
  };

  return <div onCopy={handleCopy}>{text}</div>;
}

export default CaseText;
