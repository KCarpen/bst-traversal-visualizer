import * as d3 from 'd3';

class BstNode {
  constructor(value) {
    this.value = value;
    this.children = [{value: null}, {value: null}];
  }

  add(value) {
    const newNode = new BstNode(value);
    const currentNode = this;

    if (currentNode.value > newNode.value) {
      if (currentNode.children[0].value === null) {
        currentNode.children[0] = newNode;
      } else {
        currentNode.children[0].add(value)
      }
    } else {
      if (currentNode.children[1].value === null) {
        currentNode.children[1] = newNode;
      } else {
        currentNode.children[1].add(value)
      }
    }
    return currentNode;
  }
}

function randomNum() {
  return Math.ceil(Math.random() * 15) + 10;
}

function randomValue() {
  return Math.ceil(Math.random() * 50);
}

function generateBST() {
  const cache = {};
  const numNodes = randomNum();
  const root = new BstNode(randomValue());
  cache[root.value] = true;

  while (Object.keys(cache).length !== numNodes) {
    const newValue = randomValue();
    if (!cache[newValue]) {
      cache[newValue] = true;
      root.add(newValue);
    }
  }
  return {...root};
}

export { BstNode };
export { randomNum, randomValue, generateBST }