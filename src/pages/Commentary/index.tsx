/**
 * 视频评论弹出页
 * */
import React from "react";
import {
  DatePickerIOS,
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
import CommentItem from "./CommentItem";
import {isIphoneX} from "../../utils/publicStyle";

const Commentary = ({route, navigation}: { route: any, navigation: StackNavigationProp<any> }) => {
  navigation.setOptions({headerShown: false});

  //评论列表数据项
  const [list, setList] = React.useState(mockCommList);
  //评论文案
  const [comment, setComment] = React.useState('');
  //艾特回复的对象
  const [aiTe, setAiTe] = React.useState('');
  //暂存当前被操作的一级评论对象
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    setComment(route.params.comment);
  }, [route.params.comment]);

  //处理返回事件
  function handleGoBack() {
    navigation.goBack();
  }

  //处理点赞或取消点赞
  function handlePressPraise(item: CommentaryDTO, index: number) {
    item.isLike = !item.isLike;
    item.hearts += item.isLike ? 1 : -1;
    setList(prevState => prevState.splice(index, 1, item));
  }

  function handlePressComment(name: string, index: number) {
    setAiTe(name);
    navigation.navigate('Modals', {screen: 'CommentInput', params: {placeholder: `回复@${name}`}})
    setCurrentIndex(index);
  }

  //处理提交评论
  function handleComment() {
    if (route.params.comment) {
      if (aiTe) {  //回复某个人，对对应评论的二级消息进行新增
        setList(prevState => {
          const temp = list[currentIndex];
          temp.replyList = temp.replyList || [];
          temp.replyList.push({
            id: 1,
            avatar: '',
            name: '我新增回复',
            content: `回复@${aiTe}：${comment}，时间戳为${(new Date()).valueOf()}`,
            date: '5-12',
            hearts: 0,
            isLike: false,
            aiTeName: aiTe,
          });

          prevState.splice(currentIndex, 1, temp);
          return prevState.slice();
        })
      } else {  //编写新的评论，对一级消息进行新增
        setList(prevState => {
          return [...prevState, {
            id: 1,
            avatar: '',
            name: '我新增评论',
            content: `${comment}，时间戳为${(new Date()).valueOf()}`,
            date: '5-12',
            hearts: 0,
            isLike: false,
          }]
        });
      }
    }

    setAiTe('');
    setComment('');
  }

  //渲染单个评论
  const _renderItem = ({item, index}: { item: CommentaryDTO, index: number }) => {
    return (
      <View>
        <CommentItem key={index} item={item}
                     onPressPraise={() => handlePressPraise(item, index)}
                     onPressComment={() => handlePressComment(item.name, index)}/>
        {item.replyList && item.replyList.length && item.replyList.map((v, i) => (
          <CommentItem key={i} item={v}
                       type={CommentaryLevelEnum.SECONDARY}
                       onPressPraise={() => handlePressPraise(v, i)}
                       onPressComment={() => handlePressComment(v.name, index)}/>
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
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Modals', {
            screen: 'CommentInput',
            params: {comment: comment}
          })}>
            <View style={styles.commentWrap}>
              <Text style={[styles.comment, !comment && {color: '#A1A2A7'}]}>
                {comment || '有爱评论，说点儿好听的~'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableOpacity style={styles.sendWrap} onPress={handleComment}>
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
  comment: TextStyle;
  sendWrap: ViewStyle;
  commentWrap: ViewStyle;
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
    paddingBottom: isIphoneX ? 20 : 0,
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
  sendWrap: {
    height: '100%',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentWrap: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  comment: {
    fontSize: 16,
    color: 'white',
  }
});
