import * as d3 from 'd3';
import '../stylesheets/style.css'

// -------------------------Draw Tree------------------------------------//
function drawTree(data) {
  // Set dimensions and margins for diagram
  let margin = {
    top: 80,
    bottom: 80
  };
  let width = 1000;
  let height = 800 - margin.top - margin.bottom;


  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin   
  let svg = d3.select("#d3tree").append("svg")
    .attr('id', 'currentTree')
    .attr("width", "100%")
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", "0 0 1000 1000")
    .append("g")
    .attr("transform", "translate(0," + margin.top + ")");

  let i = 0;
  let duration = 750;

  // Declares a tree layout and assigns the size
  let treemap = d3.tree().size([width, height + margin-top]);

  // Assigns parent, children, height, depth
  let root = d3.hierarchy(data, function(d) {
    return d.children;
  });

  root.x0 = width / 2;
  root.y0 = 0;
 
  // Collapse after the second level
  // root.children.forEach(collapse);

  update(root);

  // Collapse the node and all it's children
  function collapse(d) {
    if (d.children) {
      d._children = d.children
      d._children.forEach(collapse)
      d.children = null;
    }
  }

  // Update
  function update(source) {
    // Assigns the x and y position for the nodes
    let treeData = treemap(root);

    // Compute the new tree layout.
    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);

    // Normalize for fixed-depth
    nodes.forEach(function (d) {
      d.y = d.depth * 100
    });

    // **************** Nodes Section ****************

    // Update the nodes...
    let node = svg.selectAll('g.node')
      .data(nodes, function (d) {
        return d.id || (d.id = ++i);
      });

    // Enter any new nodes at the parent's previous position.
    let nodeEnter = node.enter().append('g')
      .attr('class', function (d){
        if (isNaN(d.value)){
          return 'hidden'
        } else {
          return 'node'
        }
      })
      .attr("transform", function (d) {
        return "translate(" + source.x0 + "," + source.y0 + ")";
      })
      .on('click', click);

    // Add Circle for the nodes

    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      });

    nodeEnter.append('text')
      .attr('dy', '0')
      .attr('dx', '0')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', "central")
      .text(function (d) {
        if (isNaN(d.value)) {
          return "";
        }
        return d.data.value;
      })

    // Update
    let nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the nodes
    nodeUpdate.transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 30)
      .style("fill", function (d) {
        return d._children ? "lightsteelblue" : "#fff";
      })
      .attr('cursor', 'pointer');

    // Remove any exiting nodes
    let nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function (d) {
        return "translate(" + source.x + "," + source.y + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text lables  
    nodeExit.select('text')
      .style('fill-opacity', 1e-6)

    // **************** Links Section ****************

    // Update the links...
    let link = svg.selectAll('path.link')
      .data(links, function (d) {
        return d.id;
      });

    // Enter any new links at the parent's previous position
    let linkEnter = link.enter().insert('path', "g")
      .attr("class", function (d) {
        if (isNaN(d.value)) {
          return "link hidden "
        }
        return "link";
      })

      .attr('d', function (d) {
        let o = {
          x: source.x0,
          y: source.y0
        };
        return diagonal(o, o);
      });

    // Update
    let linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent)
      });

    // Remove any existing links
    let linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function (d) {
        let o = {
          x: source.x,
          y: source.y
        };
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // Create a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      const path = `M ${s.x} ${s.y}
        C ${(s.x + d.x) / 2} ${s.y},
          ${(s.x + d.x) / 2} ${d.y},
          ${d.x} ${d.y}`

      return path;
    }

    // Toggle children on click
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}


export { drawTree }