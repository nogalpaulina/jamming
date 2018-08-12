let accessToken = "";
const clientID = '97b815a2596e4f62adb46be0a349758d';
const redirectURI = 'http://localhost:3000/';


let Spotify = {
	getAccessToken() {
		const accessTokenFromUrl = window.location.href.match(/access_token=([^&]*)/);
		const expiresInFromUrl = window.location.href.match(/expires_in=([^&]*)/);

		if (accessToken) {
			return accessToken;
		} else if (accessTokenFromUrl && expiresInFromUrl) {
			accessToken = accessTokenFromUrl[1]
			const expiresIn = Number(expiresInFromUrl[1]);

			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
			
		} else {
			window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
		}
	},

	search(term) {
		Spotify.getAccessToken();
		
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
		}).then(response => {
			if (response.ok) {
				return response.json();
			} 
			throw new Error('Request failed!');
		}).then(json => {
			if (json.tracks) {
          		return json.tracks.items.map(track => (
          			{ 
          				id: track.id, 
          			  	name: track.name, 
          			  	artist: track.artists[0].name, 
          			  	album: track.album.name, 
          			  	uri: track.uri
          			}
          		));
          	} else {
          		return [];
          	}
		});
	},

	savePlaylist(playlistName, trackURIs) {
		if (playlistName && trackURIs.length) {

			const accessToken = Spotify.getAccessToken();
			const headers = {
					Authorization: `Bearer ${accessToken}`
				}
			let userID = '';
			return fetch('https://api.spotify.com/v1/me', {
				headers: headers
			}).then(response => {
				if (response.ok) {
                    return response.json();
                }
                throw new Error('Request failed!');
			}).then(json => {
				userID = json.id;
				console.log("json", json, userID);
				return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
	                    headers: headers,
	                    method: 'POST',
	                    body: JSON.stringify({ name: playlistName })
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Request failed!');
                }).then(json => {
                    let playlistID = json.id;

                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackURIs })

                    }).then(response => {
                        if(response.ok) {
                            return response.json();
                        }
                        throw new Error('Request failed!');
                    })
                })
         	})
		} else {
			return;
		}
	}

}

export default Spotify;
