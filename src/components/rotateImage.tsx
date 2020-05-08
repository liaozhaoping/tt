/**
* 一直旋转的图片组件
* */

import React from "react";
import {Animated, Easing} from "react-native";

interface RotateImageImageProps {
  source: any,
  style: object,
}

export const RotateImage = (props: RotateImageImageProps) => {
  const {source, style} = props;

  const [rotateValue] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    function startAnimate() {
      rotateValue.setValue(0);

      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startAnimate());
    }

    startAnimate();
  }, []);

  return (
    <Animated.Image source={source}
                    style={[style, {
                      transform: [
                        {
                          rotate: rotateValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0deg', '360deg'],
                          })
                        }
                      ]
                    }]}
    />
  )
};


