import styles from './Tag.module.scss'

interface TagProps {
  type?: "default" | "block",
  href?: string,
  className?: string,
  children?: any,
}

const Tag = (props: TagProps) => {
  const {
    type,
    href,
    className,
    children
  } = props

  let tagClass = styles.inlineTag
  if (type === "block") tagClass = styles.blockTag

  return <a href={ props.href } className={ tagClass }>{ props.children }</a>
}

export default Tag
