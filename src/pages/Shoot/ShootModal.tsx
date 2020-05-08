import React from "react";
import {View, Text, Image, StyleSheet, ImageStyle, TouchableOpacity, ViewStyle} from "react-native";
import {publicStyle} from "../../utils/publicStyle";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";


const ShootModal = ({navigation}: {navigation: StackNavigationProp<any>}) => {
  navigation.setOptions({
    headerShown: false,
  });
  return (
    <View style={[publicStyle.container, styles.container]}>
      <TouchableOpacity style={styles.closeWrap} onPress={() => navigation.goBack()}>
        <Image source={require('./assets/close.png')} style={styles.closeIcon}/>
      </TouchableOpacity>
      <Text>拍摄一段小视频</Text>
    </View>
  )
};

interface Style {
  container: ViewStyle;
  closeWrap: ViewStyle,
  closeIcon: ImageStyle,
}

const styles = StyleSheet.create<Style>({
  container: {
    backgroundColor: 'white',
  },
  closeWrap: {
    position: 'absolute',
    top: 40,
    left: 30,
  },
  closeIcon: {
    width: 25,
    height: 25,
  }
});

export default ShootModal;
