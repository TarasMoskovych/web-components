import { Component, h, Prop, State, Method } from '@stencil/core';

@Component({
  tag: 'nwc-side-drawer',
  shadow: true,
  styleUrl: './side-drawer.css'
})
export class SideDrawer {
  @State() showContactTab = false;
  @Prop({ reflect: true }) titletext = 'Default title text';
  @Prop({ reflect: true }) opened: boolean;

  @Method()
  open() {
    if (!this.opened) {
      this.opened = true;
    }
  }

  @Method()
  close() {
    if (this.opened) {
      this.opened = false;
    }
  }

  render() {
    let main = (
      <div class="contact-info">
        <h2>Contact Information</h2>
        <ul>
          <li>Phone: +123456789</li>
          <li>Email: abc@gmail.com</li>
        </ul>
      </div>
    );

    if (!this.showContactTab) { main = <slot />; }

    return [
      <div onClick={this.close.bind(this)} class="backdrop" />,
      <aside>
        <header>
          <h1>{this.titletext}</h1>
          <button onClick={this.close.bind(this)}>X</button>
        </header>
        <section class="tabs">
          <button
            class={!this.showContactTab ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'nav')}
          >Navigation</button>

          <button
            class={this.showContactTab ? 'active' : ''}
            onClick={this.onContentChange.bind(this, 'contact')}
          >Contact</button>
        </section>
        <main>
          {main}
        </main>
      </aside>
    ];
  }

  private onContentChange(content: string) {
    this.showContactTab = content === 'contact';
  }
}
