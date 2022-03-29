const files =
	import.meta.globEager('./*.js')
let apis = {}
Object.keys(files).forEach((key) => {
	apis = {
		...apis,
		[key.replace(/(.*\/)*([^.]+).*/ig, "$2")]: files[key].default,
	}
})
export default apis
