import * as d3 from "d3";
import { useRef } from "react";
import formatDate from "../../dataTransform/dateTransform";
import "./Graph.scss";
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
  const marginLeft = 90;
  const marginTop = 25;

  const plot = useRef(null);
  const charCont = d3.select(plot.current);

  const xScale = d3
    .scaleTime()
    .domain([
      d3.min([...aou, ...aopd, ...aopr, ...aopt, ...aopu], (d) => d.time),
      d3.max([...aou, ...aopd, ...aopr, ...aopt, ...aopu], (d) => d.time),
    ])
    .range([0, width - marginLeft]);
  const yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max([...aou, ...aopd, ...aopr, ...aopt, ...aopu], (d) => d.amount),
    ])
    .range([height - marginTop, 0]);

  const yAxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickSize(-width + marginLeft);
  const xAxis = d3
    .axisBottom(xScale)
    .ticks(5)
    .tickSize(-height - 5);
  charCont.select(".x-axis").remove();
  charCont.select(".y-axis").remove();
  charCont
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(${marginLeft}, ${height + marginTop})`)
    .call(xAxis);
  charCont
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", `translate(${marginLeft}, ${marginBottom})`)
    .call(yAxis);
  const makeTextGrey = (selector) => {
    charCont
      .select(selector)
      .selectAll("text")
      .attr("color", "rgba(0,0,0, .5)")
      .attr("font-size", "15px");
  };
  const makeGridGrey = (selector) => {
    charCont
      .select(selector)
      .selectAll("line")
      .attr("stroke", "rgba(0, 0, 0, 0.5)");
  };
  makeGridGrey(".y-axis");
  makeGridGrey(".x-axis");
  makeTextGrey(".x-axis");
  makeTextGrey(".y-axis");
  const makeCircles = (circleSelector, color, data) => {
    charCont
      .append("g")
      .attr("class", circleSelector)
      .attr("transform", `translate(${marginLeft}, ${marginTop})`)
      .selectAll("circle")

      .data(data)
      .enter()
      .append("circle")

      .attr("cx", (d) => xScale(d.time))
      .attr("cy", (d) => yScale(d.amount) - 5)
      .attr("r", 6)
      .attr("fill", "none")
      .attr("stroke", color)
      .on("mouseover", function (e, d) {
        d3.select(this).attr("fill", color);
        const label = document.createElement("div");
        label.classList.add("tooltip");
        label.style.left = e.pageX + 10 + "px";
        label.style.top = e.pageY + "px";
        document.body.append(label);
        let text = "";
        if (color.includes("sub"))
          text = `Количество: ${d.amount}\nВремя: ${formatDate(d.time)}`;
        else
          text = `Количество: ${d.amount}\nСумма: ${
            d.cash
          }\nВремя: ${formatDate(d.time)}`;
        label.textContent = text;
      })
      .on("mouseout", function (d) {
        d3.select(this).attr("fill", "none");
        document.querySelectorAll(".tooltip").forEach((e) => e.remove());
      })
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1);
  };

  const lineFunc = d3
    .line()
    .x((d) => {
      if (!d.time) return xScale(new Date());
      return xScale(d.time);
    })
    .y((d) => yScale(d.amount));
  // .curve(d3.curveCardinal);
  const makePath = (color, data) => {
    charCont
      .append("path")
      .attr("class", "path")
      .attr("class", "path_active")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 3)
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 1)
      .attr("transform", `translate(${marginLeft}, ${marginTop - 5})`)
      .attr("d", lineFunc);
  };
  charCont.selectAll("path").remove();
  makePath("var(--sub-color)", aou);
  makePath("var(--del-color)", aopd);
  makePath("var(--ton-color)", aopt);
  makePath("var(--usdt-color)", aopu);
  makePath("var(--rub-color)", aopr);
  charCont.selectAll(".circles").remove();
  makeCircles("circles", "var(--sub-color)", aou);
  makeCircles("circles usdt", "var(--usdt-color)", aopu);
  makeCircles("circles rub", "var(--rub-color)", aopr);
  makeCircles("circles ton", "var(--ton-color)", aopt);
  makeCircles("circles del", "var(--del-color)", aopd);
  if (process === "error")
    return <h2 style={{ marginInline: "auto" }}>Ошибка...</h2>;
  return (
    <svg
      ref={plot}
      width={width + 100}
      height={height + 50}
      style={{
        position: "relative",
        overflow: "visible",
        opacity: process !== "loading" ? "100%" : "50%",
      }}
    ></svg>
  );
};
export default Graph;
