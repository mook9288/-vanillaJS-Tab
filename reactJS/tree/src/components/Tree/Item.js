import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
} from 'semantic-ui-react';
import classNames from 'classnames';

class Item extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array]),
    title: PropTypes.string,
    allOpen: PropTypes.bool,
    expanded: PropTypes.bool,
    // hasChild: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    allOpen: false,
    expanded: false,
    // hasChild: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      treeOpen: props.expanded,
    };
  }

  treeOpenClick = e => {
    e.preventDefault();

    this.setState(preState => ({
      treeOpen: !preState.treeOpen,
    }));
  };

  getItemClassName() {
    const { treeOpen } = this.state;
    const { children, expanded } = this.props;
    let hasChild = false;
    if (children) {
      hasChild = true;
    } else {
      hasChild = false;
    }
    console.log(hasChild);
    return classNames({
      'tree-node': true,
      'rct-node-leaf': !hasChild,
      'tree-node-parent': hasChild,
      'tree-node-expanded': hasChild && expanded && treeOpen,
      'tree-node-collapsed': hasChild && !expanded && !treeOpen,
    });
  }

  render() {
    const { treeOpen } = this.state;
    const { children, title } = this.props;

    return (
      <React.Fragment>
        <li className={this.getItemClassName()}>
          <div className="tree-text">
            <div className="tree-func tree-collapse">
              <Button
                className="tree-collapse-btn"
                icon={`caret ${!treeOpen ? 'right' :  'down'}`}
                onClick={this.treeOpenClick}
              />
            </div>
            <div className="tree-bare-label">
              <Icon name="folder" />
              <span>{title}</span>
            </div>
          </div>
          {children ? <ul>{children}</ul> : ''}
        </li>
      </React.Fragment>
    );
  }
}

export default Item;
