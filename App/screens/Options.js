import React, { useState, useContext } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	SafeAreaView,
	StyleSheet,
	ScrollView,
	Linking,
	Alert,
	StatusBar,
	Switch,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { RowItem } from "../components/RowItem";
import { ConversionContext } from "../utils/ConversionContext";
import { ThemeContext } from "../config/Navigation";

const styles = StyleSheet.create({
	row: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});

export default () => {
	const toggleSwitch = () => setIsDarkTheme((previousState) => !previousState);
	const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				style={{
					backgroundColor: isDarkTheme ? colors.lightBlue : colors.white,
				}}
			>
				<StatusBar
					barStyle={!isDarkTheme ? "dark-content" : "light-content"}
					backgroundColor={!isDarkTheme ? colors.white : colors.blue}
				/>
				<View style={styles.row}>
					<Text
						style={{
							fontSize: 16,
							color: isDarkTheme ? colors.white : colors.text,
						}}
					>
						Dark mode
					</Text>
					<Switch
						trackColor={{ false: "#767577", true: colors.white }}
						thumbColor={isDarkTheme ? "#767577" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isDarkTheme}
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
