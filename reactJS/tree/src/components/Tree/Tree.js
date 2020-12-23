import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookmarkFolder extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array]),
  };

  render() {
    const { children } = this.props;
    return (
      <div className="tree-wrapper">
        {children}
      </div>
    );
  }
}

export default BookmarkFolder;
