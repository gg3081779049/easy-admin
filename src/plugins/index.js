import cache from './modules/cache'
import modal from './modules/modal'
import dict from './modules/dict'

export default {
    install(app) {
        app.config.globalProperties.$cache = cache
        app.config.globalProperties.$modal = modal
        app.config.globalProperties.$dict = dict
    }
}