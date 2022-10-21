const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    showPhones(data.data, dataLimit)
}

const showPhones = (phones, dataLimit) => {
    // console.log(phones)
    const phonesContainer = document.getElementById('phones-container')
    phonesContainer.textContent = '';

    const show = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        show.classList.remove('d-none')
    } else {
        show.classList.add('d-none')
    }

    const noPhone = document.getElementById('no-phone');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col')
        div.innerHTML = `
        <div class="card" style="border-radius:40px">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                    <button  onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
        </div>
        `;
        phonesContainer.appendChild(div);
    })

    spinnerSection(false);
}


const processSearch = (dataLimit) => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    loadPhones(searchText, dataLimit);
    spinnerSection(true)
}

document.getElementById('btn-src').addEventListener('click', function () {
    processSearch(10)
})

document.getElementById('input-field').addEventListener('keypress', function (e) {
    console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(10)
    }
})


const spinnerSection = (isLoading) => {
    const spinner = document.getElementById('spinners')

    if (isLoading) {
        spinner.classList.remove('d-none')
    } else {
        spinner.classList.add('d-none')
    }
}


document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})



const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}



const displayPhoneDetails = phone => {
    console.log(phone)

    const phoneDetailModal = document.getElementById('phoneDetailModalLabel');
    phoneDetailModal.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.innerHTML = `
    <p>Release date: ${phone.releaseDate ? phone.releaseDate : "No release date available"}</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage information'}</p>
    <p>Bluetooth version: ${phone.others ? phone.others.Bluetooth : 'not available'}</p>
    `
}







loadPhones('iPhone')