	import $u from '@/uni_modules/uview-ui';
export default {
    props: {
        // 最小可选值
        min: {
            type: [Number, String],
            default: $u.props.slider.min
        },
        // 最大可选值
        max: {
            type: [Number, String],
            default: $u.props.slider.max
        },
        // 步长，取值必须大于 0，并且可被(max - min)整除
        step: {
            type: [Number, String],
            default: $u.props.slider.step
        },
        // 当前取值
        modelValue: {
            type: [Number, String],
            default: $u.props.slider.value
        },
        // 滑块右侧已选择部分的背景色
        activeColor: {
            type: String,
            default: $u.props.slider.activeColor
        },
        // 滑块左侧未选择部分的背景色
        inactiveColor: {
            type: String,
            default: $u.props.slider.inactiveColor
        },
        // 滑块的大小，取值范围为 12 - 28
        blockSize: {
            type: [Number, String],
            default: $u.props.slider.blockSize
        },
        // 滑块的颜色
        blockColor: {
            type: String,
            default: $u.props.slider.blockColor
        },
		// 禁用状态
		disabled: {
			type: Boolean,
			default: $u.props.slider.disabled
		},
        // 是否显示当前的选择值
        showValue: {
            type: Boolean,
            default: $u.props.slider.showValue
        }
    }
}
