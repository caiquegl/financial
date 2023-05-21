import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Svg, { Path, G, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");

const DonutChart = ({ data, colors, strokeWidth, radius, holeRadius, centerText }) => {
  const halfWidth = width / 2;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const anglePerUnit = 360 / total;
  let startAngle = -90;

  return (
    <View style={styles.container}>
      <Svg width={width} height={width}>
        <G transform={`translate(${halfWidth}, ${halfWidth})`}>
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
              <>
                <Path
                  key={index}
                  d={path}
                  fill={colors[index % colors.length]}
                  strokeWidth={strokeWidth}
                />
                <SvgText x={halfWidth} y={halfWidth - index * 35} textAnchor="middle" fontSize={16}>
                  {item.title}
                </SvgText>
              </>
            );
          })}
        </G>
        <SvgText x={halfWidth} y={halfWidth} textAnchor="middle" fontSize={28} fontWeight="bold">
          {centerText}
        </SvgText>
      </Svg>
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <Text>{item.label}</Text>
            <View
              style={[styles.legendColor, { backgroundColor: colors[index % colors.length] }]}
            />
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
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  legendItem: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // novo estilo
    marginRight: 30,
    marginBottom: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 7,
  },
});

export default DonutChart;
