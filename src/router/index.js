import Vue from 'vue'
import Router from 'vue-router'
import routes from 'routes'

Vue.use(Router);

var router = new Router({
	history: true,
	routes,
	saveScrollPosition: true
});

router.beforeEach((to, from ,next)=>{
	if(!to.query["accountName"]){
		to.query["accountName"] = getLocalData("currentAN");
	}
	next();
});
export default router = router;