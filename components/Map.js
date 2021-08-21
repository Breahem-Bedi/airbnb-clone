import { useState } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import getCenter from 'geolib/es/getCenter';
import PopupCard from "./PopupCard";

function Map({ searchResults }) {
    
    const [selectedLocation, setSelectedLocation] = useState("");

    const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
    }));
    
    const center = getCenter(coordinates); 

    const [viewPort, setViewPort] = useState({
        width: "100%",
        height: "100%",
        latitude: center.latitude - 0.12,
        longitude: center.longitude,
        zoom: 11,

    });

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/breahem/ckskd5v998xh017pdjl4be55b"
            mapboxApiAccessToken = {process.env.mapbox_key}
            {...viewPort}
            onViewportChange={(nextViewport) => setViewPort(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.long}
                        latitude={result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            onClick={() => setSelectedLocation(result)}
                            className="cursor-pointer text-2xl animate-bounce text-red-500"
                        >
                            <svg className="w-6 h-6" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                                    clipRule="evenodd" 
                                />
                            </svg>
                        </p>
                    </Marker>
                    {selectedLocation.long === result.long ? (
                        <Popup
                            closeOnClick={true} 
                            onClose = {() => setSelectedLocation({})}
                            latitude={result.lat}
                            longitude={result.long}
                        >
                        <PopupCard
                            img={result.img}
                            location={result.location}
                            title={result.title}
                            star={result.star}
                            price={result.price}
                            total={result.total}
                        />
                        </Popup>
                    ) : (
                        false
                    )}
                </div>
            ))}          
        </ReactMapGL>
    )
}

export default Map
