import { Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import BreadcrumbItem from 'pages/Home/components/FilesList/Breadcrumbs/BreadcrumbItem';
import Separator from 'pages/Home/components/FilesList/Breadcrumbs/Separator';
import { File as ItemFile } from 'types';
import RootIcon from './RootIcon';

interface Props {
    onItemClick: (index: number) => void;
    breadcrumbs: (ItemFile | undefined)[];
}

const Breadcrumbs = ({ onItemClick, breadcrumbs }: Props) => (
    <MUIBreadcrumbs
        separator={<Separator />}
        itemsBeforeCollapse={2}
        maxItems={4}
        aria-label="breadcrumb"
        sx={{
            marginY: 1.5,
            '& .MuiBreadcrumbs-li': {
                display: 'flex',
                justifyContent: 'center',
            },
        }}
    >
        {breadcrumbs.map((item, index) => {
            const disabled = index === breadcrumbs.length - 1;
            const onClick = disabled ? undefined : () => onItemClick(index);
            if (!item) {
                return (
                    <RootIcon
                        key="root"
                        disabled={disabled}
                        onClick={onClick}
                    />
                );
            }
            return (
                <BreadcrumbItem
                    key={item.id}
                    name={item.name}
                    onClick={onClick}
                    disabled={disabled}
                />
            );
        })}
    </MUIBreadcrumbs>
);

export default Breadcrumbs;
