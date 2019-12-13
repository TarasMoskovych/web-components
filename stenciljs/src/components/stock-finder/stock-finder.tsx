import { Component, h, State, Event, EventEmitter } from "@stencil/core";

import { AV_API_KEY } from "../../global/configs";

@Component({
  tag: 'nwc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  @State() list: { symbol: string, name: string }[] = [];
  @State() empty = false;
  @State() loading = false;
  @Event({ bubbles: true, composed: true }) nwc_symbol_selected: EventEmitter<string>;

  stockName: HTMLInputElement;

  onFindStocks(e: Event) {
    e.preventDefault();

    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.stockName.value}&apikey=${AV_API_KEY}`)
      .then(res => res.json())
      .then(res => {
        const list = res['bestMatches'];
        if (list.length === 0) { return this.empty = true; }

        this.list = list.map(element => {
          return { name: element['2. name'], symbol: element['1. symbol'] };
        });
      })
      .catch(e => console.log(e))
      .then(() => this.loading = false);
  }

  onClear() {
    this.stockName.value = '';
    this.list = [];
    this.empty = false;
  }

  onSelect(symbol: string) {
    this.nwc_symbol_selected.emit(symbol);
  }

  hostData() {
    return { class: this.empty ? 'error' : '' };
  }

  render() {
    let content = (
      <ul>
        {this.list.map(result => (
          <li onClick={this.onSelect.bind(this, result.symbol)}>
            <strong>{result.symbol}</strong>: {result.name}
          </li>
        ))}
      </ul>
    );

    if (this.empty) { content = (<p>Your search does not match any results</p>); }
    if (this.loading) { content = <nwc-spinner color="purple"/>; }

    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input
          id="stock-company"
          type="text"
          placeholder="Type a company"
          ref={el => this.stockName = el}
        />
        <button type="submit" disabled={this.loading} >Find</button>
        <button type="button" onClick={this.onClear.bind(this)}>Clear</button>
      </form>,
      <div>{content}</div>
    ];
  }
}
