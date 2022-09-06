import { Device } from 'types';

interface Props {
    devices: Device[];
}

const sort = (d1: Device, d2: Device): number =>
    new Date(d2?.updatedAt || 0).getTime() -
    new Date(d1?.updatedAt || 0).getTime();

const DevicesList = ({ devices }: Props) => (
    <ul>
        {[...devices].sort(sort).map((i) => (
            <li key={i.id}>{i.name}</li>
        ))}
    </ul>
);

export default DevicesList;
