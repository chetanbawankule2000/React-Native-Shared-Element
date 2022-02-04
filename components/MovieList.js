import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { trending } from "../utils/ApiCalls";
import { SharedElement } from "react-navigation-shared-element";

const MovieList = (props) => {
  const [Trending_movies, set_Trending_movies] = useState();

  // Calling api to get movie data
  const trending_movies = async () => {
    let trending_list = await trending();
    set_Trending_movies(trending_list.results);
  };
  useEffect(() => {
    trending_movies();
  });

  // Item seperator component
  const Seperator = () => {
    return <View style={{ margin: 12 }}></View>;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingTitle}>Trending Movies</Text>
      <FlatList
        bounces={false}
        contentContainerStyle={{ marginTop: 10 }}
        horizontal={true}
        data={Trending_movies}
        ItemSeparatorComponent={() => Seperator()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => props.navigation.push("Detail", { item })}
            >
              <SharedElement id={`item.${item.id}.photo`}>
                <Image
                  style={styles.image_style}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`,
                  }}
                />
              </SharedElement>
              <View style={{ width: 100 }}>
                <SharedElement id={`item.${item.id}.title`}>
                  <Text
                    key={`item.${item.id}.title`}
                    style={styles.movie_title}
                  >
                    {item.title}
                  </Text>
                </SharedElement>
                <SharedElement id={`item.${item.id}.date`}>
                  <Text
                    key={`item.${item.id}.release_date`}
                    style={styles.releaseDate}
                  >
                    {item.release_date}
                  </Text>
                </SharedElement>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  headingTitle: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  releaseDate: {
    fontSize: 15,
    color: "black",
    opacity: 0.4,
  },
  //   title: {
  //     fontSize: font_size.regular,
  //     color: colors.dark_green,
  //     fontFamily: font_family.Bold,
  //     alignSelf: "flex-start",
  //     marginBottom: 12,
  //   },
  image_style: {
    height: 250,
    width: 150,
    borderRadius: 10,
    marginBottom: 4,
  },
  flat_view: {
    height: "25%",
    width: "12%",
  },
  movie_title: {
    fontSize: 15,
    color: "black",
    fontWeight: "600",
  },
});
