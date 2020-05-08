import React from 'react'
import { Spinner } from '@blueprintjs/core'
import cn from 'classnames'

import MusicList from './MusicList'

import useQuery from 'hooks/useQuery'
import useAsyncFn from 'hooks/useAsyncFn'
import searchApis from 'apis/search'
import { SEARCH_TYPE } from 'apis/types/search'
import styles from './style.module.css'

const { useEffect, useState } = React

interface ITab {
  tab: string,
  tabKey: string,
  unit: string,
  key: string,
  searchType: SEARCH_TYPE
}

const TABS: IDictionary<ITab> = {
  MUSIC: {
    tab: '单曲',
    tabKey: 'MUSIC',
    unit: '首',
    key: 'song',
    searchType: SEARCH_TYPE.MUSIC
  },
  ARTIST: {
    tab: '歌手',
    tabKey: 'ARTIST',
    unit: '位',
    key: 'artist',
    searchType: SEARCH_TYPE.ARTIST
  },
  ALBUM: {
    tab: '专辑',
    tabKey: 'ALBUM',
    unit: '张',
    key: 'album',
    searchType: SEARCH_TYPE.ALBUM
  },
  SONG_LIST: {
    tab: '歌单',
    tabKey: 'SONG_LIST',
    unit: '个',
    key: 'playlist',
    searchType: SEARCH_TYPE.SONG_LIST
  },
  USER: {
    tab: '用户',
    tabKey: 'USER',
    unit: '位',
    key: 'userprofile',
    searchType: SEARCH_TYPE.USER
  }
}

const Search = () => {
  const { keyword } = useQuery()
  const [activeTab, setActiveTab] = useState(TABS.MUSIC.tabKey)
  const { unit, key, tab, searchType } = TABS[activeTab]

  const [state, searchFn] = useAsyncFn(searchApis.search)
  const { value: result, loading } = state

  useEffect(() => {
    searchFn({ keywords: keyword, type: searchType })
  }, [keyword, searchType])

  const handleTabClick = (key: string) => {
    setActiveTab(key)

    const { searchType } = TABS[key]
    searchFn({ keywords: keyword, type: searchType })
  }

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.keyword}>{keyword}</span>
          <span className={styles.count}>找到 {result?.[`${key}Count`] || 0} {unit}{tab}</span>
        </div>
        <div className={styles.tabs}>
          {Object.keys(TABS).map(key => {
            return (
              <div
                key={key}
                className={cn(styles.tab, activeTab === key && styles.active)}
                onClick={() => handleTabClick(key)}
              >
                {TABS[key].tab}
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.content}>
        {loading ? <Spinner className={styles.spinner} /> : (
          activeTab === TABS.MUSIC.tabKey && (
            <MusicList
              data={result?.songs}
              total={result?.songCount}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Search