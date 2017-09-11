import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { bind, memoize, debounce } from 'decko';
import style from './style.scss';

export default class ExpandChevron extends Component {
	render({size, thickness, expanded}, {}) {
		return <svg className={`expand-chevron ${expanded ? 'expanded' : ''}`} width={size} height={size}
					viewBox="0 0 1 1" version="1.1"
					xmlns="http://www.w3.org/2000/svg">

			<polyline  points="0.35 0.15 0.75 0.5 0.35 0.85"
					   stroke-linecap="round" stroke-linejoin="round"
					   stroke="black" stroke-width={0.1*thickness}
					   fill="none"/>
		</svg>
	}
}
export { ExpandChevron }

ExpandChevron.defaultProps = {
	expanded: true,
	size: 10,
	thickness: 1,
};

ExpandChevron.propTypes = {
	// required
	expanded: PropTypes.bool,
	size: PropTypes.number,
	thickness: PropTypes.number,
}


