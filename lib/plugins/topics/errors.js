'use strict';



class TopicResponseError extends Error {

  /* istanbul ignore next */
	get name() { return 'TopicResponseError'; }

	static fromJSON(res) {
		return new TopicResponseError(res.msg);
	}

	static fromError(err) {

		if(err instanceof TypeError) {
			return new TopicResponseError('Bad implementation');
		}

		return new TopicResponseError('Internal server error');
	}

	toJSON() {
		return {
			msg: this.message,
			code: this.code
		}
	}
}




class TopicTimeoutError extends Error {
  /* istanbul ignore next */
	get name() { return 'TopicTimeoutError'; }
}





module.exports = {
	TopicResponseError,
	TopicTimeoutError
};
