import { Button } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';

import './style.scss';

export default function PricingNeedMoreInfo() {
	const translate = useTranslate();

	const href = 'http://jetpack.com/manage';

	return (
		<div className="pricing-need-more-info">
			<h2 className="pricing-need-more-info__headline">{ translate( 'Need more info?' ) }</h2>
			<Button href={ href }>
				{ translate( 'Explore %(productName)s', {
					args: {
						productName: translate( 'Jetpack Manage' ),
					},
				} ) }
			</Button>
		</div>
	);
}
