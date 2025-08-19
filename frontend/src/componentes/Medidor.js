import React from "react";
import LiquidGauge from "react-liquid-gauge";
import { scaleQuantile } from "d3-scale";

function LiquidGaugeComponent(props) {
  const radius = 110;
  const fillColor = "#BE3A4A";
  const waveTextColor = "#2E2A25";
  const { value, min, max } = props;

  // create a quantile scale for coloring the gauge
  const range = scaleQuantile()
    .domain([min, max])
    .range(["#DC143C", "#FF8C00", "#228B22", "#228B22"]);

  // create the style object for the text that displays the value
  const textStyle = {
    fill: waveTextColor,
    fontFamily: "Arial",
    fontSize: "30px",
    fontWeight: "bold",
    textAnchor: "middle",
  };

  return (
    <LiquidGauge
      style={{ margin: "0 auto" }}
      width={radius * 1.2}
      height={radius * 1.2}
      value={value}
      minValue={min}
      maxValue={max}
      textRenderer={(props) => {
        const value = props.value;

        return (
          <tspan>
            <tspan y="10%" dy="0em" style={textStyle}>
              {value}%
            </tspan>
          </tspan>
        );
      }}
      waveAnimationDuration={3000}
      waveFrequency={2}
      gradient={{
        0: range(min),
        0.5: range((max - min) * 0.5 + min),
        1: range(max),
      }}
      circleStyle={{
        fill: fillColor,
      }}
      waveStyle={{
        fill: fillColor,
      }}
    />
  );
}

export default LiquidGaugeComponent;
