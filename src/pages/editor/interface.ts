import { Plug } from "@common/plugs/interface"

export interface Cmp {
  width: number,
  height: number,
  top: number,
  rotate: number,
  left: number
  key: string
  plug: Plug
  attr?: {
    [key: string]: any
  }
}

