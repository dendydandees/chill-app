class ContentBanner extends HTMLElement {
  connectedCallback() {
    this.render()
  }

  render(){
    this.innerHTML = `<div class="jumbotron">
  <div class="container">
    <h1>Mau Chill ?<br>Tapi Ragu Akan Cuaca ?</h1>
    <p class="lead my-3">Jangan sampai cuaca mengganggu waktumu untuk chill</p>
  </div>
</div>`
  }
}

customElements.define('content-banner', ContentBanner)
