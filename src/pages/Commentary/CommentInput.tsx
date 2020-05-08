/**
 * 处理评论输入的弹出页
 * */
import React from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";

const CommentInput = ({route, navigation}: {route: any, navigation: StackNavigationProp<any> }) => {
  navigation.setOptions({headerShown: false});

  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    setComment(route.params.comment || '');
  }, []);

  function handleGoBack() {
    navigation.navigate('Modals', {screen: 'Commentary', params: {comment: comment}})
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleGoBack}>
        <View style={{flex: 1}}/>
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "padding"} enabled
                            style={styles.scrollView}>
        <View style={styles.content}>
          <TextInput autoFocus={true}
                     multiline={true}
                     value={comment}
                     onChangeText={val => setComment(val)}
                     underlineColorAndroid="transparent"
                     placeholderTextColor="#A1A2A7"
                     placeholder="有爱评论，说点儿好听的~"
                     style={styles.input}
                     returnKeyType="done"
                     onSubmitEditing={handleGoBack}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
};

export default CommentInput;

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  scrollView: ViewStyle;
  input: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
  },
  scrollView: {
    //flex: 0.7,
    backgroundColor: 'white',
  },
  input: {
    marginVertical: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    height: 200,
  }
});
