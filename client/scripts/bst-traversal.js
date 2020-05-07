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

function visitElement(element, animFactor) {
  d3.select(`#node${element.value}`)
    .select('text')
      .transition().duration(animeDuration).delay(animeDuration * animFactor)
      .attr("fill", "white");

  d3.select(`#node${element.value}`)
    .select('circle')
    .transition().duration(animeDuration).delay(animeDuration * animFactor)
    .style("fill", "black");
}

function preOrder(data) {
  resetTraversal();

  const stack = [];
  let animFactor = 0;
  stack.push(data.root);
  while (stack.length !== 0) {
    let element = stack.pop();
    visitElement(element, animFactor);
    if (typeof(element.value) === 'number') {
      animFactor += 1;
    }
    if (element.children.length !== 0) {
      for (let i = 0; i < element.children.length; i++) {
        stack.push(element.children[element.children.length - i - 1]);
      }
    }
  }
}

function helperFunc(data){

  const array = [];
  for (let key in data){
    if (key === 'value'){
      array.push(data)
    }
  }
}

function inOrder(data){
  resetTraversal();

}

function bfs(data) {
  resetTraversal();

  let queue = [];
  let animFactor = 0;
  queue.push(data.root);
  while (queue.length !== 0) {
    let element = queue.shift();
    visitElement(element, animFactor);
    if (typeof(element.value) === 'number'){
      animFactor += 1;
    }
    if (element.children.length !== 0) {
      for (let i = 0; i < element.children.length; i++) {
        queue.push(element.children[i]);
      }
    }
  }
}


export { resetTraversal, bfs, preOrder, inOrder }