import Layout from '@components/Layouts';
import { withTranslation } from '@i18n';
import Router from 'next/router';
import Content from './component';

const Page = (props) => {
    const { t } = props;
    const pageConfig = {
        title: t('customer:newPassword:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:newPassword:title'),
        bottomNav: false,
    };
    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} />
        </Layout>
    );
};

Page.getInitialProps = async ({ query, res }) => {
    if (query.token === '' || !query.token) {
        if (typeof window !== 'undefined') Router.push('/');
        else res.redirect('/');
    }
    return {
        query,
        namespacesRequired: ['common', 'customer', 'validate'],
    };
};

export default withTranslation()(Page);