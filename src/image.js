export default function makeImage(url) {
  const image = document.createElement('img')
  image.src = url
  return image
}
