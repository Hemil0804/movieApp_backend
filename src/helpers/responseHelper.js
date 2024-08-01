// send success response
module.exports.successapi = async (res, message, status = 1, statusCode = 200, data = null, extras = null) => {
	const response = {
		meta: {
			status,
			message,
		},
		data,
		statusCode,
	};
	if (extras) {
		Object.keys(extras).forEach((key) => {
			if ({}.hasOwnProperty.call(extras, key)) {
				response.meta[key] = extras[key];
			}
		});
	}
	return res.send(response);
};

// send error response
module.exports.error = async (res, message, statusCode = 500) => {
	return res.status(statusCode).send({statusCode, message});
};