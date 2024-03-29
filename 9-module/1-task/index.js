export default function promiseClick(button) {
  
  return new Promise(resolve => 
    button.onclick = event => resolve(event));
}
