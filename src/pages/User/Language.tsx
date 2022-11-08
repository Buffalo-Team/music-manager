import { useTranslation } from 'react-i18next';
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import i18n, { supportedLanguages } from 'app/translations';

const Language = () => {
    const { t } = useTranslation();
    const handleChange = (event: SelectChangeEvent) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography variant="largeBold" sx={{ marginBottom: 3 }}>
                {t('settings.language.label')}
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={i18n.resolvedLanguage}
                    onChange={handleChange}
                    displayEmpty
                    sx={{
                        boxSizing: 'border-box',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: (theme) => theme.palette.border.neutral,
                        }
                    }}
                >
                    {supportedLanguages.map((lng) => (
                        <MenuItem key={lng} value={lng}>
                            {t(`settings.language.names.${lng}`)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Language;
