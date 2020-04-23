function main() {
  const form = document.querySelector('form')
  const input = document.querySelector('input')
  const msg = document.querySelector('.msg')
  const list = document.querySelector('.ajax-section .cities')

  const apiKey = '617748615c576eaf1faca6ddba9f3e67'

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let inputVal = input.value

    const listItems = list.querySelectorAll('.ajax-section .city')
    const listItemsArray = Array.from(listItems)

    if (listItemsArray.length > 0) {
      const filteredArray = listItemsArray.filter((el) => {
        let content = ''

        if (inputVal.includes(',')) {
          if (inputVal.split(',')[1].length > 2) {
            inputVal = inputVal.split(',')[0]
            content = el
              .querySelector('.city-name span')
              .textContent.toLowerCase()
          } else {
            content = el.querySelector('.city-name').dataset.name.toLowerCase()
          }
        } else {
          content = el
            .querySelector('.city-name span')
            .textContent.toLowerCase()
        }
        return content == inputVal.toLowerCase()
      })

      if (filteredArray.length > 0) {
        msg.textContent = `Anda telah mencari cuaca untuk kota ${
          filteredArray[0].querySelector('.city-name span').textContent
        }`
        form.reset()
        input.focus()
        return
      }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { main, name, sys, weather } = data
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]['icon']}.svg`

        const li = document.createElement('div')
        li.classList.add('city', 'col', 'mb-4')
        const markup = `
                          <div class="card text-center h-100 rounded shadow">
                            <div class="card-body">
                              <h2 class="city-name my-2" data-name="${name},${sys.country}">
                                <span>${name}</span>
                                <sup>${sys.country}</sup>
                              </h2>
                              <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
                              <figure>
                                <img class="city-icon" src="${icon}">
                                <figcaption>${
                                  weather[0]['description']
                                }</figcaption>
                              </figure>
                            </div>
                          </div>
      `
        li.innerHTML = markup
        list.appendChild(li)
      })
      .catch(() => {
        msg.textContent = 'Tidak terdapat nama kota yang anda cari'
      })

    msg.textContent = ''
    form.reset()
  })
}

export default main
