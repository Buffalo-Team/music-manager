import devices from './devices';
import files from './files';
import login from './login';
import misc from './misc';

const pl = {
    ...devices,
    ...files,
    ...login,
    ...misc,
};

export default pl;
