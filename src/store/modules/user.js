import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getInfo } from '@/api/login'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: getToken(),
        name: '',
        nickname: '',
        avatar: '',
        roles: [],
        permissions: []
    }),
    actions: {
        // 登录
        async login(userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            const res = await login(username, password, code, uuid)
            setToken(this.token = res.token)
        },
        // 退出系统
        async logout() {
            await logout(this.token)
            this.$patch(state => {
                state.token = ''
                state.name = ''
                state.nickname = ''
                state.avatar = ''
                state.roles = []
                state.permissions = []
            })
            removeToken()
        },
        // 获取用户信息
        async getInfo() {
            const res = await getInfo()
            const user = res.user
            this.$patch(state => {
                state.name = user.username
                state.nickname = user.nickname
                state.avatar = user.avatar
                if (res.roles instanceof Array) state.roles = res.roles
                if (res.permissions instanceof Array) state.permissions = res.permissions
            })
            return res
        }
    }
})