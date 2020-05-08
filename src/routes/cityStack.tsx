/**
 * 同城Tab下嵌套的，同城路径下面的堆栈路由导航器
 * */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import City from '../pages/City';

const Stack = createStackNavigator();

const routes = [
  {
    name: 'City',
    component: City,
  },
];

const CityStack = () => {
  return (
    <Stack.Navigator headerMode={"none"}>
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default CityStack;
