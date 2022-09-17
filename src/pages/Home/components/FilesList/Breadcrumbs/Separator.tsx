import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Separator = () => (
    <ArrowForwardIosIcon
        sx={{
            height: (theme) => theme.spacing(1),
            width: (theme) => theme.spacing(1),
        }}
    />
);

export default Separator;
