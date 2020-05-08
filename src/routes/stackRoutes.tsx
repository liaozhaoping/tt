/**
* 主堆栈导航器，嵌套了主Tab导航器，弹出页导航器和其他卡片式导航器
* */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabRoutes from './tabRoutes';
import ModalRoutes from './modalRoutes';
import CardRoutes from './cardRoutes';

const Stack = createStackNavigator();

const stackRoutes = [
  {
    name: 'Tabs',
    component: TabRoutes,
  },
  {
    name: 'Modals',
    component: ModalRoutes,
  },
  // {
  //   name: 'Cards',
  //   component: CardRoutes,
  // },
];

//主堆栈导航器
const StackRoutes = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="none" screenOptions={{cardStyle: {backgroundColor: 'transparent'}}}>
      {stackRoutes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default StackRoutes;
