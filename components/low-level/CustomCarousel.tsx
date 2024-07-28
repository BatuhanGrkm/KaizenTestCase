import { Dimensions, View, useWindowDimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedRef, SharedValue } from "react-native-reanimated";
import Pagination from "./Pagination";
import ListItem from "./ListItem";

interface DataItem {
  key: string;
  [key: string]: any;
}

interface CustomImageCarousalProps {
  data: DataItem[];
  autoPlay: boolean;
  pagination: boolean;
}

const CustomImageCarousal: React.FC<CustomImageCarousalProps> = ({ data, autoPlay, pagination }) => {
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>(); // Animated ScrollView referansı
  const interval = useRef<NodeJS.Timeout | null>(null); // Otomatik oynatma için interval referansı
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay); // Otomatik oynatma durumu
  const [newData, setNewData] = useState<DataItem[]>([{ key: "spacer-left" }, ...data, { key: "spacer-right" }]); // Veri öğelerine boşluk eklemek için yeni veri durumu
  const { width } = useWindowDimensions();
  const SIZE = width * 0.74; // Öğenin genişliği
  const SPACER = (width - SIZE) / 2; // Boşluk genişliği
  const x = useSharedValue(0);
  const offSet = useSharedValue(0);
  const height = Dimensions.get("window").height;

  // Veri değişirse newData'yı günceller
  useEffect(() => {
    setNewData([{ key: "spacer-left" }, ...data, { key: "spacer-right" }]);
  }, [data]);

  // Kaydırma işlemi için scroll handler
  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offSet.value = e.contentOffset.x;
    },
  });

  // Otomatik oynatma işlevi
  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current?.scrollTo({ x: _offSet, y: 0 });
      }, 2000);
    } else {
      if (interval.current) {
        clearInterval(interval.current);
      }
    }
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <View style={{ marginTop: -10 }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={() => {
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
      >
        {newData.map((item, index) => {
          return <ListItem key={index} index={index} item={item} x={x} size={SIZE} spacer={SPACER} />;
        })}
      </Animated.ScrollView>

      {pagination && <Pagination data={data} x={x} size={SIZE} />}
    </View>
  );
};

export default CustomImageCarousal;
