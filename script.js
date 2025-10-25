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

                // Title
                const title = document.createElement('h2');
                title.textContent = listing.title || 'Untitled Listing';
                listingDiv.appendChild(title);

                // Descriptions (multiple lines)
                const descriptionContainer = document.createElement('div');
                descriptionContainer.classList.add('description-container');
                if (Array.isArray(listing.descriptions) && listing.descriptions.length > 0) {
                    listing.descriptions.forEach(desc => {
                        const description = document.createElement('p');
                        description.textContent = desc || 'No description provided.';
                        descriptionContainer.appendChild(description);
                    });
                } else {
                    const noDesc = document.createElement('p');
                    noDesc.textContent = 'No descriptions provided.';
                    descriptionContainer.appendChild(noDesc);
                }
                listingDiv.appendChild(descriptionContainer);

                // Gallery
                const galleryDiv = document.createElement('div');
                galleryDiv.classList.add('gallery');
                if (Array.isArray(listing.images) && listing.images.length > 0) {
                    listing.images.forEach(imgSrc => {
                        const img = document.createElement('img');
                        img.src = 'images/' + imgSrc;
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
