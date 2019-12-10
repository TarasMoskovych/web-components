import { Component, h, State, Element, Prop, Watch } from "@stencil/core";
import { AV_API_KEY } from '../../global/configs';

@Component({
  tag: 'nwc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {
  @Element() el: HTMLElement;

  @Prop({ mutable: true, reflect: true }) symbol: string;
  @Watch('symbol')
  symbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) { this.updateData(newValue); }
  }

  @State() data: { price: number, symbol: string } = { price: 0, symbol: '' };
  @State() inputValue: string;
  @State() isValid = false;
  @State() error: string = '';

  // initialSymbol: string;
  stockInput: HTMLInputElement;

  componentWillLoad() {
    console.log('will load hook');
  }

  componentWillUpdate() {
    console.log('will update hook');
  }

  componentDidUpdate() {
    console.log('did update hook');
    // if (this.symbol !== this.initialSymbol) {
    //   this.updateData(this.symbol);
    // }
  }

  componentDidUnload() {
    console.log('did unload hook');
  }

  componentDidLoad() {
    if (this.symbol) {
      this.updateData(this.symbol);
    }
  }

  render() {
    let content = <p>Price: ${this.data.price} {this.data.symbol}</p>;
    this.isValid = this.inputValue && this.inputValue.trim().length > 0;

    if (this.error) { content = <p>{this.error}</p>; }

    return [
      <form onSubmit={this.onFetch.bind(this)}>
        <input
          id="stock-symbol"
          type="text"
          placeholder="Type symbol"
          ref={el => this.stockInput = el}
          value={this.inputValue}
          onInput={this.onInput.bind(this)}
        />
        <button type="submit" disabled={!this.isValid}>Fetch</button>
        <button type="button" onClick={this.onClear.bind(this)}>Clear</button>
      </form>,
      <div class="content">
        {content}
      </div>
    ];
  }

  onFetch(e: Event) {
    e.preventDefault();

    // this.data.symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value || 'MSFT';
    this.data = { ...this.data, symbol: this.stockInput.value || 'MSFT' };
    this.symbol = this.data.symbol;
  }

  onInput(e: Event) {
    this.inputValue = (e.target as HTMLInputElement).value;
  }

  onClear() {
    this.inputValue = '';
    this.error = '';
    this.data = { symbol: '', price: 0 };
  }

  private fetchPrice(symbol: string) {
    this.error = '';
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${AV_API_KEY}`)
      .then(response => {
        if (response.status !== 200) { throw new Error('Invalid'); }

        return response.json();
      })
      .then(data => {
        const price = data['Global Quote'];

        if (!price) { return this.error = 'Invalid symbol!'; }

        this.data = { ...this.data, price: price['05. price'] || 0 };
      })
      .catch(err => this.error = err.message || 'Something wrong!');
  }

  private updateData(symbol: string) {
    // this.initialSymbol = symbol;
    this.data.symbol = symbol;
    this.fetchPrice(symbol);
    this.inputValue = symbol;
  }

}
