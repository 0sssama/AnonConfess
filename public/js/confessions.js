window.onload = () => {
    fetch('/confessions')
    .then(res=>res.json())
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log('unable to fetch data')
    })
}