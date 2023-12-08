export async function registerBrand(state, action) {
  const { name, data, amount } = action
  const newBrand = {
    address: action.caller,
    name: name,
    data: data,
    amount: amount,
  }

  if (!name || !data) {
    throw new ContractError("Brand name and data are required.")
  }
  if (amount < 0) {
    throw new ContractError("Amount cannot be negative.")
  }

  // Check if the brand with the same name doesn't already exist
  const existingBrand = state.brands.find(
    (brand) => brand.address === action.caller
  )
  if (existingBrand) {
    throw new ContractError("Brand with the same owner address already exists.")
  }

  await SmartWeave.contracts.write(state.uToken, {
    function: "Allow",
    from: caller,
    to: SmartWeave.contract.owner,
    // target: wallet1.address,
    qty: amount,
  })

  await SmartWeave.contracts.write(state.uToken, {
    function: "Transfer",
    from: caller,
    to: SmartWeave.contract.owner,
    // target: wallet1.address,
    qty: amount,
  })

  state.brands.push(newBrand)

  return { state }
}

export async function addCredits(state, action) {
  const { amount } = action

  let brand = state.brands.find((brand) => brand.address === action.caller)
  if (!brand) {
    throw new ContractError("Brand not found.")
  }

  await SmartWeave.contracts.write(state.uToken, {
    function: "Allow",
    from: caller,
    to: SmartWeave.contract.owner,
    qty: amount,
  })

  await SmartWeave.contracts.write(state.uToken, {
    function: "Transfer",
    from: caller,
    to: SmartWeave.contract.owner,
    qty: amountIn0,
  })

  return { state }
}

export async function transferUTokens(state, action) {
  const brand = state.brands.find((brand) => brand.address === action.caller)
}
