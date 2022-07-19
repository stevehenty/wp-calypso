import { Popover } from '@automattic/components';
import { useI18n } from '@wordpress/react-i18n';
import { FunctionComponent, useRef, useState } from 'react';
import PremiumBadge from '../premium-badge';

import './style.scss';

interface Props {
	badgeType?: 'premium' | 'none';
	isPremiumThemeAvailable?: boolean;
}

const BadgeContainer: FunctionComponent< Props > = ( {
	badgeType = 'none',
	isPremiumThemeAvailable = false,
} ) => {
	function getBadge() {
		switch ( badgeType ) {
			case 'premium':
				return <PremiumBadge isPremiumThemeAvailable={ isPremiumThemeAvailable } />;
			case 'none':
				return null;
			default:
				throw new Error( 'Invalid badge type!' );
		}
	}

	const divRef = useRef( null );
	const [ isPopoverVisible, setIsPopoverVisible ] = useState( false );

	const { __ } = useI18n();
	const tooltipText = __( 'This theme is full site editing capable', __i18n_text_domain__ );

	return (
		<div className="badge-container">
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				ref={ divRef }
				onMouseEnter={ () => setIsPopoverVisible( true ) }
				onMouseLeave={ () => setIsPopoverVisible( false ) }
			>
				<path
					d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z"
					stroke="#50575E"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M2 6H14"
					stroke="#50575E"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M6 14V6"
					stroke="#50575E"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<Popover
				className="badge-container__fse-popover"
				context={ divRef.current }
				isVisible={ isPopoverVisible }
				position="top left"
			>
				{ tooltipText }
			</Popover>
			{ getBadge() }
		</div>
	);
};

export default BadgeContainer;
