import React from 'react';

const Alert = ({ message, type }) => {
	return (
		<div id="alert" className={`message ${type}`}>
			{message}
		</div>
	)
}


export default Alert;
