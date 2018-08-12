import React, { Component } from 'react';
import './Track.css';

class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        const minus = "-";
        const plus = "+";
        const isRemove = this.props.isRemoval;
        if (isRemove) {
            return <a onClick={this.removeTrack} className="Track-action">{minus}</a>
        } else {
            return <a onClick={this.addTrack} className="Track-action">{plus}</a>
        }
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
        {/* Property pulling from .map() function in ../TrackList/TrackList.js */}
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>

        );
    }
}

export default Track;