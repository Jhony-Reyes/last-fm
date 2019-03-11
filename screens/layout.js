import React, { Component } from 'react';
import { StatusBar, RefreshControl } from 'react-native';
import {
  Container, Content, Header, Left, Button, Icon, Body, Title, Right,
} from 'native-base';

class Layout extends Component {
  static renderButton = (icon, onPress = () => {}, type) => (
    <Button transparent onPress={onPress}>
      <Icon name={icon} style={styles.leftIcon} type={type} />
    </Button>
  );

  render() {
    const {
      onRefresh,
      refreshing,
      header,
      children,
    } = this.props;
    return (
      <Container>
        <Header>
          <StatusBar barStyle="light-content" />
          <Left>
            {header.left}
          </Left>
          <Body>
            <Title style={styles.title}>{header.title}</Title>
          </Body>
          <Right>
            {header.right}
          </Right>
        </Header>
        <Content
          style={{ flex: 1 }}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
        >
          {children}
        </Content>
      </Container>
    );
  }
}

const styles = {
  title: {
    color: 'white',
  },
  leftIcon: {
    color: 'white',
  },
};

export default Layout;
