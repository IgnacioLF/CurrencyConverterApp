import React, { useContext } from "react";
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Dimensions,
} from "react-native";
import { ThemeContext } from "../config/Navigation";
import colors from "../constants/colors";

const darkStyles = {
	row: {
		height: 50,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 16,
		color: colors.white,
		fontWeight: "bold",
	},
	separator: {
		backgroundColor: colors.blue,
		height: StyleSheet.hairlineWidth * 5,
		width: Dimensions.get("window").width,
	},
};

const lightStyles = {
	...darkStyles,
	text: {
		...darkStyles.text,
		color: colors.blue,
	},
	separator: {
		...darkStyles.separator,
		backgroundColor: colors.white,
	},
};

export const RowItem = ({ rightIcon, text, onPress }) => {
	const { isDarkTheme } = useContext(ThemeContext);
	const styles = isDarkTheme
		? StyleSheet.create(darkStyles)
		: StyleSheet.create(lightStyles);
	return (
		<TouchableOpacity style={styles.row} onPress={onPress}>
			<Text style={styles.text}>{text}</Text>
			{rightIcon}
		</TouchableOpacity>
	);
};

export const RowSeparator = () => {
	const { isDarkTheme } = useContext(ThemeContext);
	const styles = !isDarkTheme
		? StyleSheet.create(darkStyles)
		: StyleSheet.create(lightStyles);
	return <View style={styles.separator} />;
};
