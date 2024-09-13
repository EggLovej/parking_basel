// ParkingMap.tsx
import React, { useEffect, useState } from 'react';
import { useDataProvider, RaRecord } from 'react-admin';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L, { icon, Icon } from 'leaflet';
import { Card } from '@mui/material';

export const ICONSIZE: [number, number] = [30, 30];

const greenIcon = new Icon({
    iconUrl: 'icons/green-location-icon.png',
    iconSize: ICONSIZE,
    iconAnchor: [12, 41],
});

const yellowIcon = new Icon({
    iconUrl: 'icons/yellow-location-icon.png',
    iconSize: ICONSIZE,
    iconAnchor: [12, 41],
});

const redIcon = new Icon({
    iconUrl: 'icons/red-location-icon.png',
    iconSize: ICONSIZE,
    iconAnchor: [12, 41],
});

const getIcon = (percentage: number): Icon => {
    if (percentage < 50) return greenIcon;
    if (percentage < 75) return yellowIcon;
    return redIcon;
};

const iconStyle = {
    border: "2px solid black",
    borderRadius: "50%",
};

interface ParkingRecord extends RaRecord {
    title: string;
    auslastungen: number;
    geo_point_2d: {
        lat: number;
        lon: number;
    };
    free: number;
    total: number;
    address: string;
}

export const ParkingMap: React.FC = () => {
    const dataProvider = useDataProvider();
    const [data, setData] = useState<ParkingRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        dataProvider
            .getList<ParkingRecord>('parkings', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'title', order: 'ASC' },
                filter: {},
            })
            .then(({ data }) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [dataProvider]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Set the map's initial view to Basel's coordinates
    const baselPosition: [number, number] = [47.5596, 7.5886];
    const zoomLevel = 13;

    // Define custom icons if needed
    const defaultIcon = new Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    return (
        <Card>
            <MapContainer
                center={baselPosition}
                zoom={zoomLevel}
                style={{ height: '600px', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data.map((parking) => (
                    <Marker
                        key={parking.id}
                        position={[parking.geo_point_2d.lat, parking.geo_point_2d.lon]}
                        icon={getIcon(parking.auslastungen)}
                    >
                        <Popup>
                            <strong>{parking.title}</strong>
                            <br />
                            Address: {parking.address}
                            <br />
                            Free Spaces: {parking.free}
                            <br />
                            Total Spaces: {parking.total}
                            <br />
                            Occupancy: {(parking.auslastungen).toFixed(2)}%
                        </Popup>
                        <Tooltip>{parking.title}</Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </Card>
    );
};
