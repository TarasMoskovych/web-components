export declare class StockPrice {
    el: HTMLElement;
    symbol: string;
    symbolChanged(newValue: string, oldValue: string): void;
    data: {
        price: number;
        symbol: string;
    };
    inputValue: string;
    isValid: boolean;
    error: string;
    loading: boolean;
    stockInput: HTMLInputElement;
    onSymbolSelected(e: CustomEvent): void;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    componentDidLoad(): void;
    hostData(): {
        class: string;
    };
    render(): any[];
    onFetch(e: Event): void;
    onInput(e: Event): void;
    onClear(): void;
    private fetchPrice;
    private updateData;
}
