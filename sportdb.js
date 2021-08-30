const loadsportsname = name => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    inputField.value = '';
    if (inputText == '') {
        console.log('found');
        const displadetailError = document.getElementById('display-details');
        const paraGraph = document.createElement('p');
        paraGraph.innerText = 'Please Write Something relevent to Sports Team';
        displadetailError.appendChild(paraGraph);
    }
    else {
        const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchTeam(data.teams))
    }

}

const displaySearchTeam = teams => {
    console.log(teams)
    const displayId = document.getElementById('display');
    displayId.textContent = '';
    if (teams == null) {
        console.log('no result found')
        const p = document.createElement('p');
        p.classList.add('text-center', 'rounded-3', 'text-white', 'bg-danger', 'mx-auto')
        p.innerText = 'Please Write a valid Team Name';
        displayId.appendChild(p);
    }
    else {
        teams.forEach(team => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                    <div onclick="dispalydetails('${team.idTeam}')" class="card">
                        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${team.strTeam}</h5>
                            <p class="card-text">${team.strDescriptionEN}</p>
                        </div>
                    </div>
                `;
            displayId.appendChild(div);
        })
    }
}

const dispalydetails = teamId => {
    console.log(teamId);
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.teams[0]))
}

const displayDetails = team => {
    console.log(team);
    const displayDetail = document.getElementById('display-details');
    displayDetail.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'w-50', 'mx-auto');
    div.innerHTML = `
        <img src="${team.strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${team.strSport}</h5>
            <p class="card-text">${team.strStadiumDescription}</p>
            <a href="${team.strTwitter}" class="btn btn-primary">Go somewhere</a>
        </div>
        `;
    displayDetail.appendChild(div);
}
