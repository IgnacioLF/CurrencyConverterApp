import React from "react";
import { StatusBar, FlatList, View, StyleSheet } from "react-native";
import { RowItem, RowSeparator } from "../components/RowItem";
import { useSafeArea } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

import colors from "../constants/colors";
import currancies from "../data/currencies.json";

const styles = StyleSheet.create({
	icon: {
		width: 30,
		height: 30,
		backgroundColor: colors.blue,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 15,
	},
});

export default ({ navigation, route }) => {
	const insets = useSafeArea();
	const params = route.params || {};

	return (
		<View style={{ backgroundColor: colors.white }}>
			<StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
			<FlatList
				data={currancies}
				renderItem={({ item }) => {
					const selected = params.activeCurrency === item;
					return (
						<RowItem
							text={item}
							onPress={() => navigation.push("Home")}
							rightIcon={
								selected && (
									<View style={styles.icon}>
										<Entypo name="check" size={20} color={colors.white} />
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
