const form = document.getElementById('a-form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.getElementById('step-control')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.getElementById('btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-outline')
const darkModeToggle = document.getElementById('dark__mode__toggle')
const carTotalPanel = document.getElementById('car__total-panel')
const carItemPanel = document.getElementById('car__item-panel')

let step = 0
let total = 5298
let carItems = [
  {
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    amount: 1,
    picture: './item1.png',
  },
  { name: '刷色直筒牛仔褲', price: 1299, amount: 1, picture: './item2.png' },
]

//上下一步btn樣式 & step顯示
function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary') && e.target.innerHTML === '下一步') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnDisabled()
}

function setBtnDisabled() {
  if (step === 0) {
    prevBtn.setAttribute('disabled', 'disabled')
  } else {
    prevBtn.removeAttribute('disabled')
  }
  if (step === 2) {
    nextBtn.innerHTML = '確認下單'
  } else {
    nextBtn.innerHTML = '下一步'
  }
}

// 深色模式
const darkModeToggleHandler = (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
  }
}

//載入car商品
function displayCarItem(items) {
  let html = ''
  items.forEach((item) => {
    html += `
      <div class="car__item">
              <img src=${item.picture} alt="" />
              <div class="item--name">${item.name}</div>
              <div class="item--amount">
                <span class="minus">-</span>
                <span class="amount">${item.amount}</span>
                <span class="plus">+</span>
              </div>
              <div class="item--price">
                <strong>${item.price}</strong>
            </div>
          </div>
    `
  })
  carItemPanel.innerHTML = html
}

//身品數量 & 總計
function carItemAmountAndTotalPrice(event) {
  if (event.target.matches('.minus') || event.target.matches('.plus')) {
    const amountBox = event.target.parentElement.children[1]
    const itemPrice =
      event.target.parentElement.parentElement.children[3].children[0]
    let n = Number(amountBox.innerText)
    let p = Number(itemPrice.innerText)
    if (event.target.matches('.minus')) {
      console.log(n)
      if (n > 1) {
        n -= 1
        total -= p
      }
    } else {
      n += 1
      total += p
    }
    amountBox.innerText = n
    carTotalPanel.innerText = '$ ' + new Intl.NumberFormat().format(total)
  }
}

displayCarItem(carItems)
carTotalPanel.innerHTML = '$ ' + new Intl.NumberFormat().format(total)

btnControl.addEventListener('click', handleBtnControlClicked)
darkModeToggle.addEventListener('change', darkModeToggleHandler)
carItemPanel.addEventListener('click', carItemAmountAndTotalPrice)
