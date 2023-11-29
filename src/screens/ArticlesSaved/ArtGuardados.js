import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Image, Dimensions } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const ArtGuardados = () => {
  const route = useRoute();
  const { item } = route.params;
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentIndex(newIndex);
  };

  const imageUrls = [item.imgPortada, item.imgPortada, item.imgPortada];

  const renderImages = () => {
    return imageUrls.map((imageUrl, index) => (
      <View key={index} style={styles.slide}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
    ));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* CONTENIDO */}
        <Card style={styles.card}>
          <Text style={styles.big}>{item.titulo}</Text>
          <Divider style={styles.divider} />
          <Card.Title title={item.tematica} />
          <Card.Content>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              contentContainerStyle={styles.scrollViewContent}
            >
              {renderImages()}
            </ScrollView>
            <View style={styles.dotsContainer}>
              {imageUrls.map((_, index) => (
                <Text
                  key={index}
                  style={[
                    styles.dot,
                    { color: index === currentIndex ? "#531949" : "lightgray" },
                  ]}
                >
                  ⬤
                </Text>
              ))}
            </View>
            {/* <Card.Cover
                            source={{
                                uri: item.imgPortada,
                            }}
                        /> */}
            <Text variant="bodyMedium" style={styles.content}>
              {item.informacion}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  big: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 20,
  },
  content: {
    textAlign: "justify",
    marginTop: 10,
  },
  divider: {
    marginLeft: 20,
    marginRight: 20,
  },
  image: {
    flex: 1,
    width: windowWidth - 72,
    height: 220,
    borderRadius: 10,
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  // card: {
  //     marginBottom: 10,
  // }
});

export default ArtGuardados;
