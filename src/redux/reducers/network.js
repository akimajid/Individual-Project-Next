import { network_type } from "../types"

const init_state = {
    errorMessage: "",
    errorTitle: ""
}

export const network_reducer = (state = init_state, action) => {
    if (action.type === network_type.NETWORK_ERROR) {
        return {
            ...state,
            errorMessage: action.payload.description,
            errorTitle: action.payload.title
        }
    } else if (action.type === network_type.NETWORK_RESET) {
        return init_state
    }

    return state
}