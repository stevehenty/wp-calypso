export const isAkismetOAuth2Client = ( oauth2Client ) => {
	return oauth2Client?.id === 973;
};

export const isCrowdsignalOAuth2Client = ( oauth2Client ) => {
	return oauth2Client?.id === 978;
};

export const isGravatarOAuth2Client = ( oauth2Client ) => {
	return oauth2Client?.id === 1854;
};

export const isWPJobManagerOAuth2Client = ( oauth2Client ) => {
	return oauth2Client?.id === 90057;
};

export const isGravPoweredOAuth2Client = ( oauth2Client ) => {
	return isGravatarOAuth2Client( oauth2Client ) || isWPJobManagerOAuth2Client( oauth2Client );
};

export const isWooOAuth2Client = ( oauth2Client ) => {
	// 50019 => WooCommerce Dev, 50915 => WooCommerce Staging, 50916 => WooCommerce Production.
	return oauth2Client && [ 50019, 50915, 50916 ].includes( oauth2Client.id );
};

export const isJetpackCloudOAuth2Client = ( oauth2Client ) => {
	// 68663 => Jetpack Cloud Dev,
	return oauth2Client && [ 68663, 69040, 69041 ].includes( oauth2Client.id );
};

export const isA4AOAuth2Client = ( oauth2Client ) => {
	// 68663 => Automattic for Agencies Dev,
	return oauth2Client && [ 95928, 95931, 95932 ].includes( oauth2Client.id );
};

export const isIntenseDebateOAuth2Client = ( oauth2Client ) => {
	return oauth2Client?.id === 2665;
};

export const isStudioAppOAuth2Client = ( oauth2Client ) => {
	// 95109 => Studio by WordPress.com.
	return oauth2Client?.id === 95109;
};
