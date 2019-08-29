import React from 'react';
import { Icon } from 'expo';

import Colors from '../../constants/Colors';

export default ({ name, focused }) => (
  <Icon.MaterialIcons
    name={name}
    size={24}
    style={{ marginBottom: -3 }}
    color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
  />
);
