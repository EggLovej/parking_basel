// ParkingGraph.tsx
import React, { useEffect, useState } from 'react';
import { useDataProvider, RaRecord } from 'react-admin';
import { Card } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

interface ParkingRecord extends RaRecord {
    title: string;
    auslastungen: number; // Assuming this is a fraction between 0 and 1
}

export const ParkingGraph: React.FC = () => {
    const dataProvider = useDataProvider();
    const [data, setData] = useState<ParkingRecord[]>([]);

    useEffect(() => {
        dataProvider.getList('parking', {
            pagination: { page: 1, perPage: 16 },
            sort: { field: 'auslastungen', order: 'ASC' },
        }).then(({ data }) => {
            const transformedData = data.map((item: any) => ({
                id: item.id,
                title: item.title,
                auslastungen: Math.round(item.auslastungen),
            }));
            setData(transformedData);
        });
    }, [dataProvider]);

    const getColor = (percentage: number): string => {
        if (percentage < 50) return 'green';
        if (percentage < 75) return 'yellow';
        return 'red';
    };

    return (
        <Card>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="auslastungen" name="Occupancy Rate">
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getColor(entry.auslastungen)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    );
};
