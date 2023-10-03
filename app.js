// app.js
document.addEventListener("DOMContentLoaded", function () {
    fetchData('https://docs.google.com/spreadsheets/d/e/2PACX-1vTQd660HE5HrVc8h7-3zvL9TbYEt7nwN5DEHDjOyUHaH3fDSEHQoFvSFlYsIVs-5AuU4aHIaqcNJWuI/pub?gid=0&single=true&output=csv')
        .then(data => {
            createMenu(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

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

        categoryDiv.addEventListener('click', function() {
            toggleDisplay(typeDivContainer);
        });

        Object.keys(types).forEach(type => {
            let typeDiv = document.createElement('div');
            typeDiv.className = 'sub-menu-item';
            typeDiv.textContent = type;
            typeDivContainer.appendChild(typeDiv);

            let descDivContainer = document.createElement('div');
            descDivContainer.className = 'sub-sub-menu';
            typeDiv.appendChild(descDivContainer);

            typeDiv.addEventListener('click', function(event) {
                event.stopPropagation();
                toggleDisplay(descDivContainer);
            });

            types[type].forEach(item => {
                let descDiv = document.createElement('div');
                descDiv.className = 'sub-sub-menu-item';
                    
                // Descrição
                let description = document.createElement('span');
                description.textContent = item.Descrição + " ";
                descDiv.appendChild(description);
                    
                // Link
                let link = document.createElement('a');
                link.href = item.Link;
                link.textContent = "Link";
                link.target = "_blank";
                descDiv.appendChild(link);
        
                descDivContainer.appendChild(descDiv);
            });
        });
    });
}

function toggleDisplay(element) {
    if (element.style.display === 'none' || element.style.display === '') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}


document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();  // Previne a submissão padrão do formulário
    let query = document.getElementById('searchInput').value;
    let siteSearch = "site:https://erickcampos50.github.io/Painel-de-dados-compartilhados-IFES/ " + query; 
    window.open("https://www.google.com/search?q=" + encodeURIComponent(siteSearch), "_blank");
});