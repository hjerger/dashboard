import React from "react"
import { withSize } from "react-sizeme"
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  resizeHandle: {
    "& .react-grid-item > .react-resizable-handle::after": {
      borderBottom: `2px solid grey`,
      borderRight: `2px solid grey`,
    },
  },
  dashboard: {
    "& .MuiCardContent-root:last-child": {
      paddingBottom: 0,
    },
    "& .MuiCardContent-root": {
      paddingTop: 0,
      paddingRight: "2rems",
      paddingLeft: "2rems",
    },
  },
})

type DashboardComponentProps = {
  size: { width: number }
  measureBeforeMount?: boolean
  gridItems: JSX.Element[]
  gridLayouts: Layouts
  onLayoutChange: (layout: Layout[], layouts: Layouts) => void
}

const DashboardComponent = ({
  size: { width },
  measureBeforeMount,
  gridItems,
  gridLayouts,
  onLayoutChange,
}: DashboardComponentProps) => {
  const classes = useStyles()
  const ResponsiveReactGridLayout = React.useMemo(
    () => WidthProvider(Responsive),
    []
  )

  return (
    <ResponsiveReactGridLayout
      className={`${classes.resizeHandle} ${classes.dashboard} layout`}
      layouts={gridLayouts}
      compactType="vertical"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 24, md: 24, sm: 16, xs: 12, xxs: 8 }}
      rowHeight={30}
      width={width}
      measureBeforeMount={measureBeforeMount}
      onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
      margin={[12, 12]}
      draggableHandle={".draggable-handle"}
    >
      {gridItems}
    </ResponsiveReactGridLayout>
  )
}

export default withSize({
  refreshMode: "debounce",
  refreshRate: 60,
  noPlaceholder: true,
})(DashboardComponent)
