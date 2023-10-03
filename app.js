function createMenu(data) {
    const appDiv = document.getElementById('app');

    let categories = {};
    data.forEach(item => {
        if (!categories[item.Categoria]) {
            categories[item.Categoria] = [];
        }
        categories[item.Categoria].push(item);
    });

    Object.keys(categories).forEach(category => {
        let categoryDiv = document.createElement('div');
        categoryDiv.className = 'menu-item';
        categoryDiv.textContent = category;
        appDiv.appendChild(categoryDiv);

        let types = {};
        categories[category].forEach(item => {
            if (!types[item.Tipo]) {
                types[item.Tipo] = [];
            }
            types[item.Tipo].push(item);
        });

        let typeDivContainer = document.createElement('div');
        typeDivContainer.className = 'sub-menu';
        categoryDiv.appendChild(typeDivContainer);

        Object.keys(types).forEach(type => {
            let typeDiv = document.createElement('div');
            typeDiv.className = 'sub-menu-item';
            typeDiv.textContent = type;
            typeDivContainer.appendChild(typeDiv);

            let descDivContainer = document.createElement('div');
            descDivContainer.className = 'sub-sub-menu';
            typeDiv.appendChild(descDivContainer);

            types[type].forEach(item => {
                let descDiv = document.createElement('div');
                descDiv.className = 'sub-sub-menu-item';
                
                let link = document.createElement('a');
                link.href = item.Link;
                link.textContent = item.Descrição;
                link.target = "_blank";
                descDiv.appendChild(link);

                descDivContainer.appendChild(descDiv);
            });
        });
    });
}

function fetchData(url) {
    return new Promise((resolve, reject) => {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function (data) {
                resolve(data.data);
            },
            error: function (err) {
                reject(err);
            }
        });
    });
}


fetchData('exemplo.csv')
    .then(data => {
        createMenu(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });