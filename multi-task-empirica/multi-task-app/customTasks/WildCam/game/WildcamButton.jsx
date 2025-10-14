import React from 'react';

const WildcamButton = ({display, onClick, selected}) => {
  return (
    <button
                  style={{
                    borderRadius: "8px",
                    padding: "10px 24px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    backgroundColor: selected ? "#055279" : "gray",
                    color: "white",
                    border: "2px solid"
                    }}
                    onClick={onClick}
                >
                   {display}
                  </button>
  );
};

export default WildcamButton;