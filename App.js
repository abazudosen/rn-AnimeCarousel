import * as React from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const data = [
  "https://cdn.dribbble.com/users/2018708/screenshots/5795735/duo-tone-yo_pierre.png?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/2777062/screenshots/9807259/media/0ff0362d1de5227093ced0d1a5e82aa2.png?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/1644453/screenshots/11441710/media/dd8401d34c519c89c8691ec731ad4e27.png?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/15891/screenshots/7083214/image.png?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/1068576/screenshots/7047241/media/1cfe964036cfe61596894a79cc9531ff.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/15891/screenshots/10090154/image.png?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/143237/screenshots/4088798/zlatan_manunit.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/143237/screenshots/4077018/neymar_psg.jpg?compress=1&resize=1200x1200",
  "https://cdn.dribbble.com/users/143237/screenshots/4080636/aguero_city.jpg?compress=1&resize=1200x1200",
  "https://www.thesun.co.uk/wp-content/uploads/2019/09/NINTCHDBPICT000525008359-e1569411351945.jpg?compress=1&resize=1200x1200"
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar hidden />

      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: image }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          );
        })}
      </View>

      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{ 
                width, 
                justifyContent: "center", 
                alignItems: "center",
                shadowColor: '#000',
                shadowOpacity: 1, 
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowRadius: 20
              }}
            >
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
