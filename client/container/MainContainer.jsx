import React, { Component } from 'react';
import '../stylesheets/style.css';

import { generateBST } from '../scripts/bst.js'
import { drawTree } from '../scripts/d3tree.js'

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

          <div id='object'>
            {keys}
          </div>
          <div><button className='traversalBtns'> PreOrder </button></div>
          <div><button className='traversalBtns'> PostOrder </button></div>
          <div><button className='traversalBtns'> InOrder </button></div>
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