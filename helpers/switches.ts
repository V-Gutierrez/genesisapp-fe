export const computeStylesBasedOnState = <T, K>(
  stateToWatch: boolean,
  truthyStyle: T,
  falsyStyle: K,
) => (stateToWatch ? truthyStyle : falsyStyle)
