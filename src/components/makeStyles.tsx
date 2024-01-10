import { makeStyles as muiMakeStyles } from "@mui/material/styles"
import { ClassNameMap } from "@mui/material/styles"

type MuiStylesOptions = {
  name?: string
}

const makeStyles = muiMakeStyles as unknown as (
  config?: MuiStylesOptions
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any  */
) => (props?: any) => ClassNameMap<string>
export default makeStyles
