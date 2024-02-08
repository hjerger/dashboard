import { useEffect, useState } from "react"
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart"
import { ParentSize } from "@visx/responsive"
import Typography from "@mui/material/Typography"
import { makeStyles } from "@mui/styles"

import axios from "axios"

const useStyles = makeStyles({
  noData: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    paddingTop: "50px",
  },
})
const palette = ["#1DACCC", "#1ECBAB", "#FF9A0A", "#FF4438"]

const PieArcLabel = () => {
  const classes = useStyles()

  const [data, setData] = useState<any[]>([])

  const loadData = (data: any[]) => {
    const newData: any[] = data.map((d) => {
      return { label: d.severity, value: d.count }
    })
    setData(newData)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3030/findings/groupedSeverityCount", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        loadData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return data.length < 1 ? (
     <div className={classes.noData}>
      <Typography>{"No Data"}</Typography>
    </div>
  ) : (
    <ParentSize>
      {(parent) => (
        <PieChart
          colors={palette}
          series={[
            {
              arcLabel: (item) => `${item.value}`, //`${item.label} (${item.value})`,
              arcLabelMinAngle: 0,
              data,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontWeight: "bold",
            },
          }}
          {...{ height: parent.height, width: parent.width }}
        />
      )}
    </ParentSize>
  )
}

export default PieArcLabel
