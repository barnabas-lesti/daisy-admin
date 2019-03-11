import config from './config';

const PREFIX = '[Daisy]';

/**
 * Client side logger.
 */
class Logger {
	constructor () {
		this.console = console;
	}

	/**
	 * Info level logger.
	 *
	 * @param  {...any} args Log arguments
	 * @returns {void}
	 */
	info (...args) {
		this._log('info', ...args);
	}

	/**
	 * Error level logger.
	 *
	 * @param  {...any} args Log arguments
	 * @returns {void}
	 */
	error (...args) {
		this._log('error', ...args);
	}

	/**
	 * Warning level logger.
	 *
	 * @param  {...any} args Log arguments
	 * @returns {void}
	 */
	warn (...args) {
		this._log('warn', ...args);
	}

	/**
	 * Base log handler.
	 *
	 * @param {'error'|'info'|'warn'} type Log severity
	 * @param  {...any} args Log arguments
	 * @returns {void}
	 */
	_log (type, ...[ firstArg, ...restOfTheArgs ]) {
		const prefixedArgs = [`${PREFIX} ${firstArg}`, ...restOfTheArgs];
		if (!config.IS_PRODUCTION) {
			switch (type) {
			case 'error':
				this.console.error(...prefixedArgs);
				break;
			case 'info':
				this.console.info(...prefixedArgs);
				break;
			default:
				this.console.warn(...prefixedArgs);
			}
		}
	}
}

const logger = new Logger();
export default logger;
