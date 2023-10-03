/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Pannellum } from "pannellum-react";
import { scenes } from "./component/scenes";

export default function PannellumReact() {
  const [currentScene, setCurrentScene] = React.useState<keyof typeof scenes>("centre");

  const [yaw, setYaw] = React.useState(0);

  const [pitch, setPitch] = React.useState(0);

  const viewRef = React.useRef<any | null>(null);

  const hotspotIcon = (hotSpotDiv: HTMLElement) => {
    const image = document.createElement("img");
    image.classList.add("hotspoticon");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute("src", "./images/circle-chevron-up-solid.svg");
    hotSpotDiv.appendChild(image);
  };
  const infoIcon = (hotSpotDiv: HTMLElement) => {
    const image = document.createElement("img");
    image.classList.add("infoicon");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute(
      "src",
      "https://img.icons8.com/material/4ac144/256/info.png"
    );
    hotSpotDiv.appendChild(image);
  };

  function hotSpotIcon(type : 'custom' | 'info') {
    if (type === "custom") {
      return hotspotIcon;
    } else if (type === "info") {
      return infoIcon;
    }
  }

  return (
    <>
      <div>
        pitch: {pitch}, yaw: {yaw}
      </div>
      <Pannellum
        ref={viewRef}
        width="100%"
        height="100vh"
        // keyboardZoom={false}
        mouseZoom={false}
        image={scenes[currentScene].scenePanoImg + "?resize=800%2C600"}
        pitch={scenes[currentScene].initPitch}
        yaw={scenes[currentScene].initYaw}
        hfov={100}
        haov={360}
        vaov={180}
        autoLoad
        showZoomCtrl={false}
        onMouseup={(event : any) => {
          setPitch(viewRef?.current?.getViewer()?.mouseEventToCoords(event)[0]);
          setYaw(viewRef?.current?.getViewer()?.mouseEventToCoords(event)[1]);
        }}
      >
        {scenes[currentScene].hotSpotsArr.map((hotSpot) => {
          return (
            <Pannellum.Hotspot
              key={hotSpot}
              type={hotSpot.type}
              pitch={hotSpot.pitch}
              yaw={hotSpot.yaw}
              tooltip={hotSpotIcon(hotSpot.type)}
              handleClick={() => setCurrentScene(hotSpot?.transition)}
              name="image info"
              text={hotSpot?.text}
              URL={hotSpot?.url}
            />
          );
        })}
      </Pannellum>
    </>
  );
}

