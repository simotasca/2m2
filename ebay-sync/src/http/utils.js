export function messagePage(message) {
  return `
    <p>${message}<p>
    <a href="/">back to home</a>
  `;
}

export function errorPage(message) {
  return `
    <b>Server Error:</b>
    <p>${message}<p>
    <a href="/">back to home</a>
  `;
}
