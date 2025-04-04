module.exports = [{
    url: '/mock/getDict',
    type: 'post',
    response(req) {
        const { keys, locales } = req.body
        return {
            code: 200,
            data: locales.reduce((acc, locale) => {
                acc[locale] = keys.reduce((locale, key) => {
                    locale[key] = Array.from({
                        length: Math.floor(Math.random() * 10) + 1
                    }).map((_, i) => {
                        return {
                            label: `label-${key}-${i}`,
                            value: `value-${key}-${i}`
                        }
                    })
                    return locale
                }, {})
                return acc
            }, {})
        }
    }
}]