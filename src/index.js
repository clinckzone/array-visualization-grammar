//@ts-check
import { ArrayDiagram } from "./Diagrams/ArrayDiagram";
import * as d3 from "d3";

let data = [10, 22, 31, 14, 25];
let properties = {ITEM_SIZE: 30, PADDING: 10};

let arrayDiagram = new ArrayDiagram(data, properties);
arrayDiagram.update();

d3.select("#push").on("click", arrayDiagram.push.bind(arrayDiagram));
d3.select("#pop").on("click", arrayDiagram.pop.bind(arrayDiagram));
