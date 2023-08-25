import React, { useState, useEffect } from 'react';
import { List } from 'react-virtualized';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then((response) => response.json())
            .then((data) => setPhotos(data));
    }, []);

    const rowRenderer = ({ index, key, style }) => {
        const photo = photos[index];
        return (
            <div key={key} style={style} className="photo-item">
                <img src={photo.url} alt={photo.title} />
                <p>{photo.title}</p>
            </div>
        );
    };

    return (
        <div className="photo-list">
            <List
                width={500}
                height={500}
                rowCount={photos.length}
                rowHeight={120}
                rowRenderer={rowRenderer}
            />
        </div>
    );
};

export default PhotoList;

