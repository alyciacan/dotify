export class Track {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.albumName = data.album.name;
      this.artistName = data.album.artists[0].name;
      this.url = data.preview_url
    }
  }
  
  export class Album {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.artistName = data.artists[0].name;
      this.artwork = data.images[2].url;
      this.url = data.external_urls.spotify
    }
  }
  
  export class Artist {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.genres = data.genres;
      this.url = data.external_urls.spotify;
      this.image = data.images[2].url
    }
  }
  
  export class Show {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
    }
  }
  