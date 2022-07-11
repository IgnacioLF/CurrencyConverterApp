import React, { createContext, useState } from "react";
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Home from "../screens/Home";
import Options from "../screens/Options";
import CurrencyList from "../screens/CurrencyList";
import colors from "../constants/colors";
import { ConversionContextProvider } from "../utils/ConversionContext";

const myDarkTheme = {
	...DarkTheme,
	colors: {
		primary: colors.white,
		backgound: colors.blue,
		card: colors.blue,
	},
};

const MainStack = createStackNavigator();
const MainStackScreen = () => {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<MainStack.Screen name="Options" component={Options} />
		</MainStack.Navigator>
	);
};

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
	<ModalStack.Navigator screenOptions={{ presentation: "modal" }}>
		<ModalStack.Screen
			name="Main"
			component={MainStackScreen}
			options={{ headerShown: false }}
		/>
		<MainStack.Screen
			name="CurrencyList"
			component={CurrencyList}
			options={({ navigation, route }) => ({
				title: route.params && route.params.title,
				headerLeft: null,
				headerRight: () => (
					<TouchableOpacity onPress={() => navigation.pop()}>
						<Entypo
							name="cross"
							size={30}
							color={colors.red}
							style={{ paddingHorizontal: 10 }}
						/>
					</TouchableOpacity>
				),
			})}
		/>
	</ModalStack.Navigator>
);

export const ThemeContext = createContext();

export default () => {
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	const themeData = { isDarkTheme, setIsDarkTheme };
	return (
		<ThemeContext.Provider value={themeData}>
			<NavigationContainer theme={isDarkTheme ? myDarkTheme : DefaultTheme}>
				<ConversionContextProvider>
					<ModalStackScreen />
				</ConversionContextProvider>
			</NavigationContainer>
		</ThemeContext.Provider>
	);
};
