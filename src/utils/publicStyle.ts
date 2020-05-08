import {StyleSheet, ViewStyle, PixelRatio, Dimensions, Platform} from 'react-native';

interface Style {
  container: ViewStyle;
}

export const line = 1 / PixelRatio.get();
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
export const isIphoneX = (Platform.OS === "ios" && screenWidth * 2 <= screenHeight);


export const publicStyle = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
