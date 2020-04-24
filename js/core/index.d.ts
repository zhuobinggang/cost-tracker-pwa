import {TodayCostItem, PercentMap, DateCostMap} from '../types/index';

export function getAnalysis(costItems: TodayCostItem[]): PercentMap;
export function getAnalysisInDate(date: string | Date): Promise<PercentMap>;
export function totalCost(costItems: TodayCostItem[]): number;
export function getTotalCostInDate(date: string | Date): Promise<number>;
export function getMonthlyAnalysis(date: string | Date): Promise<DateCostMap>;
export function getWeeklyAnalysis(date: string | Date): Promise<DateCostMap>;
export function getCostListInDate(date: string | Date): Promise<Array<TodayCostItem>>;
export function dateFormatted(date: string | Date): string;
export function dateToDate(date: Date | string, offset: number): string;
export function getIsFirstTimeEnterApp(): Promise<boolean>;
export function exitNarrativeMode(): Promise<void>;