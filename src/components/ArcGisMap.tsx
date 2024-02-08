import React, { useEffect } from "react"
import { loadModules } from "esri-loader"
import { ParentSize } from "@visx/responsive"

const CENTER = [-73.985428, 40.748817]

const ArcGisMap = () => {
  useEffect(() => {
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Locate",
      ],
      { css: true }
    )
      .then(([ArcGISMap, MapView, Graphic, GraphicsLayer, Locate]) => {
        const map = new ArcGISMap({
          basemap: "streets",
        })

        const view = new MapView({
          container: "map-container",
          map: map,
          center: CENTER,
          zoom: 11,
        })

        const locate = new Locate({
          view: view,
          useHeadingEnabled: false,
          goToOverride: function (view: any, options: any) {
            options.target.scale = 20000
            return view.goTo(options.target)
          },
        })
        view.ui.add(locate, "top-left")

        const graphicsLayer = new GraphicsLayer()
        map.add(graphicsLayer)
        const graphic = new Graphic({
          geometry: {
            type: "polygon",
            rings: [
              [
                [CENTER[0] - 0.05, CENTER[1] + 0.04],
                [CENTER[0] + 0.05, CENTER[1] + 0.04],
                [CENTER[0] + 0.05, CENTER[1] - 0.04],
                [CENTER[0] - 0.05, CENTER[1] - 0.04],
              ],
            ],
            spatialReference: {
              wkid: 4326,
            },
          },
          symbol: {
            type: "simple-fill",
            color: [0, 0, 255, 0.2],
            outline: {
              color: [0, 0, 255],
              width: 1,
            },
          },
          attributes: {
            id: "box1",
            label: "home-box",
          },
        })
        graphicsLayer.add(graphic)

        view.on("click", (event: MouseEvent) => {
          view.hitTest(event).then((response: any) => {
            if (response.results.length > 0) {
              const graphic = response.results[0].graphic
              view.goTo({
                target: graphic,
                zoom: view.zoom + 1,
              })
            }
          })
        })
      })

      .catch((error) => {
        console.error("Error loading ArcGIS modules:", error)
      })
  }, [])

  return (
    <ParentSize>
      {(parent) => (
        <div id="map-container" style={{ height: parent.height }}></div>
      )}
    </ParentSize>
  )
}

export default ArcGisMap
