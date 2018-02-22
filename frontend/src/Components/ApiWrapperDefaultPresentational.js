import {ApiCaller} from './ApiWrapper.js'
import React from 'react';

export const DefaultApiCallerEntrypoint = (props) => {
	return (
		<DefaultApiCallerDispatcher result={props.result} maxDepth={8} currentDepth={0} urlRoot={props.urlRoot} />
	);
}


export const TestClassWrapper = (props) => {
	const urlRoot = "https://swapi.co/api/";
	const urls = ["films"];
	return (
		<ApiCaller 
			urlRoot={urlRoot} 
			urls={urls}
		/>
	);
}

const DefaultApiCallerDispatcher = (props) => {
	if (props.currentDepth > props.maxDepth)
		return <DefaultApiCallerText isMaxDepth />;
	if (props.result === null) {
		return <DefaultApiCallerText isNull />;
	}
	if (!!props.result && props.result.constructor === Array){
		return (
			<DefaultApiCallerList 
				results={props.result} ordered
				urlRoot={props.urlRoot}
				maxDepth={props.maxDepth}
				currentDepth={props.currentDepth} />
		);
	}
	let ret = [];
	if (!(typeof props.result === 'string' || props.result instanceof String)){
		for (let key in props.result) {
			if (props.result.hasOwnProperty(key)) {
				ret.push({key: key, value: props.result[key]});
			}
		}
	}
	if (ret.length !== 0){
		return (
			<DefaultApiCallerListObject
				results={ret}
				urlRoot={props.urlRoot}
				maxDepth={props.maxDepth}
				currentDepth={props.currentDepth}
			/>
		);
	}
	else {
		return (<DefaultApiCallerText text={props.result} urlRoot={props.urlRoot}></DefaultApiCallerText>);
	}
}

const DefaultApiCallerText = ({text, urlRoot, isMaxDepth, isNull}) => {
	if (isMaxDepth){
		return <DefaultApiCallerText text="Sorry, we are at max" />;
	}
	if (text === null || isNull){
		return <DefaultApiCallerText text="(null)" />;
	} else if (text === undefined){
		return <DefaultApiCallerText text='(undefined)' />;
	}
	return <span>{text}</span>;
}

const DefaultApiCallerList = (props) => {
	const List = "ol";
	const ListItem = "li";

	return (
		<List>
			{
				props.results.map(
					(item, i) => {
						return (
							<ListItem key={/*item.toString() + '_'*/ + i }>
								<DefaultApiCallerDispatcher
									result={item} 
									maxDepth={props.maxDepth} 
									currentDepth={props.currentDepth + 1} 
									urlRoot={props.urlRoot}
								/>
							</ListItem>
						);
					}
				)
			}
		</List>
	);
}

const DefaultApiCallerObject = (props) => {
	return (
		<div>
			{props.result.key}:
			<DefaultApiCallerDispatcher 
				result={props.result.value} 
				maxDepth={props.maxDepth} 
				currentDepth={props.currentDepth + 1} 
				urlRoot={props.urlRoot}
			/>
		</div>
	);
}

const DefaultApiCallerListObject = (props) => {
	const List = "ul";
	const ListItem = "li";

	if (props.results.length === 0){
		return <DefaultApiCallerText text="(empty)" />
	}
	return (
		<List>
			{
				props.results.map(
					(item, i) => {
						return (
							<ListItem key={item.key}>
								<DefaultApiCallerObject 
									result={item} 
									maxDepth={props.maxDepth} 
									currentDepth={props.currentDepth} 
									urlRoot={props.urlRoot}
								/>
							</ListItem>
						);
					}
				)
			}
		</List>
	);
}