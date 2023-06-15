import { defineStore } from "pinia";
import { getList } from "../server";
import type { RootObject, Children, ChinaAdd, ChinaTotal, StatisGradeCityDetail } from './type'

export const useStore = defineStore({
    id: 'counter',
    state: () => ({
        list: <RootObject>{},
        item: <Children[]>[],
        chinaAdd: <ChinaAdd>{},
        chianTotal: <ChinaTotal>{},
        cityDetail: <StatisGradeCityDetail[]>[]
    }),
    actions: {
        async getList() {
            this.list = await getList()
            this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd
            this.chianTotal = this.list.diseaseh5Shelf.chinaTotal
            this.cityDetail = this.list.statisGradeCityDetail.slice(0, 10)
        }
    }
})