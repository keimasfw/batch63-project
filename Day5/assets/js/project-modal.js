document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('.open-modal-btn');

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      // Ambil data dari dataset button
      const title = this.dataset.title;
      const description = this.dataset.description;
      const category = this.dataset.category;
      const projectfor = this.dataset.projectfor;
      const month = this.dataset.month;
      const url = this.dataset.url;
      const images = this.dataset.image.split(','); // Gambar dipisah koma
      const captions = this.dataset.caption ? this.dataset.caption.split(',') : []; // Caption juga dipisah koma
      
      // Setel data modal
      document.querySelector('.modal-project-title').textContent = title;
      document.querySelector('.modal-project-description').textContent = description;
      document.querySelector('.modal-project-category').textContent = category;
      document.querySelector('.modal-project-projectfor').textContent = projectfor;
      document.querySelector('.modal-project-month').textContent = month;
      document.querySelector('.modal-project-url').href = url;
      document.querySelector('.modal-project-url').textContent = url;

      
      // Menyiapkan carousel
      const carouselInner = document.querySelector('.carousel-inner');
      carouselInner.innerHTML = ''; 

      // Tambahkan gambar & caption
      images.forEach((image, index) => {
        const captionText = captions[index] || `Gambar ${index + 1}`;
        
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) carouselItem.classList.add('active');

        // Img Caption
        carouselItem.innerHTML = `
          <img src="${image}" class="d-block w-100 mb-3" alt="Project Image" style="max-height: 400px; object-fit: cover;">
          <div class="carousel-caption d-none d-md-block">
            <p class="text-white text-outline">${captionText}</p>
          </div>
        `;

        carouselInner.appendChild(carouselItem);
      });
    });
  });
});