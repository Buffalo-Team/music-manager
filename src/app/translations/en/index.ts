import devices from './devices';
import files from './files';
import login from './login';
import misc from './misc';

const en = {
    ...devices,
    ...files,
    ...login,
    ...misc,
};

export default en;
