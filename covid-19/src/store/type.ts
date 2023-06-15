export interface ShowAddSwitch {
	all: boolean;
	confirm: boolean;
	nowConfirm: boolean;
	importedCase: boolean;
	localinfeciton: boolean;
	suspect: boolean;
	dead: boolean;
	heal: boolean;
	nowSevere: boolean;
	noInfect: boolean;
	localConfirm: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	adcode: string;
	dead: number;
	showHeal: boolean;
	wzz: number;
	provinceLocalConfirm: number;
	nowConfirm: number;
	confirm: number;
	continueDayZeroLocalConfirmAdd: number;
	showRate: boolean;
	mediumRiskAreaNum: number;
	mtime: string;
	heal: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
}

export interface Today {
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
}

export interface Total {
	nowConfirm: number;
	heal: number;
	showHeal: boolean;
	continueDayZeroConfirmAdd: number;
	continueDayZeroLocalConfirmAdd: number;
	confirm: number;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	wzz: number;
	mtime: string;
	dead: number;
	showRate: boolean;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	adcode: string;
}

export interface Today {
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
	confirm: number;
}

export interface Total {
	showRate: boolean;
	wzz: number;
	mediumRiskAreaNum: number;
	highRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	nowConfirm: number;
	confirm: number;
	dead: number;
	provinceLocalConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	showHeal: boolean;
	adcode: string;
	heal: number;
}

export interface Children {
	today: Today;
	total: Total;
	name: string;
	adcode: string;
	date: string;
}

export interface Children {
	adcode: string;
	date: string;
	today: Today;
	total: Total;
	children: Children[];
	name: string;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	heal: number;
	importedCase: number;
	showlocalinfeciton: number;
	noInfectH5: number;
	confirmAdd: number;
	deadAdd: number;
	highRiskAreaNum: number;
	nowConfirm: number;
	mRiskTime: string;
	nowLocalWzz: number;
	mtime: string;
	localConfirmAdd: number;
	confirm: number;
	dead: number;
	suspect: number;
	localConfirmH5: number;
	local_acc_confirm: number;
	localConfirm: number;
	nowSevere: number;
	noInfect: number;
	showLocalConfirm: number;
	localWzzAdd: number;
	mediumRiskAreaNum: number;
}

export interface ChinaAdd {
	confirm: number;
	heal: number;
	dead: number;
	suspect: number;
	noInfect: number;
	nowConfirm: number;
	nowSevere: number;
	importedCase: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
}

export interface Diseaseh5Shelf {
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
}

export interface StatisGradeCityDetail {
	grade: string;
	mtime: string;
	syear: number;
	city: string;
	nowConfirm: number;
	heal: number;
	dead: number;
	date: string;
	sdate: string;
	wzz_add: string;
	province: string;
	confirmAdd: number;
	confirm: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}