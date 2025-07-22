function getMyData(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    const result = document.getElementById("result");
    result.innerHTML = `
    <div class="mb-4">
        <div class="card">
            <div class="card-body">
                <h3>DATA DIRI</h3>
                <br>
                <h5>Nama anda adalah : ${name}</h5>
                <h5>Email anda adalah : ${email}</h5>
                <h5>Nomor Telephone anda adalah : ${phone}</h5>
                <h5>Subjek yang anda pilih adalah : ${subject}</h5>
                <h5>Pesan anda adalah : ${message}</h5>
            </div>
        </div>
      </div>`;
    console.log(`Nama anda adalah : ${name}, Email anda adalah : ${email}, Nomor Telephone anda adalah : ${phone}, Subjek yang anda pilih adalah : ${subject}, Pesan anda adalah : ${message}`);
    alert("Data berhasil di input");
  }
  
  document.querySelector("form").addEventListener("submit", getMyData);