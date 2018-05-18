import React from 'react';
import ReactDOM from 'react-dom';
import './menuCell.css';

class MenuCell extends React.Component {


   	render() {
   		return (
   			<div class="menuCell">{this.props.title}</div>
   			);
   	}
}
export default MenuCell;