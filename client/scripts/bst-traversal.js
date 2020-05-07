import * as d3 from 'd3';

const animeDuration = 400;

function resetTraversal(){
  d3.selectAll('.node')
    .selectAll('circle')
      .style('fill', '#fff')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '3')

  d3.selectAll('.node')
    .selectAll('text')
      .attr('fill', 'black')
      .attr('font', '2.5em')
}

function visitElement(animFactor) {
  // d3.select("#node-"+element.id).classed("visited",true);
  d3.select(`#node${animFactor}`)
    .select('text')
      .transition().duration(animeDuration).delay(animeDuration * animFactor)
      .attr("fill", "white");

  d3.select(`#node${animFactor}`)
    .select('circle')
    .transition().duration(animeDuration).delay(animeDuration * animFactor)
    .style("fill", "black");
}

function bft(data) {
  const stack = [];
  let animFactor = 0;
  stack.push(data.root);
  while (stack.length !== 0) {
    let element = stack.pop();
    visitElement(animFactor);
    animFactor += 1;
    if (element.children.length !== 0) {
      for (let i = 0; i < element.children.length; i++) {
        stack.push(element.children[element.children.length - i - 1]);
      }
    }
  }
}

function dft(data) {
  let stack = [];
  let animX = 0;

}


export { resetTraversal, bft }