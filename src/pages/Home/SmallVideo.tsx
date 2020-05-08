import React, {useState} from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ViewStyle,
  ViewToken
} from "react-native";
import {screenHeight} from "../../utils/publicStyle";
import {VideoCategoryEnum} from "./services";
import VideoItem from "./VideoItem";

interface SmallVideoProps {
  type: VideoCategoryEnum
  canPlay: boolean
}

//小视频展示组件
const SmallVideo = (props: SmallVideoProps) => {
  const [current, setCurrent] = useState(0);

  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 80});

  const onViewRef = React.useRef(({viewableItems}: { viewableItems: Array<ViewToken> }) => {
    //只当呈现一个完整的页面时，其页面中的播放器状态为播放
    if (viewableItems.length === 1) {
      setCurrent(viewableItems[0].index || 0);
    }
  });

  //渲染FlatList单个组件
  const _renderItem = ({item, index}: { item: string, index: number }) => {
    return <VideoItem key={index} item={item} index={index} current={current} canPlay={props.canPlay}/>
  };

  return (
    <View style={styles.container}>
      <FlatList data={['1', '1',]}
                renderItem={_renderItem}
                showsVerticalScrollIndicator={false}
                pagingEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewRef.current}
                getItemLayout={(data, index) => {
                  return {length: screenHeight, offset: screenHeight * index, index}
                }}
      />
    </View>
  )
};

export default SmallVideo;

interface Style {
  container: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#1A1B20',
  },
});
