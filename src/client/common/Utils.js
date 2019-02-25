import _ from 'lodash';

const Utils = {
	cloneDeep: subject => _.cloneDeep(subject),
	sumArrayValues: (array = []) => array.push(0) && array.reduce((accumulator, number) => (parseFloat(accumulator) || 0) + (parseFloat(number) || 0)),
	round: (number, decimals = 0) => {
		const divider = Math.pow(10, decimals);
		return Math.round(number * divider) / divider;
	},
};

export default Utils;
