import path from 'path'
import simulate from 'miniprogram-simulate'

import { records, categories, ACC_A, MoneyRecordInSection } from './mockData'

describe('components/record-list-collapse', () => {
    let id: string
    beforeAll(() => {
        console.log(path.join(__dirname, '../../../'))
        id = simulate.load(path.join(__dirname, '../index'), {
            rootPath: path.join(__dirname, '../../../')
        })
    })

    test('should render more for a record with category 87', () => {
        const comp = simulate.render(id, {
            records: records
                .map((r) => new MoneyRecordInSection(r, categories.find((c) => c.id === r.category)!))
                .find((c) => c.category.id === 87)!
        })

        const parent = document.createElement('parent-wrapper') // 创建父亲节点
        comp.attach(parent) // attach 到父亲节点上，此时会触发自定义组件的 attached 钩子

        expect(comp.toJSON()).toMatchSnapshot()
        expect(comp.querySelector('.reimburst-label')).toBeTruthy()
    })
})
