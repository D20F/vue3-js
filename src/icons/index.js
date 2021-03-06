import SvgIcon from '@/components/SvgIcon'// svg component
import { createApp } from 'vue'
const app = createApp({})


app.component('svg-icon', SvgIcon)


const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
