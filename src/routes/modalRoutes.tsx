/**
* 弹出式导航器，从底部升起到顶部
* */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ShootModal from "../pages/Shoot/ShootModal";

const Stack = createStackNavigator();

const routes = [
  {
    name: 'ShootModal',
    component: ShootModal,
  },
];

//主弹出式导航器
const ModalRoutes = () => {
  return (
    <Stack.Navigator mode="modal">
      {routes.map((v, i) => (
        <Stack.Screen key={i} name={v.name} component={v.component} />
      ))}
    </Stack.Navigator>
  );
};

export default ModalRoutes;
