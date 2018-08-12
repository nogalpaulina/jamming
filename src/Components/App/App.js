import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';

class App extends Component {

    // Initialize object
	constructor(props) {
    	super(props);
    	this.state = {
    		searchResults: [],
            playlistName: "New playlist",
            playlistTracks: []
    	}

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
	}

    addTrack(track){
        const alreadyExists = this.state.playlistTracks.some(function(playlistTrack){
            return playlistTrack.id === track.id;
        });

        if (!alreadyExists) {
           this.setState(prevState => ({
                // Spread comma separated elements
              playlistTracks: [...prevState.playlistTracks, track]
            }));
        }
    }

    removeTrack(track) {
        const updatedTrackList = this.state.playlistTracks.filter(function(playlistTrack) {
            return track.id !== playlistTrack.id;
        });

        this.setState({playlistTracks: updatedTrackList});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist(track) {
        const trackURIs = this.state.playlistTracks.map(function(playlistTrack) {
            return playlistTrack.uri;
        });
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({playlistName: 'New Playlist'});
        this.setState({playlistTracks: []});
    }

    search(term) {
        Spotify.search(term).then(results => this.setState({searchResults: results}));
    }

	render() {
		return (
			<div className="App-wrap">
				<h1>Ja<span className="highlight">mmm</span>ing</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
					   <Playlist playlistName={this.state.playlistName} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
                    </div>
				</div>
			</div>
		);
	}
}

export default App;