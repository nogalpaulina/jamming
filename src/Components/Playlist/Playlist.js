import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';

// Renders TrackList component

class Playlist extends Component {
    constructor(props){
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event){
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} defaultValue={this.props.playlistName}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;