import * as d3 from "d3";
import { useRef } from "react";
import formatDate from "../../dataTransform/dateTransform";
const Graph = (props) => {
  const {
    process,
    amountOfCreatedUsers,
    amountOfUsersWhoPayUsdt,
    amountOfUsersWhoPayDel,
    amountOfUsersWhoPayTon,
    amountOfUsersWhoPayRub,
    amountOfUsdtPaid,
    amountOfRubPaid,
    amountOfTonPaid,
    amountOfDelPaid,
  } = props;
  const aou =
    amountOfCreatedUsers?.map((item) => ({
      ...item,
      time: new Date(item.time),
    })) ?? [];
  const aopu =
    amountOfUsersWhoPayUsdt?.map((item, i) => ({
      ...item,
      time: new Date(item.time),
      cash: Math.round(amountOfUsdtPaid[i].amount),
    })) ?? [];
  const aopr =
    amountOfUsersWhoPayRub?.map((item, i) => ({
      ...item,
      time: new Date(item.time),
      cash: Math.round(amountOfRubPaid[i].amount),
    })) ?? [];
  const aopt =
    amountOfUsersWhoPayTon?.map((item, i) => ({
      ...item,
      time: new Date(item.time),
      cash: Math.round(amountOfTonPaid[i].amount),
    })) ?? [];
  const aopd =
    amountOfUsersWhoPayDel?.map((item, i) => ({
      ...item,
      time: new Date(item.time),
      cash: Math.round(amountOfDelPaid[i].amount),
    })) ?? [];
  const width = 800;
  const height = 300;

  const marginBottom = 20;
  const marginLeft = 50;
  const marginTop = 25;

  const plot = useRef();
  const charCont = d3.select(plot.current);

  const xScale = d3
    .scaleTime()
    .domain([
      d3.min([...aou, ...aopd, ...aopr, ...aopt, ...aopu], (d) => d.time),
      d3.max([...aou, ...aopd, ...aopr, ...aopt, ...aopu], (d) => d.time),
    ])
    .range([0, width - 100]);
  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max([...aou, ...aopd, ...aopr, ...aopt, ...aopu], (d) => d.amount),
    ])
    .range([height, 0]);

  const yAxis = d3.axisLeft(yScale);
  const xAxis = d3.axisBottom(xScale);
  charCont
    .select(".x-axis")
    .attr("transform", `translate(${marginLeft}, ${height + marginTop})`)
    .call(xAxis);
  charCont
    .select(".y-axis")
    .attr("transform", `translate(${marginLeft}, ${marginBottom})`)
    .call(yAxis);

  const makeCircles = (circleSelector, color, data) => {
    charCont.select(circleSelector).selectAll("circle").remove();

    charCont
      .select(circleSelector)
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.time))
      .attr("cy", (d) => yScale(d.amount))
      .attr("r", 6)
      .attr("fill", "none")
      .attr("stroke", color)
      .on("mouseover", function (e, d) {
        d3.select(this).attr("fill", color);
        charCont
          .append("text")
          .attr("class", "tooltip")
          .attr("x", xScale(d.time))
          .attr("y", yScale(d.amount) - 45)
          .text(`Количество: ${d.amount}`);
        if (!color.includes("sub"))
          charCont
            .append("text")
            .attr("class", "tooltip")
            .attr("x", xScale(d.time))
            .attr("y", yScale(d.amount) - 25)
            .text(`Сумма: ${d.cash}`);
        charCont
          .append("text")
          .attr("class", "tooltip")
          .attr("x", xScale(d.time))
          .attr("y", yScale(d.amount) - 5)
          .text(`${formatDate(d.time)}`);
      })
      .on("mouseout", function (d) {
        d3.select(this).attr("fill", "none");
        charCont.selectAll(".tooltip").remove();
      });
  };
  makeCircles(".circles", "var(--sub-color)", aou);
  makeCircles(".circles.usdt", "var(--usdt-color)", aopu);
  makeCircles(".circles.rub", "var(--rub-color)", aopr);
  makeCircles(".circles.ton", "var(--ton-color)", aopt);
  makeCircles(".circles.del", "var(--del-color)", aopd);

  const lineFunc = d3
    .line()
    .x((d) => {
      if (!d.time) return xScale(new Date());
      return xScale(d.time);
    })
    .y((d) => yScale(d.amount))
    .curve(d3.curveCardinal);
  if (process === "error")
    return <h2 style={{ marginInline: "auto" }}>Ошибка...</h2>;
  return (
    <svg
      ref={plot}
      width={width + 100}
      height={height + 50}
      style={{
        overflow: "visible",
        opacity: process !== "loading" ? "100%" : "50%",
      }}
    >
      <path
        transform={`translate(${marginLeft}, ${marginTop})`}
        fill="none"
        stroke="var(--sub-color)"
        strokeWidth="1.5"
        d={lineFunc(aou)}
      ></path>
      <path
        transform={`translate(${marginLeft}, ${marginTop})`}
        fill="none"
        stroke="var(--del-color)"
        strokeWidth="1.5"
        d={lineFunc(aopd)}
      ></path>
      <path
        transform={`translate(${marginLeft}, ${marginTop})`}
        fill="none"
        stroke="var(--ton-color)"
        strokeWidth="1.5"
        d={lineFunc(aopt)}
      ></path>
      <path
        transform={`translate(${marginLeft}, ${marginTop})`}
        fill="none"
        stroke="var(--usdt-color)"
        strokeWidth="1.5"
        d={lineFunc(aopu)}
      ></path>
      <path
        transform={`translate(${marginLeft}, ${marginTop})`}
        fill="none"
        stroke="var(--rub-color)"
        strokeWidth="1.5"
        d={lineFunc(aopr)}
      ></path>
      <g className="x-axis" />
      <g className="y-axis" style={{ marginTop: `${marginTop}px` }} />
      <g
        className="circles"
        transform={`translate(${marginLeft}, ${marginTop})`}
      ></g>
      <g
        className="circles rub"
        transform={`translate(${marginLeft}, ${marginTop})`}
      ></g>
      <g
        className="circles del"
        transform={`translate(${marginLeft}, ${marginTop})`}
      ></g>
      <g
        className="circles ton"
        transform={`translate(${marginLeft}, ${marginTop})`}
      ></g>
      <g
        className="circles usdt"
        transform={`translate(${marginLeft}, ${marginTop})`}
      ></g>
    </svg>
  );
};
export default Graph;
