import { Card, Gridicon } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';
import FormattedDate from 'calypso/components/formatted-date';
import ClipboardButton from 'calypso/components/forms/clipboard-button';
import LicenseDetailsActions from 'calypso/jetpack-cloud/sections/partner-portal/license-details/actions';
import {
	LicenseOwnerType,
	LicenseState,
} from 'calypso/jetpack-cloud/sections/partner-portal/types';
import { getLicenseState, noop } from 'calypso/jetpack-cloud/sections/partner-portal/utils';
import './style.scss';

interface Props {
	licenseKey: string;
	ownerType: LicenseOwnerType;
	product: string;
	siteUrl: string | null;
	username: string | null;
	blogId: number | null;
	issuedAt: string;
	attachedAt: string | null;
	revokedAt: string | null;
	onCopyLicense?: () => void;
}

const DETAILS_DATE_FORMAT = 'YYYY-MM-DD h:mm:ss A';

export default function LicenseDetails( {
	licenseKey,
	ownerType,
	product,
	siteUrl,
	username,
	blogId,
	issuedAt,
	attachedAt,
	revokedAt,
	onCopyLicense = noop,
}: Props ) {
	const translate = useTranslate();
	const licenseState = getLicenseState( ownerType, attachedAt, revokedAt );
	const debugUrl = siteUrl ? `https://jptools.wordpress.com/debug/?url=${ siteUrl }` : null;

	return (
		<Card className="license-details">
			<ul className="license-details__list">
				<li className="license-details__list-item license-details__list-item--wide">
					{ licenseState === LicenseState.Standard && (
						<div className="license-details__legacy-notice-text">
							<Gridicon icon="info" />
							{ translate(
								'This is a legacy Jetpack license, but can be converted to an agency license by clicking the convert button above.'
							) }
						</div>
					) }

					<h4 className="license-details__label">{ translate( 'License code' ) }</h4>

					<div className="license-details__license-key-row">
						<code className="license-details__license-key">{ licenseKey }</code>

						<ClipboardButton
							text={ licenseKey }
							className="license-details__clipboard-button"
							borderless
							compact
							onCopy={ onCopyLicense }
						>
							<Gridicon icon="clipboard" />
						</ClipboardButton>
					</div>
				</li>

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( 'Blog URL' ) }</h4>
					{ siteUrl ? (
						<a href={ siteUrl } target="_blank" rel="noopener noreferrer">
							{ siteUrl }
						</a>
					) : (
						<Gridicon icon="minus" />
					) }
				</li>

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( 'Jetpack Debugger' ) }</h4>
					{ debugUrl ? (
						<a href={ debugUrl } target="_blank" rel="noopener noreferrer">
							{ debugUrl }
						</a>
					) : (
						<Gridicon icon="minus" />
					) }
				</li>

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( 'Issued on' ) }</h4>
					<FormattedDate date={ issuedAt } format={ DETAILS_DATE_FORMAT } />
				</li>

				{ licenseState === LicenseState.Attached && (
					<li className="license-details__list-item">
						<h4 className="license-details__label">{ translate( 'Assigned on' ) }</h4>
						<FormattedDate date={ attachedAt } format={ DETAILS_DATE_FORMAT } />
					</li>
				) }

				{ licenseState === LicenseState.Detached && (
					<li className="license-details__list-item">
						<h4 className="license-details__label">{ translate( 'Assigned on' ) }</h4>
						<Gridicon icon="minus" />
					</li>
				) }

				{ licenseState === LicenseState.Revoked && (
					<li className="license-details__list-item">
						<h4 className="license-details__label">{ translate( 'Revoked on' ) }</h4>
						<FormattedDate date={ revokedAt } format={ DETAILS_DATE_FORMAT } />
					</li>
				) }

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( "Owner's User ID" ) }</h4>
					{ username ? <span>{ username }</span> : <Gridicon icon="minus" /> }
				</li>

				<li className="license-details__list-item">
					<h4 className="license-details__label">{ translate( 'Blog ID' ) }</h4>
					{ blogId ? <span>{ blogId }</span> : <Gridicon icon="minus" /> }
				</li>
			</ul>

			{ licenseState !== LicenseState.Standard && (
				<LicenseDetailsActions
					licenseKey={ licenseKey }
					ownerType={ ownerType }
					product={ product }
					siteUrl={ siteUrl }
					attachedAt={ attachedAt }
					revokedAt={ revokedAt }
				/>
			) }
		</Card>
	);
}
