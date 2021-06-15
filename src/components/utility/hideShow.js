export const hide = (e) =>{
  if (e.length > 0) {
    e.forEach((element) => {
      element.classList.add('hidden')
    })
  } else {
    e.classList.add('hidden')
  }
}

export const show = (e) => {
  if (e.length > 0) {
    e.forEach((element) => {
      element.classList.remove('hidden')
    })
  } else {
    e.classList.remove('hidden')
  }
}
