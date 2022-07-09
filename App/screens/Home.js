import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { format } from "date-fns";
import colors from "../constants/colors";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
  },
  content: {
    paddingTop: screen.height * 0.2,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoBackgound: {
    width: screen.width * 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    color: colors.white,
    fontSize: 13,
    textAlign: "center",
  },
});

export default () => {
  const baseCurrency = "USD";
  const quoteCurrency = "GBP";
  const conversionRate = 0.8345;
  const date = new Date();

  const [scrollEnable, setScrollEnable] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView scrollEnabled={scrollEnable}>
        <StatusBar barStyle="light-content" backgroundColor={colors.blue} />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/background.png")}
              style={styles.logoBackgound}
              resizeMode="contain"
            />
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.textHeader}>Currency Converter</Text>
          <ConversionInput
            text={baseCurrency}
            value="123"
            onButtonPress={() => alert("TODO")}
            onChangeText={(text) => console.log("text", text)}
            keyboardType="numeric"
          />
          <ConversionInput
            text={quoteCurrency}
            value="123"
            onButtonPress={() => alert("TODO")}
            editable={false}
          />
          <Text style={styles.text}>
            {`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as ${format(
              date,
              "MMM do, yyyy"
            )}.`}
          </Text>
          <Button text="Reverse Currencies" onPress={() => alert("TODO")} />
          <KeyboardSpacer
            onToggle={(keyboardIsVisible) => setScrollEnable(keyboardIsVisible)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
