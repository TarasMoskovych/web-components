import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: 'nwc-spinner',
  styleUrl: './spinner.css',
  shadow: true
})
export class Spinner {
  @Prop({ reflect: true }) color: string = 'black';

  render() {
    return <div class="loader" style={{color: this.color}}>Loading...</div>
  }
}
