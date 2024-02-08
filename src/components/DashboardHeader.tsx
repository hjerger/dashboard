import * as React from "react"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import AddchartIcon from "@mui/icons-material/Addchart"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import BarChartIcon from "@mui/icons-material/BarChart"
import PieChartIcon from "@mui/icons-material/PieChart"
import TableChartIcon from "@mui/icons-material/TableChart"
import PlaceIcon from '@mui/icons-material/Place'
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  header: {
    backgroundColor: "#004C7C !important",
  },
})

type DashboardHeaderPros = {
  addWidget: (type: string, title: string) => void
}

const DashboardHeader = ({ addWidget }: DashboardHeaderPros) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleBarChart = () => {
    addWidget("Bar", "Bar Chart")
    handleClose()
  }

  const handleTableChart = () => {
    addWidget("Table", "Table Chart")
    handleClose()
  }

  const handlePieChart = () => {
    addWidget("Pie", "Pie Chart")
    handleClose()
  }

  const handleMap = () => {
    addWidget("Map", "Map")
    handleClose()
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className={classes.header}>
          <Toolbar variant="dense">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <AddchartIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={handleBarChart}
          data-testid={"widget-menu-bar-chart"}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary={"Bar Chart"} />
        </MenuItem>
        <MenuItem onClick={handlePieChart}>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary={"Pie Chart"} />
        </MenuItem>
        <MenuItem onClick={handleTableChart}>
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary={"Table Chart"} />
        </MenuItem>
        <MenuItem onClick={handleMap}>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <ListItemText primary={"Map"} />
        </MenuItem>
      </Menu>
    </div>
  )
}
export default DashboardHeader
