const Promise = require('bluebird');

const plugin = (plugin, markserv, options) => {
	const preparePayload = compiledHtml => new Promise(resolve => {
		const payload = {
			statusCode: 200,
			contentType: 'text/html',
			data: compiledHtml
		};
		resolve(payload);
	});

	// main plugin function responds to a http request
	// main MUST always returns a promise
	return request => new Promise((resolve, reject) => {
		markserv.helpers.readfile(request)
		.then(preparePayload)
		.then(payload => {
			markserv.log.trace(request);
			resolve(payload);
		})
		.catch(err => {
			markserv.log.error(request +': '+ err);
			reject(err);
		});
	});
};

module.exports = {
	name: 'markserv-contrib-mod.html',
	plugin
};
