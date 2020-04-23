class AppBar extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `<nav class="navbar sticky-top px-4 shadow-lg" style="background-color: #f7fafc;">
      <a href="#chill-app"><span class="navbar-brand mb-0 h1" style="color: #4299e1;">Chill App</span></a>
    </nav>`
  }
}

customElements.define('app-bar', AppBar)
