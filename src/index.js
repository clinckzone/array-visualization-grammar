//@ts-check
import { ArrayDiagram } from "./Diagrams/ArrayDiagram";
import * as d3 from "d3";

const data = [10, 22, 31, 14, 25];
const properties = {x: 0, y: 0, label: "Input Array"};

let arrayDiagram = new ArrayDiagram(data, properties);

d3.select("#push").on("click", arrayDiagram.push.bind(arrayDiagram));
d3.select("#pop").on("click", arrayDiagram.pop.bind(arrayDiagram));
d3.select("#search").on("click", arrayDiagram.search.bind(arrayDiagram));
