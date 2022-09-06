import { useTranslation } from 'react-i18next';

const Loader = () => {
    const { t } = useTranslation();
    return <>{t('Loading')}</>;
};

export default Loader;
