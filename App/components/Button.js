import React, { useContext } from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../config/Navigation";
import colors from "../constants/colors";

const darkStyles = {
	button: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: 20,
	},
	buttonIcon: {
		width: 20,
		height: 20,
		marginRight: 10,
	},
	buttonText: {
		color: colors.white,
		fontSize: 16,
	},
};

const lightStyles = {
	...darkStyles,
	buttonText: {
		...darkStyles.buttonText,
		color: colors.blue,
	},
};

export const Button = ({ onPress, text }) => {
	const { isDarkTheme } = useContext(ThemeContext);
	const styles = isDarkTheme
		? StyleSheet.create(darkStyles)
		: StyleSheet.create(lightStyles);
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Image
				source={
					isDarkTheme
						? require("../assets/images/darkTheme/reverse.png")
						: require("../assets/images/lightTheme/reverse.png")
				}
				style={styles.buttonIcon}
				resizeMode="contain"
			/>
			<Text style={styles.buttonText}>{text}</Text>
		</TouchableOpacity>
	);
};
