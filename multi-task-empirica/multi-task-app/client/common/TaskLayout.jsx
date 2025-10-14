import React from "react"
import { Button, Submit } from "./components/Button"
import Idle from "../../customTasks/Idle"

export function TaskLayout({
  children,
  nextForm = SubmitForm,
  showNext = true,
  stage,
  ...rest
}) {
  if (!showNext) {
    return <div> <div className="h-full overflow-auto">
      {children}
    </div> 
    </div>
  }
  if (stage.data.anonName.toLowerCase().includes("practice")) {
    return (
      <div className="task-layout-practice">
        <div className="task-layout-practice2">
          <div className="overflow-auto">{children}</div>
        </div>
        {showNextStep({ nextForm, ...rest })}
        <Idle stage = {stage} player = {rest.player}/>
      </div>
    )
  }
  return (
    <div className="task-layout">
      <div className="overflow-auto">
        {children}
      </div>
      {showNextStep({ nextForm, ...rest })}
      <Idle stage = {stage} player = {rest.player}/>
    </div>
  )
}

export function SubmitForm({ player }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    player.stage.submit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full items-center justify-center">
      <Submit disabled={player.stage.submitted}>Submit</Submit>
    </form>
  )
}

function showNextStep({ nextForm: NextForm, ...rest }) {
  const { game, player } = rest

  if (player.stage.submitted && player.stage.get("correct") === true && player.get("approved") === true) {
    if (game.treatment.playerCount > 1) {
      return (
        <WrapFooter>
          <div className="flex h-full items-center justify-center">Waiting for the other Players...</div>
        </WrapFooter>
      )
    } else {
      return <div></div>
    }
  }

  return (
    <WrapFooter>
      <NextForm {...rest} />
    </WrapFooter>
  )
}

function WrapFooter({ children }) {
  return <div className="h-12 border-t border-gray-200 text-gray-500">{children}</div>
}
