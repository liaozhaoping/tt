/**
 * Tabs App主要底部Tab标签导航器
 * 包括首页、同城、消息、我的及其子堆栈导航器
 * */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './homeStack';
import CityStack from './cityStack';
import MessageStack from './messageStack';
import MineStack from './mineStack';
import Shoot from '../pages/Shoot';
import {
  TouchableWithoutFeedback,
  Text,
  Image,
  View,
  StyleSheet, ViewStyle, TextStyle, ImageStyle,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {isIphoneX, line} from "../utils/publicStyle";

const Tab = createBottomTabNavigator();

const tabRoutes = [
  {
    name: 'HomeStack',
    component: HomeStack,
    options: {
      tabBarLabel: '首页',
    },
  },
  {
    name: 'CityStack',
    component: CityStack,
    options: {
      tabBarLabel: '同城',
    },
  },
  {
    name: 'Shoot',
    component: Shoot,
    options: {
      tabBarIcon: () => <Image source={require('./assets/dy.png')} style={styles.tabIcon} resizeMode="stretch"/>,
    },
  },
  {
    name: 'MessageStack',
    component: MessageStack,
    options: {
      tabBarLabel: '消息',
    },
  },
  {
    name: 'MineStack',
    component: MineStack,
    options: {
      tabBarLabel: '我',
    },
  },
];

//自定义Tab导航栏
const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  //判断首页视频播放页面，处理Tab栏的样式及布局
  const isHome = state.routeNames[state.index] === 'HomeStack';

  return (
    <View style={[styles.tabWrap, isHome && styles.tabWrapSpecial]}>
      {state.routes.map((route, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          //todo 暂不清楚emit中的route.key与Modals不匹配有何问题
          if (!isFocused && !event.defaultPrevented) {
            //点击录制小视频按钮，导航到录制的弹出页
            //否则导航到TabBar对应的配置路由
            if (route.name === 'Shoot') {
              navigation.navigate('Modals', {screen: 'ShootModal'})
            } else {
              navigation.navigate(route.name);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableWithoutFeedback
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={[styles.tabBarWrap, options.tabBarIcon && {justifyContent: 'center'}]}>
              <View>
                {options.tabBarIcon ?
                  options.tabBarIcon({focused: isFocused, color: '', size: 15}) :
                  <View>
                    <Text style={[styles.labelText, isFocused && {color: 'white'}]}>
                      {label}
                    </Text>
                    <View style={[styles.buoy, isFocused && {backgroundColor: 'white'}]}/>
                  </View>
                }
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

//主Tab路由导航器
const TabRoutes = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      {tabRoutes.map((v, i) => (
        <Tab.Screen
          key={i}
          name={v.name}
          options={v.options}
          component={v.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabRoutes;

interface Style {
  tabWrapSpecial: ViewStyle,
  tabWrap: ViewStyle,
  tabBarWrap: ViewStyle,
  labelText: TextStyle,
  buoy: ViewStyle,
  tabIcon: ImageStyle,
}

const styles = StyleSheet.create<Style>({
  tabWrapSpecial: {
    borderTopColor: '#201718',
    borderTopWidth: line * 3,
    backgroundColor: 'transparent',
  },
  tabWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom:  0,
    flexDirection: 'row',
    height: isIphoneX ? 80 : 60,
    paddingBottom: isIphoneX ? 20 : 0,
    backgroundColor: '#1A1B20',
  },
  tabBarWrap: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A1A2A7',
  },
  buoy: {
    marginTop: 15,
    marginBottom: 4,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'transparent',
  },
  tabIcon: {
    width: 40,
    height: 30,
  },
});
