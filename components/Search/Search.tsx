import React from 'react'
import { useState } from 'react'

import styles from './Search.module.scss'

interface SearchProps {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  placeholder?: string
}

const Search = (props: SearchProps) => {
  const { onChange } = props;

  return (<input
    id='search'
    className={ styles.search }
    type='text'
    placeholder='Search titles & tags'
    onChange={ onChange }
  />)
}

export default Search
