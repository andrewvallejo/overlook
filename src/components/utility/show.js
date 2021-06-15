export const show = (e) => {
  if (e.length > 0) {
    e.forEach((element) => {
      element.classList.remove('hidden')
    })
  } else {
    e.classList.remove('hidden')
  }
}
