var myHeaders = new Headers();
myHeaders.append("apikey", "9sI3MsgjV1mQr3gWnquC9pcv1BjUhpJV");

var requestOptions = {
	method: "GET",
	redirect: "follow",
	headers: myHeaders,
};

export const api = (_path = "") => {
	if (_path.length === 0) {
		return Promise.reject(new Error("Path is required."));
	}
	return fetch(_path, requestOptions);
};
