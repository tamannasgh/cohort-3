import jwt from "jsonwebtoken";

function authMiddleware(jwtSecret) {
	return function (req, res, next) {
		try {
			if (!req.headers.token) throw new Error("sign in first");
			const decodedToken = jwt.verify(req.headers.token, jwtSecret);
			req.userId = decodedToken.id;
			next();
		} catch (err) {
			res.status(403).json({ msg: err.message });
		}
	};
}

function coursePurchaseAuthHelper(token, secrets) {
	for (const secret of secrets) {
		try {
			return jwt.verify(token, secret);
		} catch (err) {
			console.log(err.message);
		}
	}
}

function coursePurchaseAuth(req, res, next) {
	try {
		if (!req.headers.token) throw new Error("sign in first");

		const decodedToken = coursePurchaseAuthHelper(req.headers.token, [
			process.env.JWT_USER_SECRET,
			process.env.JWT_ADMIN_SECRET,
		]);
		if (!decodedToken) throw new Error("token verification failed");
		req.userId = decodedToken.id;
		next();
	} catch (err) {
		res.status(403).json({ msg: err.message });
	}
}

export default authMiddleware;
export { coursePurchaseAuth };
