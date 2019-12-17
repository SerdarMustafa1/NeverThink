import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Modal
} from "react-native";
import {
  Thumbnail,
  Left,
  Body,
  List,
  ListItem,
  View,
  Button
} from "native-base";
import Constants from "expo-constants";
import { WebView } from "react-native-webview";

import { DATA } from "../../helpers/sampleData";

const deviceWidth = Dimensions.get("window").width;

function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? "#96006f" : "#730192" }
      ]}
    >
      <Button onPress={() => {}}>
        <Text style={styles.title}>{title}</Text>
      </Button>
    </TouchableOpacity>
  );
}

export default function App(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const [selected, setSelected] = useState(new Map());

  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );

  return (
    <SafeAreaView style={styles.container}>
      <List>
        <FlatList
          keyExtractor={item => item.id}
          extraData={selected}
          data={DATA}
          renderItem={({ item }) => (
            <ListItem
              style={styles.item}
              id={item.id}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            >
              <Left>
                <Thumbnail
                  key={item.id}
                  source={{ uri: item.icon }}
                  style={styles.itemThumbnail}
                />
              </Left>
              <Body>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
              </Body>
              {/* Modal for webview */}
              <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <WebView style={{ flex: 1 }} source={{ uri: item.url }} />
                <View>
                  <TouchableHighlight
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.close}>Close</Text>
                  </TouchableHighlight>
                </View>
              </Modal>
            </ListItem>
          )}
        />
      </List>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    width: deviceWidth - 36,
    backgroundColor: "#f9c2ff"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Press_Start_2P"
  },
  itemThumbnail: {
    width: 60,
    height: 60,
    marginRight: 0,
    overflow: "hidden",
    justifyContent: "center"
  },
  webView: {
    flex: 1,
    width: deviceWidth - 36,
    height: 100
  },
  close: {
    textTransform: "uppercase",
    textAlign: "center",
    height: 40,
    fontSize: 30
  }
});
