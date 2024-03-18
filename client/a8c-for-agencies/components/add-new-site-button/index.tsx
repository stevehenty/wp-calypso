import { isEnabled } from '@automattic/calypso-config';
import { Gridicon, WordPressLogo } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';
import JetpackLogo from 'calypso/components/jetpack-logo';
import PopoverMenuItem from 'calypso/components/popover-menu/item';
import SplitButton from 'calypso/components/split-button';
import type { MutableRefObject } from 'react';

const WORDPRESS_CREATE_SITE_URL = 'https://cloud.jetpack.com/partner-portal/create-site';
const JETPACK_CONNECT_URL = 'https://wordpress.com/jetpack/connect?source=jetpack-manage';
const JETPACK_URL_ONLY_CONNECT_URL = 'https://cloud.jetpack.com/dashboard/connect-url';

type Props = {
	showMainButtonLabel?: boolean;
	className?: string;
	popoverContext?: MutableRefObject< HTMLElement | null >;
	onToggleMenu?: ( isOpen: boolean ) => void;
	onClickAddNewSite?: () => void;
	onClickWpcomMenuItem?: () => void;
	onClickJetpackMenuItem?: () => void;
	onClickBluehostMenuItem?: () => void;
	onClickUrlMenuItem?: () => void;
};

const AddNewSiteButton = ( {
	showMainButtonLabel = true,
	className,
	popoverContext,
	onToggleMenu,
	onClickAddNewSite,
	onClickWpcomMenuItem,
	onClickJetpackMenuItem,
	onClickUrlMenuItem,
}: Props ): JSX.Element => {
	const translate = useTranslate();

	return (
		<SplitButton
			popoverContext={ popoverContext }
			className={ className }
			label={ showMainButtonLabel ? translate( 'Add new site' ) : undefined }
			toggleIcon={ showMainButtonLabel ? undefined : 'plus' }
			onToggle={ onToggleMenu }
			onClick={ onClickAddNewSite }
			href={ JETPACK_CONNECT_URL }
		>
			<PopoverMenuItem onClick={ onClickWpcomMenuItem } href={ WORDPRESS_CREATE_SITE_URL }>
				<WordPressLogo className="gridicon" size={ 18 } />
				<span>{ translate( 'Create a new WordPress.com site' ) }</span>
			</PopoverMenuItem>

			<PopoverMenuItem onClick={ onClickJetpackMenuItem } href={ JETPACK_CONNECT_URL }>
				<JetpackLogo className="gridicon" size={ 18 } />
				<span>{ translate( 'Connect a site to Jetpack' ) }</span>
			</PopoverMenuItem>

			{ isEnabled( 'jetpack/url-only-connection' ) && (
				<PopoverMenuItem onClick={ onClickUrlMenuItem } href={ JETPACK_URL_ONLY_CONNECT_URL }>
					<Gridicon icon="domains" size={ 18 } />
					<span>{ translate( 'Add sites by URL' ) }</span>
				</PopoverMenuItem>
			) }
		</SplitButton>
	);
};

export default AddNewSiteButton;
