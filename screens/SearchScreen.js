import React, { Component } from 'react';
import {
  Alert, View, Image, ActivityIndicator,
} from 'react-native';
import {
  Text, List, ListItem, Left, Body, Right, Thumbnail, Toast, Form, Item, Label, Input, Button,
} from 'native-base';
import Layout from './layout';
import Logo from '../assets/images/logo.png';
import LAST_FM_KEY from '../constants';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      artist: '',
      isLoading: false,
    };
  }

  fetchTopFive = () => {
    const { artist, artists } = this.state;
    if (artist || artists) {
      this.setState({ isLoading: true });
      fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${LAST_FM_KEY}&format=json`)
        .then((response) => {
          const {results} = JSON.parse(response._bodyInit); // eslint-disable-line
          this.setState({ artists: results.artistmatches.artist },
            this.setState({ isLoading: false }));
        })
        .catch(() => {
          this.setState({ isLoading: false });
          Toast.show({
            type: 'error', text: 'Error al cargar top 5',
          });
        });
    } else {
      this.setState({ isLoading: false });
    }
  }

  onChangeInput = (value) => {
    this.setState({ artist: value.toLowerCase() });
  }

  onOkAlert = () => {
    const { navigation } = this.props;
    Alert.alert(
      'Cerrar sesión',
      'Presiona Ok para cerrar sesión',
      [
        { text: 'Cancelar' },
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ],
    );
  }

  onRefresh = () => {
    this.setState({ isLoading: true });
    this.fetchTopFive();
  };

  render() {
    const { artists, artist, isLoading } = this.state;

    return (
      <Layout
        onRefresh={this.onRefresh}
        header={{
          title: 'Search',
          left: Layout.renderButton('power-settings-new', () => this.onOkAlert(), 'MaterialIcons'),
        }}
      >

        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={Logo}
          />
          <View style={styles.containerList}>
            <Form style={styles.form}>
              <Item floatingLabel style={styles.formItem}>
                <Label>Encuentra a tu artista favorito</Label>
                <Input
                  value={artist}
                  autoCapitalize="none"
                  onChangeText={this.onChangeInput}
                />
              </Item>
              <Button full rounded onPress={this.fetchTopFive} style={styles.button}>
                <Text>Buscar</Text>
              </Button>
            </Form>
            {isLoading ? <ActivityIndicator size="large" color="#F10000" />
              : (
                <List>
                  {artists && artists.map(artistItem => (
                    <ListItem avatar key={artistItem.listeners}>
                      <Left>
                        <Thumbnail source={{ uri: Object.values(artistItem.image[1])[0] }} />
                      </Left>
                      <Body>
                        <Text>{artistItem.name}</Text>
                        <Text note>{artistItem.url}</Text>
                      </Body>
                      <Right>
                        <Text note>
                      Listeners
                          {' '}
                          {artistItem.listeners}
                        </Text>
                      </Right>
                    </ListItem>
                  ))}
                </List>
              )}
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
  },
  containerList: {
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 100,
  },
  form: {
    marginVertical: 10,
  },
  formItem: {
    marginLeft: 0,
  },
  button: {
    marginTop: 10,
  },
};

export default Search;
