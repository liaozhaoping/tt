/**
 * 卡片式导航器，从右到左进入页面的堆栈路由导航器
 * */
import React from 'react';
import {Text} from "react-native";
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const routes = [
  {
    name: 'card',
    component: Text,
  },
];

const CardRoutes = () => {
  return (
    <Stack.Navigator>
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default CardRoutes;
