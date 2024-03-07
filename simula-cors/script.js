const btnGet = document.getElementById("get")
const btnPost = document.getElementById("post")

btnGet.addEventListener('click', ()=> { 
  fetch("http://localhost:8080/feed/posts")
  .then(response => response.json())
  .then (data => console.log(data))
  .catch(error => console.log(error))
})