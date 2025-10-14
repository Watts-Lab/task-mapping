import React from 'react';

const WildcamImage = ({speciesToDisplay}) => {
  return (
    <div
      style={{
        marginLeft: '3rem',
        marginTop: '1rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {speciesToDisplay ? (
        <div>
          <div style={{textAlign: 'center'}}>Selected species: {speciesToDisplay.name}</div>
          <img
            src={speciesToDisplay.image_path}
            style={{
              maxWidth: '100%',
              maxHeight: '25rem',
              width: 'auto',
              height: 'auto',
              marginBottom: '0.5rem',
            }}
          ></img>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WildcamImage;
