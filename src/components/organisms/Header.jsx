import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import classNames from 'classnames'
import Networks from '../molecules/Networks'
import Availability from '../molecules/Availability'
import ThemeSwitch from '../molecules/ThemeSwitch'
import LogoUnit from '../molecules/LogoUnit'
import styles from './Header.module.scss'

const query = graphql`
  query {
    dataYaml {
      availability {
        status
      }
    }
  }
`

export default class Header extends PureComponent {
  static propTypes = {
    minimal: PropTypes.bool
  }

  render() {
    const { minimal } = this.props

    let headerClasses = classNames([styles.header], {
      [styles.minimal]: minimal
    })

    return (
      <StaticQuery
        query={query}
        render={data => {
          const meta = data.dataYaml

          return (
            <header className={headerClasses}>
              <ThemeSwitch />

              <Link className={styles.link} to={'/'}>
                <LogoUnit minimal={minimal} />
              </Link>

              <Networks hide={minimal} />

              <Availability hide={minimal && !meta.availability.status} />
            </header>
          )
        }}
      />
    )
  }
}
