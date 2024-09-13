// Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useDataProvider, RaRecord } from 'react-admin';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { RelativeDateField } from './CustomFields'; // Assuming this is your custom field

interface ParkingRecord extends RaRecord {
    free: number;
    total: number;
    published: string; // Assuming published is an ISO date string
}

export const Dashboard: React.FC = () => {
    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState<boolean>(true);
    const [parkingData, setParkingData] = useState<ParkingRecord[]>([]);
    const [totalFree, setTotalFree] = useState<number>(0);
    const [totalOccupied, setTotalOccupied] = useState<number>(0);
    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        dataProvider
            .getList<ParkingRecord>('parkings', {
                pagination: { page: 1, perPage: 100 },
                sort: { field: 'title', order: 'ASC' },
                filter: {},
            })
            .then(({ data }) => {
                setParkingData(data);
                calculateTotals(data);
                setLastUpdated(data[0]?.published || '');
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [dataProvider]);

    const calculateTotals = (data: ParkingRecord[]) => {
        let free = 0;
        let occupied = 0;

        data.forEach((parking) => {
            free += parking.free;
            occupied += parking.total - parking.free;
        });

        setTotalFree(free);
        setTotalOccupied(occupied);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const chartData = [
        { name: 'Available', value: totalFree },
        { name: 'Occupied', value: totalOccupied },
    ];

    const COLORS = ['#28a745', '#dc3545']; // Green for available, red for occupied

    return (
        <Card>
            <CardHeader title="Parking Overview in Basel" />
            <CardContent>
                <Typography variant="body1">
                    Do you want information no one ever looks at? Look no further.
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    This page was last updated{' '}
                    <RelativeDateField value={lastUpdated} />
                </Typography>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                innerRadius={60}
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};
