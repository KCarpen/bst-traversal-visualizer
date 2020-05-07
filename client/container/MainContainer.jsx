import React, { Component } from 'react';
import '../stylesheets/style.css';

import { generateBST } from '../scripts/bst.js'
import { drawTree } from '../scripts/d3tree.js'
import { resetTraversal, bfs, preOrder, inOrder } from '../scripts/bst-traversal.js'

class MainContainer extends Component {
  constructor(){
    super();
    this.state = {
      tree: {}
    };
  }

  removeCurrentTree() {
    const currentTree = document.querySelector('#currentTree');
    if (currentTree) {
      currentTree.remove();
    }
  }
  
  clickGenerateTree() {
    this.removeCurrentTree();
    const newTree = generateBST();
    drawTree(newTree.root);
    this.setState({tree : newTree});
  }

  runPreOrder(){
    const data = this.state.tree;
    preOrder(data);
  }

  runInOrder(){
    const data = this.state.tree;
    inOrder(data);
  }

  runBFS(){
    const data = this.state.tree;
    bfs(data);
  }

  render(){

    const BST = this.state.tree;
    const keys = []
    
    keys.push(<div key='h'> {JSON.stringify(BST)} </div>)

    return (
      <div id='mainContainer'>
        <div id='sideBar'>
          <button id='generate' onClick={() => this.clickGenerateTree()}>
              Generate a new Binary Search Tree
          </button>

          <div><button className='traversalBtns' onClick={() => this.runPreOrder()}> PreOrder </button></div>
          <div><button className='traversalBtns'> PostOrder </button></div>
          <div><button className='traversalBtns' onClick={() => this.runInOrder()}> InOrder </button></div>
          <div><button className='traversalLBtns' onClick={() => this.runBFS()}> Breadth First Search </button></div>
          <div><button id='reset' onClick={() => resetTraversal()}> Reset </button></div>

          <div id="object">
            {keys}
          </div>
        </div>

        <svg id='d3tree'>

        </svg>
      </div>
    )
  }

  componentDidMount() {
    
  }
}

export default MainContainer;