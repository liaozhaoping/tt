/**
 * 我的Tab下嵌套的，我的路径下面的堆栈路由导航器
 * */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Mine from '../pages/Mine';

const Stack = createStackNavigator();

const routes = [
  {
    name: 'Mine',
    component: Mine,
  },
];

const MineStack = () => {
  return (
    <Stack.Navigator>
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default MineStack;
