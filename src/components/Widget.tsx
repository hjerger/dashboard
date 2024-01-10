import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import DeleteIcon from "@mui/icons-material/Delete"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  paper: {
    borderRadius: 0,
    height: "100%",
    width: "100%",
  },
  paperBorder: {
    outlineStyle: "solid",
    outlineWidth: 2,
  },
  header: {
    margin: "1rem, 2rem, 0rem, 2rem",
    display: "flex",
    backgroundColor: "#007CC2",
  },
  headerContent: {
    flex: 1,
    cursor: "grab",
  },
  headerAction: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
    visibility: "visible",
  },
  content: {
    height: "calc(100% - 68px)",
    width: "calc(100% - 16px)",
    paddingTop: "16px !important",
  },
  subtitle: {
    display: "inline-block",
  },
  configIconButton: {
    margin: "0",
    padding: 10,
    marginTop: -2,
  },
  tableTextOverflow: {
    "& td": {
      textOverflow: "clip !important",
    },
  },
  barContent: {
    marginTop: -30,
  },
  title: {
    paddingTop: 12,
  },
})

export type WidgetConfig = {
  id: string
  title: string
  type: string
}

export type WidgetProps = {
  config: WidgetConfig
  children: React.ReactNode
  onRemove: (id: string) => void
}

const Widget = ({ config, children, onRemove }: WidgetProps) => {
  const classes = useStyles()

  const onRemoveClicked = () => {
    onRemove(config.id)
  }

  const getTitle = () => {
    return config.title || "Title"
  }

  return (
    <Card elevation={1} className={classes.paper}>
      <div className={classes.header}>
        <div className={`${classes.headerContent} draggable-handle`}>
          <Typography
            variant="body1"
            id="visualization-title"
            className={classes.title}
          >
            {getTitle()}
          </Typography>
        </div>
        <div className={classes.headerAction}>
          <IconButton
            className={classes.configIconButton}
            onClick={onRemoveClicked}
            size="large"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
      <CardContent
        className={`${classes.content} ${
          config.type === "Table" ? classes.tableTextOverflow : ""
        } ${config.type === "Bar" ? classes.barContent : ""}`}
      >
        {children}
      </CardContent>
    </Card>
  )
}

export default Widget
