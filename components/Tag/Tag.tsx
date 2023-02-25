import styles from './Tag.module.scss'

const Tag = (props: any) => {
  return <a href='#' className={ styles.tag }>{ props.children }</a>
}

export default Tag
