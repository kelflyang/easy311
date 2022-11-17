import * as d3 from "d3";

const drawChart = (element, data) => {
  const colors = {
    "Illegal Dumping": "#6CC3C4",
    "Rubbish and Recycling": "#77B6EA",
    "Abandoned Vehicle": "#D59DFF",
    "Pothole Repair": "#FFBCB5",
    "Graffiti Removal": "#8A89C0",
    "Vacant Lots": "#EE7674",
    "Street Light Outage": "#D9594C",
    "Property Maintenance": "#80CFA9",
    "Street Trees": "#C7D66D",
    Other: "#FFC78A",
  };
  const boxSize = 500;

  d3.select(element).select("svg").remove(); // Remove the old svg
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

  const maxValue = data.reduce((cur, val) => Math.max(cur, val[1].Total), 0);
  console.log("maxValue ", maxValue);
  const arcGenerator = d3
    .arc()
    .padAngle(0.02)
    .innerRadius(150)
    .outerRadius(250)
    // .outerRadius((d) => {
    //   return 250 - (maxValue - d.data[1].Total);
    // });

  const pieGenerator = d3.pie().value((d) => d[1].Total);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();

  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", (d, i) => colors[d.data[0]])
    .transition()
    .duration(700)
    .attrTween("d", function (d) {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arcGenerator(d);
      };
    });
};

export default drawChart;
