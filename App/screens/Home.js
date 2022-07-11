import React, { useState, useContext } from "react";
import {
	View,
	StyleSheet,
	StatusBar,
	Image,
	Dimensions,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "date-fns";
import colors from "../constants/colors";
import { ConversionInput } from "../components/ConversionInput";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { ConversionContext } from "../utils/ConversionContext";
import { ThemeContext } from "../config/Navigation";

const screen = Dimensions.get("window");

const darkStyles = {
	container: {
		backgroundColor: colors.blue,
		flex: 1,
	},
	content: {
		paddingTop: screen.height * 0.1,
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
	header: {
		alignItems: "flex-end",
		marginHorizontal: 20,
		marginTop: 10,
	},
};

const lightStyles = {
	...darkStyles,
	container: {
		...darkStyles.container,
		backgroundColor: colors.white,
	},
	textHeader: {
		...darkStyles.textHeader,
		color: colors.blue,
	},
	text: {
		...darkStyles.text,
		color: colors.blue,
	},
};

export default ({ navigation }) => {
	const [value, setValue] = useState("100");
	const { baseCurrency, quoteCurrency, swapCurrencies, date, rate, isLoading } =
		useContext(ConversionContext);

	const { isDarkTheme } = useContext(ThemeContext);

	const [scrollEnable, setScrollEnable] = useState(false);

	const conversionRate = rate;
	const styles = isDarkTheme
		? StyleSheet.create(darkStyles)
		: StyleSheet.create(lightStyles);

	return (
		<View style={styles.container}>
			<ScrollView scrollEnabled={scrollEnable}>
				<StatusBar
					barStyle={isDarkTheme ? "light-content" : "dark-content"}
					backgroundColor={isDarkTheme ? colors.blue : colors.white}
				/>
				<SafeAreaView style={styles.header}>
					<TouchableOpacity onPress={() => navigation.push("Options")}>
						<Entypo
							name="cog"
							size={32}
							color={isDarkTheme ? colors.white : colors.blue}
						/>
					</TouchableOpacity>
				</SafeAreaView>
				<View style={styles.content}>
					<View style={styles.logoContainer}>
						<Image
							source={
								isDarkTheme
									? require("../assets/images/darkTheme/background.png")
									: require("../assets/images/lightTheme/background.png")
							}
							style={styles.logoBackgound}
							resizeMode="contain"
						/>
						<Image
							source={
								isDarkTheme
									? require("../assets/images/darkTheme/logo.png")
									: require("../assets/images/lightTheme/logo.png")
							}
							style={styles.logo}
							resizeMode="contain"
						/>
					</View>
					<Text style={styles.textHeader}>Currency Converter</Text>
					{isLoading ? (
						<ActivityIndicator
							color={isDarkTheme ? colors.white : colors.blue}
							size="large"
						/>
					) : (
						<>
							<ConversionInput
								text={baseCurrency}
								value={value}
								onButtonPress={() =>
									navigation.push("CurrencyList", {
										title: "Base Currency",
										isBaseCurrency: true,
									})
								}
								onChangeText={(text) => setValue(text)}
								keyboardType="numeric"
							/>
							<ConversionInput
								text={quoteCurrency}
								value={
									value && `${(parseFloat(value) * conversionRate).toFixed(2)}`
								}
								onButtonPress={() =>
									navigation.push("CurrencyList", {
										title: "Quote Currency",
										isBaseCurrency: false,
									})
								}
								editable={false}
							/>
							<Text style={styles.text}>
								{`1 ${baseCurrency} = ${conversionRate} ${quoteCurrency} as ${
									date && format(new Date(date), "MMM do, yyyy")
								}.`}
							</Text>
							<Button
								text="Reverse Currencies"
								onPress={() => swapCurrencies()}
							/>
						</>
					)}
					<KeyboardSpacer
						onToggle={(keyboardIsVisible) => setScrollEnable(keyboardIsVisible)}
					/>
				</View>
			</ScrollView>
		</View>
	);
};
