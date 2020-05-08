/**
* 单个评论Item
* */
import React from "react";
import {Image, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {CommentaryDTO, CommentaryLevelEnum} from "./services";
import {screenWidth} from "../../utils/publicStyle";

interface CommItemProps {
  item: CommentaryDTO,
  type?: CommentaryLevelEnum,
  onPressPraise: () => void,
  onPressComment: () => void,
}

const CommentItem = (props: CommItemProps) => {
  const {item, type = CommentaryLevelEnum.MAIN, onPressPraise, onPressComment} = props;
  const isSecondary = type === CommentaryLevelEnum.SECONDARY;

  //点击一个评论进行回复
  function _onPressContent() {
    onPressComment();
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

export default CommentItem;

interface Style {
  itemWrap: ViewStyle;
  secondaryWrap: ViewStyle;
  secondaryAvatarImg: ImageStyle;
  secondaryAvatarWrap: ViewStyle;
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
}

const styles = StyleSheet.create<Style>({
  itemWrap: {
    flexDirection: 'row',
    marginBottom: 20,
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
});
