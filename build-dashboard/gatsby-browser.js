import React from "react"

import {ModalContextProvider} from "./src/contexts/modal"

export const wrapRootElement = ({ element }) => (
  <ModalContextProvider>
    {element}
  </ModalContextProvider>
)
