import React from 'react';
import PropTypes from 'prop-types'
import {DefaultApiCallerEntrypoint} from './ApiWrapperDefaultPresentational.js'

const finishWithSlash = (base) => {
	return base.charAt(base.length-1) === '/'
		? base
		: base + '/'
}
const dontStartWithSlash = (str) => {
	return str.charAt(0) === '/'
		? str.slice(1)
		: str
}

export class ApiCaller extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			result: {}
		};
	}
	fetchData(urlRoot, urls, params){
		let apiCall = finishWithSlash(urlRoot);
		urls.forEach((url) => {
			apiCall += dontStartWithSlash(finishWithSlash(url));
		});
		if (this.state.isLoaded){
			this.setState({
				error: null,
				isLoaded: false
			});
		}
		/*  V   To refactor V                */
		if (params && params.length > 0) {
			let i = 0;
			if (params[i].string) {
				apiCall = apiCall + "?" + params[i].string;
			} else {
				apiCall = apiCall + "?" + params[i].name + "=" + params[i].value;
			}
			for (i = 1; i < params.length; i++) {
				if (params[i].string) {
					apiCall = apiCall + "&" + params[i].string;
				} else {
					apiCall = apiCall + "&" + params[i].name + "=" + params[i].value;
				}
			}
		}
		/*    ^      to refactor           ^     */
		fetch(apiCall)
		.then(
			(res) => {
				return (res.json());
			}
		)
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					error: false,
					result: result
				});
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error: error
				});
			}
		)
	}
	shouldComponentUpdate(nextProps, nextState) {
		//console.log("shouldComponentUpdate")

		if (this.props.urlRoot 	!== nextProps.urlRoot ||
			this.props.urls 	!== nextProps.urls ||
			this.props.params 	!== nextProps.params) {
			this.fetchData(nextProps.urlRoot, nextProps.urls, nextProps.params);
			return true
		}
		if (nextState.isLoaded !== this.state.isLoaded)
			return true;
		return (true);
	}
	componentWillUpdate(nextProps, nextState) {
		//	console.log("nextProps", nextProps)
		//	console.log("this.props", this.props)
		//	console.log("componentWillUpdate")
	}
	componentDidUpdate(prevProps, prevState) {
		// console.log("componentDidUpdate")
		// if (!prevState.isLoaded && this.state.isLoaded /*&& ( prevProps.symbol !== this.props.symbol || (!this.props.symbol))*/){
			//console.log("prevProps", prevProps)
			//console.log("this.props", this.props)
			//console.log("V");
		// }
//		if ((prevProps.symbol || this.props.symbol) && prevProps.symbol === this.props.symbol){
//			console.log("r");

		//	this.fetchData(prevProps.urlRoot, prevProps.urls, prevProps.params);
//		}

	}

	componentWillUnmount() {
		// console.log("componentWillUnmount")

		/* TODO : handle situation where a call has been made */		
	}
	componentDidMount() {
		const { urlRoot, urls, params } = this.props

		// console.log("didMount")
		this.fetchData(urlRoot, urls, params);
	}

	render() {
		// console.log("render");
		const { error, isLoaded, result } = this.state;

		if (error) {
			if (this.props.error){
				return this.props.error(error);
			}
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			if (this.props.loader) {
				return this.props.loader();
			}
			return <div>...loading</div>
		} else {
			if (this.props.success){
				//console.log("api caller")
				return (this.props.success(result));
			}
			return (
				<DefaultApiCallerEntrypoint result={result} maxDepth={6} currentDepth={0} urlRoot={this.props.urlRoot} urls={this.props.urls}/>
			);
		}
	}
}
ApiCaller.propTypes = {
	urlRoot:	PropTypes.string.isRequired,

	urls:		PropTypes.arrayOf(PropTypes.string),

	params:		PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				name:		PropTypes.string.isRequired,
				value:		PropTypes.any
			}),
			PropTypes.shape({
				string:		PropTypes.string.isRequired
			})
		])
	),

	success:	PropTypes.func,
	error:		PropTypes.func,
	loader:		PropTypes.func
}
