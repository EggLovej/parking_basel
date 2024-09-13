import React from 'react';
import { DateField, NumberField, Show, SimpleShowLayout, TextField, UrlField } from 'react-admin';
import { PercentField, RelativeDateField } from './CustomFields';

export const ShowList = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="title" />
            <RelativeDateField source="published" />
            <NumberField source="free" />
            <NumberField source="total" />
            <PercentField source="auslastungen" />
            <TextField source="address" />
            <UrlField source="link" />
            <NumberField source="geo_point_2d.lon" />
            <NumberField source="geo_point_2d.lat" />
        </SimpleShowLayout>
    </Show>
);
