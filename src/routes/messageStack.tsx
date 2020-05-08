/**
 * 消息Tab下嵌套的，消息路径下面的堆栈路由导航器
 * */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Message from '../pages/Message';

const Stack = createStackNavigator();

const routes = [
  {
    name: 'Message',
    component: Message,
  },
];

const MessageStack = () => {
  return (
    <Stack.Navigator>
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default MessageStack;
