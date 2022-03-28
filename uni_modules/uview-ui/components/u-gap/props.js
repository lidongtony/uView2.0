import $u from '@/uni_modules/uview-ui';
export default {
	props: {
		// 背景颜色（默认transparent）
		bgColor: {
			type: String,
			default: $u.props.gap.bgColor
		},
		// 分割槽高度，单位px（默认30）
		height: {
			type: [String, Number],
			default: $u.props.gap.height
		},
		// 与上一个组件的距离
		marginTop: {
			type: [String, Number],
			default: $u.props.gap.marginTop
		},
		// 与下一个组件的距离
		marginBottom: {
			type: [String, Number],
			default: $u.props.gap.marginBottom
		}
	}
}
