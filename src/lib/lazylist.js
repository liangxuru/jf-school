// 等待多个异步方法执行完毕后执行某个方法
export default function lazylist(list){
	return Promise.all(list);
}