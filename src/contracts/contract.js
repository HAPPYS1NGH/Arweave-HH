import { balance } from "./actions/owner"
import { registerBrand } from "./actions/brand"
import { transfer } from "./actions/transferUTokens"

export async function handle(state, action) {
  const input = action.input

  switch (input.function) {
    case "registerBrand":
      return registerBrand(state, action)
    case "users":
      return users(state, action)
    default:
      throw new ContractError(
        `No function supplied or function not recognized: "${input.function}"`
      )
  }
}
