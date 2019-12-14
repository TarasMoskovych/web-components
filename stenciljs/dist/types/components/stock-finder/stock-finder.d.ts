import { EventEmitter } from "../../stencil.core";
export declare class StockFinder {
    list: {
        symbol: string;
        name: string;
    }[];
    empty: boolean;
    loading: boolean;
    nwc_symbol_selected: EventEmitter<string>;
    stockName: HTMLInputElement;
    onFindStocks(e: Event): void;
    onClear(): void;
    onSelect(symbol: string): void;
    hostData(): {
        class: string;
    };
    render(): any[];
}
