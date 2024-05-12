document.addEventListener("DOMContentLoaded", function() {
    var lastScrollTop = 0;
    var navbar = document.querySelector(".header");
    
    window.addEventListener("scroll", function() {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > lastScrollTop) {
        // Scroll ke bawah
        navbar.style.transform = "translateY(-100%)";
      } else {
        // Scroll ke atas
        navbar.style.transform = "translateY(0)";
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
  });
  

  // Mencegah nilai default
window.addEventListener('DOMContentLoaded', (event) => {
    // Menghapus nilai default dari semua input saat halaman dimuat
    document.querySelectorAll('input[type="text"]').forEach((input) => {
        input.value = ''; // Mengosongkan nilai input
    });
});

// Mendapatkan nilai input saat mengirim formulir
document.getElementById('predict-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah pengiriman formulir secara langsung

    // Mengumpulkan nilai input
    var formData = {};
    document.querySelectorAll('input[type="text"]').forEach((input) => {
        formData[input.name] = parseFloat(input.value); // Mengubah nilai input menjadi float
    });

    // Mengirimkan data ke server dengan metode POST
    fetch('/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Mengirim data dalam format JSON
    })
    .then(response => response.json())
    .then(data => {
        // Menampilkan hasil prediksi
        document.getElementById('heating-load').innerText = "Heating Load: " + data.heating_load;
        document.getElementById('cooling-load').innerText = "Cooling Load: " + data.cooling_load;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
