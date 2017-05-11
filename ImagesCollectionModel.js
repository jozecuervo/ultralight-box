function ImagesCollectionModel() {
    return {
        IMAGES_PER_LOAD: 25,
        isLoading: false,
        pageOffset: 1,
        totalImagesCount: 0,
        images: [],
        onImagesLoadedHandlers: [],

        loadNextPageOfImages: function() {
            if (this.isLoading) { return }
            this.isLoading = true;
            let self = this;
            FlickrApi.getPhotos(this.pageOffset, this.IMAGES_PER_LOAD, function(totalCount, lightboxImages) {
                self.images.push.apply(self.images, lightboxImages);
                self.totalImagesCount = totalCount;
                self.pageOffset += 1;   // next page load will use the updated pageOffset
                self.isLoading = false;
                self.onImagesLoaded(lightboxImages);
            }, function(xhr) {
                alert('Could not load images from Flickr API.');
                self.isLoading = false;
            });
        },

        onImagesLoaded: function(addedLightboxImages) {
            this.onImagesLoadedHandlers.forEach(function(handler) {
                handler(addedLightboxImages);
            }, this);
        },

        hasMoreImagesToLoad: function() {
            return this.images.length != this.totalImagesCount;
        },
    }
};
