// 读取根目录的CHANGELOG.md文件的内容
const fs = require('fs')
const path = require('path')
const md = fs.readFileSync(path.resolve(process.cwd(), 'CHANGELOG.md'), 'utf-8')

module.exports = [{
    url: '/mock/about/getUpdateLog',
    type: 'get',
    response() {
        let entrys = md?.split('```')[1]?.split('\r\n')?.slice(1, -1)
        return {
            code: 200,
            msg: '操作成功',
            data: entrys?.map((item, index) => {
                return {
                    id: index + 1,
                    version: item?.substring?.(0, 6)?.trim(),
                    content: item?.substring?.(6)?.trim(),
                    time: '2021-01-01'
                }
            })
        }
    }
}]