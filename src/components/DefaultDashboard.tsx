const MIN_ITEM_WIDTH = 6 // must be > 1
const MIN_ITEM_HEIGHT = 4 // must be > 1

const breakpointLayoutArray = [
  {
    i: "0",
    x: 8,
    y: 0,
    w: 14,
    h: 13,
    minW: MIN_ITEM_WIDTH,
    minH: MIN_ITEM_HEIGHT,
  },
]

const layouts = {
  lg: breakpointLayoutArray,
  md: breakpointLayoutArray,
  sm: breakpointLayoutArray,
  xs: breakpointLayoutArray,
  xxs: breakpointLayoutArray,
}

const items = [
  {
    id: "0",
    type: "Table",
    title: "Table Chart",
  },
]

export const getDefaultDashboard = () => {
  return {
    layouts: layouts,
    items: items,
  }
}
