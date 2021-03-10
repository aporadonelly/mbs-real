/**
 * @Name Edit Promo Page
 * @Description This is the edit promo page where the user edits the information for their promo.
 * @Returns The Edit Promo Page Component
 * @Author RJ
 * @UpdatedBy RJ
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpecificPromo } from '../../actions/PromosActions';
import { PageHeader } from '../../components';
import PromoForm from '../../components/promos/PromoForm';

const EditPromo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const promo = useSelector(state => state.promo);
    const { name, images, validFrom, validTo, description } = promo.specificPromo;
    const [imageurl, setImageurl] = useState('');

    useEffect(() => {
        const specificPromo = async () => {
            await dispatch(fetchSpecificPromo(id));
        };
        specificPromo();
    }, []);

    useEffect(() => {
        images === undefined || images.length === 0
            ? setImageurl('')
            : setImageurl(images[0].imageUrl);
    }, [promo.specificPromo]);

    return (
        <div data-testid="EditPromosComponent">
            <PageHeader
                title="Promos"
                description="Create, view, and edit your bank's promos here."
                hideCreateButton
            />
            <PromoForm
                title="Edit"
                id={id}
                name={name}
                imageUrl={imageurl}
                from={validFrom}
                to={validTo}
                description={description}
            />
        </div>
    );
};
export default EditPromo;
