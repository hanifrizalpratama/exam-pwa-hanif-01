/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const getStoreCredit = gql`
   query getStoreCredit($pageSizeStoreCredit: Int! , $currentPageStoreCredit: Int) {
        customer (pageSizeStoreCredit: $pageSizeStoreCredit, currentPageStoreCredit: $currentPageStoreCredit){
            store_credit {
                current_balance {
                    currency
                    value
                }
                enabled
                transaction_history {
                    total_count
                    page_info {
                    current_page
                    page_size
                    total_pages
                    }
                    items {
                    comment
                    comment_placeholder
                    store_credit_adjustment {
                        currency
                        value
                    }
                    store_credit_balance {
                        currency
                        value
                    }
                    transaction_date_time
                    transaction_id
                    }
                }
                }
        }
    }
`;
