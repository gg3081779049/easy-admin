export default {
    // 文字复制剪贴
    mounted(el, { value, instance }) {
        el.addEventListener('click', async () => {
            await navigator.clipboard.writeText(value)
            instance.$modal.message.success(instance.$t('message.copied'))
        })
    }
}