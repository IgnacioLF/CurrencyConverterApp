import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { api } from "./api";
import { format } from "date-fns";

export const ConversionContext = createContext();

const DEFAULT_BASE_CURRENCY = "EUR";
const DEFAULT_BASE_QUOTECURRENCY = "USD";

export const ConversionContextProvider = ({ children }) => {
	const [baseCurrency, _setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY);
	const [quoteCurrency, setQuoteCurrency] = useState(
		DEFAULT_BASE_QUOTECURRENCY
	);
	const [date, setDate] = useState();
	const [rate, setRate] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const setBaseCurrency = (currency) => {
		setIsLoading(true);
		return api(
			`https://api.apilayer.com/exchangerates_data/convert?to=${quoteCurrency}&from=${currency}&amount=1`
		)
			.then((response) => response.json())
			.then((result) => {
				_setBaseCurrency(currency);
				setDate(format(new Date(), "yyyy-MM-dd"));
				setRate(result.result);
				setIsLoading(false);
			})
			.catch((error) => {
				Alert.alert("Sorry something went wrong", "Try to reload the app");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const swapCurrencies = () => {
		setBaseCurrency(quoteCurrency);
		setQuoteCurrency(baseCurrency);
	};

	const contextValue = {
		baseCurrency,
		quoteCurrency,
		swapCurrencies,
		setBaseCurrency,
		setQuoteCurrency,
		date,
		rate,
		isLoading,
	};

	useEffect(() => {
		setBaseCurrency(DEFAULT_BASE_CURRENCY);
	}, []);

	return (
		<ConversionContext.Provider value={contextValue}>
			{children}
		</ConversionContext.Provider>
	);
};
