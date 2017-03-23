'use strict';




class MethodResponseError extends Error {
	get name() { return 'MethodResponseError'; }

	static fromJSON(res) {
		return new MethodResponseError(res.msg);
	}

	static fromError(err) {

		if(err instanceof TypeError) {
			return new MethodResponseError('Bad implementation');
		}

		return new MethodResponseError('Internal server error');
	}

	toJSON() {
		return {
			msg: this.message,
			code: this.code
		}
	}
}




class MethodTimeoutError extends Error {
	get name() { return 'MethodTimeoutError'; }
}





module.exports = {
	MethodResponseError,
	MethodTimeoutError
};
