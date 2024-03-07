import { addLocaleToPathLocaleInFront } from '@automattic/i18n-utils';
import { useTranslate } from 'calypso/my-sites/patterns/utils';
import { useSelector } from 'react-redux';
import EmptyContent from 'calypso/components/empty-content';
import { isUserLoggedIn } from 'calypso/state/current-user/selectors';

import './style.scss';

export const PatternsCategoryNotFound = () => {
	const isLoggedIn = useSelector( isUserLoggedIn );
	const translate = useTranslate();

	return (
		<EmptyContent
			title={ translate( "Oops! We can't find this category!" ) }
			line={ translate( "The category you are looking for doesn't exist." ) }
			action={ translate( 'Browse all patterns' ) }
			actionURL={ isLoggedIn ? '/patterns' : addLocaleToPathLocaleInFront( '/patterns' ) }
			illustration="/calypso/images/illustrations/illustration-404.svg"
		/>
	);
};
