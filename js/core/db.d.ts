import {TodayCostItem} from '../types'

export function save(item: TodayCostItem): Promise;
export function readAllCostToday(): Promise<TodayCostItem[]>;
export function readAllCostInDate(date: Date): Promise<TodayCostItem[]>;
export function emptyAll(): void;
export function dateFormatted(date: string | Date): string;
export function getIsFirstTimeEnterApp(): Promise<boolean>;
export function exitNarrativeMode(): Promise<void>;

export default db;