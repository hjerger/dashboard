import {
  useState,
  useEffect,
  Suspense,
  useCallback,
  useRef,
  useMemo,
} from "react"
import { Layout, Layouts } from "react-grid-layout"
import Widget, { WidgetConfig } from "./Widget"
import DashboardHeader from "./DashboardHeader"
import {
  getLayoutsFromLocalStorage,
  getItemsFromLocalStorage,
  saveLayoutsToLocalStorage,
  saveItemsToLocalStorage,
} from "./DashboardLocalStorage"

import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import "./Dashboard.css"

import DashboardComponent from "./DashboardComponent"
import { getInitialItemId, adjustSizeNewlyAddedItem } from "./DashboardUtils"
import { getDefaultDashboard } from "./DefaultDashboard"
import Table from "./Table"
import PieChart from "./PieChart"
import TinyBarChart from "./BarChart"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  dashboardPanel: {
    height: `calc(100vh - 68px)`,
    overflowY: "scroll",
    overflowX: "hidden",
  },
  header: {
    backgroundColor: "#004C7C",
  },
})

export type DefaultDashboard = {
  layouts: Layouts
  items: WidgetConfig[]
}

type DashboardProps = {
  id: string
  measureBeforeMount?: boolean
}

const Dashboard = ({ id, measureBeforeMount }: DashboardProps) => {
  const classes = useStyles()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [breakpointLayouts, setBreakpointLayouts] = useState<any>(
    getLayoutsFromLocalStorage(id, getDefaultDashboard().layouts)
  )
  const [items, setItems] = useState<WidgetConfig[]>(
    getItemsFromLocalStorage(id, getDefaultDashboard().items)
  )

  const [nextItemId, setNextItemId] = useState("")
  const [scrollToNewItem, setScrollToNewItem] = useState(false)
  const dashboardScrollTarget = useRef<HTMLDivElement>(null)

  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    const newLength = layout.length
    Object.keys(layouts).forEach((id: string) => {
      if (layouts[id].length !== newLength) {
        layouts[id] = layout
      }
    })

    adjustSizeNewlyAddedItem(layouts, items)
    saveLayoutsToLocalStorage(id, layouts)
    setBreakpointLayouts({ layouts })
  }

  const onAddItem = (type: string, title: string) => {
    const newItem = {
      id: nextItemId,
      title,
      type,
    }
    const updatedItems = [...items, newItem]
    setItems(updatedItems)
    saveItemsToLocalStorage(id, updatedItems)
    setScrollToNewItem(true)
    setNextItemId((parseInt(nextItemId) + 1).toString())
  }

  const getDashboardWidgetView = useCallback((type: string) => {
    if (type === "Table") {
      return <Table />
    } else if (type === "Pie") {
      return <PieChart />
    } else {
      return <TinyBarChart />
    }
  }, [])

  const gridItems = useMemo(() => {
    const onRemoveItem = (itemId: string) => {
      const updatedItems = items.filter((item) => item.id !== itemId)
      setItems(updatedItems)
      saveItemsToLocalStorage(id, updatedItems)
    }

    return items.map((item) => (
      <div key={item.id}>
        <Widget config={item} onRemove={onRemoveItem}>
          {getDashboardWidgetView(item.type)}
        </Widget>
      </div>
    ))
  }, [id, items, getDashboardWidgetView])

  useEffect(() => {
    setBreakpointLayouts(
      getLayoutsFromLocalStorage(id, getDefaultDashboard().layouts)
    )
    setItems(getItemsFromLocalStorage(id, getDefaultDashboard().items))
  }, [id])

  useEffect(() => {
    setNextItemId(getInitialItemId(breakpointLayouts))
  }, [breakpointLayouts])

  useEffect(() => {
    if (scrollToNewItem) {
      const timer = setTimeout(() => {
        const domNode = dashboardScrollTarget.current
        if (domNode) {
          domNode.scrollTop = domNode.scrollHeight
        }
        setScrollToNewItem(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [scrollToNewItem])

  return (
    <div>
      <Suspense fallback={<div />}>
        <DashboardHeader addWidget={onAddItem}></DashboardHeader>
      </Suspense>
      <div className={classes.dashboardPanel} ref={dashboardScrollTarget}>
        <DashboardComponent
          measureBeforeMount={measureBeforeMount}
          gridLayouts={breakpointLayouts.layouts}
          onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
          gridItems={gridItems}
        ></DashboardComponent>
      </div>
    </div>
  )
}

export default Dashboard
