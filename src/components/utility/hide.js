export const hide = (e) =>{
  if (e.length > 0) {
    e.forEach((element) => {
      element.classList.add('hidden')
    })
  } else {
    e.classList.add('hidden')
  }
}
