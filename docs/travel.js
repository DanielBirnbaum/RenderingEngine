console.log("travel start");


let Flight = function (flight_num, destination, price) {
    this.flight_num = flight_num;
    this.destination = destination;
    this.price = price;
}
let destinations = [
    new Flight(4, "Budapest", 350),
    new Flight(5, "NewYork", 1200),
    new Flight(6, "Venice", 250),
    new Flight(7, "London", 550),
    new Flight(8, "Toronto", 1300),
    new Flight(9, "Berlen", 400),
]
let flightsTemplate = "<tr><td>{{flight_num}}</td><td>{{destination}}</td><td>{{price}}</td></tr>"
let ordersTemplate = "<tr><td>{{num_order}}</td><td>{{name}}</td><td>{{passport}}</td><td>{{destination_order}}</td><td>{{passengers}}</td><td>{{total}}</td></tr>"

function renderingEngine(template, data) {
    let arr = template.split('{{')
    console.log(arr)
    for (let index = 1; index < arr.length; index++) {
        let element = arr[index].split('}}');
        arr[index] = data[element[0]] + element[1]
    }
    return arr.join('');
}



function arrayRendering(array, typeTemplate, myClassString) {
    console.log("array :" + array);

    let tdDestination = document.querySelector(myClassString)
    array.forEach(element => {
        tdDestination.innerHTML += renderingEngine(typeTemplate, element)
    });
}
arrayRendering(destinations, flightsTemplate, ".destination tbody")




let orders = []
let customer = []

let destinationSearch = []




try {
    console.log("add order")


    let num_order = 0
    function send() {
        console.log("function send start")
        let name = document.getElementById('name').value;
        let passport = document.getElementById('passport').value;
        let flight_order = document.getElementById('flight_order').value;
        let passengers = document.getElementById('passengers').value;
        let getInfo = matchInfo(flight_order, passengers);
        console.log(getInfo)
        let destination_order = getInfo[0];
        let total = getInfo[1];
        num_order++
        orders.push({ num_order, name, passport, destination_order, passengers, total })
        console.log("Order completed: ", num_order, " ", destination_order, " ", total)
        console.log(orders)
        arrayRendering([{ num_order, name, passport, destination_order, passengers, total }], ordersTemplate, ".display-order tbody")
        newRow = []
        document.getElementById('name').value = null;
        document.getElementById('passport').value = null;
        document.getElementById('flight_order').value = null;
        document.getElementById('passengers').value = null;
        console.log("function send end")
    }

} catch (error) {
    console.log("function send error", error)
}

try {
    function matchInfo(flight_order, passengers) {
        console.log("matchInfo start")
        let my_destination, my_total
        destinations.forEach(info => {
            if (info.flight_num == flight_order) {
                my_destination = info.destination
                my_total = info.price * passengers
                console.log("matchInfo end")
            }
        });
        return [my_destination, my_total]
    }
} catch (error) {
    console.log("function matchInfo error", error)

}


try {
    function find() {
        let totalCash = 0
        console.log("find start")
        document.querySelector('.customer-select tbody').innerHTML = ""
        let search = document.getElementById('your-name').value;
        orders.forEach(element => {
            if (element.name == search) {
                customer.push(element)
                totalCash += element.total;
                arrayRendering([element], ordersTemplate, ".customer-select tbody")
                sum(".total-customer", totalCash)

            }
        });
        customer = []
        document.getElementById('your-name').value = null;


        console.log("find end")
    }
} catch (error) {
    console.log("find error", error)

}

try {
    function select() {
        let totalPas = 0
        let totalCash = 0
        document.querySelector('.agent-select tbody').innerHTML = ""

        console.log("select start")
        let search = document.getElementById('destination').value;
        console.log(search)

        orders.forEach(element => {
            if (element.destination_order == search) {
                destinationSearch.push(element)
                console.log(destinationSearch)
                arrayRendering([element], ordersTemplate, ".agent-select tbody")
                totalPas += (element.passengers * 1);
                console.log(totalPas)
                totalCash += element.total;
                sum(".totel-passengers", totalPas)
                sum(".total-orders", totalCash)

            }
        });
        destinationSearch = []



        console.log("select end")
    }
} catch (error) {

}

try {
    function sum(claas, item) {
        console.log("sum  start")
        let dbSearch = document.querySelector(claas)
        let tbodyTemplate = item

        dbSearch.innerHTML = tbodyTemplate;
        console.log("sum end")
    }
} catch (error) {
    console.log("sum error", error)
}



