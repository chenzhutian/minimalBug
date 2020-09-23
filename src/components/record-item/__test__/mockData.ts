class MONEY_TYPE {
    static OUTCOME = new MONEY_TYPE('OUTCOME', '支出')
    static INCOME = new MONEY_TYPE('INCOME', '收入')
    static TRANSFER = new MONEY_TYPE('TRANSFER', '转账')

    private constructor(public readonly id: MONEY_TYPE_ID, public readonly name: string) {}
}
type MONEY_TYPE_ID = 'OUTCOME' | 'INCOME' | 'TRANSFER'
interface IMoneyCategory {
    id: number
    name: string
    parentId: number
    visible: boolean
    icon: string
    type_: MONEY_TYPE_ID

    outcome: MONEY_TYPE_ID // @deprecated
    order: number
    type: number
}
enum MONEY_SOURCE {
    MANUAL = 'MANUAL'
}
type CURRENCY_ID = 'CNY' | 'HKD' | 'USD' | 'CAD' | 'EUR' | 'GBP'
class CURRENCY {
    static CNY = new CURRENCY('CNY', '¥')
    static HKD = new CURRENCY('HKD', '$')
    static USD = new CURRENCY('USD', '$')
    static CAD = new CURRENCY('CAD', '$')
    static EUR = new CURRENCY('EUR', '€')
    static GBP = new CURRENCY('GBP', '£')
    private constructor(public readonly id: CURRENCY_ID, public readonly name: string) {}
}

interface BaseMoneyRecord {
    _id: string | null
    category: number | IMoneyCategory
    date: number
    note: string
    // to add
    source: MONEY_SOURCE
    reimbursable: boolean // only meaningful when outcome
    refunded: boolean // only meaningful when outcome

    inFundId: string | null
    inMoney: number | null
    inMoneyType: CURRENCY | CURRENCY_ID | null

    outFundId: string | null
    outMoney: number | null
    outMoneyType: CURRENCY | CURRENCY_ID | null
}

interface MoneyRecordDocument extends BaseMoneyRecord {
    _id: string
    category: number
    inMoneyType: CURRENCY_ID | null
    outMoneyType: CURRENCY_ID | null
}

export class MoneyRecordInSection {
    _id: string
    category: IMoneyCategory
    date: number
    note: string
    // to add
    source: MONEY_SOURCE
    reimbursable: boolean // only meaningful when outcome
    refunded: boolean // only meaningful when outcome

    inFundId: string | null
    inMoney: number | null
    inMoneyType: CURRENCY | null

    outFundId: string | null
    outMoney: number | null
    outMoneyType: CURRENCY | null
    label: string
    type: MONEY_TYPE

    constructor(public readonly o: MoneyRecordDocument, category: IMoneyCategory) {
        const {
            _id,
            date,
            note,
            source,
            refunded,
            reimbursable,
            inFundId,
            inMoneyType,
            inMoney,
            outMoneyType,
            outFundId,
            outMoney
        } = o
        this._id = _id as string
        this.date = date
        this.note = note
        this.source = source
        this.refunded = refunded
        this.reimbursable = reimbursable
        this.inFundId = inFundId
        this.inMoneyType = inMoneyType !== null ? CURRENCY[inMoneyType] : null
        this.inMoney = inMoney !== null ? +inMoney : null
        this.outMoney = outMoney !== null ? +outMoney : null
        this.outMoneyType = outMoneyType !== null ? CURRENCY[outMoneyType] : null
        this.outFundId = outFundId
        this.category = category as IMoneyCategory
        this.type =
            this.inFundId === null && this.outFundId !== null
                ? MONEY_TYPE.OUTCOME
                : this.inFundId !== null && this.outFundId === null
                ? MONEY_TYPE.INCOME
                : MONEY_TYPE.TRANSFER

        const moneyDate = new Date(date)
        this.label = `${moneyDate.getMonth() + 1}月${moneyDate.getDate()}日 ${note}`
    }

