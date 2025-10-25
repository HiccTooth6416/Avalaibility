document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('listings-container');

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data.listings)) {
                throw new Error('Invalid data format');
            }
            data.listings.forEach(listing => {
                const listingDiv = document.createElement('div');
                listingDiv.classList.add('listing');

                const title = document.createElement('h2');
                title.textContent = listing.title || 'Untitled Listing';
                listingDiv.appendChild(title);

                const description = document.createElement('p');
                description.textContent = listing.description || 'No description provided.';
                listingDiv.appendChild(description);

                const galleryDiv = document.createElement('div');
                galleryDiv.classList.add('gallery');

                if (Array.isArray(listing.images) && listing.images.length > 0) {
                    listing.images.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = 'images/' + imgSrc;  // Assumes images are in /images/ folder
                        img.alt = 'Gallery image';
                        galleryDiv.appendChild(img);
                    });
                } else {
                    const noImages = document.createElement('p');
                    noImages.textContent = 'No images available.';
                    galleryDiv.appendChild(noImages);
                }

                listingDiv.appendChild(galleryDiv);
                container.appendChild(listingDiv);
            });
        })
        .catch(error => {
            const errorMsg = document.createElement('p');
            errorMsg.id = 'error-message';
            errorMsg.textContent = 'Error loading content: ' + error.message + '. Please check data.json.';
            container.appendChild(errorMsg);
        });
});
