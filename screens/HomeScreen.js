import React, { Component } from 'react';
import { Alert, View, Image } from 'react-native';
import {
  Text, List, ListItem, Left, Body, Right, Thumbnail, Toast,
} from 'native-base';
import Layout from './layout';
import Logo from '../assets/images/logo.png';
import LAST_FM_KEY from '../constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
    };
  }

  componentWillMount() {
    this.fetchTopFive();
  }

  fetchTopFive = () => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=rock&api_key=${LAST_FM_KEY}&format=json&limit=5`)
      .then((response) => {
        const { topartists } = JSON.parse(response._bodyInit); // eslint-disable-line
        this.setState({ artists: topartists.artist });
      })
      .catch(() => {
        Toast.show({
          type: 'error', text: 'Error al cargar top 5',
        });
      });
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
    this.fetchTopFive();
  };

  render() {
    const { artists } = this.state;

    return (
      <Layout
        onRefresh={this.onRefresh}
        header={{
          title: 'Home',
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
            <Text style={styles.welcomeText}>
              Bienvenido, este es el top 5 de los artistas populares de rock.
            </Text>
            <List>
              {artists && artists.map(artist => (
                <ListItem avatar key={artist.mbid}>
                  <Left>
                    <Thumbnail source={{ uri: Object.values(artist.image[0])[0] }} />
                  </Left>
                  <Body>
                    <Text>{artist.name}</Text>
                    <Text note>{artist.url}</Text>
                  </Body>
                  <Right>
                    <Text note>{Object.values(artist)[5].rank}</Text>
                  </Right>
                </ListItem>
              ))}
            </List>
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
  welcomeText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
  },
};

export default Home;
