import validationResultApi from "express-validator";

const { validationResult } = validationResultApi;
export default (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array());
	}

	next();
};
