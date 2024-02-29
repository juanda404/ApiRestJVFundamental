const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

api.defaults.headers.common['X-API-KEY'] = 'live_GZ2b17k1VjtsAPGC2v8oXnGaPK2ljGWEj7fcruDcrG6wXIpoFwoGUKMXxEMlNc8I';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2&ap: i_key=live_GZ2b17k1VjtsAPGC2v8oXnGaPK2ljGWEj7fcruDcrG6wXIpoFwoGUKMXxEMlNc8I';
const API_URL_FAVORITE = 'https://api.thecatapi.com/v1/favourites?';
const API_URL_FAVORITE_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_GZ2b17k1VjtsAPGC2v8oXnGaPK2ljGWEj7fcruDcrG6wXIpoFwoGUKMXxEMlNc8I`;
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';
const spanError = document.getElementById('error');
const spanErrorFavorite = document.getElementById('errorFavorite');

async function myCat(){
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();

        if (res.status !== 200) {
            spanError.innerHTML = 'THere an error: '+ res.status;
        }else{
            const img1 = document.getElementById('img1');
            const img2 = document.getElementById('img2');
            const btn1 = document.getElementById('btn1');
            const btn2 = document.getElementById('btn2');

            img1.src = data[0].url;
            img2.src = data[1].url;

            btn1.onclick = () => saveFavoriteCats(data[0].id);
            btn2.onclick = () => saveFavoriteCats(data[1].id);
        }

}

const myButton = document.querySelector('button');
myButton.onclick = myCat;




/*Function to selection  with favorites */

async function myCatFavorite(){
    const res = await fetch(API_URL_FAVORITE,{
        method: 'GET',
        headers:{
            'X-API-KEY': 'live_GZ2b17k1VjtsAPGC2v8oXnGaPK2ljGWEj7fcruDcrG6wXIpoFwoGUKMXxEMlNc8I',
        },
    });
    const data = await res.json();
    console.log('favorites');
    console.log(data);

        if (res.status !== 200) {
            spanErrorFavorite.innerHTML ='There an error load favorites'+ res.status;
            console.log('Houston i have a big problem');
        }else{
            const div = document.getElementById('informationFavorite');
            //Limpiar seccion 
            div.innerHTML = "";
            data.forEach(cat =>{

                const article = document.createElement('article');
                const img = document.createElement('img');
                const btn = document.createElement('button');
                const btnText = document.createTextNode('Delete from Favorites');

                btn.appendChild(btnText);
                img.src = cat.image.url;
                btn.onclick = () => deleteFavoriteCats(cat.id);
                article.appendChild(img);
                article.appendChild(btn);
                div.appendChild(article);

            } );
        }
}
/*Function to add to favorite one pic of gats*/

async function saveFavoriteCats(id) {
    const {data, status} = await api.post('/favourites', {
        image_id: id,
    });
    /*
    const res = await fetch(API_URL_FAVORITE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_GZ2b17k1VjtsAPGC2v8oXnGaPK2ljGWEj7fcruDcrG6wXIpoFwoGUKMXxEMlNc8I',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();*/

    console.log('save')


    if (status !== 200) {
        spanError.innerHTML = 'THere an error: '+ status+ data.message;
    }else{
        console.log('Cat salve in favorites');
        myCatFavorite();
    }

}

async function deleteFavoriteCats(id){
    const res = await fetch(API_URL_FAVORITE_DELETE(id),{
        method: 'DELETE',
});
    const date = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = 'THere an error: '+ res.status+ data.message;
    }else{
        console.log('Cat delete to favorites');
        myCatFavorite();
    }
}

async function uploadCatPic(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(API_URL_UPLOAD, {
        method: 'POST',
        headers:{
            //'Content-type': 'multipart/form-data',
            'X-API-KEY': 'live_GZ2b17k1VjtsAPGC2v8oXnGaPK2ljGWEj7fcruDcrG6wXIpoFwoGUKMXxEMlNc8I',
        },
        body: formData,
    })

    console.log('upload image');
}

window.myCat();
window.myCatFavorite();


