import React from 'react';
import { Text } from 'native-base';

const ErrorText = ({ message }) => <Text style={{ color: 'red' }}>{message}</Text>;

export default ErrorText;
