import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import db from "../config";
import { SearchBar } from "react-native-elements";

export default class ReadStoryScreen extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      allStories: [],
      dataSource: [],
    };
  }

  updateSearch = (search) => {
    this.setState({ input: search });
  };

  retireveStories = async (search) => {
    var allStories = [];
    var stories = db.collection("stories").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allStories.push(doc.data());
          console.log("These are the stories", allStories);
        });
        this.setState({ allStories });
      });
  };

  SearchFilter(text) {
    var newData = this.state.allStories.filter((item) => {
      const data = item.title.toUpperCase();
      const inputVal = text.toUpperCase();
      return data.indexOf(inputVal) > -1;
    });
    this.setState({ dataSource: newData, input: text });
  }

  componentDidMount() {
    this.retireveStories();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <SearchBar
              placeholder="Enter the story title"
              placeholderTextColor="white"
              onChangeText={(text) => this.SearchFilter(text)}
              value={this.state.input}
            />
          </View>
          <View>
            {this.state.input === ""
              ? this.state.allStories.map((item) => (
                  <View style={{ padding: 10, alignItems: "center" }}>
                    <Text style={{ color: "blue" }}>Title : {item.title}</Text>
                    <Text style={{ color: "blue" }}>
                      Author : {item.author}
                    </Text>
                    <Text style={{ color: "blue" }}>Story : {item.story}</Text>
                  </View>
                ))
              : this.state.dataSource.map((item) => (
                  <View style={{ padding: 10, alignItems: "center" }}>
                    <Text style={{ color: "blue" }}>Title : {item.title}</Text>
                    <Text style={{ color: "blue" }}>
                      Author : {item.author}
                    </Text>
                    <Text style={{ color: "blue" }}>Story : {item.story}</Text>
                  </View>
                ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