    clone(): MoneyRecordInSection {
        return new MoneyRecordInSection(this.o, this.category)
    }
}

export const ACC_A = '35717f3f-bb57-4f09-8da7-9dbdeda8bdee'
export const ACC_B = '35717f3f-bb57-4f09-8da7-9dbdeda8bdef'
export const records = [
    {
        _id: 'asqwerwq',
        type: MONEY_TYPE.OUTCOME.id,
        date: 1600452644474,
        category: 2,
        refunded: false,
        reimbursable: false,
        source: MONEY_SOURCE.MANUAL,
        note: '',

        inFundId: null,
        inMoneyType: null,
        inMoney: null,
        outFundId: ACC_B,
        outMoneyType: CURRENCY.CNY.id,
        outMoney: 900
    },
    {
        _id: 'qweqwe',
        type: MONEY_TYPE.INCOME.id,
        date: 1600452644474,
        category: 87,
        refunded: false,
        reimbursable: true,
        source: MONEY_SOURCE.MANUAL,
        note: '',

        inFundId: ACC_A,
        inMoneyType: CURRENCY.CNY.id,
        inMoney: 500,
        outFundId: null,
        outMoneyType: null,
        outMoney: null
    },
    {
        _id: 'zxcv',
        type: MONEY_TYPE.TRANSFER.id,
        date: 1600452644474,
        category: 55555,
        refunded: false,
        reimbursable: false,
        source: MONEY_SOURCE.MANUAL,
        note: '',

        inFundId: ACC_B,
        inMoneyType: CURRENCY.CNY.id,
        inMoney: 400,
        outFundId: ACC_A,
        outMoneyType: CURRENCY.CNY.id,
        outMoney: 400
    }
]

export const categories = [
    {
        icon: '/assets/icons/category/catering.png',
        id: 1,
        name: '餐饮',
        order: 1,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/snack_wine.png',
        id: 2,
        name: '零食烟酒',
        order: 2,
        outcome: 'OUTCOME',
        parentId: 1,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/shopping.png',
        id: 3,
        name: '购物',
        order: 3,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/house.png',
        id: 4,
        name: '住房',
        order: 4,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/traffic.png',
        id: 5,
        name: '交通',
        order: 5,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/entertainment.png',
        id: 6,
        name: '娱乐',
        order: 6,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/education.png',
        id: 7,
        name: '文教',
        order: 7,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/car.png',
        id: 8,
        name: '汽车',
        order: 8,
        outcome: 'OUTCOME',
        parentId: 0,
        type: 2,
        type_: 'OUTCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/salary.png',
        id: 80,
        name: '薪资',
        order: 1,
        outcome: 'INCOME',
        parentId: 0,
        type: 2,
        type_: 'INCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/bonus.png',
        id: 81,
        name: '奖金',
        order: 2,
        outcome: 'INCOME',
        parentId: 0,
        type: 2,
        type_: 'INCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/interestincome.png',
        id: 84,
        name: '利息收入',
        order: 5,
        outcome: 'INCOME',
        parentId: 0,
        type: 1,
        type_: 'INCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/collectinvest.png',
        id: 85,
        name: '投资回收',
        order: 6,
        outcome: 'INCOME',
        parentId: 0,
        type: 1,
        type_: 'INCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/investearn.png',
        id: 86,
        name: '投资收益',
        order: 7,
        outcome: 'INCOME',
        parentId: 0,
        type: 1,
        type_: 'INCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/refund.png',
        id: 87,
        name: '退款',
        order: 10,
        outcome: 'INCOME',
        parentId: 0,
        type: 1,
        type_: 'INCOME',
        visible: true
    },
    {
        icon: '/assets/icons/category/transfer.png',
        id: 55555,
        name: '转账',
        order: 4,
        outcome: 'TRANSFER',
        parentId: 0,
        type: 4,
        type_: 'TRANSFER',
        visible: true
    }
] as IMoneyCategory[]
