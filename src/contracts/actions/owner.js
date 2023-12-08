export function owner(state, action) {
  if (action.type === "initialise") {
    state.owner = action.payload.owner
  }

  return state
}
