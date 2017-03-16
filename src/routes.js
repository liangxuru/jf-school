import Home from 'pages/home'
import Place from 'pages/place'
import PlaceInfo from 'pages/placeinfo'
import PlaceBook from 'pages/placebook'

export default [
	{
		path: '/home',
		name: 'home',
		component: Home
	},
	{
		path: '/place',
		name: 'place',
		component: Place
	},
	{
		path: '/placeinfo',
		name: 'placeinfo',
		component: PlaceInfo
	},
	{
		path: '/placebook',
		name: 'placebook',
		component: PlaceBook
	}
];
