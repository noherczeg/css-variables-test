import 'core-js/es/symbol';
import 'core-js/es/array/is-array';
import 'core-js/es/array/from';
import {Component, State, Element} from '@stencil/core';
import cssVars from 'css-vars-ponyfill';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @State() primaryColor = '#5273cc';
  @State() fontSize = 14;
  @Element() el: HTMLElement;

  constructor() {
    this.onPrimaryColorChanged = this.onPrimaryColorChanged.bind(this);
    this.onFontSizeChanged = this.onFontSizeChanged.bind(this);
  }

  render() {
    return (
      <main>
        <h3>Hello, World! I'm a StencilJS component</h3>
        <section>
          <label htmlFor="primary-color">Primary Color:</label>
          <input name="primary-color" type="color" onChange={this.onPrimaryColorChanged} value={this.primaryColor} />
        </section>
        <section>
          <label htmlFor="font-size">Font Size:</label>
          <input name="font-size" type="range" min="10" max="25" value={this.fontSize} onChange={this.onFontSizeChanged} />
        </section>
        <section>
          <button type="button" class="primary">Ok</button>
          <button type="button" class="default">Cancel</button>
        </section>
      </main>
    );
  }

  onPrimaryColorChanged(event: any): void {
    this.primaryColor = event.target.value;
    this.updateViaPonyfill();
  }

  onFontSizeChanged(event: any): void {
    this.fontSize = event.target.value;
    this.updateViaPonyfill();
  }

  updateViaPonyfill() {
    cssVars({
      variables: {
        '--color-primary': this.primaryColor,
        '--font-size': `${this.fontSize}px`,
      },
      shadowDOM: true,
    });
  }

  updateStandard() {
    this.el.style.setProperty('--color-primary', this.primaryColor);
    this.el.style.setProperty('--font-size', `${this.fontSize}px`);
  }
}
