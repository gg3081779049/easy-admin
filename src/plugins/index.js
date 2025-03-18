import cache from './modules/cache'
import modal from './modules/modal'

export default {
    install(app) {
        app.config.globalProperties.$cache = cache
        app.config.globalProperties.$modal = modal
    }
}