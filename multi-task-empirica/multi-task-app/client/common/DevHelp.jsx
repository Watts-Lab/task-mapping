import React from "react"

export default class DevHelp extends React.Component {
  render() {
    const { showOpenAltPlayer, onOpenAltPlayer, onReset, showReset, about, showAbout, onToggleAbout } = this.props

    return (
      <div className="fixed bottom-2 left-2 z-50 flex items-center space-x-3 rounded-full bg-white py-2 px-4 text-sm text-gray-300">
        {showReset ? <button onClick={onReset}>Reset</button> : null}
        {showOpenAltPlayer ? <button onClick={onOpenAltPlayer}>New Player</button> : null}
      </div>
    )
  }
}
