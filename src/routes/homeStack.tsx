/**
* 首页Tab下嵌套的，首页路径下面的堆栈路由导航器
* */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/Home';

const Stack = createStackNavigator();

const routes = [
  {
    name: 'Home',
    component: Home,
  },
];

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
