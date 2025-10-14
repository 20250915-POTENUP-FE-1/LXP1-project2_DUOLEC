const $ = (selector) => document.querySelector(selector);

$('.level-label').addEventListener('click', (e)=> {
  e.preventDefault()
  $('.level-select-area ul').classList.toggle('open-level')
  $('.level-select-area svg').classList.toggle('rotate')
})

document.querySelectorAll('.level-content').forEach((level) => {
  level.addEventListener('click',(e) => {
    let selectOption = e.target.innerText;
    $('.level-label p').innerText = selectOption;
    $('.level-label p').style.cssText = `font-size: 18px; font-weight: 500; color: #333;`
    $('.level-select-area ul').classList.remove('open-level')
    $('.level-select-area svg').classList.remove('rotate')
  })
})

$('.category-label').addEventListener('click', (e)=> {
  e.preventDefault()
  $('.category-select-area ul').classList.toggle('open-category')
  $('.category-select-area svg').classList.toggle('rotate')
})

document.querySelectorAll('.category-content').forEach((level) => {
  level.addEventListener('click',(e) => {
    let selectOption = e.target.innerText;
    $('.category-label p').innerText = selectOption;
    $('.category-label p').style.cssText = `font-size: 18px; font-weight: 500; color: #333;`
    $('.category-select-area ul').classList.remove('open-category')
    $('.category-select-area svg').classList.remove('rotate')
  })
})