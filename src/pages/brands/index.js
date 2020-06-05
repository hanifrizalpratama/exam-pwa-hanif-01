import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Content from './component';

const BrandsPage = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('brands:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('brands:title'),
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'brands',
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

BrandsPage.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withTranslation()(BrandsPage);
