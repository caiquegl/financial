import React from "react";
import { StyleSheet, View, Text, Dimensions, useWindowDimensions } from "react-native";
import Svg, { Path, G, Text as SvgText } from "react-native-svg";

const DonutChart = ({
  data,
  colors,
  strokeWidth,
  radius,
  holeRadius,
  centerText,
  labelPosition,
}) => {
  const windowWidth = useWindowDimensions().width;
  const halfWidth = windowWidth / 2;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const anglePerUnit = 360 / total;
  let startAngle = -90;

  return (
    <View
      style={[
        styles.container,
        labelPosition &&
          labelPosition === "right" && {
            flexDirection: "row",
            justifyContent: "space-between",
          },
      ]}>
      <Svg
        width={labelPosition === "right" ? windowWidth * 0.5 : windowWidth}
        height={windowWidth * 0.7}>
        <G
          transform={`translate(${labelPosition === "right" ? halfWidth * 0.5 : halfWidth}, ${
            halfWidth * 0.8
          })`}>
          {data.map((item, index) => {
            const angle = anglePerUnit * item.value;
            const endAngle = startAngle + angle;
            const largeArcFlag = angle <= 180 ? 0 : 1;

            // Calculate outer arc points
            const outerStartX = radius * Math.cos((startAngle * Math.PI) / 180);
            const outerStartY = radius * Math.sin((startAngle * Math.PI) / 180);
            const outerEndX = radius * Math.cos((endAngle * Math.PI) / 180);
            const outerEndY = radius * Math.sin((endAngle * Math.PI) / 180);

            // Calculate inner arc points
            const innerStartX = holeRadius * Math.cos((endAngle * Math.PI) / 180);
            const innerStartY = holeRadius * Math.sin((endAngle * Math.PI) / 180);
            const innerEndX = holeRadius * Math.cos((startAngle * Math.PI) / 180);
            const innerEndY = holeRadius * Math.sin((startAngle * Math.PI) / 180);

            // Path to draw the arc
            const path = `M${outerStartX},${outerStartY} A${radius},${radius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY} L${innerStartX},${innerStartY} A${holeRadius},${holeRadius} 0 ${largeArcFlag},0 ${innerEndX},${innerEndY} L${outerStartX},${outerStartY}`;

            startAngle = endAngle;

            return (
              <Path
                key={index}
                d={path}
                fill={colors[index % colors.length]}
                strokeWidth={strokeWidth}
              />
            );
          })}
        </G>
        <SvgText x={halfWidth} y={halfWidth} textAnchor="middle" fontSize={28} fontWeight="bold">
          {centerText}
        </SvgText>
      </Svg>
      <View
        style={
          labelPosition === "right" ? styles.legendContainerRight : styles.legendContainerBottom
        }>
        {data.map((item, index) => (
          <View
            key={index}
            style={labelPosition === "right" ? styles.legendItemRight : styles.legendItem}>
            {labelPosition === "right" && (
              <View
                style={[styles.legendColor, { backgroundColor: colors[index % colors.length] }]}
              />
            )}
            <Text style={labelPosition === "right" ? styles.legendLabelRight : styles.legendLabel}>
              {item.label}
            </Text>
            {labelPosition !== "right" && (
              <View
                style={[styles.legendColor, { backgroundColor: colors[index % colors.length] }]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  legendContainerBottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  legendContainerRight: {
    marginTop: 20,
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 30,
    marginBottom: 10,
  },
  legendItemRight: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 7,
  },
  legendLabel: {
    marginLeft: 5,
  },
  legendLabelRight: {
    marginLeft: 10,
  },
});

export default DonutChart;
