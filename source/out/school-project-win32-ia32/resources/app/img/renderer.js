var calc_butt = document.getElementById('calc')
var typeInput = document.getElementById("products")
calc_butt.addEventListener('click', () => {
    var type = typeInput.value
    console.log(type)
    window.electronAPI.sendToPython(type)
})