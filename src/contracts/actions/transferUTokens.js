function transferUTokens(state, action) {
  const { brand, user, amount } = action

  if (!brand || !user || !amount || amount <= 0) {
    throw new ContractError("Invalid parameters for U token transfer.")
  }

  // Find the brand and user
  const brandIndex = state.brands.findIndex((b) => b.name === brand)
  const userIndex = state.users.findIndex((u) => u.name === user)

  if (brandIndex === -1 || userIndex === -1) {
    throw new ContractError("Brand or user not found.")
  }

  // Check if the sender is the owner of the contract
  if (action.caller !== state.owner) {
    throw new ContractError("Only the owner can initiate U token transfers.")
  }

  // Check if the brand has enough balance
  if (state.brands[brandIndex].balance < amount) {
    throw new ContractError("Insufficient U token balance for transfer.")
  }

  // Transfer U tokens
  state.brands[brandIndex].balance -= amount
  state.users[userIndex].balance += amount

  return { state }
}
