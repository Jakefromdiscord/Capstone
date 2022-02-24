const addb = document.querySelector('#addM')
const addr = document.querySelector('#addR')
const getM = document.querySelector('#getM')
const getR = document.querySelector('#getR')
const mountainName = document.querySelector('#mountain')
const resortName = document.querySelector('#Resort')
const mountainSelect = document.querySelector('mountain')
const resortSelect = document.querySelector('#resort')
const mountDis = document.querySelector('#m')
const resDis = document.querySelector('#r')
const newMountDis = document.querySelector('#want')
const newResDis = document.querySelector('#want')
const want = document.querySelector('#want')
const been = document.getElementById('have')



function getMtn(){
    mountDis.innerHTML = ' '
    const arr = []

    axios.get('http://localhost:4000/api/mountain')
        .then(res => {
            res.data.forEach(el => {
                const mountCard = `<p>${el['mountain_name']}</p>`
                mountDis.innerHTML +=mountCard
                arr.push(el['mountain_name'])
            })
            console.log(res.data)
            console.log(arr)
        })
        .catch(err => console.log(err))
}

function getHave(){
    been.innerHTML = ''

    axios.get('http://localhost:4000/api/have')
    .then(res => {
        res.data.forEach(el => {
            const haveCard = `<p>${el['have_name']}</p>`
            been.innerHTML += haveCard
        })
    })
    .catch(err => console.log(err))
}

function getWants() {
    want.innerHTML = ''
    
    axios.get('http://localhost:4000/api/want')
    .then(res => {
        console.log(res.data)
        res.data.forEach(el => {
            const wantCard = `<p class='getWants' id='${el['want_id']}'>${el['want_name']}</p>`
            want.innerHTML += wantCard
            console.log(wantCard)
        })

        // been.innerHTML = ''
        document.querySelectorAll('.getWants').forEach(el => {
            el.addEventListener('click', () => {
                const id = el.getAttribute('id')
                const name = el.innerText
                console.log(el)
                axios.put(`http://localhost:4000/api/want/${id}/${name}`)
                .then(res => {
                    res.data.forEach(el => {
                        const haveCard = `<p class='getHave'>${el['have_name']}</p>`
                        // been.innerHTML += haveCard
                    })
                })
            })
        })

        console.log(res.data)
    })

}

// function moveToHave(){
//     been.innerHTML = ''
//     document.querySelectorAll('.getWants').forEach(el => {
//         el.addEventListener('click', () => {
//             const id = el.getAttribute('id')
//             const name = el.getAttribute('name')
//             axios.put(`http://localhost:4000/api/want/${id}/${name}`)
//             .then(res => {
//                 res.data.forEach(el => {
//                     const haveCard = `<p class='getHave'>${el['have_name']}`
//                     been.innerHTML += haveCard
//                 })
//             })
//         })
//     })
// }

function getRes(){
    resDis.innerHTML = " "
    axios.get('http://localhost:4000/api/gr')
    .then(res => {
        res.data.forEach(el => {
            const resCard = `<p>${el['resort_name']}</p>`
            resDis.innerHTML += resCard
        })
        console.log(res.data)
    })
}

function createMtn(e){
    e.preventDefault()

    // const arr = []

    if(mountainName.value < 1){
        alert('you must enter a mountain name')
        return
    }

    let body = {
        mountainName: mountainName.value
    }

    axios.post('http://localhost:4000/api/create', body)
        .then(() => {
            
            mountainName.value = ''
            // arr.push(mountainName)
            getWants()
        })
        .catch(err => console.log(err))
        // console.log(arr)
}

function createRes(e){
    e.preventDefault()

    if(resortName.value < 1){
        alert('you must enter a resort')
        return
    }

    let body = {
        resortName: resortName.value
    }

    axios.post('http://localhost:4000/api/rcreate', body)
        .then(() => {
            resortName.value = ''
            getWants()
        })
        .catch(err => console.log(err))
}

// const pushMount = () =>{
//     newMountDis.innerHTML = ' '
//     const arr = []

//     axios.get('http://localhost:4000/api/pushM')
//         .then(res => {
//             res.data.forEach(el => {
//             const wantTo = `<p>${el['mountain_name']}</p>`
//             newMountDis.innerHTML += wantTo
//             arr.push(el['mountain_name'])
//             })
//             console.log(arr)
//             console.log(res.data)
//         })
//         .catch(err => console.log(err))
// }

// const pushRes = () =>{
//     newResDis.innerHTML = ' '

//     axios.get('http://localhost:4000/api/pushR')
//         .then(res => {
//             res.data.forEach(el => {
//             const wantTo = `<p>${el['resort_name']}</p>`
//             newResDis.innerHTML += wantTo})
//             console.log(res.data)
//         })
//         .catch(err => console.log(err))
// }

// getMtn()
// getRes()
getWants()
getHave()

addr.addEventListener('click', createRes)
addb.addEventListener('click', createMtn)
// addb.addEventListener('click', pushMount)
// addr.addEventListener('click', pushRes)
getM.addEventListener('click', getMtn)
getR.addEventListener('click', getRes)

