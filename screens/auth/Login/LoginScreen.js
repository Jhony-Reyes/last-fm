import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import {
  Container, Content, Input, Text, Button, Form, Item, Label, Toast, Thumbnail,
} from 'native-base';
import { getFieldError, init } from 'aleonor-object-validations';
import Logo from '../../../assets/images/logo.png';
import imgFooter from '../../../assets/images/tgbBgpnT.png';
import { Loading, ErrorText } from '../../../common/components';
import validations from './validations';

const { height } = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      form: {
        email: '',
        password: '',
      },
      formErrors: {},
    };
    this.validator = init(validations);
  }

  onChangeInput = (value, propName) => {
    const { form, formErrors } = this.state;
    const { error } = this.validator.validate(propName, value);
    this.setState({
      form: { ...form, [propName]: value },
      formErrors: { ...formErrors, [propName]: error },
    });
  }

  onLogin = () => {
    const { navigation } = this.props;
    const { form } = this.state;
    const { valid, errors } = this.validator.validateForm(form);
    this.setState({ formErrors: errors });
    if (!valid) { return; }
    this.setState({ isLoading: true });
    const success = () => {
      navigation.navigate('Home');
      return Toast.show({
        type: 'success', text: 'Bienvenido (a)',
      });
    };
    setTimeout(() => success(), 3000);
  }

  render() {
    const {
      isLoading, form: { email, password }, formErrors,
    } = this.state;

    const emailError = getFieldError(formErrors, 'email');
    const passwordError = getFieldError(formErrors, 'password');

    if (isLoading) { return (<Loading />); }

    return (

      <Container>
        <Content>
          <View style={styles.container}>
            <Thumbnail source={Logo} style={styles.logo} />
            <View style={styles.containerForm}>
              <Form>
                <Item floatingLabel style={styles.formItem}>
                  <Label>Email</Label>
                  <Input
                    value={email}
                    onChangeText={value => this.onChangeInput(value, 'email')}
                    onFocus={this.keyboardDidShow}
                    onBlur={this.keyboardDidHide}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Item>
                <ErrorText message={emailError} />
                <Item floatingLabel style={styles.formItem}>
                  <Label>Contraseña</Label>
                  <Input
                    value={password}
                    onChangeText={value => this.onChangeInput(value, 'password')}
                    onFocus={this.keyboardDidShow}
                    onBlur={this.keyboardDidHide}
                    secureTextEntry
                  />
                </Item>
                <ErrorText message={passwordError} />
              </Form>
              <Button full rounded dark large style={styles.button} onPress={this.onLogin}>
                <Text>Entrar</Text>
              </Button>
            </View>
            <View style={styles.containerFooter}>
              <Image
                source={imgFooter}
                style={styles.imgFooter}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 15,
    height,
  },
  containerForm: {
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 100,
  },
  formItem: {
    marginLeft: 0,
  },
  containerFooter: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  imgFooter: {
    height: 200,
    width: 200,
  },
  button: {
    marginTop: 30,
  },
};

export default Login;
