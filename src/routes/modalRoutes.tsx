/**
* 弹出式导航器，从底部升起到顶部
* */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShootModal from "../pages/Shoot/ShootModal";
import Commentary from "../pages/Commentary";

const Stack = createStackNavigator();

const routes = [
  {
    name: 'ShootModal',
    component: ShootModal,
  },
  {
    name: 'Commentary',
    component: Commentary,
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
