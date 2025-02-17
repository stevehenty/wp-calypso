import config from '@automattic/calypso-config';
import {
	PRODUCT_JETPACK_STATS_YEARLY,
	PRODUCT_JETPACK_STATS_PWYW_YEARLY,
	PRODUCT_JETPACK_STATS_FREE,
} from '@automattic/calypso-products';
import { recordTracksEvent } from 'calypso/lib/analytics/tracks';

const setUrlParam = ( url: URL, paramName: string, paramValue?: string | null ): void => {
	if ( paramValue === null || paramValue === undefined || paramValue === '' ) {
		url.searchParams.delete( paramName );
	} else {
		url.searchParams.set( paramName, paramValue );
	}
};

const getStatsCheckoutURL = (
	siteSlug: string,
	product: string,
	redirectUrl: string,
	checkoutBackUrl: string,
	from?: string,
	adminUrl?: string
) => {
	const isFromJetpack = from?.startsWith( 'jetpack' );
	// Get the checkout URL for the product, or the siteless checkout URL if from Jetpack or no siteSlug is provided
	const checkoutType = isFromJetpack || ! siteSlug ? 'jetpack' : siteSlug;
	const checkoutProductUrl = new URL(
		`/checkout/${ checkoutType }/${ product }`,
		'https://wordpress.com'
	);

	// Add redirect_to parameter
	setUrlParam( checkoutProductUrl, 'redirect_to', redirectUrl );
	setUrlParam( checkoutProductUrl, 'checkoutBackUrl', checkoutBackUrl );

	if ( isFromJetpack && siteSlug ) {
		setUrlParam( checkoutProductUrl, 'connect_after_checkout', 'true' );
		setUrlParam( checkoutProductUrl, 'admin_url', adminUrl );
		setUrlParam( checkoutProductUrl, 'from_site_slug', siteSlug );
	}

	return checkoutProductUrl.toString();
};

const getYearlyPrice = ( monthlyPrice: number ) => {
	return monthlyPrice * 12;
};

const addPurchaseTypeToUri = ( uri: string, statsPurchaseSuccess: string ) => {
	const url = new URL( uri, window.location.origin );
	setUrlParam( url, 'statsPurchaseSuccess', statsPurchaseSuccess );

	return url.pathname + url.search;
};

const getCheckoutBackUrl = ( {
	from,
	siteSlug,
	adminUrl,
}: {
	from: string;
	siteSlug: string;
	adminUrl?: string;
} ) => {
	// TODO: Enumerate all possible values of `from` parameter.
	const isFromWPAdmin = from.startsWith( 'jetpack' );
	const isFromMyJetpack = from === 'jetpack-my-jetpack';
	const isFromPlansPage = from === 'calypso-plans';
	const isOdysseyStats = config.isEnabled( 'is_running_in_jetpack_site' );

	// Use full URL even though redirecting on Calypso.
	if ( ! isFromWPAdmin && ! isOdysseyStats ) {
		if ( ! siteSlug ) {
			return 'https://cloud.jetpack.com/pricing/';
		}

		return (
			window.location.origin +
			( isFromPlansPage ? `/plans/${ siteSlug }` : `/stats/day/${ siteSlug }` )
		);
	}

	const checkoutBackPath = isFromMyJetpack ? 'admin.php?page=my-jetpack' : 'admin.php?page=stats';
	return adminUrl + checkoutBackPath.replace( /^\//, '' );
};

const getRedirectUrl = ( {
	from,
	type,
	adminUrl,
	redirectUri,
	siteSlug,
}: {
	from: string;
	type: string;
	adminUrl?: string;
	redirectUri?: string;
	siteSlug: string;
} ) => {
	const isOdysseyStats = config.isEnabled( 'is_running_in_jetpack_site' );
	const isStartedFromJetpackSite = from.startsWith( 'jetpack' ) || isOdysseyStats;
	const statsPurchaseSuccess = type === 'free' ? 'free' : 'paid';

	// If it's a siteless checkout, let it redirect to the thank you page,
	// which is the default page if nothing is passed
	if ( ! siteSlug ) {
		return '';
	}

	if ( ! isStartedFromJetpackSite ) {
		redirectUri = addPurchaseTypeToUri(
			redirectUri || `/stats/day/${ siteSlug }`,
			statsPurchaseSuccess
		);
		return redirectUri;
	}
	redirectUri = addPurchaseTypeToUri( redirectUri || 'admin.php?page=stats', statsPurchaseSuccess );
	return adminUrl + redirectUri.replace( /^\//, '' );
};

const gotoCheckoutPage = ( {
	from,
	type,
	siteSlug,
	adminUrl,
	redirectUri,
	price,
	quantity,
}: {
	from: string;
	type: 'pwyw' | 'free' | 'commercial';
	siteSlug: string;
	adminUrl?: string;
	redirectUri?: string;
	price?: number;
	quantity?: number;
} ) => {
	let eventName = '';
	let product: string;

	const isTierUpgradeSliderEnabled = config.isEnabled( 'stats/tier-upgrade-slider' );

	switch ( type ) {
		case 'pwyw':
			eventName = 'pwyw';
			product = price
				? `${ PRODUCT_JETPACK_STATS_PWYW_YEARLY }:-q-${ getYearlyPrice( price ) }` // specify price per unit or the plan will default to a free plan
				: `${ PRODUCT_JETPACK_STATS_PWYW_YEARLY }`;
			break;
		case 'free':
			eventName = 'free';
			product = PRODUCT_JETPACK_STATS_FREE;
			break;
		case 'commercial':
			// Default to yearly/annual billing
			eventName = 'commercial';
			product = PRODUCT_JETPACK_STATS_YEARLY;

			if ( isTierUpgradeSliderEnabled ) {
				product = quantity
					? `${ PRODUCT_JETPACK_STATS_YEARLY }:-q-${ quantity }`
					: PRODUCT_JETPACK_STATS_YEARLY;
			}

			break;
	}

	recordTracksEvent( `calypso_stats_${ eventName }_purchase_button_clicked` );

	const redirectUrl = getRedirectUrl( { from, type, adminUrl, redirectUri, siteSlug } );
	const checkoutBackUrl = getCheckoutBackUrl( { from, adminUrl, siteSlug } );

	// Allow some time for the event to be recorded before redirecting.
	setTimeout(
		() =>
			( window.location.href = getStatsCheckoutURL(
				siteSlug,
				product,
				redirectUrl,
				checkoutBackUrl,
				from,
				adminUrl
			) ),
		250
	);
};

export default gotoCheckoutPage;
