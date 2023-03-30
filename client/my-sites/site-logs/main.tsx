import { sprintf } from '@wordpress/i18n';
import { useI18n } from '@wordpress/react-i18n';
import classnames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DocumentHead from 'calypso/components/data/document-head';
import FormattedHeader from 'calypso/components/formatted-header';
import { useLocalizedMoment } from 'calypso/components/localized-moment';
import Main from 'calypso/components/main';
import Pagination from 'calypso/components/pagination';
import {
	SiteLogsData,
	SiteLogsTab,
	useSiteLogsQuery,
} from 'calypso/data/hosting/use-site-logs-query';
import { useInterval } from 'calypso/lib/interval';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import { SiteLogsTabPanel } from './components/site-logs-tab-panel';
import { SiteLogsTable } from './components/site-logs-table';
import { SiteLogsToolbar } from './components/site-logs-toolbar';
import type { Moment } from 'moment';

import './style.scss';

const DEFAULT_PAGE_SIZE = 50;

export function SiteLogs( { pageSize = DEFAULT_PAGE_SIZE }: { pageSize?: number } ) {
	const { __ } = useI18n();
	const siteId = useSelector( getSelectedSiteId );
	const moment = useLocalizedMoment();

	const getDateRange = useCallback( () => {
		const rangeParam = new URL( window.location.href ).searchParams.get( 'range' );
		const range = rangeParam && JSON.parse( rangeParam );
		const startTime = range?.from ? moment( range.from ) : moment().subtract( 7, 'd' );
		const endTime = range?.to ? moment( range.to ) : moment();
		return { startTime, endTime };
	}, [ moment ] );

	const [ dateRange, setDateRange ] = useState( getDateRange() );

	const [ currentPageIndex, setCurrentPageIndex ] = useState( 0 );

	const [ logType, setLogType ] = useState< SiteLogsTab >( () => {
		const queryParam = new URL( window.location.href ).searchParams.get( 'log-type' );
		return (
			queryParam && [ 'php', 'web' ].includes( queryParam ) ? queryParam : 'php'
		) as SiteLogsTab;
	} );

	const { data: latestPageData, isLoading } = useSiteLogsQuery( siteId, {
		logType,
		start: dateRange.startTime.unix(),
		end: dateRange.endTime.unix(),
		sortOrder: 'desc',
		pageSize,
		pageIndex: currentPageIndex,
	} );

	const [ autoRefresh, setAutoRefresh ] = useState( true );

	const autoRefreshCallback = useCallback( () => {
		setDateRange( getDateRange() );
		setCurrentPageIndex( 0 );
	}, [ getDateRange ] );
	useInterval( autoRefreshCallback, autoRefresh && 10 * 1000 );

	// We keep a copy of the most recently shown page so that we can use it as part of the loading state while switching pages.
	const [ data, setCachedPageData ] = useState< SiteLogsData | undefined >();
	useEffect( () => {
		if ( ! isLoading ) {
			setCachedPageData( latestPageData );
		}
	}, [ latestPageData, isLoading ] );

	const handleTabSelected = ( tabName: SiteLogsTab ) => {
		setLogType( tabName );
		setCurrentPageIndex( 0 );
		setCachedPageData( undefined );
	};

	const handleAutoRefreshClick = ( isChecked: boolean ) => {
		if ( isChecked ) {
			setDateRange( getDateRange() );
		}
		setAutoRefresh( isChecked );
		setCurrentPageIndex( 0 );
	};

	const handlePageClick = ( nextPageNumber: number ) => {
		if ( isLoading ) {
			return;
		}

		const nextPageIndex = nextPageNumber - 1;
		if ( nextPageIndex < currentPageIndex && currentPageIndex > 0 ) {
			setCurrentPageIndex( currentPageIndex - 1 );
		} else if (
			nextPageIndex > currentPageIndex &&
			( currentPageIndex + 1 ) * pageSize < ( data?.total_results ?? 0 )
		) {
			setCurrentPageIndex( currentPageIndex + 1 );
		}

		setAutoRefresh( false );
	};

	const titleHeader = __( 'Site Logs' );

	const paginationText =
		data?.total_results && data.total_results > pageSize
			? /* translators: Describes which log entries we're showing on the page: "start" and "end" represent the range of log entries currently displayed, "total" is the number of log entries there are overall; e.g. Showing 1–20 of 428 */
			  sprintf( __( 'Showing %(start)d\u2013%(end)d of %(total)d' ), {
					start: currentPageIndex * pageSize + 1,
					end: currentPageIndex * pageSize + data.logs.length,
					total: data.total_results,
			  } )
			: null;

	const handleDateTimeChange = ( startDate: Moment, endDate: Moment ) => {
		setDateRange( {
			startTime: startDate,
			endTime: endDate,
		} );
		setAutoRefresh( false );
	};

	return (
		<Main fullWidthLayout className={ classnames( 'site-logs', { 'is-loading': isLoading } ) }>
			<DocumentHead title={ titleHeader } />
			<FormattedHeader
				brandFont
				headerText={ titleHeader }
				subHeaderText={ __( 'View server logs to troubleshoot or debug problems with your site.' ) }
				align="left"
				className="site-logs__formatted-header"
			/>

			<SiteLogsTabPanel selectedTab={ logType } onSelected={ handleTabSelected }>
				{ () => (
					<>
						<SiteLogsToolbar
							autoRefresh={ autoRefresh }
							onAutoRefreshChange={ handleAutoRefreshClick }
							logType={ logType }
							startDateTime={ dateRange.startTime }
							endDateTime={ dateRange.endTime }
							onDateTimeChange={ handleDateTimeChange }
						/>
						<SiteLogsTable logs={ data?.logs } isLoading={ isLoading } />
						{ paginationText && (
							<div className="site-logs__pagination-text">{ paginationText }</div>
						) }
						{ !! data?.total_results && (
							<div className="site-logs__pagination-click-guard">
								<Pagination
									page={ currentPageIndex + 1 }
									perPage={ pageSize }
									total={ data.total_results }
									pageClick={ handlePageClick }
								/>
							</div>
						) }
					</>
				) }
			</SiteLogsTabPanel>
		</Main>
	);
}
