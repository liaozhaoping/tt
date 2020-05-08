/**
* 弹出式导航器，从底部升起到顶部
* */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShootVideo from "../pages/Shoot/ShootVideo";
import Commentary from "../pages/Commentary";
import CommentInput from "../pages/Commentary/CommentInput";

const Stack = createStackNavigator();

const routes = [
  {
    name: 'ShootVideo',
    component: ShootVideo,
  },
  {
    name: 'Commentary',
    component: Commentary,
  },
  {
    name: 'CommentInput',
    component: CommentInput,
  }
];

//主弹出式导航器
const ModalRoutes = () => {
  return (
    <Stack.Navigator mode="modal" screenOptions={{cardStyle: {backgroundColor: 'transparent'}}}>
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default ModalRoutes;
