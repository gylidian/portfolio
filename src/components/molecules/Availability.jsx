import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import posed from 'react-pose'
import { fadeIn } from '../atoms/Transitions'
import styles from './Availability.module.scss'

const query = graphql`
  query {
    dataYaml {
      availability {
        status
        available
        unavailable
      }
    }
  }
`

const Animation = posed.aside(fadeIn)

export default class Availability extends PureComponent {
  static propTypes = { hide: PropTypes.bool }

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const { availability } = data.dataYaml
          const { status, available, unavailable } = availability

          return (
            !this.props.hide && (
              <Animation
                className={
                  status
                    ? `${styles.availability} ${styles.available}`
                    : `${styles.availability}`
                }
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: status ? available : unavailable
                  }}
                />
              </Animation>
            )
          )
        }}
      />
    )
  }
}
