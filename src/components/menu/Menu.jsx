import React from 'react';
import ReactDOM from 'react-dom';
import MenuCell from './MenuCell.jsx';

class Menu extends React.Component {

	
   render() {
     return (
     	<div className="menuList">
       		<MenuCell title="首页" />
       		<MenuCell title="记录" />
       		<MenuCell title="游戏" />
       </div>
     );
   }
 }
 export default Menu;