const bankInstCode = '';
async function getBankInstCode() {
    try {
        let xml = new XMLHttpRequest();

        xml.onreadystatechange = function (event) {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.response);
            }
        }
        xml.open("GET", "https://localhost:5001/api/suntrust/idh/get-transactions");
        xml.setRequestHeader("Access-Control-Allow-Origin", "*")
        xml.send();
        // const myHeaders = new Headers();
        // myHeaders.append('Access-Control-Allow-Origin', '*');

        // const myInit = {
        //     headers: myHeaders,
        // }
        // let response = await fetch('http://localhost:5000/api/suntrust/idh/get-transactions', myInit);
        // let data = await response.json();
        // console.log(data);
    } catch (err) {
        console.log(err)
    }
}
getBankInstCode();