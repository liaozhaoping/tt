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
import {screenWidth} from "../../utils/publicStyle";

interface CommItemProps {
  item: CommentaryDTO,
  type?: CommentaryLevelEnum,
  onPressPraise: () => void,
}

//单个评论Item
const CommItem = (props: CommItemProps) => {
  const {item, type = CommentaryLevelEnum.MAIN, onPressPraise} = props;
  const isSecondary = type === CommentaryLevelEnum.SECONDARY;

  //点击一个评论进行回复
  function _onPressContent() {

  }

  //点击点赞
  function _onPressPraise() {
    onPressPraise();
  }

  return (
    <TouchableOpacity onPress={_onPressContent}>
      <View style={[styles.itemWrap, isSecondary && styles.secondaryWrap]}>
        <View style={[styles.avatarWrap, isSecondary && styles.secondaryAvatarWrap]}>
          <Image source={require('./assets/avatar.png')}
                 style={[styles.avatarImg, isSecondary && styles.secondaryAvatarImg]}/>
        </View>
        <View style={styles.commWrap}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.commText}>
            {item.content}
            <Text style={styles.dateText}>{` ${item.date}`}</Text>
          </Text>
        </View>
        <View style={styles.approvalWrap}>
          <TouchableOpacity onPress={_onPressPraise} style={styles.heartWrap}>
            <Image source={item.isLike ? require('./assets/redHeart.png') : require('./assets/heart.png')}
                   style={styles.heartImg} resizeMode="contain"/>
            <Text style={[styles.heartText, item.isLike && {color: '#d81e06'}]}>{item.hearts}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const Commentary = ({route, navigation}: { route: any, navigation: StackNavigationProp<any> }) => {
  navigation.setOptions({headerShown: false});

  const [list, setList] = React.useState(mockCommList);
  React.useEffect(() => {
    //setList([]);
  }, [route.params.videoId]);

  const goBack = () => {
    navigation.goBack();
  };

  const _renderItem = ({item, index}: { item: CommentaryDTO, index: number }) => {
    return (
      <View>
        <CommItem key={index} item={item} onPressPraise={() => {
          item.isLike = !item.isLike;
          item.hearts += item.isLike ? 1 : -1;
          setList(prevState => prevState.splice(index, 1, item));
        }}/>
        {item.replyList && item.replyList.length && item.replyList.map((v, i) => (
          <CommItem key={i} item={v} type={CommentaryLevelEnum.SECONDARY} onPressPraise={() => {}}/>
        ))}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={{flex: 0.3}}/>
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        {/*头部标题*/}
        <View style={styles.headerWrap}>
          <Text style={styles.headerText}>{`${list.length}条评论`}</Text>
          <TouchableOpacity style={styles.closeWrap} onPress={goBack}>
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
  itemWrap: ViewStyle;
  avatarWrap: ViewStyle;
  avatarImg: ImageStyle;
  commWrap: ViewStyle;
  nameText: TextStyle;
  commText: TextStyle;
  dateText: TextStyle;
  approvalWrap: ViewStyle;
  heartImg: ImageStyle;
  heartText: TextStyle;
  heartWrap: ViewStyle;
  secondaryWrap: ViewStyle;
  secondaryAvatarImg: ImageStyle;
  secondaryAvatarWrap: ViewStyle;
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
    height: 60,
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
  itemWrap: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatarWrap: {
    width: 40,
  },
  avatarImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  commWrap: {
    flex: 1,
  },
  nameText: {
    marginTop: 2,
    fontSize: 13,
    color: '#A1A2A7',
  },
  commText: {
    lineHeight: 24,
    fontSize: 16,
    color: '#ccc',
  },
  dateText: {
    fontSize: 13,
    color: '#A1A2A7',
  },
  approvalWrap: {
    marginLeft: 16,
    paddingTop: 10,
    alignItems: 'center',
    width: 50,
  },
  heartImg: {
    width: 22,
    height: 22,
  },
  heartText: {
    marginTop: 6,
    fontSize: 14,
    color: '#A1A2A7',
  },
  heartWrap: {
    alignItems: 'center',
  },
  secondaryWrap: {
    width: screenWidth - 70,
    alignSelf: 'flex-end',
  },
  secondaryAvatarImg: {
    width: 20,
    height: 20,
  },
  secondaryAvatarWrap: {
    width: 26,
  }
});
