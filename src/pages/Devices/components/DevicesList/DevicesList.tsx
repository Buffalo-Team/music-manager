import { useAppSelector } from 'app/store';

const DevicesList = () => {
    const devices = useAppSelector(({ user: { user } }) => user?.devices || []);
    return (
        <ul>
            {devices.map((i) => (
                <li key={i.id}>{i.name}</li>
            ))}
        </ul>
    );
};

export default DevicesList;
