import React, { Component } from 'react'; 
import { v4 as uuidv4 } from 'uuid';
import { Button, Icon, Input, Header, Segment, Grid } from 'semantic-ui-react'
import './style.scss';
import Tree from './components/Tree';

class App extends Component {
  
  state = {
    bookMark: [
      { name: '폴더명 1', id: uuidv4(), expanded: false },
      { name: '폴더명 2', id: uuidv4(), expanded: false, children: [
        { name: '폴더명 2-1', id: uuidv4(), expanded: false },
        { name: '폴더명 2-2', id: uuidv4(), expanded: false, children: [
          { name: '폴더명 2-2-1', id: uuidv4(), expanded: false },
          { name: '폴더명 2-2-2', id: uuidv4(), expanded: false },
          { name: '폴더명 2-2-3', id: uuidv4(), expanded: false },
        ]},
      ]},
      { name: '폴더명 3', id: uuidv4(), expanded: false, children: [
        { name: '폴더명 3-1', id: uuidv4(), expanded: false },
        { name: '폴더명 3-2', id: uuidv4(), expanded: false, children: [
          { name: '폴더명 3-2-1', id: uuidv4(), expanded: false },
          { name: '폴더명 3-2-2', id: uuidv4(), expanded: false },
          { name: '폴더명 3-2-3', id: uuidv4(), expanded: false },
        ]},
        { name: '폴더명 3-3', id: uuidv4(), expanded: false },
      ]},
      { name: '폴더명 4', id: uuidv4(), expanded: false, children: [
        { name: '폴더명 4-1', id: uuidv4(), expanded: false },
        { name: '폴더명 4-2', id: uuidv4(), expanded: false },
        { name: '폴더명 4-3', id: uuidv4(), expanded: false },
        { name: '폴더명 4-4', id: uuidv4(), expanded: false },
        { name: '폴더명 4-5', id: uuidv4(), expanded: false },
      ]},
      { name: '폴더명 5', id: uuidv4(), expanded: false, children: []},
    ],
  };

  renderBookmark = (data) => data.map((d, i) => {
    // console.log(d, i);
    if (d.children && d.children.length > 0) {
      return (
        <Tree.Item
          title={d.name}
          id={d.id}
          expanded={d.expanded}
          key={i}
        >
          {
            this.renderBookmark(d.children)
          }
        </Tree.Item>
      );
    } else {
      return (
        <Tree.Item
          title={d.name}
          id={d.id}
          expanded={d.expanded}
          key={i}
        />
      );
    }
  });

  render() {
    const { bookMark } = this.state;
    return (
      <Segment>
        <Header>
          <Header.Content>React Tree Project</Header.Content>
          <Header.Subheader style={{textAlign: "right"}}>
            <Input placehelder="검색" /><Button content="검색" />
          </Header.Subheader>
        </Header>
        <Grid>
          <Grid.Column width={6}>
            <Tree expanded>
              {this.renderBookmark(bookMark)}
            </Tree>
          </Grid.Column>
          <Grid.Column width={10}>
            <div className="page-list">
              <ul>
                <li className="item">
                  <Icon name="desktop" />text text text text texttext text texttext text
                  <Button className="closed" icon="close" />
                </li>
              </ul>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default App;
