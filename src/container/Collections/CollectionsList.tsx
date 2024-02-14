import { cn } from '@bem-react/classname'
import React from 'react'
import './CollectionsList.scss'

const bem = cn('Collections')

export const CollectionsList: React.FC = () => {
  const collections = ['Collection 1', 'Collection 2', 'Collection 3']

  return (
    <div className={bem()}>
      {collections.map((collection, index) => {
        return (
          <div key={index} className={bem('Collection')}>
            {collection}
          </div>
        )
      })}
    </div>
  )
}
