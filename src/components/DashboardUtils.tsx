import { Layout, Layouts } from "react-grid-layout"
import { WidgetConfig } from "./Widget"

export const MIN_ITEM_WIDTH = 6 // should be > 1 to detect newly added item that has width 1
export const MIN_ITEM_HEIGHT = 4 // should be > 1 to detect newly added item that has height 1
const ADD_ITEM_WIDTH = 8
const ADD_ITEM_HEIGHT = 10
const ADD_TABLE_HEIGHT = 12
const ADD_TABLE_WIDTH = 14

export const getInitialItemId = (breakpointLayouts: Layouts) => {
  let maxId = -1
  if (breakpointLayouts != null && breakpointLayouts.layouts != null) {
    for (const value of Object.values(breakpointLayouts.layouts)) {
      for (const layout of Object.values(value)) {
        const id = parseInt(layout.i)
        if (id > maxId) {
          maxId = id
        }
      }
    }
  }
  return (maxId + 1).toString()
}

// check if a new item was added, set min values and adjust its size (1x1 -> ADD_ITEM_WIDTH x ADD_ITEM_HEIGHT)
export const adjustSizeNewlyAddedItem = (
  layouts: Layouts,
  items: WidgetConfig[]
) => {
  if (layouts != null) {
    let newItemLayout: Layout | undefined
    let newItemId = "-1"
    for (const value of Object.values(layouts)) {
      value.forEach((layout: Layout) => {
        if (layout.w == 1 && layout.h == 1) {
          newItemLayout = layout
          newItemId = layout.i
        }
        // make sure min height and min width of each item do not get reset
        layout.minH = MIN_ITEM_HEIGHT
        layout.minW = MIN_ITEM_WIDTH
      })
    }

    if (newItemLayout !== undefined) {
      const item = items.find((eachItem) => eachItem.id === newItemId)
      const type = item !== undefined ? item.type : "Table"
      newItemLayout.h = type === "Table" ? ADD_TABLE_HEIGHT : ADD_ITEM_HEIGHT
      newItemLayout.w = type === "Table" ? ADD_TABLE_WIDTH : ADD_ITEM_WIDTH
      newItemLayout.minH = MIN_ITEM_HEIGHT
      newItemLayout.minW = MIN_ITEM_WIDTH
    }
  }
}
