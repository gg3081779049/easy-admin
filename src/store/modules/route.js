import { defineStore } from 'pinia'
import { getRoutes } from '@/api/route'
import { arrayToTree, treeToArray } from '@/utils/tree'
import { isExternal } from '@/utils/validate'

export const useRouteStore = defineStore('route', {
    state: () => ({
        treeRoutes: [],
        listRoutes: [],
    }),
    actions: {
        // 生成路由
        async generateRoutes() {
            const res = await getRoutes()
            this.treeRoutes = convertArrayToTree(res.data)
            this.listRoutes = convertTreeToArray(this.treeRoutes)
            return createRoutes(this.listRoutes)
        }
    }
})

function convertArrayToTree(list) {
    return arrayToTree(list, ({ icon, title, noCache, hidden, disabled, transition, ...node }, parentNodes) => {
        let nodes = parentNodes.concat(node)
        let path = isExternal(node.path) ? node.path : nodes.map(node => node.path).join('/')
        return {
            ...node,
            path,
            meta: { icon, title, noCache, hidden, disabled, transition }
        }
    }).filter(route => !route.parentId)
}

function convertTreeToArray(tree) {
    return treeToArray(tree, (node, parentNodes) => {
        let nodes = parentNodes.concat(node)
        return {
            ...node,
            meta: {
                ...node.meta,
                title: nodes.map(({ meta }) => meta.title),
                icon: nodes.map(({ meta }) => meta.icon),
            },
        }
    }).filter(route => !route.hasChild)
}

function createRoutes(list) {
    return list.filter(route => !isExternal(route.path)).map(route => {
        let { path, meta, component } = route
        return {
            path,
            name: path,
            meta: {
                ...meta,
                title: meta.title.at(-1),
                icon: meta.icon.at(-1)
            },
            component: async () => {
                if (isExternal(component)) {
                    let AppIframe = require('@/layout/components/AppIframe/index.vue').default
                    AppIframe.name = path
                    return <AppIframe src={component} />
                } else {
                    try {
                        let view = process.env.NODE_ENV === 'development'
                            ? require(`@/views/modules/${component}/index.vue`)
                            : await import(`@/views/modules/${component}/index.vue`)
                        view.default.name = path
                        return <view.default />
                    } catch {
                        return require(`@/views/404/index.vue`)
                    }
                }
            }
        }
    })
}
