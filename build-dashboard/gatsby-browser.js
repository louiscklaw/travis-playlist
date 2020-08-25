import React from "react"

import {ModalContextProvider} from "./src/contexts/modal"
import {GlobalContextProvider} from "./src/contexts/global"

export const wrapRootElement = ({ element }) => (
  <GlobalContextProvider>
    <ModalContextProvider>
      {element}
    </ModalContextProvider>
  </GlobalContextProvider>
)
