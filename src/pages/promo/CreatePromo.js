/**
 * @Name Create Promo Page
 * @Description This is the create promo page where the user places the information for their promo to be created.
 * @Returns The Create Promo Page Component
 * @Author RJ
 * @UpdatedBy RJ
 */

import React from 'react';
import { PageHeader } from '../../components';
import PromoForm from '../../components/promos/PromoForm';

const CreatePromo = () => (
    <div data-testid="createPromosComponent">
        <PageHeader
            title="Promos"
            description="Create and add a promo by filling out required information below."
            hideCreateButton
        />
        <PromoForm title="Create New" />
    </div>
);
export default CreatePromo;
