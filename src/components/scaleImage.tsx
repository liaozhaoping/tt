/**
* 由TouchableOpacity包裹的具有点击弹动动画的图片
* */

import React from "react";
import {Animated, Easing, TouchableOpacity} from "react-native";

interface ScaleImageProps {
  source: any,
  wrapStyle?: object,
  imgStyle?: object,
  onPress?: () => void,
  mode?: ScaleImageModeEnum,
}

export enum ScaleImageModeEnum {
  CREATE,  //创建时执行动画
  PRESS,   //点击时执行动画（默认）
  ALL,     //都执行动画
}

export const ScaleImage = (props: ScaleImageProps) => {
  const {source, wrapStyle, imgStyle, onPress, mode = ScaleImageModeEnum.PRESS} = props;

  const [scaleValue] = React.useState(new Animated.Value(0));
  const [opacityValue] = React.useState(new Animated.Value(mode !== ScaleImageModeEnum.PRESS ? 0: 1));

  React.useEffect(() => {
    if (mode === ScaleImageModeEnum.CREATE || mode === ScaleImageModeEnum.ALL) {
      doScaleImage();
    }
  }, []);

  function doScaleImage() {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      scaleValue.setValue(0);
    });
  }

  const handlePress = () => {
    if (mode === ScaleImageModeEnum.PRESS || mode === ScaleImageModeEnum.ALL) {
      doScaleImage();
    }
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={wrapStyle}>
      <Animated.Image source={source}
                      style={[imgStyle, {
                        transform: [
                          {scale: scaleValue.interpolate({
                              inputRange: [0, 0.5, 1],
                              outputRange: [1, 0.8, 1]
                            })}
                        ],
                        opacity: opacityValue,
                      }]}
                      resizeMode={"contain"}
      />
    </TouchableOpacity>
  )
};
