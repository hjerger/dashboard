import { Layouts } from "react-grid-layout"
import { WidgetConfig } from "./Widget"

const LS_VERSION = "1"

const LS_LAYOUTS = "layouts"
const LS_ITEMS = "items"

const getLayoutKey = (dashboardId: string): string => {
  return LS_LAYOUTS + "-" + dashboardId + "-" + LS_VERSION
}

const getItemsKey = (dashboardId: string): string => {
  return LS_ITEMS + "-" + dashboardId + "-" + LS_VERSION
}

export const getLayoutsFromLocalStorage = (
  dashboardId: string,
  defaultLayout: Layouts
) => {
  if (global.localStorage) {
    const layouts = global.localStorage.getItem(getLayoutKey(dashboardId))
    if (layouts != null && layouts.length > 0) {
      return JSON.parse(layouts)
    }
  }
  return defaultLayout
}

export const saveLayoutsToLocalStorage = (
  dashboardId: string,
  value: Layouts
) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      getLayoutKey(dashboardId),
      JSON.stringify({
        ["layouts"]: value,
      })
    )
  }
}

export const getItemsFromLocalStorage = (
  dashboardId: string,
  defaultItems: WidgetConfig[]
) => {
  if (global.localStorage) {
    const items = global.localStorage.getItem(getItemsKey(dashboardId))
    if (items != null && items.length > 0) {
      return JSON.parse(items).items
    }
  }
  return defaultItems
}

export const saveItemsToLocalStorage = (
  dashboardId: string,
  value: WidgetConfig[]
) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      getItemsKey(dashboardId),
      JSON.stringify({
        ["items"]: value,
      })
    )
  }
}
