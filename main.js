import App from './App';
import {install} from '@/uni_modules/uview-ui';
import {
	createSSRApp,
} from 'vue';

export const createApp = () => {
	const app = createSSRApp(App);
	// setupSheep(app);
	return {
		app
	};
};
