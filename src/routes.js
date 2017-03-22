import Home from 'pages/home'
import Place from 'pages/place'
import PlaceInfo from 'pages/placeinfo'
import PlaceBook from 'pages/placebook'
import PlaceOrder from 'pages/placeorder'
// import Success from 'pages/success'

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
	},
	{
		path: '/placeorder',
		name: 'placeorder',
		components: PlaceOrder
	},
	{
		path: '/success',
		components: resolve => require(['pages/Success.vue'], resolve)
	}
];