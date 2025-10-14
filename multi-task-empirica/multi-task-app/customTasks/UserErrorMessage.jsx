import React from 'react';

const UserErrorMessage = ({ message }) => {
  return (
    <div style={{ border: '1px solid red', backgroundColor: '#fdd', padding: '10px', borderRadius: '5px' }}>
      <strong>Error:</strong> {message}
    </div>
  );
};

export default UserErrorMessage;