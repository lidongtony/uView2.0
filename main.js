import App from './App';
import $u from '@/uni_modules/uview-ui';
import {
	createSSRApp,
} from 'vue';
import {
	setupSheep,
} from '@/sheep';

export const createApp = () => {
	const app = createSSRApp(App);
	setupSheep(app);
	return {
		app
	};
};
