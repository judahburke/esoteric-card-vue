import { cardErrorKeys, cardTextKeys } from "../card/constants";

const spitErrorKeys = {
    ...cardErrorKeys,
}

const spitTextKeys = {
    ...cardTextKeys,
    error: {
        ...cardErrorKeys
    }
}

export {
    spitTextKeys,
    spitErrorKeys,
}