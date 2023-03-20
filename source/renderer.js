var calc_butt = document.getElementById('calc')
var productType = document.getElementById("products")
var outputType = document.getElementById("type-in")
var outputVal = document.getElementById("in-val")

calc_butt.addEventListener ('click', () => {
    window.calculatorAPI.sendToPython(productType.value, outputType.value, outputVal.value)
})