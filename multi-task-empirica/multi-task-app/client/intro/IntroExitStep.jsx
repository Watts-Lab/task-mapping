import React from "react";

import { Centered } from "../common/components/Layouts";
import { Button, Submit } from "../common/components/Button";

export function IntroExitStep({
  hasPrev,
  hasNext,
  onNext,
  onPrev,
  children,
  form = false,
  prose = true,
}) {
  return (
    <Centered>
      <div className={`${prose ? "prose" : ""} mt-8`}>
        {children}
        <div className="space-x-4">
          <Button secondary onClick={onPrev} disabled={!hasPrev}>
            Previous
          </Button>

          {form ? (
            <Submit>Submit</Submit>
          ) : (
            <Button onClick={onNext} disabled={!hasNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </Centered>
  );
}
