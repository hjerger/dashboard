import { useEffect, useState } from "react"
import { BarChart } from "@mui/x-charts/BarChart"
import { ParentSize } from "@visx/responsive"
import axios from "axios"

const palette = ["#1DACCC"]

const HorizontalBars = () => {
  const [data, setData] = useState<any[]>([])

  const loadData = (data: any[]) => {
    const newData: any[] = data.map((d) => {
      return { analyst: d.security_analyst, value: d.count }
    })
    setData(newData)
  }

  useEffect(() => {
    axios
      .get("http://localhost:3030/findings/getGroupedAnalystCount", {
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

  return (
    <ParentSize>
      {(parent) => (
        <BarChart
          colors={palette}
          dataset={data}
          yAxis={[{ scaleType: "band", dataKey: "analyst" }]}
          series={[
            // { dataKey: "value", label: "Remediations", valueFormatter },
            { dataKey: "value" },
          ]}
          layout="horizontal"
          {...{
            xAxis: [
              {
                label: "remediations",
              },
            ],
            height: parent.height + 30,
            width: parent.width,
          }}
        />
      )}
    </ParentSize>
  )
}
export default HorizontalBars
