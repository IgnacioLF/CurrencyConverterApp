import React, { useContext } from "react";
import {
	TouchableOpacity,
	TextInput,
	View,
	StyleSheet,
	Text,
} from "react-native";
import { ThemeContext } from "../config/Navigation";
import colors from "../constants/colors";

const darkStyles = {
	container: {
		backgroundColor: colors.white,
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 5,
		flexDirection: "row",
	},
	containerDisable: {
		backgroundColor: colors.offWhite,
	},
	button: {
		backgroundColor: colors.white,
		padding: 15,
		borderRightColor: colors.border,
		borderRightWidth: 1,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},
	buttonText: {
		fontSize: 18,
		color: colors.blue,
		fontWeight: "bold",
	},
	input: {
		flex: 1,
		padding: 10,
		color: colors.textLight,
	},
};

const lighStyles = {
	...darkStyles,
	container: {
		...darkStyles.container,
		backgroundColor: colors.blue,
	},
	button: {
		...darkStyles.button,
		backgroundColor: colors.blue,
	},
	buttonText: {
		...darkStyles.buttonText,
		color: colors.white,
	},
	input: {
		...darkStyles.input,
		color: colors.lightTextLight,
	},
	containerDisable: {
		backgroundColor: colors.lightDisable,
	},
};

export const ConversionInput = ({ text, onButtonPress, ...props }) => {
	const { isDarkTheme } = useContext(ThemeContext);
	const styles = isDarkTheme
		? StyleSheet.create(darkStyles)
		: StyleSheet.create(lighStyles);
	const containerStyles = [styles.container];
	if (props.editable === false) {
		containerStyles.push(styles.containerDisable);
	}
	return (
		<View style={containerStyles}>
			<TouchableOpacity onPress={onButtonPress} style={styles.button}>
				<Text style={styles.buttonText}>{text}</Text>
			</TouchableOpacity>
			<TextInput style={styles.input} {...props} />
		</View>
	);
};
