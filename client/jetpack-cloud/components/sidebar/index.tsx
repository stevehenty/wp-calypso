import classNames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import JetpackIcons from 'calypso/components/jetpack/sidebar/menu-items/jetpack-icons';
import SiteSelector from 'calypso/components/site-selector';
import SidebarItem from 'calypso/layout/sidebar/item';
import Sidebar, {
	SidebarV2Main as SidebarMain,
	SidebarV2Footer as SidebarFooter,
	SidebarNavigator,
	SidebarNavigatorMenu,
	SidebarNavigatorMenuItem,
} from 'calypso/layout/sidebar-v2';
import { useSelector } from 'calypso/state';
import getJetpackAdminUrl from 'calypso/state/sites/selectors/get-jetpack-admin-url';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import SidebarHeader from './header';

import './style.scss';

// This is meant to be the "base" sidebar component. All context-specific sidebars
// (Sites Management, Plugin Management, Purchases, non-Manage functionality)
// would use it to construct the right experience for that context.

type Props = {
	className?: string;
	isJetpackManage?: boolean;
	path: string;
	menuItems: {
		icon: JSX.Element;
		path: string;
		link: string;
		title: string;
		onClickMenuItem: ( path: string ) => void;
		withChevron?: boolean;
		isExternalLink?: boolean;
	}[];
	description?: string;
	backButtonProps?: {
		icon: JSX.Element;
		label: string;
		onClick: () => void;
	};
};

const JetpackCloudSidebar = ( {
	className,
	isJetpackManage,
	path,
	menuItems,
	description,
	backButtonProps,
}: Props ) => {
	const siteId = useSelector( ( state ) => getSelectedSiteId( state ) );
	const jetpackAdminUrl = useSelector( ( state ) =>
		siteId ? getJetpackAdminUrl( state, siteId ) : null
	);

	const translate = useTranslate();

	return (
		<Sidebar className={ classNames( 'jetpack-cloud-sidebar', className ) }>
			<SidebarHeader forceAllSitesView={ isJetpackManage } />

			<SidebarMain>
				<SidebarNavigator initialPath={ path }>
					<SidebarNavigatorMenu
						path={ path }
						description={ description }
						backButtonProps={ backButtonProps }
					>
						{ menuItems.map( ( item ) => (
							<SidebarNavigatorMenuItem key={ item.link } { ...item } />
						) ) }
					</SidebarNavigatorMenu>
				</SidebarNavigator>
			</SidebarMain>

			{ ! isJetpackManage && (
				<SidebarFooter>
					<SidebarItem
						label={ translate( 'WP Admin', {
							comment: 'Jetpack Cloud sidebar navigation item',
						} ) }
						link={ jetpackAdminUrl }
						customIcon={ <JetpackIcons icon="wordpress" /> }
					/>
				</SidebarFooter>
			) }

			<SiteSelector
				showAddNewSite
				showAllSites={ isJetpackManage }
				isJetpackAgencyDashboard={ isJetpackManage }
				className="jetpack-cloud-sidebar__site-selector"
				allSitesPath="/dashboard"
				siteBasePath="/landing"
				wpcomSiteBasePath="https://wordpress.com/home"
			/>
		</Sidebar>
	);
};

export default JetpackCloudSidebar;
