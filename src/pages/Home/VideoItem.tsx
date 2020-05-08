import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {
  Image,
  ImageStyle, Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View, ViewStyle
} from "react-native";
import {ScaleImage, ScaleImageModeEnum} from "../../components/scaleImage";
import Video from "react-native-video";
import {RotateImage} from "../../components/rotateImage";
import {isIphoneX, line, screenHeight, screenWidth} from "../../utils/publicStyle";


interface VideoItemProps {
  index: number;
  item: string;
  current: number;
  canPlay: boolean;
}

//首页单个小视频组件
const VideoItem = (props: VideoItemProps) => {
  const [paused, setPaused] = useState(false);
  const [flexCompleted, setFlexCompleted] = useState(0);
  const navigation = useNavigation();

  //视频组件的ref引用
  const videoRef = React.useRef(null);

  //切换当前播放视频的处理事件
  React.useEffect(() => {
    if (videoRef.current && props.current === props.index && props.canPlay) {
      // @ts-ignore
      //播放当前页面时，设置为从头开始播放
      videoRef.current.seek(0);
    }
    setPaused(props.current !== props.index);
  }, [props.current, props.canPlay]);

  //渲染右侧部分功能图标
  const renderIcons = () => {
    const icons = [
      {
        icon: require('./assets/heart.png'),
        label: '60.5w',
        onPress: () => {
        },
      },
      {
        icon: require('./assets/msg.png'),
        label: '2.3w',
        onPress: () => {
          navigation.navigate('Modals', {screen: 'Commentary', params: {videoId: 100}});
        },
      },
      {
        icon: require('./assets/share.png'),
        label: '分享',
        onPress: () => {
        },
      }
    ];

    return (
      icons.map((v, i) => (
        <TouchableOpacity onPress={v.onPress} key={i} style={styles.iconsContent}>
          <ScaleImage source={v.icon} imgStyle={styles.icons} onPress={v.onPress}/>
          <Text style={styles.labelText}>{v.label}</Text>
        </TouchableOpacity>
      ))
    )
  };

  //播放过程中每个间隔的回调，用于展示进度条
  const _onProgress = ({currentTime, playableDuration}: { currentTime: number, playableDuration: number }) => {
    const temp = currentTime / playableDuration;
    setFlexCompleted(temp);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
      <View style={styles.videoWrap}>

        {/*视频播放组件 onProgress回调因在Android上的NaN兼容问题而屏蔽掉*/}
        <Video ref={videoRef}
               source={require('./assets/a.mp4')}
               style={styles.video}
               paused={paused || !props.canPlay}
               repeat={true}
               onProgress={Platform.OS === 'ios' ? _onProgress : undefined}
               resizeMode={Platform.OS === 'ios' ? 'none' : 'cover'}
        />

        {/*播放按钮*/}
        {
          paused && props.index === props.current &&
          <ScaleImage source={require('./assets/play.png')}
                      wrapStyle={[styles.playBtn]}
                      mode={ScaleImageModeEnum.ALL}
          />
        }

        <View style={styles.content}>
          {/*用户名、简介及其他信息展示*/}
          <View style={styles.infoWrap}>
            <Text style={styles.infoNameText}>@秦汉明宋</Text>
            <Text style={styles.infoText}>生活是一种仰望，看得见是满足，看不见就会憧憬，而我喜欢憧憬，总感觉看得见的生活在我的记忆中没有痕迹，稍纵即逝。</Text>
            <View style={styles.broadWrap}>
              <Image source={require('./assets/dySmall.png')} style={styles.broadIcon}/>
              <Text style={styles.broadText}>@还未做滚动的文字</Text>
            </View>
          </View>

          {/*右侧功能按钮组*/}
          <View style={styles.iconsWrap}>
            <TouchableOpacity>
              <Image source={require('./assets/avatar.png')} style={styles.avatarIcon}/>
            </TouchableOpacity>
            {renderIcons()}
            <TouchableOpacity>
              <RotateImage source={require('./assets/record.png')} style={styles.recordIcon}/>
            </TouchableOpacity>
          </View>
        </View>

        {/*进度条展示*/}
        <View style={styles.progress}>
          <View style={[styles.progressCompleted, {flex: flexCompleted}]}/>
        </View>

      </View>
    </TouchableWithoutFeedback>
  )
};

export default VideoItem;

interface Style {
  icons: ImageStyle;
  labelText: TextStyle;
  iconsContent: ViewStyle;
  videoWrap: ViewStyle;
  video: ViewStyle;
  playBtn: ImageStyle;
  content: ViewStyle;
  infoWrap: ViewStyle;
  infoNameText: TextStyle;
  infoText: TextStyle;
  broadWrap: ViewStyle;
  broadIcon: ImageStyle;
  broadText: TextStyle;
  iconsWrap: ViewStyle;
  progress: ViewStyle;
  progressCompleted: ViewStyle;
  recordIcon: ImageStyle;
  avatarIcon: ImageStyle;
}

const styles = StyleSheet.create<Style>({
  icons: {
    width: 32,
    height: 32,
  },
  labelText: {
    marginTop: 4,
    fontSize: 14,
    color: 'white',
  },
  iconsContent: {
    marginTop: 30,
    marginRight: 9,
    alignItems: 'center',
  },
  videoWrap: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight - (Platform.OS === 'ios' ? 0 : 24),
    backgroundColor: '#1A1B20',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  playBtn: {
    position: 'absolute',
    width: 66,
    height: 66,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isIphoneX ? 80 : 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  infoWrap: {
    flex: 1,
    marginBottom: 20,
    paddingLeft: 15,
  },
  infoNameText: {
    marginBottom: 8,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 15,
    color: 'white',
    lineHeight: 20,
  },
  broadWrap: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  broadIcon: {
    marginRight: 5,
    width: 15,
    height: 15,
  },
  broadText: {
    fontSize: 15,
    color: 'white',
  },
  iconsWrap: {
    marginBottom: 20,
    width: 100,
    paddingRight: 10,
    alignItems: 'flex-end',
  },
  progress: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: isIphoneX ? 80 : 60,
    height: line * 2,
    backgroundColor: '#aaa',
    flexDirection: 'row',
  },
  progressCompleted: {
    backgroundColor: 'white',
  },
  recordIcon: {
    marginTop: 45,
    width: 54,
    height: 54,
  },
  avatarIcon: {
    marginBottom: 15,
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: line * 4,
    borderColor: 'white',
  },
});
