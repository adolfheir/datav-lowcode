import { CSSProperties } from "react"

export interface Plug {
  loader: string,
  name: string
  key: string,
  /* 缩略图 */
  img?: string,
  /* 盒子的样式 */
  boxStyle?: Partial<{
    width: number,
    height: number,
    top: number,
    left: number,
    rotate: number,
    animate: string | null
  }>,
  plugProps?: {
    [key: string]: any
  },
  plugEvent?: {
    [key: string]: Function
  }
}

export interface PlugIns extends Omit<Plug, "boxStyle"> {
  uuid: string
  boxStyle: Required<NonNullable<Plug["boxStyle"]>>
}
