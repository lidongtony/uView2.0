import {
	createStore
} from "vuex";

// 自动注入所有
const files =
	import.meta.globEager('./modules/*.js')
let modules = {}
Object.keys(files).forEach((key) => {
	modules = {
		...modules,
		[key.replace(/(.*\/)*([^.]+).*/ig, "$2")]: files[key].default,
	}
})
const store = createStore({
	modules
})
export function setupStore(app) {
	app.use(store);
}
export default store
