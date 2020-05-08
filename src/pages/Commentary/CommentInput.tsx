import React from "react";
import {StyleSheet, View, ViewStyle} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";

const CommentInput = ({navigation}: {navigation: StackNavigationProp<any>}) => {
  navigation.setOptions({headerShown: false});

  return (
    <View style={styles.container}>

    </View>
  )
};

export default CommentInput;

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
  }
});
