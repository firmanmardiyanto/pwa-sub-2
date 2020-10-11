const headers = {
    'X-Auth-Token': '15b6bb36a93b4069b5fc9166c88da485',
};

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      // Method reject() akan membuat blok catch terpanggil
      return Promise.reject(new Error(response.statusText));
    } else {
      // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
      return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

export function getData(url) {
    let get = fetch(url, {headers: headers})
     .then(status)
     .then(json)
    // let tgl = data.matches[0].utcDate;
    // syntax lokal: new Date(tgl).toLocaleString('id-ID')
    // syntax jam: console.log(`${new Date(tgl).getHours()}:${new Date(tgl).getMinutes()} WIB`);        
     .catch(error);

     return get;
}