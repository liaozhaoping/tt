import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image, ViewStyle, ImageStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs/lib/typescript/src/types";
import Animated from 'react-native-reanimated';
import SmallVideo from "./SmallVideo";
import {VideoCategoryEnum} from "./services";
import {useFocusEffect} from '@react-navigation/native';

//推荐页面
const Recommended = ({navigation}: { navigation: StackNavigationProp<any> }) => {
  const [canPlay, setCanPlay] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCanPlay(true);
      return () => setCanPlay(false);
    }, [])
  );

  return <SmallVideo type={VideoCategoryEnum.RECOMMENDED} canPlay={canPlay}/>
};

//关注页面
const Concerned = () => {
  const [canPlay, setCanPlay] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCanPlay(true);
      return () => setCanPlay(false);
    }, [])
  );

  return <SmallVideo type={VideoCategoryEnum.CONCERNED} canPlay={canPlay}/>
};

//自定义首页顶部Tab导航器的TabBar
const TabBar = ({state, descriptors, navigation, position}: MaterialTopTabBarProps) => {
  return (
    <View style={styles.topTabWrap}>
      <TouchableOpacity style={styles.topIconWrap}>
        <Image source={require('./assets/live.png')} style={styles.topIcon}/>
      </TouchableOpacity>

      <View style={styles.topTabBarWrap}>
        {state.routes.map((route, index) => {
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

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.8)),
          });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarWrap}
            >
              <Animated.Text style={[styles.tabBarText, isFocused && {color: 'white'}, {opacity}]}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.topIconWrap}>
        <Image source={require('./assets/search.png')} style={styles.topSearchIcon}/>
      </TouchableOpacity>
    </View>
  );
};

//首页 包含了关注页面与推荐页面的顶部Tab标签导航器
const Home = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props}/>} initialRouteName="Recommended">
      <Tab.Screen name="Concerned" component={Concerned} options={{tabBarLabel: '关注'}}/>
      <Tab.Screen name="Recommended" component={Recommended} options={{tabBarLabel: '推荐'}}/>
    </Tab.Navigator>
  )
};

export default Home;

interface Style {
  topTabWrap: ViewStyle;
  topTabBarWrap: ViewStyle;
  tabBarText: any;
  topIconWrap: ViewStyle;
  topIcon: ImageStyle;
  topSearchIcon: ImageStyle;
  tabBarWrap: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  topTabWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    paddingHorizontal: 15,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 1000,
  },
  topTabBarWrap: {
    width: 200,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tabBarText: {
    fontSize: 16,
    color: '#A1A2A7',
  },
  topIconWrap: {
    padding: 5,
  },
  topIcon: {
    width: 30,
    height: 30,
  },
  topSearchIcon: {
    width: 26,
    height: 26,
  },
  tabBarWrap: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  }
});
