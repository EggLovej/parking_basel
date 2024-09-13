import { Datagrid, DateField, List, SimpleList, NumberField, TextField, UrlField } from 'react-admin';
import { PercentField, RelativeDateField } from './CustomFields';
import { useMediaQuery, Theme } from '@mui/material';

export const ParkingList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));

    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.address}
                    tertiaryText={record => <PercentField source="auslastungen"/>}
                />
            ) : (
                <Datagrid>
                    <TextField source="title" />
                    <NumberField source="free" />
                    <NumberField source="total" />
                    <PercentField source="auslastungen"/>
                    <RelativeDateField source="published"/>
                    <TextField source="address" />
                    <UrlField source="link" />
                </Datagrid>
            )}
        </List>
    );
};