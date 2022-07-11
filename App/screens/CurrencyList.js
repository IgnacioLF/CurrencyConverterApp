import React, { useContext } from "react";
import { StatusBar, FlatList, View, StyleSheet } from "react-native";
import { RowItem, RowSeparator } from "../components/RowItem";
import { useSafeArea } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";
import currancies from "../data/currencies.json";
import { ConversionContext } from "../utils/ConversionContext";
import { ThemeContext } from "../config/Navigation";

const lightStyles = {
	icon: {
		width: 29,
		height: 29,
		backgroundColor: colors.white,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 15,
	},
	item: {
		backgroundColor: colors.lightBlue,
		color: colors.white,
	},
};

const darkStyles = {
	...lightStyles,
	icon: {
		...lightStyles.icon,
		backgroundColor: colors.blue,
	},
	item: {
		...lightStyles.item,
		backgroundColor: colors.white,
		color: colors.blue,
	},
};

export default ({ navigation, route }) => {
	const insets = useSafeArea();
	const params = route.params || {};
	const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } =
		useContext(ConversionContext);
	const { isDarkTheme } = useContext(ThemeContext);
	const styles = !isDarkTheme
		? StyleSheet.create(darkStyles)
		: StyleSheet.create(lightStyles);

	return (
		<View style={{ backgroundColor: colors.white }}>
			<StatusBar
				barStyle={!isDarkTheme ? "dark-content" : "light-content"}
				backgroundColor={!isDarkTheme ? colors.white : colors.blue}
			/>
			<FlatList
				style={styles.item}
				data={currancies}
				renderItem={({ item }) => {
					let selected = false;
					if (params.isBaseCurrency && item === baseCurrency) {
						selected = true;
					} else if (!params.isBaseCurrency && item === quoteCurrency) {
						selected = true;
					}
					return (
						<RowItem
							text={item}
							onPress={() => {
								if (params.isBaseCurrency) {
									setBaseCurrency(item);
								} else {
									setQuoteCurrency(item);
								}
								navigation.pop();
							}}
							rightIcon={
								selected && (
									<View style={styles.icon}>
										<Entypo
											name="check"
											size={25}
											color={isDarkTheme ? colors.blue : colors.white}
										/>
									</View>
								)
							}
						/>
					);
				}}
				keyExtractor={(item) => item}
				ItemSeparatorComponent={() => <RowSeparator />}
				ListFooterComponent={() => <View style={{ padding: insets.bottom }} />}
			/>
		</View>
	);
};
