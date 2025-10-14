import React from "react"

export default class BoatSvg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: {
        character: "",
        side: "left",
      },
      boatSide: "left",
    }
  }

  render() {
    return (
      <svg viewBox="-50 -25 746 641" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M745.5 501H1.5L88.5 620.5C282.5 635.5 661.6 656.5 626 620.5C590.4 584.5 690.833 525.833 745.5 501Z" fill="#B85D03" stroke="black" />
        <path d="M441.852 401.25V23.5898L591.378 401.25H441.852ZM415.852 401.25H272.526L415.852 24.4856V401.25Z" fill="white" stroke="black" strokeWidth="9" />
        <rect x="420" width="18" height="501" fill="#AE5C0A" />
      </svg>
    )
  }
}
