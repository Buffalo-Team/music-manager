import devices from './devices';
import files from './files';
import login from './login';
import misc from './misc';
import settings from './settings';

const pl = {
    ...devices,
    ...files,
    ...login,
    ...misc,
    ...settings,
};

export default pl;
