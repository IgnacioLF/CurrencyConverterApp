import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { RowItem, RowSeparator } from "../components/RowItem";

const openUrl = (url) => {
  Linking.openURL(url).catch(() => {
    Alert.alert("Sorry something went wrong.", "Please try again later.");
  });
};

export default () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <RowItem
          onPress={() => openUrl("https://www.google.es")}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
          text="Themes"
        />

        <RowSeparator />

        <RowItem
          onPress={() => openUrl("https://www.google.es")}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
          text="React Native Basics"
        />

        <RowSeparator />

        <RowItem
          onPress={() => openUrl("https://www.google.es")}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
          text="React Native by Example"
        />
      </ScrollView>
    </SafeAreaView>
  );
};
