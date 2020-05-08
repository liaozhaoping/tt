/**
 * 视频评论弹出页
 * */
import React from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack/lib/typescript/src/types";
import {CommentaryDTO, CommentaryLevelEnum, mockCommList} from "./services";
import CommItem from "./CommItem";
import {isIphoneX} from "../../utils/publicStyle";


const Commentary = ({route, navigation}: { route: any, navigation: StackNavigationProp<any> }) => {
  navigation.setOptions({headerShown: false});

  const [list, setList] = React.useState(mockCommList);
  React.useEffect(() => {
    //setList([]);
  }, [route.params.videoId]);

  //处理返回事件
  function handleGoBack() {
    navigation.goBack();
  }

  //处理点赞或取消点赞
  function handlePraise(item: CommentaryDTO, index: number) {
    item.isLike = !item.isLike;
    item.hearts += item.isLike ? 1 : -1;
    setList(prevState => prevState.splice(index, 1, item));
  }

  //渲染单个评论
  const _renderItem = ({item, index}: { item: CommentaryDTO, index: number }) => {
    return (
      <View>
        <CommItem key={index} item={item} onPressPraise={() => handlePraise(item, index)}/>
        {item.replyList && item.replyList.length && item.replyList.map((v, i) => (
          <CommItem key={i} item={v} type={CommentaryLevelEnum.SECONDARY} onPressPraise={() => handlePraise(v, i)}/>
        ))}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleGoBack}>
        <View style={{flex: 0.3}}/>
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        {/*头部标题*/}
        <View style={styles.headerWrap}>
          <Text style={styles.headerText}>{`${list.length}条评论`}</Text>
          <TouchableOpacity style={styles.closeWrap} onPress={handleGoBack}>
            <Image source={require('./assets/close.png')} style={styles.closeIcon}/>
          </TouchableOpacity>
        </View>

        {/*评论滚动区*/}
        <FlatList data={list}
                  renderItem={_renderItem}
                  style={styles.listWrap}
                  keyExtractor={(item, index) => index.toString()}
        />

        {/*尾部输入框*/}
        <View style={styles.inputWrap}>
          <TextInput style={styles.input}
                     placeholder="有爱评论，说点儿好听的~"
                     placeholderTextColor='#A1A2A7'
          />
          <TouchableOpacity style={styles.sendWrap} onPress={() => {
          }}>
            <Image source={require('./assets/send.png')} style={styles.sendIcon}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Commentary;

interface Style {
  container: ViewStyle;
  content: ViewStyle;
  headerWrap: ViewStyle;
  headerText: TextStyle;
  closeWrap: ViewStyle;
  closeIcon: ImageStyle;
  inputWrap: ViewStyle;
  listWrap: ViewStyle;
  sendIcon: ImageStyle;
  input: ViewStyle;
  sendWrap: ViewStyle;


}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 0.7,
    backgroundColor: 'rgba(0, 0, 0, .93)',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  headerWrap: {
    position: 'relative',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    color: 'white',
  },
  closeWrap: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  closeIcon: {
    width: 12,
    height: 12,
  },
  inputWrap: {
    flexDirection: 'row',
    height: isIphoneX ? 80 : 60,
    paddingBottom: isIphoneX ? 20: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1B20',
  },
  listWrap: {
    flex: 1,
    paddingHorizontal: 15,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingHorizontal: 25,
    fontSize: 16,
    color: 'white',
  },
  sendWrap: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
