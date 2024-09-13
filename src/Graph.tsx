import React, { PureComponent, useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Rectangle, Cell } from 'recharts';
import { useDataProvider } from 'react-admin';

interface ParkingData {
    id: number;
    title: string;
    auslastungen: number;
}

const Graph = () => {

    const dataProvider = useDataProvider();
    const [data, setData] = useState<ParkingData[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

    const handleMouseEnter = (index: number) => {
        setActiveIndex(index);
    }

    const handleMouseLeave = () => {
        setActiveIndex(null);
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" max={100} />
                <XAxis dataKey="title"/>
                <YAxis range={[0, 50]} unit='%'/>

                <Bar dataKey="auslastungen" fill="#8884d8" onMouseEnter={(data, index) => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                    {data.map((entry, index) => (
                        <Cell
                            
                            key={`cell-${index}`}
                            fill={index === activeIndex ? 'pink' : entry.auslastungen < 50 ? 'green' : entry.auslastungen < 80 ? 'orange' : 'red'}
                            stroke={index === activeIndex ? 'blue' : 'none'}
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Graph;
