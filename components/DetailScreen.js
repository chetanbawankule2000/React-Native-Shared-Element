import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { movie_detail_by_id, movie_cast } from "../utils/ApiCalls";
import { minut_to_hours } from "../utils/TimeConversion";
const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;

const DetailScreen = (props) => {
  const { item } = props.route.params;
  console.log("api response is ", item);

  const [DetailsById, setDetailsById] = useState([]);
  const [MovieCast, setMovieCast] = useState([]);

  useEffect(() => {
    details_by_id(item.id);
  }, []);

  // Item seperator component
  const Seperator = () => {
    return <View style={{ margin: 12 }}></View>;
  };

  const details_by_id = async (movie_id) => {
    let response = await movie_detail_by_id(movie_id);
    console.log("movies id is ", movie_id);
    let cast = await movie_cast(movie_id);
    setDetailsById(response);
    setMovieCast(cast.cast);
    console.log(cast.cast[0]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ImageBackground
        style={styles.backDropImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w1280_and_h720_face${item.backdrop_path}`,
        }}
      >
        <SharedElement id={`item.${item.id}.photo`}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: `https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`,
            }}
          />
        </SharedElement>
      </ImageBackground>
      <View style={styles.titleView}>
        <SharedElement id={`item.${item.id}.title`}>
          <Text style={styles.movieTitle}>{item.title}</Text>
        </SharedElement>
        <SharedElement id={`item.${item.id}.date`}>
          <Text style={styles.movieYear}>
            {" "}
            ({item.release_date.slice(0, 4)})
          </Text>
        </SharedElement>
      </View>
      <ScrollView style={styles.belowImageView}>
        <View style={styles.dateAmdTime}>
          <Text style={styles.dateAmdTimeText}>{item.release_date}</Text>
          {DetailsById.runtime === undefined ? (
            <ActivityIndicator size={"small"} color="black" />
          ) : (
            <Text style={styles.dateAmdTimeText}>
              {" . "}
              {minut_to_hours(DetailsById.runtime)}
            </Text>
          )}
        </View>
        {DetailsById.genres === undefined ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.genresNameView}>
            {DetailsById.genres.map((item, index) => {
              return (
                <Text key={index} style={styles.genersText}>
                  {(index ? ", " : "") + item.name}
                </Text>
              );
            })}
          </View>
        )}
        <Text style={styles.h3}>Overview</Text>
        <Text style={styles.overViwe}>{item.overview}</Text>
        <Text style={styles.h3}>Cast</Text>
        <FlatList
          bounces={false}
          contentContainerStyle={{ marginTop: 20 }}
          horizontal={true}
          data={MovieCast}
          ItemSeparatorComponent={() => Seperator()}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity style={styles.flatlistStyle}>
                <Image
                  style={styles.image_style}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w440_and_h660_face${item.profile_path}`,
                  }}
                />
                <View style={{ width: 130, padding: 5 }}>
                  <Text
                    key={`item.${item.id}.title`}
                    style={styles.movie_title}
                  >
                    {item.original_name}
                  </Text>

                  <Text
                    key={`item.${item.id}.release_date`}
                    style={styles.character_title}
                  >
                    {item.character}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
  },
  backDropImage: {
    flexDirection: "row",
    width: "100%",
    height: 250,
    justifyContent: "space-between",
    alignItems: "center",
  },
  movie_title: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
  },
  character_title: {
    fontSize: 15,
    color: "black",
  },
  flatlistStyle: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 15,
    shadowColor: "#00000099",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderColor: "#00000099",
  },
  image_style: {
    height: 170,
    width: 130,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  imageStyle: {
    width: 100,
    height: 150,
    borderRadius: 12,
    marginLeft: 20,
  },
  dateAmdTime: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  movieTitle: {
    fontWeight: "normal",
    fontSize: 20,
    color: "black",
    fontFamily: "OpenSanse",
  },
  titleView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  movieYear: {
    fontWeight: "normal",
    fontSize: 20,
    fontFamily: "OpenSanse",
    color: "black",
    opacity: 0.5,
  },
  dateAmdTimeText: {
    fontWeight: "normal",
    fontSize: 18,
    fontFamily: "OpenSanse",
    color: "black",
  },
  genersText: {
    fontFamily: "OpenSanse",
    color: "black",
    fontSize: 17,
    fontWeight: "600",
  },
  genresNameView: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  h3: {
    fontSize: 22,
    color: "black",
    fontFamily: "OpenSanse",
    fontWeight: "600",
    marginTop: 20,
  },
  belowImageView: {
    paddingHorizontal: 20,
  },
  overViwe: {
    fontFamily: "OpenSanse",
    color: "black",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 20,
    flexWrap: "wrap",
  },
});
